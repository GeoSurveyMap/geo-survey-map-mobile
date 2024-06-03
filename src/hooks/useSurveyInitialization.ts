import { SheetManager } from 'react-native-actions-sheet';
import { create } from 'zustand';

import { Sheet } from '@/libs/sheets';
import { useMap } from '@/screens/Map/components/MapContent/MapContent';

import { useAuth } from './useAuth';

import type { Category, Location } from 'geo-survey-map-shared-modules';

type FormPoint = {
  location: Location | null;
  category: Category | undefined;
  setLocation: (location: Location | null) => void;
  setCategory: (category: Category | undefined) => void;
  reset: () => void;
};

export const useFormPoint = create<FormPoint>((set) => ({
  location: null,
  category: undefined,
  setLocation: (location) => set({ location }),
  setCategory: (category) => set({ category }),
  reset: () => set({ location: null, category: undefined }),
}));

export const useSurveyFormInitialization = () => {
  const { isAuthenticated } = useAuth();
  const { setLocation } = useFormPoint();
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
    return SheetManager.show(Sheet.Form, {
      payload: { location },
    });
  };

  return { triggerFormSheet };
};
