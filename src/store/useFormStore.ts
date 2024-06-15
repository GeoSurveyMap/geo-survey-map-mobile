import { create } from 'zustand';

import type { Category, Location } from 'geo-survey-map-shared-modules';

type FormStore = {
  location: Location | null;
  category: Category | undefined;
  radius: number | undefined;
  photoUri: string | undefined;
  locationName: string;
  problemDescription: string;

  setLocation: (location: Location | null) => void;
  setCategory: (category: Category | undefined) => void;
  setRadius: (radius: number | undefined) => void;
  setPhotoUri: (photoUri: string | undefined) => void;
  setLocationName: (locationName: string) => void;
  setProblemDescription: (problemDescription: string) => void;
  reset: () => void;
};

export const useFormStore = create<FormStore>((set) => ({
  location: null,
  category: undefined,
  radius: 0,
  photoUri: undefined,
  locationName: '',
  problemDescription: '',

  setLocation: (location) => set({ location }),
  setCategory: (category) => set({ category }),
  setRadius: (radius) => set({ radius }),
  setPhotoUri: (photoUri) => set({ photoUri }),
  setLocationName: (locationName) => set({ locationName }),
  setProblemDescription: (problemDescription) => set({ problemDescription }),
  reset: () =>
    set({
      location: null,
      category: undefined,
      radius: 0,
      photoUri: undefined,
      locationName: '',
      problemDescription: '',
    }),
}));
