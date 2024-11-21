import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { TextType } from 'geo-survey-map-shared-modules';
import { icons } from 'geo-survey-map-shared-modules';
import React, { useCallback, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { useMap } from '@/store/useMap';
import { hexToAlpha } from '@/utils/colors';

import MapIcon from '../../../assets/map.svg';
import { GSMText } from '../GSMText/GSMText';

import { stylesheet } from './BottomTabBar.styles';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { NavigationState } from '@react-navigation/native';
const { Navigate } = icons;

export const BottomTabBar: React.FC<BottomTabBarProps> = (props) => {
  const { state, insets } = props;
  const { styles, theme } = useStyles(stylesheet);

  const renderTabs = useCallback(() => {
    return (
      <>
        <RouteTab route={state.routes[0]} index={0} {...props} key={`routeTab-${state.routes[0].key}`} />
        <MapRouteTab route={state.routes[1]} index={1} {...props} key={`routeTab-${state.routes[1].key}`} />
        <RouteTab route={state.routes[2]} index={2} {...props} key={`routeTab-${state.routes[2].key}`} />
      </>
    );
  }, [props, state.routes]);

  return (
    <View style={[styles.wrapper]}>
      <LinearGradient colors={[hexToAlpha(theme.background, 0), theme.background]} style={styles.gradient} />
      <BlurView style={[styles.navigator, { bottom: insets.bottom }]}>{renderTabs()}</BlurView>
    </View>
  );
};

interface RouteTabProps extends BottomTabBarProps {
  route: NavigationState['routes'][number];
  index: number;
}

const RouteTab: React.FC<RouteTabProps> = ({ route, index, navigation, state, descriptors }) => {
  const { styles, theme } = useStyles(stylesheet);
  const { tabBarIcon } = descriptors[route.key].options;
  const isFocused = state.index === index;
  const color = isFocused ? theme.primary : theme.textFaded;

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.tab]} key={route.key} activeOpacity={0.8}>
      {tabBarIcon?.({ color, focused: isFocused, size: 32 })}
    </TouchableOpacity>
  );
};

const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === Location.PermissionStatus.GRANTED;
};

const MapRouteTab: React.FC<RouteTabProps> = ({ route, index, navigation, state }) => {
  const { styles, theme } = useStyles(stylesheet);
  const { mapRef } = useMap();
  const [isUserFocused, setIsUserFocused] = useState(false);
  const isFocused = state.index === index;
  const color = isFocused ? theme.primary : theme.textFaded;

  const handleUserFocus = async () => {
    const granted = await requestLocationPermission();
    if (granted) {
      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      setIsUserFocused(true);
    }
  };

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    } else {
      handleUserFocus();
    }
  };

  const tabBarIcon = () => {
    if (isFocused) {
      return <Navigate color={theme.primary} size={32} />;
    }

    return <MapIcon color={'#ffffff'} size={32} />;
  };

  return (
    <View style={styles.mapTabWrapper}>
      <TouchableOpacity onPress={onPress} style={[styles.mapTab]} key={route.key} activeOpacity={0.8}>
        {tabBarIcon()}
      </TouchableOpacity>
    </View>
  );
};
