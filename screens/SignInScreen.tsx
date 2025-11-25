import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../style/CustomStyle';
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../config/FirebaseConfig';
import { Checkbox } from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen: React.FC<NativeStackScreenProps<any>> = ({ navigation }) => {

    const [userObject, setUserObject] = useState({
        email: '',
        password: '',
        error: ''
    });

    const [rememberMe, setRememberMe] = useState(false)

    useEffect(() => {
        const fetchValuesFormStorage = async () => {
            try {
                const emailValue = JSON.parse(await AsyncStorage.getItem('email'));
                const passwordValue = JSON.parse(await AsyncStorage.getItem('password'));
                setUserObject({
                    ...userObject,
                    email: emailValue !== null ? emailValue : '',
                    password: passwordValue !== null ? passwordValue : '',
                });
                
                setRememberMe(JSON.parse(await AsyncStorage.getItem('password')));
            } catch (error) {
                console.error('Error fetching checkValue or email:', error);
            }
        };
        fetchValuesFormStorage();
    }, []);

    const onSignIn = async () => {
        if (userObject.email === "" || userObject.password === "") {
            setUserObject({ ...userObject, error: 'Email and Password is mandatory!' });
            return;
        }

        try {
            await signInWithEmailAndPassword(firebaseAuth, userObject.email, userObject.password)
                .then(async (result) => {
                    if (rememberMe) {
                        await AsyncStorage.setItem('email', JSON.stringify(userObject.email));
                        await AsyncStorage.setItem('password', JSON.stringify(userObject.password));
                        await AsyncStorage.setItem('rememberMe', JSON.stringify(rememberMe));
                    } else {
                        await AsyncStorage.removeItem('email');
                        await AsyncStorage.removeItem('password');
                        await AsyncStorage.removeItem('rememberMe');
                    }
                    Alert.alert("SignIn Successful", `UserID: ${result.user.email}`);
                })
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
                placeholder='Enter email'
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

            <View style={styles.rememberMe}>
                <Checkbox style={styles.checkbox} value={rememberMe} onValueChange={setRememberMe}/>
                <Text>Remember me</Text>
            </View>

            {
                !!userObject.error &&
                <View style={{ marginVertical: 15 }}>
                    <Text style={styles.txtError}>{userObject.error}</Text>
                </View>
            }

            <TouchableOpacity style={styles.btnStyle} onPress={onSignIn}>
                <Text style={styles.btnText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.viewSeparator}>
                <View style={styles.itemSpearator} />

                <Text style={styles.itemText}>Don't have an account?</Text>

                <View style={styles.itemSpearator} />
            </View>

            <TouchableOpacity style={styles.btnStyle} onPress={() => {
                navigation.navigate("SignUpScreen");
            }}>
                <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SignInScreen;
