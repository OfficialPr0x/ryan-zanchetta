import React from 'react';
import { List } from 'react-native-paper';

const ChatItem = ({ chat, onPress }) => {
  return (
    <List.Item
      title={chat.name}
      description={chat.lastMessage}
      left={(props) => <List.Icon {...props} icon="chat" />}
      onPress={() => onPress(chat.id)}
    />
  );
};

export default ChatItem;
