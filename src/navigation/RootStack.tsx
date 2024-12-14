import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { useOnboarding } from '@/hooks/useOnboarding';
import { CategoryInfo } from '@/screens/CategoryInfo/CategoryInfo';
import { Onboarding } from '@/screens/Onboarding/Onboarding';
import { PointDetails } from '@/screens/PointDetails/PointDetails';

import { BottomNavigation } from './BottomNavigation';
import { ScreenName } from './navigation.types';

import type { RootStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  const { isOnboarded } = useOnboarding();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={!isOnboarded ? ScreenName.BottomNavigation : ScreenName.Onboarding}
    >
      <Stack.Screen name={ScreenName.Onboarding} component={Onboarding} />
      <Stack.Screen
        name={ScreenName.BottomNavigation}
        component={BottomNavigation}
        options={{ animationTypeForReplace: 'pop' }}
      />
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
