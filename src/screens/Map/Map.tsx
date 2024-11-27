import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { type MapScreenProps } from '@/navigation/navigation.types';
import { BlurInsets } from '@/screens/Map/components/BlurInsets/BlurInsets';

import { stylesheet } from './Map.styles';
import { MapContent } from './components/MapContent/MapContent';
import { OverlayButtons } from './components/OverlayButtons/OverlayButtons';

export const Map: React.FC<MapScreenProps> = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <BlurInsets />
      <MapContent />
      <OverlayButtons />
    </View>
  );
};
