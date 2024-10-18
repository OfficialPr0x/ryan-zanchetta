import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://your-flask-api-url';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      // Store the token securely (e.g., using AsyncStorage or a more secure method)
      console.log('Login successful', response.data);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Login failed', error);
      // Show error message to user
    }
  };

  return (
    <View style={styles.container}>
      <Title>Login to Fitness Campus</Title>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate('Register')}>
        Don't have an account? Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
});
