import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { CategoryInfo } from '@/screens/CategoryInfo/CategoryInfo';
import { PointDetails } from '@/screens/PointDetails/PointDetails';

import { BottomNavigation } from './BottomNavigation';
import { ScreenName } from './navigation.types';

import type { RootStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={ScreenName.BottomNavigation} component={BottomNavigation} />
      <Stack.Screen
        name={ScreenName.CategoryInfo}
        component={CategoryInfo}
        options={() => ({
          presentation: 'fullScreenModal',
        })}
      />
      <Stack.Screen name={ScreenName.PointDetails} component={PointDetails} />
    </Stack.Navigator>
  );
}

export { RootStack };
