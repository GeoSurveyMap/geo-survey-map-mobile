import { LinearGradient } from 'expo-linear-gradient';
import { Category, colors, gradientForSurveyMapMarker, iconForSurveyMapMarker } from 'geo-survey-map-shared-modules';
import React from 'react';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { stylesheet } from './MapMarker.styles';

type Props = {
  category: Category;
};

export const MapMarker: React.FC<Props> = ({ category }) => {
  const { styles } = useStyles(stylesheet);
  const backgroundGradient = gradientForSurveyMapMarker[category];
  const Icon = iconForSurveyMapMarker[category];
  const iconColor = category === Category.DRY_SOILS ? colors.BLACK : colors.WHITE;

  return (
    <View style={styles.marker}>
      <LinearGradient colors={backgroundGradient} style={styles.background} />
      <Icon color={iconColor} />
    </View>
  );
};
