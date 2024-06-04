import { SheetManager } from 'react-native-actions-sheet';

import { Sheet } from '@/libs/sheets';
import { useFormStore } from '@/store/useFormStore';
import { useMap } from '@/store/useMap';

import { useAuth } from './useAuth';

import type { Location } from 'geo-survey-map-shared-modules';

export const useSurveyFormInitialization = () => {
  const { isAuthenticated } = useAuth();
  const { setLocation, setLocationName } = useFormStore();
  const { mapRef } = useMap();

  const triggerFormSheet = async (location: Location) => {
    if (!isAuthenticated) {
      return SheetManager.show(Sheet.Login);
    }

    mapRef.current?.animateToRegion({
      latitude: location.x - 0.005,
      longitude: location.y,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
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
