import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import { queryClient, updateApiClient } from 'geo-survey-map-shared-modules';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { SheetProvider } from 'react-native-actions-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/styles';
import './src/libs/sheets';

import { i18n } from '@/libs/i18n';
import { RootStack } from '@/navigation/RootStack';

updateApiClient.setBaseURL(process.env.EXPO_PUBLIC_API_URL);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <SafeAreaProvider style={{ flex: 1 }}>
          <NavigationContainer>
            <SheetProvider>
              <StatusBar style='auto' />
              <RootStack />
            </SheetProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}
