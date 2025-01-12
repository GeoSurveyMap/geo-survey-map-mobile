import { TextType } from 'geo-survey-map-shared-modules';
import { Map, Navigate } from 'geo-survey-map-shared-modules';
import React, { useCallback } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { BlurView } from '@/components/BlurView/BlurView';
import { useLocation } from '@/hooks/useLocation';
import { useMap } from '@/store/useMap';

import { GSMText } from '../GSMText/GSMText';

import { stylesheet } from './BottomTabBar.styles';

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { NavigationState } from '@react-navigation/native';
import type { EdgeInsets } from 'react-native-safe-area-context';

export const BottomTabBar: React.FC<BottomTabBarProps> = (props) => {
  const { state, insets } = props;
  const { styles } = useStyles(stylesheet);

  const renderTabs = useCallback(() => {
    return (
      <>
        <RouteTab
          route={state.routes[0]}
          index={0}
          {...props}
          key={`routeTab-${state.routes[0].key}`}
          insets={insets}
        />
        <MapRouteTab route={state.routes[1]} index={1} {...props} key={`routeTab-${state.routes[1].key}`} />
        <RouteTab
          route={state.routes[2]}
          index={2}
          {...props}
          key={`routeTab-${state.routes[2].key}`}
          insets={insets}
        />
      </>
    );
  }, [insets, props, state.routes]);

  return (
    <View style={styles.wrapper}>
      <BlurView style={[styles.navigator, { paddingBottom: Math.max(insets.bottom, 8) }]}>{renderTabs()}</BlurView>
    </View>
  );
};

interface RouteTabProps extends BottomTabBarProps {
  route: NavigationState['routes'][number];
  index: number;
  insets: EdgeInsets;
}

const RouteTab: React.FC<RouteTabProps> = ({ route, index, navigation, state, descriptors }) => {
  const { styles, theme } = useStyles(stylesheet);
  const { tabBarIcon, title } = descriptors[route.key].options;
  const isFocused = state.index === index;
  const color = isFocused ? theme.primary : theme.text;

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
    <TouchableOpacity onPress={onPress} style={styles.tab} key={route.key} activeOpacity={0.8}>
      {tabBarIcon?.({ color, focused: isFocused, size: 32 })}
      <GSMText textStyle={TextType.TOOLTIP} color={color}>
        {title}
      </GSMText>
    </TouchableOpacity>
  );
};

const MapRouteTab: React.FC<RouteTabProps> = ({ route, index, navigation, state }) => {
  const { styles, theme } = useStyles(stylesheet);
  const { mapRef } = useMap();
  const { getLocation, isLocationLoading } = useLocation();
  const isFocused = state.index === index;

  const handleUserFocus = async () => {
    const location = await getLocation();
    if (!location) return;
    mapRef.current?.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
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
      if (isLocationLoading) {
        return <ActivityIndicator color={theme.primary} size={32} />;
      }
      return <Navigate color={theme.primary} size={32} />;
    }

    return <Map color={theme.text} size={32} />;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.mapTab} key={route.key} activeOpacity={0.8}>
      {tabBarIcon()}
    </TouchableOpacity>
  );
};
