/*
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/


// Import the screens
import Main from './components/Main';
import Chat from './components/Chat';
// Import React Navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// Create the navigator
const RootStack = createStackNavigator({
  Main,
  Chat,
});
const navigator = createAppContainer(RootStack);
// Export it as the root component
export default navigator;