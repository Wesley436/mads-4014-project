import { Text, View } from 'react-native';
import { styles } from '../style/CustomStyle';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { firebaseAuth, firebaseDB } from '../config/FirebaseConfig';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const OwnedIngredients: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {
    const [ingredients, setIngredients] = useState<DocumentData | null>(null);

    const getIngredients = async () => {
        const docSnap = await getDoc(doc(firebaseDB, 'ingredients', firebaseAuth.currentUser?.uid));
        if (docSnap.exists()) {
            setIngredients(docSnap.data());
        } else {
            console.log("No User Found!");
        }
    }

    useEffect(() => {
        getIngredients();
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
