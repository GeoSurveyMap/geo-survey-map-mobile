import { BlurView } from 'expo-blur';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { stylesheet } from './BlurInsets.styles';

type Props = {};

export const BlurInsets: React.FC<Props> = ({}) => {
  const { top, bottom } = useSafeAreaInsets();
  const { styles } = useStyles(stylesheet);
  return (
    <View style={styles.container} pointerEvents="none">
      <BlurView intensity={100} style={[styles.top, { height: top }]} />
      <BlurView intensity={100} style={[styles.bottom, { height: bottom }]} />
    </View>
  );
};
