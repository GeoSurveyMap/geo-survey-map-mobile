import { type Category, iconForSurveyMapMarker } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '@/components/GSMText/GSMText';

import { stylesheet } from './FilterCategory.styles';

import type { StyleProp, ViewStyle } from 'react-native';

type Props = {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  forceColor?: string;
};

export const FilterCategory: React.FC<Props> = ({ category, isSelected, onPress, style, forceColor }) => {
  const { styles, theme } = useStyles(stylesheet);
  const { t } = useTranslation();
  const Icon = iconForSurveyMapMarker[category];
  const color = forceColor ? forceColor : isSelected ? theme.primary : theme.textFaded;

  const categoryName = t(`category.${category}`);
  const numberOfWords = categoryName.split(' ').length;
  const numberOfLines = numberOfWords > 1 ? 2 : 1;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        isSelected ? styles.containerSelected : styles.containerUnselected,
        style,
        !!forceColor && {
          backgroundColor: `${forceColor}1A`,
          borderColor: forceColor,
        },
      ]}
    >
      <Icon color={color} />
      <GSMText color={color} style={styles.text} numberOfLines={numberOfLines} adjustsFontSizeToFit>
        {categoryName}
      </GSMText>
    </Pressable>
  );
};
