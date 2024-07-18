import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Icon name="camera" size={30} color="#fff" />
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: '#888',
    padding: 10,
    borderRadius: 10,
  },
});
