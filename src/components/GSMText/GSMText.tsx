/* eslint-disable react/forbid-elements */
import { TextType } from 'geo-survey-map-shared-modules';
import React, { memo } from 'react';
import { Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { appTypography } from '@/styles/typography';

import type { TextProps } from 'react-native';

interface Props extends TextProps {
  textStyle?: TextType;
  color?: string;
}

/**
 * Custom text component with different styles, that exends `Text` component.
 * @param textStyle - Text style. See `TextType` enum.
 * @returns React element.
 */
export const GSMText = memo<Props>(({ textStyle = TextType.P, color, style, ...rest }) => {
  const { theme } = useStyles();
  return <Text style={[appTypography[textStyle], { color: color || theme.text }, style]} {...rest} />;
});

GSMText.displayName = 'GSMText';
