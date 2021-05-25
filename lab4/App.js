import React, {useState} from "react";
import {View, StatusBar, FlatList} from "react-native";
import styled from "styled-components";
import AddInput from "./Components/AddInput";
import TodoList from "./Components/TodoList";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Empty from "./Components/Empty";
import Header from "./Components/Header";
import login from './Components/login';
import Profile from "./Components/profile";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

const TodoStack = createStackNavigator();
const LoginStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const TodoStackScreen = ({navigation}) => {
    return (
        <TodoStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#1c1b1b'
            },
            headerTintColor: '#fff',
            headerTintStyle: {
                fontWeight: 'bold'
            }
        }}>
            <TodoStack.Screen name="To-Do list" component={todo} options={{
                headerLeft: () => (
                    <Icon.Button name='ios-menu' size={25} backgroundColor='#1c1b1b' onPress={() => navigation.openDrawer()}></Icon.Button>)
            }}/>
        </TodoStack.Navigator>
    )
}

const LoginStackScreen = ({navigation}) => {
    return (
        <LoginStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#1c1b1b'
            },
            headerTintColor: '#fff',
            headerTintStyle: {
                fontWeight: 'bold'
            }
        }}>
            <LoginStack.Screen name="Login" component={login} options={{
                headerLeft: () => (
                    <Icon.Button name='ios-menu' size={25} backgroundColor='#1c1b1b' onPress={() => navigation.openDrawer()}></Icon.Button>)
            }}/>
        </LoginStack.Navigator>
    )
}

const ProfileStackScreen = ({navigation}) => {
    return (
        <ProfileStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#1c1b1b'
            },
            headerTintColor: '#fff',
            headerTintStyle: {
                fontWeight: 'bold'
            }
        }}>
            <ProfileStack.Screen name="profile" component={Profile} options={{
                headerLeft: () => (
                    <Icon.Button name='ios-menu' size={25} backgroundColor='#1c1b1b' onPress={() => navigation.openDrawer()}></Icon.Button>)
            }}/>
        </ProfileStack.Navigator>
    )
}


const getFonts = () =>
    Font.loadAsync({
        "poppins-regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
        "poppins-bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
    });

const todo = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const [data, setData] = useState([]);

    const submitHandler = (value) => {
        setData((prevTodo) => {
            return [
                {
                    value: value,
                    key: Math.random().toString(),
                },
                ...prevTodo,
            ];
        });
    };

    const deleteItem = (key) => {
        setData((prevTodo) => {
            return prevTodo.filter((todo) => todo.key != key);
        });
    };

    if (fontsLoaded) {
        return (
            <ComponentContainer>
                <View>
                    <StatusBar barStyle="light-content" backgroundColor="#1c1b1b"/>
                </View>

                <View>
                    <FlatList
                        data={data}
                        ListHeaderComponent={() => <Header/>}
                        ListEmptyComponent={() => <Empty/>}
                        keyExtractor={(item) => item.key}
                        renderItem={({item}) => (
                            <TodoList item={item} deleteItem={deleteItem}/>
                        )}
                    />
                    <View>
                        <AddInput submitHandler={submitHandler}/>
                    </View>
                </View>
            </ComponentContainer>
        );
    } else {
        return (
            <AppLoading
                startAsync={getFonts}
                onFinish={() => {
                    setFontsLoaded(true);
                }}
                onError={console.warn}
            />
        );
    }
}

const App = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="todo" component={TodoStackScreen}/>
                <Drawer.Screen name="login" component={LoginStackScreen}/>
                <Drawer.Screen name="profile" component={ProfileStackScreen}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default App;

const ComponentContainer = styled.View`
  background-color: #363a37;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
