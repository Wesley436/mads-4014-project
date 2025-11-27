import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../style/CustomStyle';
import { firebaseAuth, firebaseDB } from '../config/FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';

const RecipeDetail = ({ route, navigation }) => {
    const { recipe } = route.params;

    useEffect(() => {
        console.log(recipe)
    }, []);

    const addFavourite = async () => {
        await setDoc(doc(firebaseDB, 'savedRecipes', firebaseAuth.currentUser?.uid, 'idMeals', recipe.id), { name: recipe.name, imageUrl: recipe.imageUrl });
        Alert.alert("Added to favourite.");
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{recipe.name}</Text>
            <TouchableOpacity style={styles.btnStyle} onPress={addFavourite}>
                <Text style={styles.btnText}>Add to favourite</Text>
            </TouchableOpacity>
        </View>
    );
}

export default RecipeDetail;
