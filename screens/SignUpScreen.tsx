import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../style/CustomStyle';
import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth, firebaseDB } from '../config/FirebaseConfig';

const SignUpScreen: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {

    const [userObject, setUserObject] = useState({
        email: '',
        password: '',
        error: ''
    });

    const onSignUp = async () => {
        if (userObject.email === "" || userObject.password === "") {
            setUserObject({ ...userObject, error: 'Email and Password is mandatory!' });
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, userObject.email, userObject.password);
            console.log(`User Created Successfully: ${userCredential.user.uid}`);
        } catch (error) {
            console.log(error);
            setUserObject({ ...userObject, error: `${error.message}` });
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputStyle}
                value={userObject.email}
                onChangeText={(text) => setUserObject({ ...userObject, email: text })}
                placeholder='Enter email (e.g: name@gbc.com)'
                keyboardType='email-address'
                autoCorrect={false}
                autoCapitalize='none'
            />

            <TextInput
                style={styles.inputStyle}
                value={userObject.password}
                onChangeText={(text) => setUserObject({ ...userObject, password: text })}
                placeholder='Enter password'
                keyboardType='default'
                secureTextEntry={true}
                autoCorrect={false}
                autoCapitalize='none'
                maxLength={15}
            />

            {
                !!userObject.error &&
                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.txtError}>{userObject.error}</Text>
                </View>
            }

            <TouchableOpacity style={styles.btnStyle} onPress={onSignUp}>
                <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SignUpScreen;
