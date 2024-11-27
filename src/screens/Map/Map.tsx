import * as Location from 'expo-location';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { type MapScreenProps, ScreenName } from '@/navigation/navigation.types';
import { BlurInsets } from '@/screens/Map/components/BlurInsets/BlurInsets';
import { useMap } from '@/store/useMap';

import { stylesheet } from './Map.styles';
import { MapContent } from './components/MapContent/MapContent';
import { OverlayButtons } from './components/OverlayButtons/OverlayButtons';

const requestLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status === Location.PermissionStatus.GRANTED;
};

export const Map: React.FC<MapScreenProps> = ({ navigation }) => {
  const { styles } = useStyles(stylesheet);
  const { mapRef } = useMap();
  const [isUserFocused, setIsUserFocused] = useState(false);

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

  const handleUserUnfocused = () => {
    setIsUserFocused(false);
  };

  const handleOpenProfile = () => {
    navigation.navigate(ScreenName.Profile);
  };

  return (
    <View style={styles.container}>
      <BlurInsets />
      <MapContent onMapMove={handleUserUnfocused} />
      <OverlayButtons isUserFocused={isUserFocused} onUserFocus={handleUserFocus} onOpenProfile={handleOpenProfile} />
    </View>
  );
};
