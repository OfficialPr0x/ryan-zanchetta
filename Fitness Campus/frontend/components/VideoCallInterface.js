import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const VideoCallInterface = ({ onEndCall }) => {
  return (
    <View style={styles.container}>
      <View style={styles.remoteVideo} />
      <View style={styles.localVideo} />
      <Button mode="contained" onPress={onEndCall} style={styles.endCallButton}>
        End Call
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  remoteVideo: {
    flex: 1,
  },
  localVideo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 100,
    height: 150,
    backgroundColor: 'gray',
  },
  endCallButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default VideoCallInterface;
