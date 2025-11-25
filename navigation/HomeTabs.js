import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecipeStack from "../screens/RecipeStack";
import AddIngredientStack from "../screens/AddIngredientStack";
import SavedRecipesStack from "../screens/SavedRecipesStack";
import OwnedIngredientsStack from "../screens/OwnedIngredientsStack";

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
    return (
        <Tab.Navigator initialRouteName="Recipes" screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen
                name="Recipes"
                component={RecipeStack} />
            <Tab.Screen
                name="Add Ingredients"
                component={AddIngredientStack} />
            <Tab.Screen
                name="Saved Recipes"
                component={SavedRecipesStack} />
            <Tab.Screen
                name="Ingredients"
                component={OwnedIngredientsStack} />
        </Tab.Navigator>
    );
}

export default HomeTabs;