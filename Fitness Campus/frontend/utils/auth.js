import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

const TOKEN_KEY = 'fitness_campus_token';

export const login = async (username, password) => {
  const response = await api.post('/login', { username, password });
  await AsyncStorage.setItem(TOKEN_KEY, response.data.access_token);
  return response.data;
};

export const register = async (username, password) => {
  const response = await api.post('/register', { username, password });
  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);
};

export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

export const isAuthenticated = async () => {
  const token = await getToken();
  return !!token;
};
