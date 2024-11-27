import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { BottomTabBar } from '@/components/BottomTabBar/BottomTabBar';
import { Map } from '@/screens/Map/Map';
import { Profile } from '@/screens/Profile/Profile';
import { Settings } from '@/screens/Settings/Settings';

import MapIcon from '../../assets/map.svg';
import SettingsIcon from '../../assets/settings.svg';
import ProfileIcon from '../../assets/user.svg';

import { type BottomTabsParamList, ScreenName } from './navigation.types';

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
          tabBarIcon: ProfileIcon,
          title: t('profile'),
        }}
      />
      <Tab.Screen
        name={ScreenName.Map}
        component={Map}
        options={{
          tabBarIcon: MapIcon,
        }}
      />
      <Tab.Screen
        name={ScreenName.Settings}
        component={Settings}
        options={{
          tabBarIcon: SettingsIcon,
          title: 'Settings', // TODO: translate
        }}
      />
    </Tab.Navigator>
  );
}

export { BottomNavigation };
