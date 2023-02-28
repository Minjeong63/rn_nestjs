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

/**
 * asyncstorage key값
 */
const STORAGE_KEY = "@toDos";

export default function ToDoList() {
  const [working, setWorking] = useState<boolean>(true);
  const [text, setText] = useState<string>("");
  const [toDos, setToDos] = useState<any>({});
  const [updateText, setUpdateText] = useState<string>("");
  const [updateKey, setUpdateKey] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const travel = async () => {
    setWorking(false);
    await AsyncStorage.setItem("tab", "false");
  };

  const work = async () => {
    setWorking(true);
    await AsyncStorage.setItem("tab", "true");
  };

  const onChangeText = (payload: string) => setText(payload);

  useEffect(() => {
    loadToDos();
    lastTab();
  }, []);

  /**
   * app을 끄기 직전에 보고 있던 tab이 뭔지 구분해서 다음에 다시 app을 들어갈 때 그 탭을 보여주는 함수
   */
  const lastTab = async () => {
    try {
      const tab = await AsyncStorage.getItem("tab");
      setWorking(tab === "true" ? true : false);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * asyncstorage에 데이터 저장하는 함수
   * @param toSave 저장할 데이터
   */
  const saveToDos = async (toSave: any) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      alert("storage 저장 실패");
    }
  };

  /**
   * asyncstorage에 있는 데이터 불러오는 함수
   */
  const loadToDos = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      data ? setToDos(JSON.parse(data)) : null;
    } catch (e) {
      alert("storage 불러오기 실패");
    }
  };

  /**
   * 할 일 추가하는 함수
   * @returns
   */
  const addToDo = async () => {
    if (!text) return;
    else {
      // const newToDos = Object.assign({}, toDos, {
      //   [Date.now()]: { text, work: working },
      // });
      const newToDos = {
        ...toDos,
        [Date.now()]: { text, working, isChecked: false },
      };
      setToDos(newToDos);
      await saveToDos(newToDos);
      setText("");
    }
  };

  /**
   * 할 일 삭제하는 함수
   * @param key 할 일을 추가한 시간
   */
  const deleteToDo = (key: string) => {
    Alert.alert("정말 삭제하시겠습니까?", "", [
      {
        text: "아니오",
        // style은 ios에서만 가능
        style: "destructive",
      },
      {
        text: "예",
        onPress: async () => {
          // const newToDos = Object.keys(toDos).map((el) => el !== key && toDos[el]);
          const newToDos = { ...toDos };
          delete newToDos[key];

          setToDos(newToDos);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newToDos));
        },
      },
    ]);
  };

  /**
   * 체크할 때 작동하는 함수
   * @param key 추가한 시간 값
   * @param isChecked 체크했는지 여부
   */
  const checkToDo = async (key: string, isChecked: boolean) => {
    if (!isChecked) {
      const newToDos = { ...toDos, [key]: { ...toDos[key], isChecked: true } };
      setToDos(newToDos);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newToDos));
    } else {
      const newToDos = { ...toDos, [key]: { ...toDos[key], isChecked: false } };
      setToDos(newToDos);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newToDos));
    }
  };

  /**
   * 할 일을 수정하는 함수
   */
  const updateToDo = async () => {
    let newToDo = { ...toDos };
    newToDo[updateKey].text = updateText;
    setToDos(newToDo);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newToDo));
    setUpdateKey("");
    setUpdateText("");
    setModalVisible(false);
  };

  return (
    <View className="flex-1 bg-black py-10 px-6">
      <View className="justify-between flex-row mt-8 mb-4">
        <TouchableOpacity onPress={work}>
          <Text
            className={
              working
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
              !working
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
            working ? "할 일을 추가해 보세요." : "어디로 가고 싶나요?"
          }
          className="bg-white py-4 px-4 rounded my-4 text-xl"
        />
      </View>
      <ScrollView>
        {toDos &&
          Object.keys(toDos).map(
            (key: string) =>
              toDos[key].working === working && (
                <View
                  className="w-full flex-row items-center justify-between bg-neutral-700 mb-4 p-4 rounded"
                  key={key}
                >
                  <View className="flex-row items-center w-4/5">
                    <TouchableOpacity
                      onPress={() => checkToDo(key, toDos[key].isChecked)}
                    >
                      {toDos[key].isChecked ? (
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
                        toDos[key].isChecked
                          ? "line-through text-neutral-400 text-base font-medium ml-4"
                          : "text-white text-base font-medium ml-4"
                      }
                    >
                      {toDos[key]["text"]}
                    </Text>
                  </View>
                  <View className="flex-row items-center w-1/5 justify-end">
                    {!toDos[key].isChecked && (
                      <TouchableOpacity
                        onPress={() => {
                          setModalVisible(true);
                          setUpdateKey(key);
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
                      <TouchableOpacity onPress={() => deleteToDo(key)}>
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
