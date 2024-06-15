import { LinearGradient } from 'expo-linear-gradient';
import {
  Category,
  colors,
  gradientForSurveyMapMarker,
  iconForSurveyMapMarker,
  icons,
} from 'geo-survey-map-shared-modules';
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useStyles } from 'react-native-unistyles';

import { stylesheet } from './MapMarker.styles';

type Props = {
  category?: Category;
  isFocused?: boolean;
};

const QuestionMark = icons.Question as React.FunctionComponent<React.SVGAttributes<SVGElement>>;

export const MapMarker: React.FC<Props> = ({ category, isFocused }) => {
  const { styles } = useStyles(stylesheet);
  const backgroundGradient = category ? gradientForSurveyMapMarker[category] : [colors.GRAY, colors.GRAY];
  const Icon = category ? iconForSurveyMapMarker[category] : QuestionMark;
  const iconColor = category === Category.DRY_SOILS ? colors.BLACK : colors.WHITE;

  return (
    <Animated.View style={[styles.marker, isFocused && styles.markerFocused]} entering={FadeIn} exiting={FadeOut}>
      <LinearGradient colors={backgroundGradient} style={styles.background} />
      <Icon color={iconColor} />
    </Animated.View>
  );
};
