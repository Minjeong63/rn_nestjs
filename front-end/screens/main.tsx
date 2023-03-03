import { Text, TouchableOpacity, View } from "react-native";

export default function Main({ navigation }: any) {
  return (
    <View className="flex-1 bg-black py-36 px-6">
      <View className="bg-neutral-700 rounded-lg py-4">
        <TouchableOpacity
          onPress={() => navigation.navigate("toDoList")}
          className="mt-4 mx-8 p-4 bg-white rounded-lg items-center mb-8"
        >
          <Text className="text-black text-2xl font-bold">메모장</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("attendance")}
          className="mt-4 mx-8 p-4 bg-red-400 rounded-lg items-center mb-8"
        >
          <Text className="text-white text-2xl font-bold">출석체크</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
