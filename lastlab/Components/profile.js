import React, {useState, useEffect} from 'react';
import {Button, Image, View, Platform, StyleSheet, TouchableOpacity, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

export default function Profile({navigation}) {
    const [image, setImage] = useState(null);
    const [index, setIndex] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
                let value = await AsyncStorage.getItem('name')
                console.log(JSON.parse(value))
                value != null ? setName(JSON.parse(value)) : null;
            });
    },[navigation])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1c1b1b'}}>
            <Text style={styles.HeaderText}>{name}</Text>
            {image && <Image source={{uri: image}} style={{width: 200, height: 200, margin: 5}}/>}
            <TouchableOpacity style={styles.loginBtn} onPress={pickImage}>
                <Text>Pick an image</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#fff",
    },HeaderText :{
        color: "white",
        fontSize: 40,
    }
})

