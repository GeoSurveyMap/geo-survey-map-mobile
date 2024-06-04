import Slider from '@react-native-community/slider';
import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '../GSMText/GSMText';

import { stylesheet } from './GSMSlider.styles';

type Props = {
  value?: number;
  onValueChange: (value: number) => void;
  minValueLabel?: string;
  maxValueLabel?: string;
};

const stepHeight = (index: number) => (index % 5 === 0 ? 12 : 6);

export const GSMSlider: React.FC<Props> = ({ minValueLabel, maxValueLabel, onValueChange, value }) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.outline}
        onSlidingComplete={onValueChange}
        value={value}
      />
      <View style={styles.stepsWrapper}>
        {Array.from({ length: 11 }).map((_, index) => (
          <View key={`step_${index}`} style={[styles.step, { height: stepHeight(index) }]} />
        ))}
      </View>
      <View style={styles.stepsWrapper}>
        <GSMText color={theme.textFaded}>{minValueLabel}</GSMText>
        <GSMText color={theme.textFaded}>{maxValueLabel}</GSMText>
      </View>
    </View>
  );
};
