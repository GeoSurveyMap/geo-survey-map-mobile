import { NavigationContainer } from '@react-navigation/native';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { setBackgroundColorAsync } from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { queryClient, updateApiClient } from 'geo-survey-map-shared-modules';
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SheetProvider } from 'react-native-actions-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './src/styles';
import './src/libs/sheets';

import { useStyles } from 'react-native-unistyles';

import { getInitialLanguage, i18n } from '@/libs/i18n';
import { queryClientPersister } from '@/libs/storage';
import { RootStack } from '@/navigation/RootStack';

updateApiClient.setBaseURL(process.env.EXPO_PUBLIC_API_URL);

export default function App() {
  const { theme } = useStyles();

  useEffect(() => {
    i18n.changeLanguage(getInitialLanguage());
  }, []);

  useEffect(() => {
    setBackgroundColorAsync(theme.background);
  }, [theme]);

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: queryClientPersister }}>
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
    </PersistQueryClientProvider>
  );
}
