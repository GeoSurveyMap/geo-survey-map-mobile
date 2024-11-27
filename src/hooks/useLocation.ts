import * as Location from 'expo-location';
import { useState } from 'react';

export const useLocation = () => {
  const [isLocationLoading, setIsLoading] = useState(false);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === Location.PermissionStatus.GRANTED;
  };

  const getLocation = async () => {
    setIsLoading(true);
    try {
      const granted = await requestLocationPermission();
      if (granted) {
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });

        return location;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { getLocation, isLocationLoading };
};
