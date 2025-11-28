import { Text, View, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { styles } from '../style/CustomStyle';
import { firebaseAuth, firebaseDB } from '../config/FirebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const RecipeDetail = ({ route, navigation }) => {
    const { recipe } = route.params;

    const [ownedIngredients, setOwnedIngredients] = useState([]);
    const [missingIngredients, setMissingIngredients] = useState([]);

    useEffect(() => {
        loadOwnedIngredients();
    }, []);

    const loadOwnedIngredients = async () => {
        try {
            const uid = firebaseAuth.currentUser?.uid;
            if (!uid) return;

            const snap = await getDoc(doc(firebaseDB, "ingredients", uid));

            if (snap.exists()) {
                const userIngredients = snap.data().ingredients;
                setOwnedIngredients(userIngredients);

                // compare
                const missing = recipe.ingredients.filter(
                    ing => !userIngredients.includes(ing)
                );
                setMissingIngredients(missing);
            }
        } catch (err) {
            console.log("Error loading user ingredients:", err);
        }
    };

    const addFavourite = async () => {
        await setDoc(
            doc(firebaseDB, 'savedRecipes', firebaseAuth.currentUser?.uid, 'idMeals', recipe.id),
            { name: recipe.name, imageUrl: recipe.imageUrl }
        );
        Alert.alert("Added to favourite.");
    };

    return (
        <ScrollView style={{ flex: 1, padding: 16 }}>

            {/* IMAGE */}
            <Image
                source={{ uri: recipe.imageUrl }}
                style={{ width: '100%', height: 250, borderRadius: 12, marginBottom: 20 }}
                resizeMode="cover"
            />

            {/* NAME + BASIC INFO */}
            <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 10 }}>
                {recipe.name}
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>Category: {recipe.category}</Text>
            <Text style={{ fontSize: 16, marginBottom: 20 }}>Area: {recipe.area}</Text>

            {/* INGREDIENTS LIST */}
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>
                Ingredients
            </Text>

            {recipe.ingredients.map((ing, idx) => (
                <Text key={idx} style={{ fontSize: 16 }}>
                    • {ing} — {recipe.measures[idx]}
                </Text>
            ))}

            {/* MISSING INGREDIENTS */}
            {missingIngredients.length > 0 && (
                <>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: 'red' }}>
                        Missing Ingredients
                    </Text>
                    {missingIngredients.map((ing, idx) => (
                        <Text key={idx} style={{ fontSize: 16, color: 'red' }}>
                            ✘ {ing}
                        </Text>
                    ))}
                </>
            )}

            {/* INSTRUCTIONS */}
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>
                Instructions
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 22 }}>
                {recipe.instructions}
            </Text>

            {/* FAVOURITE BUTTON */}
            <TouchableOpacity style={{ ...styles.btnStyle, marginTop: 30 }} onPress={addFavourite}>
                <Text style={styles.btnText}>Add to favourite</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default RecipeDetail;

/*
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
*/