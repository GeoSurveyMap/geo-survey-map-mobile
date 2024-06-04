import React from 'react';
import { create } from 'zustand';

import type MapView from 'react-native-maps';

type MapStore = {
  mapRef: React.RefObject<MapView>;
};

export const useMap = create<MapStore>(() => ({
  mapRef: React.createRef<MapView>(),
}));
