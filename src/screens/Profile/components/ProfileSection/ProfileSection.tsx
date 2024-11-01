import { TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '@/components/GSMText/GSMText';

import { stylesheet } from './ProfileSection.styles';

import type { PropsWithChildren } from 'react';

type Props = {
  title: string;
};

export const ProfileSection: React.FC<PropsWithChildren<Props>> = ({ title, children }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <GSMText textStyle={TextType.H3}>{title}</GSMText>
      {children}
    </View>
  );
};
