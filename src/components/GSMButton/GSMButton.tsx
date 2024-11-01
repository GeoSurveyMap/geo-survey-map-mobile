import { TextType, colors } from 'geo-survey-map-shared-modules';
import React from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '../GSMText/GSMText';

import { stylesheet } from './GSMButton.styles';
import { GSMButtonStyle } from './GSMButton.types';

import type { Theme } from 'geo-survey-map-shared-modules';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface GSMButtonProps extends PressableProps {
  title: string;
  buttonStyle?: GSMButtonStyle;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
}

const getTextColor = (buttonStyle: GSMButtonStyle, theme: Theme) => {
  switch (buttonStyle) {
    case GSMButtonStyle.PRIMARY:
      return theme.text;
    case GSMButtonStyle.SECONDARY:
      return theme.primary;
    case GSMButtonStyle.DESTRUCTIVE:
      return colors.RED;
    default:
      return theme.text;
  }
};

/**
 * Custom button component with different styles, that exends `Pressable` component.
 * @param title - Button title.
 * @param buttonStyle - Button style. See `GSMButtonStyle` enum.
 * @returns React element.
 */
export const GSMButton: React.FC<GSMButtonProps> = ({
  title = '',
  buttonStyle = GSMButtonStyle.PRIMARY,
  style,
  loading = false,
  disabled,
  ...props
}) => {
  const { styles, theme } = useStyles(stylesheet);
  const textColor = getTextColor(buttonStyle, theme);

  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.commonButton,
        styles[buttonStyle],
        pressed && styles.pressedIn,
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <GSMText textStyle={TextType.H4} color={textColor}>
          {title}
        </GSMText>
      )}
    </Pressable>
  );
};
