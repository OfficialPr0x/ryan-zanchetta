import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Title>Welcome to Fitness Campus</Title>
      <Button mode="contained" onPress={() => navigation.navigate('Events')} style={styles.button}>
        View Events
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('CreateEvent')} style={styles.button}>
        Create Event
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('Training')} style={styles.button}>
        Training Modules
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('Profile')} style={styles.button}>
        My Profile
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('ChatList')} style={styles.button}>
        Chats
      </Button>
      <Button mode="contained" onPress={() => navigation.navigate('Stories')} style={styles.button}>
        Stories
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
  button: {
    marginVertical: 8,
  },
});
