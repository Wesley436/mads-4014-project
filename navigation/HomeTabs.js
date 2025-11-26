import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecipeStack from "../screens/RecipeStack";
import AddIngredientStack from "../screens/AddIngredientStack";
import SavedRecipesStack from "../screens/SavedRecipesStack";
import OwnedIngredientsStack from "../screens/OwnedIngredientsStack";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
    return (
        <Tab.Navigator initialRouteName="Recipes" screenOptions={(screen) => {
            let iconName = ''
            switch (screen.route.name) {
                case "Recipes":
                    iconName = 'newspaper-outline'
                    break;
                case "Add Ingredients":
                    iconName = 'add-outline'
                    break;
                case "Saved Recipes":
                    iconName = 'bookmark-outline'
                    break;
                case "Ingredients":
                    iconName = 'home-outline'
                    break;
                default:
                    iconName = 'newspaper-outline'
                    break;
            }

            return {
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            }
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