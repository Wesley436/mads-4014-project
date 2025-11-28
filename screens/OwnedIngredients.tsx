import { Text, View, TouchableOpacity, Alert, FlatList } from 'react-native';
import { styles } from '../style/CustomStyle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseDB } from '../config/FirebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const OwnedIngredients: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const subscriber = onSnapshot(doc(firebaseDB, 'ingredients', firebaseAuth.currentUser?.uid), {
            next: (docSnap) => {
                if (docSnap.data()["ingredients"]) {
                    const temp = []
                    for (const [i, ingredient] of docSnap.data()["ingredients"].entries()) {
                        temp.push({id: i, name: ingredient})
                    }
                    setIngredients(temp);
                }
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

    const IngredientItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.recipeItem}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 5
                }}>
                    <View>
                        <Text style={styles.recipeTitle}>{item.name}</Text>
                    </View>
                    <TouchableOpacity style={styles.btnStyle} onPress={async () => await removeIngredient(item)}>
                        <Text style={styles.btnText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        )
    }

    const removeIngredient = async (item) => {
        const remainingIngredients: {id: string, name: string}[] = ingredients.filter(ingredient => ingredient.name !== item.name)
        setIngredients(remainingIngredients)

        const temp = []
        remainingIngredients.forEach((ingredient) => {
             temp.push(ingredient.name)
        });

        console.log(temp)
        await setDoc(doc(firebaseDB, 'ingredients', firebaseAuth.currentUser?.uid), { ingredients: temp });
    }

    return (
        <View style={styles.container}>
            {
                ingredients.length === 0
                ?
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>No ingredient found</Text>
                :
                    <FlatList
                        style={{ width: '100%' }}
                        data={ingredients}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <IngredientItem item={item} navigation={navigation}/>}
                    />
            }
        </View>
    );
}

export default OwnedIngredients;
