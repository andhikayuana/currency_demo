import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
}
  
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, "About">;
  
const Stack = createNativeStackNavigator<RootStackParamList>();
  
const RootStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
 );
}

export default RootStackNavigator;