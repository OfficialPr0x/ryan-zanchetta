import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const EventItem = ({ event, onJoin }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{event.name}</Title>
        <Paragraph>{event.location}</Paragraph>
        <Paragraph>{event.time}</Paragraph>
        <Paragraph>{event.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => onJoin(event.id)}>Join</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
});

export default EventItem;
