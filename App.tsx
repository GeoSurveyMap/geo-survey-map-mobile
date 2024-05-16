import { StatusBar } from 'expo-status-bar';
import { updateApiClient } from 'geo-survey-map-shared-modules';
import React from 'react';
import { StyleSheet, View } from 'react-native';

updateApiClient.setBaseURL(process.env.EXPO_PUBLIC_API_URL || '');

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <View style={styles.container}>
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
