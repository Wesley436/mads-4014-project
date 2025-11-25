import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddIngredient from "./AddIngredient";

const Stack = createNativeStackNavigator();

const AddIngredientStack = () => {
    return (
        <Stack.Navigator initialRouteName="AddIngredient" screenOptions={{
            headerStyle: {
                backgroundColor: "rgba(16, 172, 132, 1.0)",
            },
            headerTintColor: "#FFF",
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}>
            <Stack.Screen
                name="AddIngredient"
                component={AddIngredient}
                options={{
                    title: 'Add Ingredient',
                    headerTitleAlign: 'center'
                }} />
        </Stack.Navigator>
    )
}

export default AddIngredientStack;