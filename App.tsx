import { StatusBar } from 'expo-status-bar';
import { HELLO_WORLD } from 'geo-survey-map-shared-modules';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <View style={styles.container}>
      <Text>{HELLO_WORLD}</Text>
      <StatusBar style="auto" />
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
