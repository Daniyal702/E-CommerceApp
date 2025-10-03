/**
 * @format
 */
//@ts-ignore-error

import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  useEffect(() => {
    loadUser();
  }, []);
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const users = [
    {
      id: 1,
      username: 'admin',
      password: '123456',
    },
    {
      id: 2,
      username: 'user1',
      password: 'adcdef',
    },
    {
      id: 3,
      username: 'user2',
      password: '654987',
    },
  ];

  const login = (username, password) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username && users[i].password === password) {
        const user = { username: username, password: password };
        AsyncStorage.setItem('user', JSON.stringify(user));
        console.log(user);
        navigation.navigate('ProductList');
        return;
      }
    }
    Alert.alert('Login failed');
  };

  const loadUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        console.log(user);
        navigation.navigate('ProductList');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[style.container, { width: width, height: height }]}>
      <Icon name="person-outline" size={100} color="black" />
      <Text style={style.text}>Username</Text>
      <TextInput
        placeholder="Enter your username"
        style={style.input}
        onChangeText={setUsername}
      />
      <Text style={style.text}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        style={style.input}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={style.button}
        onPress={() => {
          login(username, password);
        }}
      >
        <Text style={style.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    height: 40,
    borderRadius: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default LoginScreen;
