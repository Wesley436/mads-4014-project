import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnedIngredients from "./OwnedIngredients";

const Stack = createNativeStackNavigator();

const OwnedIngredientsStack = () => {
    return (
        <Stack.Navigator initialRouteName="OwnedIngredients" screenOptions={{
            headerStyle: {
                backgroundColor: "rgba(16, 172, 132, 1.0)",
            },
            headerTintColor: "#FFF",
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}>
            <Stack.Screen
                name="OwnedIngredients"
                component={OwnedIngredients}
                options={{
                    title: 'Your Ingredients',
                    headerTitleAlign: 'center'
                }}
            />
        </Stack.Navigator>
    )
}

export default OwnedIngredientsStack;