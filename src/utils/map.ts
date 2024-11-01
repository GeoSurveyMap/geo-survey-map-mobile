import { Dimensions } from 'react-native';

import type { Region } from 'react-native-maps';

const SCREEN_HEIGHT = Dimensions.get('window').height;

// It calculates the offset for the latitude based on the screen size, knowing that the sheet takes 50% of the screen height,
// and the point should be in the center of top remaining area.
export const calculateLatitudeOffset = (latitude: number, delta: number = 111000) => {
  return latitude - (SCREEN_HEIGHT * 0.5) / delta / 2;
};

export const calculateBoundingBox = (region: Region) => {
  const minX = region.latitude - region.latitudeDelta / 2;
  const maxX = region.latitude + region.latitudeDelta / 2;
  const minY = region.longitude - region.longitudeDelta / 2;
  const maxY = region.longitude + region.longitudeDelta / 2;

  return {
    minX,
    maxX,
    minY,
    maxY,
  };
};
