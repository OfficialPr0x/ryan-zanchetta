import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { getChatMessages, sendMessage } from '../utils/api';

export default function ChatScreen({ route }) {
  const { chatId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const fetchedMessages = await getChatMessages(chatId);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Failed to fetch messages', error);
      // Show error message to user
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    try {
      await sendMessage(chatId, newMessage);
      setNewMessage('');
      fetchMessages(); // Refresh messages after sending
    } catch (error) {
      console.error('Failed to send message', error);
      // Show error message to user
    }
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id.toString()}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <IconButton
          icon="send"
          size={24}
          onPress={handleSendMessage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
});
