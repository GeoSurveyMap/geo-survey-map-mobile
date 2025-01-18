import { create } from 'zustand';

import type { ImagePickerAsset } from 'expo-image-picker';
import type { Category, Location } from 'geo-survey-map-shared-modules';

type FormStore = {
  location: Location | null;
  category: Category | undefined;
  radius: number | undefined;
  photoAsset: ImagePickerAsset | undefined;
  locationName: string;
  problemDescription: string;
  problemSolution: string;

  setLocation: (location: Location | null) => void;
  setCategory: (category: Category | undefined) => void;
  setRadius: (radius: number | undefined) => void;
  setPhotoAsset: (photoAsset: ImagePickerAsset | undefined) => void;
  setLocationName: (locationName: string) => void;
  setProblemDescription: (problemDescription: string) => void;
  setProblemSolution: (problemSolution: string) => void;
  reset: () => void;
};

export const useFormStore = create<FormStore>((set) => ({
  location: null,
  category: undefined,
  radius: 0,
  photoAsset: undefined,
  locationName: '',
  problemDescription: '',
  problemSolution: '',

  setLocation: (location) => set({ location }),
  setCategory: (category) => set({ category }),
  setRadius: (radius) => set({ radius }),
  setPhotoAsset: (photoAsset) => set({ photoAsset }),
  setLocationName: (locationName) => set({ locationName }),
  setProblemDescription: (problemDescription) => set({ problemDescription }),
  setProblemSolution: (problemSolution) => set({ problemSolution }),
  reset: () =>
    set({
      location: null,
      category: undefined,
      radius: 0,
      photoAsset: undefined,
      locationName: '',
      problemDescription: '',
      problemSolution: '',
    }),
}));
