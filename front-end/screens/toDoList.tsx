import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fontisto } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Modal } from "react-native";
import axios from "axios";

/**
 * asyncstorage key값
 */
const STORAGE_KEY = "@toDos";

export default function ToDoList() {
  const [type, setType] = useState<string>("WORK");
  const [text, setText] = useState<string>("");
  const [toDos, setToDos] = useState<any>([]);
  const [updateText, setUpdateText] = useState<string>("");
  const [updateId, setUpdateId] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [change, setChange] = useState<number>(0);

  /**
   * AsyncStorage에서 token 불러오는 함수
   * @returns
   */
  const tokenData = async () => {
    const token = await AsyncStorage.getItem("token");
    return token;
  };

  /**
   * toDos를 목록에 보여주는 함수
   */
  const getTodos = async () => {
    const token = await tokenData();
    if (token) {
      const toDos = await axios
        .get(`http://192.168.0.8:19003/todo/${JSON.parse(token)["id"]}`)
        .then((res) => res.data)
        .catch((err) => console.log(err.response));
      setToDos(toDos);
    }
  };

  useEffect(() => {
    getTodos();
  }, [change]);

  const travel = async () => {
    setType("TRAVEL");
  };

  const work = async () => {
    setType("WORK");
  };

  const onChangeText = (payload: string) => setText(payload);

  /**
   * 할 일 추가하는 함수
   * @returns
   */
  const addToDo = async () => {
    const token = await tokenData();
    if (!text || !token) return;
    else {
      const toDoData = {
        id: JSON.parse(token)["id"],
        content: text,
        type: type,
        complete: false,
      };
      await axios
        .post("http://192.168.0.8:19003/todo", toDoData)
        .then((res) => {
          setText("");
          setChange(change + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  /**
   * 할 일 삭제하는 함수
   * @param id todo의 _id
   */
  const deleteToDo = (id: string) => {
    Alert.alert("정말 삭제하시겠습니까?", "", [
      {
        text: "아니오",
        // style은 ios에서만 가능
        style: "destructive",
      },
      {
        text: "예",
        onPress: async () => {
          await axios
            .delete(`http://192.168.0.8:19003/todo/${id}`)
            .then((res) => setChange(change + 1))
            .catch((err) => console.log(err));
        },
      },
    ]);
  };

  /**
   * 체크할 때 작동하는 함수
   * @param key 추가한 시간 값
   * @param isChecked 체크했는지 여부
   */
  const checkToDo = async (id: string, isCompleted: boolean) => {
    await axios
      .patch(`http://192.168.0.8:19003/todo/${id}`, { complete: !isCompleted })
      .then((res) => setChange(change + 1));
  };

  /**
   * 할 일을 수정하는 함수
   */
  const updateToDo = async () => {
    await axios
      .patch(`http://192.168.0.8:19003/todo/${updateId}`, {
        content: updateText,
      })
      .then((res) => {
        setChange(change + 1);
        setUpdateText("");
        setUpdateId("");
        setModalVisible(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View className="flex-1 bg-black py-10 px-6">
      <View className="justify-between flex-row mt-8 mb-4">
        <TouchableOpacity onPress={work}>
          <Text
            className={
              type === "WORK"
                ? "text-5xl font-bold text-white"
                : "text-5xl font-bold text-neutral-700"
            }
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            className={
              type !== "WORK"
                ? "text-5xl font-bold text-white"
                : "text-5xl font-bold text-neutral-700"
            }
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mb-6">
        <TextInput
          onChangeText={onChangeText}
          onSubmitEditing={addToDo}
          returnKeyType="done"
          value={text}
          placeholder={
            type === "WORK" ? "할 일을 추가해 보세요." : "어디로 가고 싶나요?"
          }
          className="bg-white py-4 px-4 rounded my-4 text-xl"
        />
      </View>
      <ScrollView>
        {toDos.map(
          (el: any, idx: number) =>
            el.type === type && (
              <View
                className="w-full flex-row items-center justify-between bg-neutral-700 mb-4 p-4 rounded"
                key={idx}
              >
                <View className="flex-row items-center w-4/5">
                  <TouchableOpacity
                    onPress={() => checkToDo(el._id, el.complete)}
                  >
                    {el.complete ? (
                      <FontAwesome
                        name="check-square-o"
                        size={24}
                        color="white"
                      />
                    ) : (
                      <Feather name="square" size={24} color="white" />
                    )}
                  </TouchableOpacity>
                  <Text
                    className={
                      el.complete
                        ? "line-through text-neutral-400 text-base font-medium ml-4"
                        : "text-white text-base font-medium ml-4"
                    }
                  >
                    {el.content}
                  </Text>
                </View>
                <View className="flex-row items-center w-1/5 justify-end">
                  {!el.complete && (
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(true);
                        setUpdateId(el._id);
                      }}
                    >
                      <FontAwesome
                        name="pencil-square-o"
                        size={28}
                        color="white"
                      />
                    </TouchableOpacity>
                  )}
                  <View className="ml-4">
                    <TouchableOpacity onPress={() => deleteToDo(el._id)}>
                      <Fontisto name="trash" size={26} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )
        )}
      </ScrollView>

      <Modal animationType="slide" visible={modalVisible}>
        <View className="w-full h-full items-center justify-center bg-black">
          <View className="w-full px-6">
            <TextInput
              value={updateText}
              onChangeText={(e) => setUpdateText(e)}
              onSubmitEditing={updateToDo}
              className="bg-white pt-4 pb-40 px-4 rounded my-4 text-xl"
              placeholder="수정하고 싶은 메세지를 입력해 주세요."
            />
          </View>
          <View className="flex-row mt-8">
            <TouchableOpacity
              className="px-4 py-2 bg-neutral-800 rounded-lg items-center mr-4"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-xl font-bold">취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-2 bg-neutral-800 rounded-lg items-center"
              onPress={updateToDo}
            >
              <Text className="text-white text-xl font-bold">수정</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
