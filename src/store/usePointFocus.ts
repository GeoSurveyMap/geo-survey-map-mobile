import { create } from 'zustand';

import type { Survey } from 'geo-survey-map-shared-modules';

type PointFocusStore = {
  selectedPoint: Survey | null;
  setSelectedPoint: (point: Survey) => void;
  reset: () => void;
};

export const usePointFocusStore = create<PointFocusStore>((set) => ({
  selectedPoint: null,
  setSelectedPoint: (point) => set(() => ({ selectedPoint: point })),
  reset: () => set(() => ({ selectedPoint: null })),
}));
