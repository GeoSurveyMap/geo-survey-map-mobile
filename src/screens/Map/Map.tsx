import * as Location from 'expo-location';
import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { BlurInsets } from '@/screens/Map/components/BlurInsets/BlurInsets';

import { stylesheet } from './Map.styles';
import { MapContent } from './components/MapContent/MapContent';
import { OverlayButtons } from './components/OverlayButtons/OverlayButtons';

import type MapView from 'react-native-maps';

const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === Location.PermissionStatus.GRANTED;
};

export const Map: React.FC = () => {
  const { styles } = useStyles(stylesheet);
  const mapRef = useRef<MapView>(null);
  const [isUserFocused, setIsUserFocused] = useState(false);

  const handleUserFocus = async () => {
    const granted = await requestLocationPermission();
    if (granted) {
      const location = await Location.getCurrentPositionAsync();
      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setIsUserFocused(true);
    }
  };

  const handleUserUnfocused = () => {
    setIsUserFocused(false);
  };

  return (
    <View style={styles.container}>
      <BlurInsets />
      <MapContent mapRef={mapRef} onMapMove={handleUserUnfocused} />
      <OverlayButtons isUserFocused={isUserFocused} onUserFocus={handleUserFocus} />
    </View>
  );
};
