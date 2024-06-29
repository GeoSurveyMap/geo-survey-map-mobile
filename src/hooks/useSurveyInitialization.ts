import { SheetManager } from 'react-native-actions-sheet';

import { useFormStore } from '@/store/useFormStore';
import { useMap } from '@/store/useMap';
import { Sheet } from '@/types/sheets';
import { calculateLatitudeOffset } from '@/utils/map';

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
      latitude: calculateLatitudeOffset(location.x),
      longitude: location.y,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    setLocation(location);
    SheetManager.show(Sheet.Form);
    const locationName = await mapRef.current?.addressForCoordinate({ latitude: location.x, longitude: location.y });
    if (!locationName) return;
    setLocationName(locationName.name);
  };

  return { triggerFormSheet };
};
