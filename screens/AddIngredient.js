import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../style/CustomStyle';
import { useState, useEffect } from 'react';
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { firebaseAuth, firebaseDB } from '../config/FirebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import axios from "axios";

const AddIngredient = ({ navigation }) => {
    const [ingredientList, setIngredientList] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState("");
    const [ingredient, setIngredient] = useState("");

    const addIngredient = async () => {
        if (ingredient === "") {
            Alert.alert("Error", "Please provide an ingredient");
            return;
        }

        const docSnap = await getDoc(doc(firebaseDB, 'ingredients', firebaseAuth.currentUser?.uid));
        if (docSnap.exists()) {
            let ownedIngredients = docSnap.data()["ingredients"];
            const ingredients = []
            if (ownedIngredients === undefined) {
                ingredients.push(ingredient)
            } else {
                ingredients.push(...ownedIngredients)
                ingredients.push(ingredient)
            }

            const updatedDoc = {ingredients: ingredients}

            await setDoc(doc(firebaseDB, 'ingredients', firebaseAuth.currentUser?.uid), updatedDoc);
            Alert.alert("Ingredient added.");
            setSelectedIngredient("")
            setIngredient("")
        } else {
            Alert.alert("Failed to add ingredient.");
        }
    }

    useEffect(() => {
        const getIngredientList = async () => {
            const ingredientResponse = await axios.get("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
            const ingredientDict = ingredientResponse.data.meals
            const ingredients = []
            for (const [i, ingredient] of ingredientDict.entries()) {
                ingredients.push({ label: ingredient["strIngredient"], value: ingredient["strIngredient"] })
            }

            setIngredientList(ingredients)
        }
        getIngredientList()
    }, [])

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
            <Dropdown
                style={{...styles.dropdown, width: "80%"}}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={ingredientList}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Ingredient"
                searchPlaceholder="Search..."
                value={selectedIngredient}
                onChange={item => {
                    setSelectedIngredient(item.value)
                    setIngredient(item.value);
                }}
            />
            <TextInput
                style={styles.inputStyle}
                value={ingredient}
                onChangeText={(text) => {
                    setIngredient(text)
                    setSelectedIngredient("")
                }}
                placeholder='Ingredient'
                keyboardType='default'
                autoCorrect={false}
                autoCapitalize='words'
            />

            <TouchableOpacity style={styles.btnStyle} onPress={addIngredient}>
                <Text style={styles.btnText}>Add Ingredient</Text>
            </TouchableOpacity>
        </View>
    );
}

export default AddIngredient;
