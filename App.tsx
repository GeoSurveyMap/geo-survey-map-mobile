import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { queryClient, updateApiClient } from 'geo-survey-map-shared-modules';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/styles';
import './src/libs/sheets';

import { i18n } from '@/libs/i18n';
import { Map } from '@/screens/Map/Map';

updateApiClient.setBaseURL(process.env.EXPO_PUBLIC_API_URL);

// eslint-disable-next-line import/no-default-export
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider style={{ flex: 1 }}>
            <SheetProvider>
              <StatusBar style='auto' />
              <Map />
            </SheetProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </I18nextProvider>
    </QueryClientProvider>
  );
}
