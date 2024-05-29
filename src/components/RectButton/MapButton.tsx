import { colors, TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { StyleProp, TouchableNativeFeedback, View, ViewStyle } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '../GSMText/GSMText';

import { stylesheet } from './RectButton.styles';

type Props = {
  type: ButtonType;
  style?: StyleProp<ViewStyle>;
};

export enum ButtonType {
  LOCALIZE = 'LOCALIZE',
  FILTER = 'FILTER',
  PROFILE = 'PROFILE',
  LOGIN = 'LOGIN',
}

const buttonTitle: Record<ButtonType, string | null> = {
  [ButtonType.LOCALIZE]: null,
  [ButtonType.FILTER]: 'Filtry',
  [ButtonType.PROFILE]: 'Profil',
  [ButtonType.LOGIN]: 'Zaloguj',
};

const buttonIcon: Record<ButtonType, any> = {
  [ButtonType.LOCALIZE]: require('geo-survey-map-shared-modules').icons.Navigate,
  [ButtonType.FILTER]: require('geo-survey-map-shared-modules').icons.Filters,
  [ButtonType.PROFILE]: require('geo-survey-map-shared-modules').icons.Profile,
  [ButtonType.LOGIN]: require('geo-survey-map-shared-modules').icons.Login,
};

export const MapButton: React.FC<Props> = ({ type }) => {
  const { styles, theme } = useStyles(stylesheet);
  const text = buttonTitle[type];
  const Icon = buttonIcon[type];

  return (
    <TouchableNativeFeedback>
      <View style={styles.wrapper}>
        <Icon color={colors.DARK_GRAY} />
        {text && (
          <GSMText textStyle={TextType.TOOLTIP} style={{ color: colors.DARK_GRAY }}>
            {text}
          </GSMText>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};
