import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { createEvent } from '../utils/api';

const CreateEventScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateEvent = async () => {
    try {
      await createEvent({ name, location, time, description });
      navigation.goBack();
    } catch (error) {
      console.error('Failed to create event', error);
      // Show error message to user
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Event Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        label="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />
      <TextInput
        label="Time"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />
      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={styles.input}
      />
      <Button mode="contained" onPress={handleCreateEvent}>
        Create Event
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 12,
  },
});

export default CreateEventScreen;
