import { FlatList, Text, TouchableOpacity, View, TextInput, Image } from 'react-native';
import { styles } from '../style/CustomStyle';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { firebaseAuth } from '../config/FirebaseConfig';
import axios from "axios";
import { convertMealObject } from '../helper.js';

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
    const [searchString, setSearchString] = useState("");

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

    const getRecipesFromApi = async () => {
        const recipes: Recipe[] = []

        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchString);
        const meals = response.data.meals
        for (const [i, meal] of meals.entries()) {
            recipes.push(convertMealObject(meal))
        }

        setRecipeList(recipes)
    };

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
                    <View>
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
            
            <FlatList
                style={{ width: '100%' }}
                data={recipeList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <RecipeItem item={item} />} />
        </View>
    );
}

export default RecipeList;
