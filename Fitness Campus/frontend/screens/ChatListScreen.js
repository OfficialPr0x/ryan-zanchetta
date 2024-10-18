import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, FAB } from 'react-native-paper';
import { getChats } from '../utils/api';

export default function ChatListScreen({ navigation }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const fetchedChats = await getChats();
      setChats(fetchedChats);
    } catch (error) {
      console.error('Failed to fetch chats', error);
      // Show error message to user
    }
  };

  const renderChatItem = ({ item }) => (
    <List.Item
      title={item.name}
      description={item.lastMessage}
      left={props => <List.Icon {...props} icon="account" />}
      onPress={() => navigation.navigate('Chat', { chatId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={item => item.id.toString()}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateChat')}
      />
    </View>
  );
}

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
