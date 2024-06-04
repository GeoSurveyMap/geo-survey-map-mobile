import { colors } from 'geo-survey-map-shared-modules';
import React from 'react';
import { TextInput, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { appTypography } from '@/styles/typography';

import { GSMText } from '../GSMText/GSMText';

import { stylesheet } from './GSMInput.styles';

import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';

interface Props extends TextInputProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  isError?: boolean;
  errorMessage?: string;
}

export const GSMInput: React.FC<Props> = ({ label, style, isError = false, errorMessage, multiline, ...rest }) => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <View style={[styles.wrapper, style]}>
      <GSMText style={styles.label}>{label}</GSMText>
      <TextInput
        style={[appTypography.P, styles.input, multiline && styles.multiline, isError && styles.inputError]}
        placeholderTextColor={theme.outline}
        multiline={multiline}
        {...rest}
      />
      {isError && <GSMText color={colors.RED}>{errorMessage}</GSMText>}
    </View>
  );
};
