import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { BlurView } from '@/components/BlurView/BlurView';
import { isAndroid } from '@/utils/platform';

import { stylesheet } from './BlurInsets.styles';

import type { BlurViewProps } from 'expo-blur';

const SHARED_PROPS: BlurViewProps = {
  intensity: isAndroid ? 50 : 100,
  experimentalBlurMethod: isAndroid ? 'dimezisBlurView' : undefined,
};

export const BlurInsets: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const { styles } = useStyles(stylesheet);

  return <BlurView style={[styles.top, { height: top }]} {...SHARED_PROPS} />;
};
