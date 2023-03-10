import { Modal, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { REDIRECT_URI, REST_API_KEY } from "@env";

// const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('카카오 로그인')`;

const SignIn = ({ navigation }: any) => {
  const url = Linking.useURL();
  // 카카오 모달 오픈 여부
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  /**
   * 카카오 로그인 버튼을 눌렀을 때  작동하는 함수
   * asyncStorage에 토큰이 있다면 백엔드를 타지 않고 바로 main으로 뱉기
   */
  const onKakaoLoginHandler = async () => {
    const isToken = await AsyncStorage.getItem("token");
    if (isToken) navigation.navigate("main");
    else setModalVisible(true);
  };

  const makeToken = async (id: string) => {
    await AsyncStorage.setItem("token", JSON.stringify({ id: id }));
  };

  // 백엔드에서 받은 url을 기준으로 회원가입과 메인 페이지로 구분
  useEffect(() => {
    setModalVisible(false);
    if (url?.split("?id=")[0] === "exp://192.168.0.8:19000/--/signUp") {
      navigation.navigate("signUp", { id: url.split("?id=")[1] });
    }
    if (url?.split("?id=")[0] === "exp://192.168.0.8:19000/--/main") {
      makeToken(url.split("?id=")[1]);
      navigation.navigate("main");
    }
  }, [url]);

  return (
    <View className="flex-1 bg-black py-36 px-6">
      <View className="items-center mb-20">
        <AntDesign name="book" size={96} color="white" />
      </View>
      <View className="bg-neutral-700 rounded-lg py-4">
        <TouchableOpacity
          onPress={onKakaoLoginHandler}
          className="mt-4 mx-8 p-4 bg-yellow-400 rounded-lg items-center mb-8"
        >
          <Text className="text-black text-2xl font-bold">카카오 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-4 mx-8 p-4 bg-green-600 rounded-lg items-center mb-8">
          <Text className="text-white text-2xl font-bold">네이버 로그인</Text>
        </TouchableOpacity>
      </View>

      {/* 카카오 로그인 모달 */}
      <Modal animationType="slide" visible={modalVisible}>
        <View className="flex-1 my-8 mx-4">
          <WebView
            style={{ marginTop: 30, flex: 1 }}
            source={{
              uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
            }}
            // injectedJavaScript={INJECTED_JAVASCRIPT}
            // onMessage={(event: WebViewMessageEvent) => {
            //   const data = event.nativeEvent.url;
            // }}
          />
        </View>
      </Modal>
    </View>
  );
};
export default SignIn;
