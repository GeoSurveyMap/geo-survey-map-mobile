import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { CategoryInfo } from '@/screens/CategoryInfo/CategoryInfo';
import { Map } from '@/screens/Map/Map';
import { Profile } from '@/screens/Profile/Profile';

import { ScreenName } from './navigation.types';

import type { RootStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenName.Map} component={Map} />
      <Stack.Screen name={ScreenName.Profile} component={Profile} />
      <Stack.Screen
        name={ScreenName.CategoryInfo}
        component={CategoryInfo}
        options={() => ({
          presentation: 'fullScreenModal',
        })}
      />
    </Stack.Navigator>
  );
}

export { RootStack };
