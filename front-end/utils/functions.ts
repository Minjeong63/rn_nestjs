import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * AsyncStorage에서 token 불러오는 함수
 * @returns
 */
export const tokenData = async () => {
  const token = await AsyncStorage.getItem("token");
  return token;
};
