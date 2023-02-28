# React Native - MemoList (여행)

- Work와 Travel 탭을 만든 다음 탭에 해당하는 항목을 추가한 후 목록을 확인할 수 있는 앱
- 할 일 추가, 수정, 완료, 삭제 기능 구현
- 카카오 소셜로그인 구현

## 개발환경 설정

터미널을 켜서 폴더를 생성하고 싶은 위치로 이동한 후

<pre><code>expo init reactnative_memolist</code></pre> 를 입력하면

해당 위치에 reractnative_memolist 폴더가 생성됨 (blank - typescript로 생성)

## Button Component (Touchable)

### TouchableOpacity

누르는 이벤트를 listen할 준비가 된 view라고 할 수 있음, opacity가 있는 이유는 눌렀을 때 애니메이션 효과가 있기 때문

### TouchableHighlight

- TouchableOpacity보다 더 많은 속성을 가짐, 내가 요소를 클릭했을 때 배경색이 바뀌도록 해줌
- onPress는 유저가 Touchable을 눌렀을 때 실행되는 이벤트를 말함
- underlayColor를 지정해야 버튼을 눌렀을 때 색깔이 보임

### TouchableWithoutFeedback

- 화면의 가장 위에서 일어나는 탭 이벤트를 listen 하는 것
- 하지만 그래픽이나 다른 UI 반응은 보여주지 않음

### Pressable

- TouchableWithoutFeedback이랑 비슷함
- 추가적인 옵션을 더 가지고 있어서 좀 더 섬세한 설정이 가능

## TextInput

- keyboardType : 키보드 타입 지정
- onChangeText : text가 바꼈는지 확인하는 함수
- returnKeyType : 키보드에서 입력하는 부분의 모양과 유형을 바꿀 수 있음
- secureTextEntry : 비밀번호에 input에 사용
- multiline : 메모장 같이 여러줄을 입력할 때 사용
- placeholderTextColor : placeholder text 색깔 바꿀 수 있음

## AsyncStorage

설치하기 위해서

<pre><code>expo install @react-native-async-storage/async-storage</code></pre>

- 브라우저의 local storage처럼 작동함
- async await을 사용해야 함

## Alert

- 대화창을 실행시킴
- 옵션으로 alert()와 prompt()가 있는데 prompt()는 ios에서만 사용 가능

## expo

expo install을 사용하면 npm install과 똑같이 작동함
하지만 expo install을 사용하면 현재 사용중인 expo버전과 같은 버전의 모듈을 설치해줌

icons.expo.fyi 에서 예쁜 아이콘 찾을 수 있음

# 추가로 개인 개발

## Navigating

- 여러 화면의 표시 및 전환 관리는 일반적으로 네비게이터라고 하는 것으로 처리됨

먼저, <pre><code>npm install @react-navigation/native @react-navigation/native-stack</code></pre>으로 설치
Expo project인 경우, <pre><code>npx expo install react-native-screens react-native-safe-area-context</code></pre>를 통해 종속성을 설치

## 배포

<pre><code>expo publish</code></pre>

## nativewind

- tailwind랑 사용방법 똑같음

### 1. 설치

<pre><code>
npm install nativewind
npm install --dev tailwindcss
</code></pre>

### 2. Setup Tailwind CSS

<pre><code>npx tailwindcss init</code></pre>을 실행하여 tailwind.config.js 생성

컴포넌트 파일이 위치한 path를 tailwind.config.js 파일에 추가하기

### 3. ADD the Babel plugin

babel.config.js 파일 수정하기 (아래 코드 추가)
plugins: ["nativewind/babel"]

## kakaoLogin

- native 환경에서는 sdk를 이용해서 구현하는데 expo 환경에서는 불가능하므로 웹뷰를 띄워서 rest API를 이용해서 구현하기

### WebView의 중요 props 3가지 (source, onMessage, injectedJavaScript)

- passport-kakao를 이용할 때는 source props만 있으면 됨

#### source

- WebView를 보여줄 페이지 주소
- 기본적으로 url이 주어지고 rest API와 redirect uri부분만 값을 넣어주면 됨

#### onMessage

- WebView에서 window.ReactNativeWebView.postMessage 함수가 호출될 때 실행되는 이벤트 함수

#### injectedJavaScript

- WebView에서 window.ReactNativeWebView.postMessage(code)라는 매서드를 강제로 실행시키는 역할을 수행함

## Linking

### 설치

<pre><code>
expo install expo-linking
</code></pre>

### useURL()

- 앱이 시작한 후에 Linking.useURL()로 링크를 관찰할 수 있음
- 초기 url과 url에 대한 후속 변경 사항을 반환함
