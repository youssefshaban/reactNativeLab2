import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import React, {useState} from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, TouchableOpacity,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from "styled-components";

export default function App({navigation}) {

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const login = () => {
        axios.post('https://reqres.in/api/login',{
            username: username,
            password: password
        }).then(async (response) => {
            console.log(response.data.token);
            setToken(response.data.token);
            await AsyncStorage.setItem('name',JSON.stringify(name))
            Alert.alert(
                'Login successfully',
                `your token is ${response.data.token} \nDo you want navigate to your profile`,
                [{
                    text: 'cancel',
                    onPress: () => console.log('canceled')
                },
                    {
                    text: 'ok',
                    onPress: () => navigation.navigate('profile')
                }
                ]
            )
        }).catch(function (error) {
            alert(error);
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <HeaderText style={{fontSize: 30}}>Login page</HeaderText>
            <Input placeholder="profile name." placeholderTextColor="#003f5c"
                   onChangeText={(name) => setName(name)} />
            <Input placeholder="username." placeholderTextColor="#003f5c"
                       onChangeText={(username) => setUsername(username)} />
            <Input placeholder="Password." placeholderTextColor="#003f5c"
                       secureTextEntry={true} onChangeText={(password) => setPassword(password)} />
            <TouchableOpacity style={styles.loginBtn} onPress={login}>
                <Text>LOGIN</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#363a37',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBtn: {
        width:"80%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        backgroundColor:"#fff",
    },
});

const Input = styled.TextInput`
  font-family: poppins-regular;
  font-size: 20px;
  background-color: white;
  width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
`;

const HeaderText = styled.Text`
  color: white;
  font-family: poppins-bold;
  font-size: 20px;
  margin-bottom: 50px;
`;
