import { FlatList, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { styles } from '../style/CustomStyle';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { firebaseAuth } from '../config/FirebaseConfig';
import axios from "axios";
import { convertMealObject } from '../helper.js';
import { Dropdown } from 'react-native-element-dropdown';

interface Recipe {
    id: string,
    name: string,
    category: string,
    area: string,
    instructions: string,
    imageUrl: string,
    youtubeUrl: string,
    ingredients: string[],
    measures: string[]
}

const RecipeList: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);
    const [categoryList, setCategoryList] = useState([]);
    const [areaList, setAreaList] = useState([]);
    const [ingredientList, setIngredientList] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [category, setCategory] = useState("");
    const [area, setArea] = useState("");
    const [ingredient, setIngredient] = useState("");

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="sign-out" size={32} color="#FFF" onPress={() => {
                    firebaseAuth.signOut();
                }} />
            )
        })
    }, [navigation]);

    useEffect(() => {
        getRecipesFromApi();
    }, []);

    useEffect(() => {
        const refresh = async () => {
            if (category !== "") {
                await refreshRecipes("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category)
            } else if (area !== "") {
                await refreshRecipes("https://www.themealdb.com/api/json/v1/1/filter.php?a=" + area)
            } else if (ingredient !== "") {
                await refreshRecipes("https://www.themealdb.com/api/json/v1/1/filter.php?i=" + ingredient)
            }
        }
        refresh()
    }, [category, area, ingredient]);

    const refreshRecipes = async (url: string) => {
        console.log(url)
        const recipeResponse = await axios.get(url);
        const recipeDict = recipeResponse.data.meals
        const recipes: Recipe[] = []
        for (const [i, meal] of recipeDict.entries()) {
            recipes.push(convertMealObject(meal))
        }

        setRecipeList(recipes)
    }

    const getRecipesFromApi = async () => {
        setCategory("")
        setArea("")
        setIngredient("")

        await refreshRecipes("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchString)

        const categoryResponse = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
        const categoryDict = categoryResponse.data.meals
        const categories = []
        for (const [i, category] of categoryDict.entries()) {
            categories.push({ label: category["strCategory"], value: category["strCategory"] })
        }

        setCategoryList(categories)

        const areaResponse = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
        const areaDict = areaResponse.data.meals
        const areas = []
        for (const [i, area] of areaDict.entries()) {
            areas.push({ label: area["strArea"], value: area["strArea"] })
        }

        setAreaList(areas)

        const ingredientResponse = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
        const ingredientDict = ingredientResponse.data.meals
        const ingredients = []
        for (const [i, ingredient] of ingredientDict.entries()) {
            ingredients.push({ label: ingredient["strIngredient"], value: ingredient["strIngredient"] })
        }

        setIngredientList(ingredients)
    };

    const suggestRecipes = async () => {

    }

    const RecipeItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.recipeItem} onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 5
                }}>
                    <Image
                        style={{ width: 96, height: 96, borderRadius: 10 }}
                        source={{
                            uri:
                            item.imageUrl !== ""
                                ? item.imageUrl
                                : "https://1000logos.net/wp-content/uploads/2021/04/Hogwarts-Logo-500x281.png",
                        }}
                        resizeMode="cover"
                    />
                    <View style={{width: "60%"}}>
                        <Text style={styles.recipeTitle}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 5
            }}>
                <TextInput
                    style={{...styles.inputStyle, width: "70%"}}
                    value={searchString}
                    onChangeText={setSearchString}
                    placeholder='Enter Recipe Name'
                    autoCorrect={false}
                    autoCapitalize='none'
                />

                <TouchableOpacity style={{...styles.btnStyle, width: "20%", height: 50}} onPress={getRecipesFromApi}>
                    <Text style={styles.btnText}>Search</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 5
            }}>
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={categoryList}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Category"
                    searchPlaceholder="Search..."
                    value={category}
                    onChange={item => {
                        setSearchString("");
                        setCategory(item.value);
                        setArea("");
                        setIngredient("");
                    }}
                />
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={areaList}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Area"
                    searchPlaceholder="Search..."
                    value={area}
                    onChange={item => {
                        setSearchString("");
                        setCategory("");
                        setArea(item.value);
                        setIngredient("");
                    }}
                />
                <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={ingredientList}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="Ingredient"
                    searchPlaceholder="Search..."
                    value={ingredient}
                    onChange={item => {
                        setSearchString("")
                        setCategory("");
                        setArea("");
                        setIngredient(item.value);
                    }}
                />
            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 5
            }}>
                <TouchableOpacity style={{...styles.btnStyle, width: "80%", height: 50}} onPress={getRecipesFromApi}>
                    <Text style={styles.btnText}>Suggest</Text>
                </TouchableOpacity>
            </View>
            
            <FlatList
                style={{ width: '100%' }}
                data={recipeList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <RecipeItem item={item} />} />
        </View>
    );
}

export default RecipeList;
