import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Title } from 'react-native-paper';
import EventItem from '../components/EventItem';
import MapView from '../components/MapView';
import { getEvents } from '../utils/api';

export default function EventsScreen() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Failed to fetch events', error);
      // Show error message to user
    }
  };

  return (
    <View style={styles.container}>
      <Title>Nearby Events</Title>
      <MapView events={events} style={styles.map} />
      <FlatList
        data={events}
        renderItem={({ item }) => <EventItem event={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  map: {
    height: 200,
    marginBottom: 16,
  },
});
