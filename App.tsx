import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { queryClient, updateApiClient } from 'geo-survey-map-shared-modules';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/styles';

import { Map } from '@/screens/Map/Map';

updateApiClient.setBaseURL(process.env.EXPO_PUBLIC_API_URL || '');

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <StatusBar style='auto' />
        <Map />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
