import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const trainingModules = [
  { id: '1', title: 'Beginner Yoga', duration: '4 weeks' },
  { id: '2', title: '5K Run Prep', duration: '8 weeks' },
  { id: '3', title: 'HIIT Cardio', duration: '6 weeks' },
];

const TrainingScreen = () => {
  const renderTrainingModule = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>Duration: {item.duration}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>Start</Button>
        <Button>Learn More</Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={trainingModules}
        renderItem={renderTrainingModule}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default TrainingScreen;
