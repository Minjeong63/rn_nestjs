import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToDoList from "./screens/tab/toDoList";
import SignIn from "./screens/sign/signIn";
import SignUp from "./screens/sign/signUp";
import Main from "./screens/main";
import Attendance from "./screens/tab/attendance";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="signIn"
      >
        {/* sign */}
        <Stack.Screen name="signIn" component={SignIn} />
        <Stack.Screen name="signUp" component={SignUp} />
        <Stack.Screen name="main" component={Main} />
        {/* tab */}
        <Stack.Screen name="attendance" component={Attendance} />
        <Stack.Screen name="toDoList" component={ToDoList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
