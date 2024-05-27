import { TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '../GSMText/GSMText';

import { stylesheet } from './RectButton.styles';

import type { StyleProp, ViewStyle } from 'react-native';

type Props = {
  title: string;
  style?: StyleProp<ViewStyle>;
};

export const RectButton: React.FC<Props> = ({ title }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.wrapper}>
      <GSMText textStyle={TextType.TOOLTIP}>{title}</GSMText>
    </View>
  );
};
