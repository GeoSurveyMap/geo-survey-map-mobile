import { BlurView as RNBlurView } from 'expo-blur';
import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { hexToAlpha } from '@/utils/colors';
import { isIOS } from '@/utils/platform';

import type { BlurViewProps as RNBlurViewProps } from 'expo-blur';

type BlurViewProps = {
  fallbackColor?: string;
} & RNBlurViewProps;

export const BlurView: React.FC<BlurViewProps> = ({ fallbackColor, ...props }) => {
  const { theme } = useStyles();
  fallbackColor = fallbackColor || hexToAlpha(theme.background, 0.9);
  if (isIOS) {
    return <RNBlurView {...props} />;
  }

  return <View {...props} style={[props.style, { backgroundColor: fallbackColor }]} />;
};
