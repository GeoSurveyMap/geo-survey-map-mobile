/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '../GSMText/GSMText';

import { stylesheet } from './RectButton.styles';

import type { TouchableNativeFeedbackProps } from 'react-native';

interface Props extends TouchableNativeFeedbackProps {
  type: ButtonType;
}

export enum ButtonType {
  FILTER = 'FILTER',
  LOCALIZE = 'LOCALIZE',
  LOGIN = 'LOGIN',
  PROFILE = 'PROFILE',
}

const buttonTitle: Record<ButtonType, string | null> = {
  [ButtonType.FILTER]: 'Filtry',
  [ButtonType.LOCALIZE]: null,
  [ButtonType.LOGIN]: 'Zaloguj',
  [ButtonType.PROFILE]: 'Profil',
};

const buttonIcon: Record<ButtonType, React.FunctionComponent<React.SVGAttributes<SVGElement>>> = {
  [ButtonType.FILTER]: require('geo-survey-map-shared-modules').icons.Filters,
  [ButtonType.LOCALIZE]: require('geo-survey-map-shared-modules').icons.Navigate,
  [ButtonType.LOGIN]: require('geo-survey-map-shared-modules').icons.Login,
  [ButtonType.PROFILE]: require('geo-survey-map-shared-modules').icons.Profile,
};

export const MapButton: React.FC<Props> = ({ type, ...rest }) => {
  const { styles, theme } = useStyles(stylesheet);
  const color = theme.textFaded;

  const text = buttonTitle[type];
  const Icon = buttonIcon[type];

  return (
    <TouchableNativeFeedback {...rest}>
      <View style={styles.wrapper}>
        <Icon color={color} />
        {text && (
          <GSMText textStyle={TextType.TOOLTIP} style={{ color }}>
            {text}
          </GSMText>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};
