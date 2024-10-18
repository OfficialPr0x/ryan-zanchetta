import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Paragraph, Button } from 'react-native-paper';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Avatar.Image size={120} source={{ uri: 'https://example.com/avatar.jpg' }} />
      <Title style={styles.name}>John Doe</Title>
      <Paragraph style={styles.bio}>Fitness enthusiast and software developer</Paragraph>
      <Button mode="outlined" style={styles.editButton}>
        Edit Profile
      </Button>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Title>10</Title>
          <Paragraph>Events</Paragraph>
        </View>
        <View style={styles.statItem}>
          <Title>150</Title>
          <Paragraph>Friends</Paragraph>
        </View>
        <View style={styles.statItem}>
          <Title>300</Title>
          <Paragraph>Points</Paragraph>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  name: {
    marginTop: 16,
    fontSize: 24,
  },
  bio: {
    marginTop: 8,
    textAlign: 'center',
  },
  editButton: {
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 32,
  },
  statItem: {
    alignItems: 'center',
  },
});

export default ProfileScreen;
