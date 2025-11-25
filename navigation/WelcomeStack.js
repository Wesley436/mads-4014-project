import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

const Stack = createNativeStackNavigator();

const WelcomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="SignInScreen">
            <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{
                    title: 'Sign In',
                    headerTitleAlign: 'center'
                }} />
            <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                    title: 'Sign Up',
                    headerTitleAlign: 'center'
                }} />
        </Stack.Navigator>
    )
}

export default WelcomeStack;