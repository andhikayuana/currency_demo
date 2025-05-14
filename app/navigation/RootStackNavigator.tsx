import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TestScreen from "../screens/TestScreen";

export type RootStackParamList = {
  Home: undefined;
  Play: undefined;
}
  
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
  
const Stack = createNativeStackNavigator<RootStackParamList>();
  
const RootStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Play" component={TestScreen} />
    </Stack.Navigator>
 );
}

export default RootStackNavigator;