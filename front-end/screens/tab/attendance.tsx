import { Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BACKEND } from "@env";
import { tokenData } from "../../utils/functions";

dayjs.locale("ko");

export default function Attendance({ navigation }: any) {
  const [date, setDate] = useState<string>();
  const [timeList, setTimeList] = useState<any>([]);
  const [change, setChange] = useState<number>(0);

  /**
   * 출,퇴근 버튼 눌렀을 때 시간 저장해주는 함수
   * @param type home(퇴근), work(출근)
   */
  const timeSaveHandler = async (type: string) => {
    const token = await tokenData();

    if (token) {
      let newTimeList = [...timeList];
      if (type === "work") {
        newTimeList[+dayjs().format("d") - 1] = {
          ...timeList[+dayjs().format("d") - 1],
          key: +dayjs().format("d") - 1,
          start: dayjs().format("HH:mm"),
        };
      } else {
        newTimeList[+dayjs().format("d") - 1] = {
          ...timeList[+dayjs().format("d") - 1],
          key: +dayjs().format("d") - 1,
          end: dayjs().format("HH:mm"),
        };
      }
      await axios
        .patch(`${BACKEND}/attendance/${JSON.parse(token)["id"]}`, newTimeList)
        .then((res) => setChange(change + 1))
        .catch((err) => console.log(err));
    }
  };

  const isMonday = async () => {
    if (dayjs().format("d") === "1") {
      setDate(dayjs().format());
      await AsyncStorage.setItem("mondayDate", JSON.stringify(dayjs()));
    } else {
      const date = await AsyncStorage.getItem("mondayDate");
      if (date) setDate(dayjs(JSON.parse(date)).format());
    }
  };

  const createTimeList = async () => {
    const token = await tokenData();
    if (token) {
      await axios
        .post(`${BACKEND}/attendance`, {
          id: JSON.parse(token)["id"],
        })
        .then((res) => console.log("생성"))
        .catch((err) => err);
    }
  };

  const getTimeList = async () => {
    const token = await tokenData();
    if (token) {
      const data = await axios
        .get(`${BACKEND}/attendance/${JSON.parse(token)["id"]}`)
        .then((res) => res.data)
        .catch((err) => err);
      setTimeList(data.workAWeek);
    }
  };

  useEffect(() => {
    isMonday();
    // createTimeList();
  }, []);

  useEffect(() => {
    getTimeList();
  }, [change]);

  return (
    <View className="flex-1 py-36 px-6">
      <View className="bg-neutral-300 rounded-lg px-4 py-4">
        <View className="flex-row justify-between items-center">
          {timeList?.map((el: any, idx: number) => (
            <View key={idx} className="items-center">
              <Text>{dayjs(date).add(idx, "day").format("MM/DD")}</Text>
              <Text className="text-black text-2xl font-bold">
                {dayjs(date).add(idx, "day").format("dd")}
              </Text>
              <Text className="text-black text-lg">{el.start}</Text>
              <Text className="text-black text-lg">{el.end}</Text>
            </View>
          ))}
        </View>
        <View className="flex-row rounded-lg py-4">
          <TouchableOpacity
            onPress={() => timeSaveHandler("work")}
            className="mt-4 mx-8 p-4 bg-black rounded-lg items-center mb-8"
          >
            <Text className="text-white text-2xl font-bold">출근</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => timeSaveHandler("home")}
            className="mt-4 mx-8 p-4 bg-red-400 rounded-lg items-center mb-8"
          >
            <Text className="text-white text-2xl font-bold">퇴근</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View className="flex-row rounded-lg py-4">
        <TouchableOpacity className="mt-4 mx-8 p-4 bg-black rounded-lg items-center mb-8">
          <Text className="text-white text-2xl font-bold">출근</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-4 mx-8 p-4 bg-red-400 rounded-lg items-center mb-8">
          <Text className="text-white text-2xl font-bold">퇴근</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
