import { Text, View } from 'react-native';
import { styles } from '../style/CustomStyle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import { firebaseAuth, firebaseDB } from '../config/FirebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const SavedRecipes: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
    const [savedRecipeIds, setSavedRecipeIds] = useState<DocumentData | null>(null);
    const [savedRecipes, setSavedRecipes] = useState<DocumentData | null>(null);

    useEffect(() => {
        const subscriber = onSnapshot(doc(firebaseDB, 'savedRecipes', firebaseAuth.currentUser?.uid), {
            next: (docSnap) => {
                setSavedRecipeIds(docSnap.data()["idMeals"]);
                // TODO: get recipes from API with ids, for loop may be required since search by id endpoint from API only allows one recipe at a time
                // www.themealdb.com/api/json/v1/1/lookup.php?i=52772
            }
        });

        return () => subscriber();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="sign-out" size={32} color="#FFF" onPress={() => {
                    firebaseAuth.signOut();
                }} />
            )
        })
    }, [navigation]);

    return (
        <View style={styles.container}>
            {
                (savedRecipes !== null) &&
                <View>
                    {/* TODO: List out saved recipes by user and allow delete, when clicked go to RecipeDetails */}
                </View>
            }
        </View>
    );
}

export default SavedRecipes;
