import { BlurView } from 'expo-blur';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { isAndroid } from '@/utils/platform';

import { stylesheet } from './BlurInsets.styles';

import type { BlurViewProps } from 'expo-blur';

const SHARED_PROPS: BlurViewProps = {
  intensity: isAndroid ? 50 : 100,
  experimentalBlurMethod: isAndroid ? 'dimezisBlurView' : undefined,
};

export const BlurInsets: React.FC = () => {
  const { top, bottom } = useSafeAreaInsets();
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container} pointerEvents='none'>
      <BlurView style={[styles.top, { height: top }]} {...SHARED_PROPS} />
      <BlurView style={[styles.bottom, { height: bottom }]} {...SHARED_PROPS} />
    </View>
  );
};
