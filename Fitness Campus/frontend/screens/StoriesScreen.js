import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
import StoryItem from '../components/StoryItem';
import { getStories } from '../utils/api';

const StoriesScreen = ({ navigation }) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const fetchedStories = await getStories();
      setStories(fetchedStories);
    } catch (error) {
      console.error('Failed to fetch stories', error);
      // Show error message to user
    }
  };

  const handleStoryPress = (storyId) => {
    // Implement logic to view the story
    console.log('Viewing story:', storyId);
  };

  const renderStoryItem = ({ item }) => (
    <StoryItem story={item} onPress={handleStoryPress} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        renderItem={renderStoryItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateStory')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default StoriesScreen;
