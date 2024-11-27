import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Map as MapIcon, Profile as ProfileIcon, Settings as SettingsIcon } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { BottomTabBar } from '@/components/BottomTabBar/BottomTabBar';
import { Map } from '@/screens/Map/Map';
import { Profile } from '@/screens/Profile/Profile';
import { Settings } from '@/screens/Settings/Settings';

import { ScreenName } from './navigation.types';

import type { BottomTabsParamList } from './navigation.types';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

function BottomNavigation() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
      initialRouteName={ScreenName.Map}
    >
      <Tab.Screen
        name={ScreenName.Profile}
        component={Profile}
        options={{
          tabBarIcon: (props) => <ProfileIcon {...props} />,
          title: t('profile'),
        }}
      />
      <Tab.Screen
        name={ScreenName.Map}
        component={Map}
        options={{
          tabBarIcon: (props) => <MapIcon {...props} />,
        }}
      />
      <Tab.Screen
        name={ScreenName.Settings}
        component={Settings}
        options={{
          tabBarIcon: (props) => <SettingsIcon {...props} />,
          title: t('settings.title'),
        }}
      />
    </Tab.Navigator>
  );
}

export { BottomNavigation };
