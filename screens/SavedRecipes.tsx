import { Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { styles } from '../style/CustomStyle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { firebaseAuth, firebaseDB } from '../config/FirebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import axios from 'axios';
import { convertMealObject } from '../helper';

const SavedRecipes: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
    const [savedRecipes, setSavedRecipes] = useState([]);

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
        const subscriber = onSnapshot(collection(firebaseDB, 'savedRecipes', firebaseAuth.currentUser?.uid, 'idMeals'), {
            next: async (snapshot) => {
                const recipes = []
                snapshot.docs.forEach(async (doc) => {
                    const recipe = {id: doc.id, name: doc.data().name, imageUrl: doc.data().imageUrl};
                    recipes.push(recipe);

                    setSavedRecipes(recipes);
                });
            }
        });

        return () => subscriber();
    }, []);

    const removeFavourite = async (item) => {
        await deleteDoc(doc(firebaseDB, 'savedRecipes', firebaseAuth.currentUser?.uid, 'idMeals', item.id));
        setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== item.id) )
    }

    const navigateToDetails = async (item) => {
        const recipeResponse = await axios.get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + item.id);
        const mealObject = recipeResponse.data.meals[0]
        const recipe = convertMealObject(mealObject)
        navigation.navigate("RecipeDetail", { recipe: recipe })
    }

    const RecipeItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.recipeItem} onPress={() => navigateToDetails(item)}>
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
                                : "",
                        }}
                        resizeMode="cover"
                    />
                    <View style={{width: "40%"}}>
                        <Text style={styles.recipeTitle}>{item.name}</Text>
                    </View>
                    <TouchableOpacity style={{...styles.btnStyle, width: "20%"}} onPress={() => removeFavourite(item)}>
                        <Text style={styles.btnText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            {
                (savedRecipes !== null) &&
                <FlatList
                    style={{ width: '100%' }}
                    data={savedRecipes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => <RecipeItem item={item} />}
                />
            }
        </View>
    );
}

export default SavedRecipes;
