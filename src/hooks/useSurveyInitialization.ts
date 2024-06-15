import { Dimensions } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';

import { useFormStore } from '@/store/useFormStore';
import { useMap } from '@/store/useMap';
import { Sheet } from '@/types/sheets';

import { useAuth } from './useAuth';

import type { Location } from 'geo-survey-map-shared-modules';

const SCREEN_HEIGHT = Dimensions.get('window').height;

// It calculates the offset for the latitude based on the screen size, knowing that the sheet takes 50% of the screen height,
// and the point should be in the center of top remaining area.
const calculateLatitudeOffset = (latitude: number) => {
  return latitude - (SCREEN_HEIGHT * 0.5) / 111000 / 2;
};

export const useSurveyFormInitialization = () => {
  const { isAuthenticated } = useAuth();
  const { setLocation, setLocationName } = useFormStore();
  const { mapRef } = useMap();

  const triggerFormSheet = async (location: Location) => {
    if (!isAuthenticated) {
      return SheetManager.show(Sheet.Login);
    }

    mapRef.current?.animateToRegion({
      latitude: calculateLatitudeOffset(location.x),
      longitude: location.y,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    setLocation(location);
    SheetManager.show(Sheet.Form, {
      payload: { location },
    });
    const locationName = await mapRef.current?.addressForCoordinate({ latitude: location.x, longitude: location.y });
    if (!locationName) return;
    setLocationName(locationName.name);
  };

  return { triggerFormSheet };
};
