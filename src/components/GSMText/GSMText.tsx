/* eslint-disable react/forbid-elements */
import { TextType } from 'geo-survey-map-shared-modules';
import React, { memo } from 'react';
import { Text } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { appTypography } from '@/styles/typography';

import type { TextProps } from 'react-native';

interface Props extends TextProps {
  textStyle: TextType;
}

/**
 * Custom text component for Metis, with different styles. It exends `Text` component.
 * @param textStyle - Text style. See `TextType` enum.
 * @returns React element.
 */
export const GSMText = memo<Props>(({ textStyle = TextType.P, style, ...rest }) => {
  const { theme } = useStyles();
  return <Text style={[appTypography[textStyle], { color: theme.text }, style]} {...rest} />;
});

GSMText.displayName = 'GSMText';
