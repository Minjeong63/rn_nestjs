import { Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
// import "dayjs/locale/ko";

// dayjs.locale("ko");

export default function Attendance({ navigation }: any) {
  const goToWorkHandler = () => {
    console.log(dayjs().format("hh:mm"));
  };

  const leaveWorkHandler = () => {
    console.log(dayjs().format("hh:mm"));
  };

  return (
    <View className="flex-1 py-36 px-6">
      <View className="items-center bg-neutral-300 rounded-lg px-2 py-4">
        <View className="flex-row justify-between items-center">
          <View className="items-center">
            <Text className="text-black text-2xl font-bold">월</Text>
            <View>
              <Text className="text-black text-lg ">9 : 00</Text>
            </View>
            <View>
              <Text className="text-black text-lg ">18 : 00</Text>
            </View>
          </View>
          <View className="items-center">
            <Text className="text-black text-2xl font-bold">화</Text>
            <View>
              <Text className="text-black text-lg ">9 : 00</Text>
            </View>
            <View>
              <Text className="text-black text-lg ">18 : 00</Text>
            </View>
          </View>
          <View className="items-center">
            <Text className="text-black text-2xl font-bold">수</Text>
            <View>
              <Text className="text-black text-lg ">9 : 00</Text>
            </View>
            <View>
              <Text className="text-black text-lg ">18 : 00</Text>
            </View>
          </View>
          <View className="items-center">
            <Text className="text-black text-2xl font-bold">목</Text>
            <View>
              <Text className="text-black text-lg">9 : 00</Text>
            </View>
            <View>
              <Text className="text-black text-lg">18 : 00</Text>
            </View>
          </View>
          <View className="items-center">
            <Text className="text-black text-2xl font-bold">금</Text>
            <View>
              <Text className="text-black text-lg ">9 : 00</Text>
            </View>
            <View>
              <Text className="text-black text-lg ">18 : 00</Text>
            </View>
          </View>
        </View>
        <View className="flex-row rounded-lg py-4">
          <TouchableOpacity
            onPress={goToWorkHandler}
            className="mt-4 mx-8 p-4 bg-black rounded-lg items-center mb-8"
          >
            <Text className="text-white text-2xl font-bold">출근</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-4 mx-8 p-4 bg-red-400 rounded-lg items-center mb-8">
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
