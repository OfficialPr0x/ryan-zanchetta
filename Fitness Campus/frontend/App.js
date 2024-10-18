import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import EventsScreen from './screens/EventsScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import ProfileScreen from './screens/ProfileScreen';
import TrainingScreen from './screens/TrainingScreen';
import ChatListScreen from './screens/ChatListScreen';
import ChatScreen from './screens/ChatScreen';
import GroupChatScreen from './screens/GroupChatScreen';
import VideoCallScreen from './screens/VideoCallScreen';
import StoriesScreen from './screens/StoriesScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Events" component={EventsScreen} />
          <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Training" component={TrainingScreen} />
          <Stack.Screen name="ChatList" component={ChatListScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="GroupChat" component={GroupChatScreen} />
          <Stack.Screen name="VideoCall" component={VideoCallScreen} />
          <Stack.Screen name="Stories" component={StoriesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
