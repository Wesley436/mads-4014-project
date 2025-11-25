import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeList from "./RecipeList";
import RecipeDetail from "./RecipeDetail";

const Stack = createNativeStackNavigator();

const RecipeStack = () => {
    return (
        <Stack.Navigator initialRouteName="RecipeList" screenOptions={{
            headerStyle: {
                backgroundColor: "rgba(16, 172, 132, 1.0)",
            },
            headerTintColor: "#FFF",
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}>
            <Stack.Screen
                name="RecipeList"
                component={RecipeList}
                options={{
                    title: 'Recipes',
                    headerTitleAlign: 'center'
                }} />
            <Stack.Screen
                name="RecipeDetail"
                component={RecipeDetail}
                options={{
                    title: 'Recipe Detail',
                    headerTitleAlign: 'center'
                }} />
        </Stack.Navigator>
    )
}

export default RecipeStack;