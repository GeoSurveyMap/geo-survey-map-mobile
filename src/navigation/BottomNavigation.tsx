import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';

import { BottomTabBar } from '@/components/BottomTabBar/BottomTabBar';
import { Map } from '@/screens/Map/Map';
import { Profile } from '@/screens/Profile/Profile';

import MapIcon from '../../assets/map.svg';
import SettingsIcon from '../../assets/settings.svg';
import ProfileIcon from '../../assets/user.svg';

import { type BottomTabsParamList, ScreenName } from './navigation.types';

const Tab = createBottomTabNavigator<BottomTabsParamList>();

function BottomNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomTabBar {...props} />}>
      <Tab.Screen
        name={ScreenName.Profile}
        component={Profile}
        options={{
          tabBarIcon: ProfileIcon,
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
        component={View}
        options={{
          tabBarIcon: SettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
}

export { BottomNavigation };
