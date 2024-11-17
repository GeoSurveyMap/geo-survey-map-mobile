import Slider from '@react-native-community/slider';
import React from 'react';
import { TextInput, View } from 'react-native';
import Animated, { useAnimatedProps, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useStyles } from 'react-native-unistyles';

import { getGeometricalScaleValueWorklet } from '@/utils/map';

import { GSMText } from '../GSMText/GSMText';

import { stylesheet } from './AffectedAreaSlider.styles';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type Props = {
  value?: number;
  onValueChange: (value: number) => void;
  minValueLabel?: string;
  maxValueLabel?: string;
};

const stepHeight = (index: number) => (index % 5 === 0 ? 12 : 6);

export const AffectedAreaSlider: React.FC<Props> = ({ minValueLabel, maxValueLabel, onValueChange, value }) => {
  const { styles, theme } = useStyles(stylesheet);
  const layoutWidth = useSharedValue(0);
  const animatedValue = useSharedValue(value ?? 0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animatedValue.value * (layoutWidth.value - 40) }],
  }));

  const animatedProps = useAnimatedProps(() => {
    return {
      value: `${getGeometricalScaleValueWorklet(animatedValue.value)}m`,
      text: `${getGeometricalScaleValueWorklet(animatedValue.value)}m`,
    };
  }, [animatedValue]);

  return (
    <View
      style={styles.container}
      onLayout={({ nativeEvent: { layout } }) => {
        'worklet';
        layoutWidth.value = layout.width;
      }}
    >
      <Animated.View style={[animatedStyle, styles.valueAbsoluteContainer]}>
        <View style={styles.valueContainer}>
          <AnimatedTextInput
            underlineColorAndroid='transparent'
            editable={false}
            style={styles.valueText}
            animatedProps={animatedProps}
          />
        </View>
      </Animated.View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.outline}
        onValueChange={(newValue) => {
          animatedValue.value = newValue;
          onValueChange(newValue);
        }}
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
