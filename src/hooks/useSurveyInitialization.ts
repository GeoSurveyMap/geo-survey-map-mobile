import { SheetManager } from 'react-native-actions-sheet';

import { useFormStore } from '@/store/useFormStore';
import { useMap } from '@/store/useMap';
import { Sheet } from '@/types/sheets';
import { SCREEN_HEIGHT } from '@/utils/platform';

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

    mapRef.current?.fitToCoordinates([{ latitude: location.x, longitude: location.y }], {
      edgePadding: { top: 0, right: 0, bottom: SCREEN_HEIGHT * 0.8, left: 0 },
      animated: true,
    });

    setLocation(location);
    SheetManager.show(Sheet.Form);
    const locationName = await mapRef.current?.addressForCoordinate({ latitude: location.x, longitude: location.y });
    if (!locationName) return;
    setLocationName(locationName.name);
  };

  return { triggerFormSheet };
};
