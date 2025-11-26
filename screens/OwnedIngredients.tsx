import { Text, View } from 'react-native';
import { styles } from '../style/CustomStyle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import { firebaseAuth, firebaseDB } from '../config/FirebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const OwnedIngredients: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
    const [ingredients, setIngredients] = useState<DocumentData | null>(null);

    useEffect(() => {
        const subscriber = onSnapshot(doc(firebaseDB, 'ingredients', firebaseAuth.currentUser?.uid), {
            next: (docSnap) => {
                setIngredients(docSnap.data()["ingredients"]);
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
                (ingredients !== null) &&
                <View>
                    {/* TODO: List out ingredients owned by user and allow delete */}
                </View>
            }
        </View>
    );
}

export default OwnedIngredients;
