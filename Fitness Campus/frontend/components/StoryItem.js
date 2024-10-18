import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

const StoryItem = ({ story, onPress }) => {
  return (
    <View style={styles.container} onPress={() => onPress(story.id)}>
      <Avatar.Image size={60} source={{ uri: story.userAvatar }} />
      <Text style={styles.username}>{story.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 15,
  },
  username: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default StoryItem;
