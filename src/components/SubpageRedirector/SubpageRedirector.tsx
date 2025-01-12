import { ChevronDown, TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '../GSMText/GSMText';

import { stylesheet } from './SubpageRedirector.styles';

type Props = {
  title: string;
  onPress: () => void;
};

export const SubpageRedirector: React.FC<Props> = ({ title, onPress }) => {
  const { styles, theme } = useStyles(stylesheet);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <GSMText textStyle={TextType.H3}>{title}</GSMText>
      <View style={styles.chevronWrapper}>
        <ChevronDown color={theme.textFaded} style={styles.chevron} />
      </View>
    </TouchableOpacity>
  );
};
