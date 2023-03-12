import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';
import { StyleSheet, Text, View } from 'react-native';

import { Routes } from './src/routes/Routes';

import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
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
