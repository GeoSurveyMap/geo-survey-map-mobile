import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { ButtonType, MapButton } from '@/components/RectButton/MapButton';

import { stylesheet } from './OverlayButtons.styles';

export const OverlayButtons: React.FC = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <SafeAreaView style={styles.container} pointerEvents={'box-none'}>
      <View style={styles.buttonRow}>
        <MapButton type={ButtonType.FILTER} />
        <MapButton type={ButtonType.LOGIN} />
      </View>
      <View style={[styles.buttonRow, styles.rowReversed]}>
        <MapButton type={ButtonType.LOCALIZE} />
      </View>
    </SafeAreaView>
  );
};
