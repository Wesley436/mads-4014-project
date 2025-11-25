import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SavedRecipes from "./SavedRecipes";

const Stack = createNativeStackNavigator();

const SavedRecipesStack = () => {
    return (
        <Stack.Navigator initialRouteName="SavedRecipes" screenOptions={{
            headerStyle: {
                backgroundColor: "rgba(16, 172, 132, 1.0)",
            },
            headerTintColor: "#FFF",
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}>
            <Stack.Screen
                name="SavedRecipes"
                component={SavedRecipes}
                options={{
                    title: 'Saved Recipes',
                    headerTitleAlign: 'center'
                }}
            />
        </Stack.Navigator>
    )
}

export default SavedRecipesStack;