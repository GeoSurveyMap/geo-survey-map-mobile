/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TextType } from 'geo-survey-map-shared-modules';
import { Profile } from 'geo-survey-map-shared-modules/lib/assets/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '../GSMText/GSMText';

import { stylesheet } from './RectButton.styles';

import type { TouchableOpacityProps } from 'react-native';

interface Props extends TouchableOpacityProps {
  type: ButtonType;
  iconColor?: string;
}

export enum ButtonType {
  FILTER = 'FILTER',
  LOCALIZE = 'LOCALIZE',
  LOGIN = 'LOGIN',
  PROFILE = 'PROFILE',
}

const buttonIcon: Record<ButtonType, React.FunctionComponent<React.SVGAttributes<SVGElement>>> = {
  [ButtonType.FILTER]: require('geo-survey-map-shared-modules').icons.Filters,
  [ButtonType.LOCALIZE]: require('geo-survey-map-shared-modules').icons.Navigate,
  [ButtonType.LOGIN]: require('geo-survey-map-shared-modules').icons.Login,
  [ButtonType.PROFILE]: Profile,
};

export const MapButton: React.FC<Props> = ({ type, iconColor, ...rest }) => {
  const { styles, theme } = useStyles(stylesheet);
  const { t } = useTranslation();
  const color = iconColor || theme.textFaded;

  const buttonTitle: Record<ButtonType, string | null> = {
    [ButtonType.FILTER]: t('filters'),
    [ButtonType.LOCALIZE]: null,
    [ButtonType.LOGIN]: t('login'),
    [ButtonType.PROFILE]: t('profile'),
  };

  const text = buttonTitle[type];
  const Icon = buttonIcon[type];

  return (
    <TouchableOpacity {...rest}>
      <View style={styles.wrapper}>
        <Icon color={color} />
        {text && (
          <GSMText textStyle={TextType.TOOLTIP} style={{ color }}>
            {text}
          </GSMText>
        )}
      </View>
    </TouchableOpacity>
  );
};
