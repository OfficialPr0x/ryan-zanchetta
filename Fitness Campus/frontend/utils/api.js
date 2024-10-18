import axios from 'axios';
import { getToken } from './auth';

const API_URL = 'http://your-flask-api-url';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await api.post('/events', eventData);
  return response.data;
};

export const getChats = async () => {
  const response = await api.get('/chats');
  return response.data;
};

export const getChatMessages = async (chatId) => {
  const response = await api.get(`/chats/${chatId}/messages`);
  return response.data;
};

export const sendMessage = async (chatId, message) => {
  const response = await api.post(`/chats/${chatId}/messages`, { message });
  return response.data;
};

// Add more API functions as needed

export default api;
