import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const SignUp = ({ route, navigation }: any) => {
  const [name, setName] = useState<string>("");
  const [hpNum, setHpNum] = useState<string>("");

  const onSignUpHandler = async () => {
    if (name && hpNum) {
      const tokenData = {
        id: String(route.params.id),
        name: name,
        hpNum: hpNum,
      };
      await axios
        .post("http://192.168.0.8:19003/users", tokenData)
        .then(async (res) => {
          await AsyncStorage.setItem(
            "token",
            JSON.stringify({ id: tokenData.id })
          );
          navigation.navigate("toDoList");
        })
        .catch((err) => console.log("error!!!!", err.response));
    }
  };

  return (
    <View className="flex-1 bg-black py-36 px-6">
      <View className="items-center mb-20">
        <AntDesign name="book" size={96} color="white" />
      </View>
      <View className="bg-neutral-700 rounded py-4">
        <View className="mx-8">
          <TextInput
            value={name}
            onChangeText={(e) => setName(e)}
            placeholder="이름을 입력해 주세요."
            className="bg-white py-4 px-4 rounded my-4 text-xl"
          />
        </View>
        <View className="mx-8">
          <TextInput
            value={hpNum}
            onChangeText={(e) => setHpNum(e)}
            placeholder="전화번호를 입력해 주세요."
            className="bg-white py-4 px-4 rounded my-4 text-xl"
          />
        </View>
        <TouchableOpacity
          onPress={onSignUpHandler}
          className="mt-4 mx-8 p-4 bg-neutral-800 rounded-lg items-center"
        >
          <Text className="text-white text-2xl font-bold">회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SignUp;
