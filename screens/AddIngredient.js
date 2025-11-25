import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../style/CustomStyle';
import { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firebaseAuth, firebaseDB } from '../config/FirebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const AddIngredient = ({ navigation }) => {
    const [ingredientName, setIngredientName] = useState("");

    const addIngredient = async () => {
        if (ingredientName === "") {
            Alert.alert("Error", "Please provide an ingredient");
            return;
        }

        try {
            const collectionRef = collection(firebaseDB, 'ingredients', firebaseAuth.currentUser?.uid);

            // TODO: add ingredients to user's ingredients array
        } catch (error) {
            console.log(error);
        }
    }

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
            <TextInput
                style={styles.inputStyle}
                value={ingredientName}
                onChangeText={setIngredientName}
                placeholder='Ingredient Name'
                keyboardType='default'
                autoCorrect={false}
                autoCapitalize='words'
            />

            {/* TODO: OR dropdwon selection with searching with ingredients from https://www.themealdb.com/api/json/v1/1/list.php?i=list ? */}

            <TouchableOpacity style={styles.btnStyle} onPress={addIngredient}>
                <Text style={styles.btnText}>Add Ingredient</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddIngredient;
