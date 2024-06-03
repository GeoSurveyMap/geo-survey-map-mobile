import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { stylesheet } from './SheetHeader.styles';

export const SheetHeader = () => {
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container}>
      <View style={styles.indicator} />
    </View>
  );
};
