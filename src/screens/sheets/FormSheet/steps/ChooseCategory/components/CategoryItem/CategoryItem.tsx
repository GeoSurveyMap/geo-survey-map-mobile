import { type Category, icons } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '@/components/GSMText/GSMText';
import { MapMarker } from '@/components/MapMarker/MapMarker';

import { stylesheet } from './CategoryItem.styles';

type Props = {
  category: Category;
  onPress: () => void;
  onQuestionPress: () => void;
  isSelected: boolean;
};

const QuestionIcon = icons.Question;

export const CategoryItem: React.FC<Props> = ({ category, onPress, onQuestionPress, isSelected }) => {
  const { styles, theme } = useStyles(stylesheet);
  const { t } = useTranslation();
  const text = t(`category.${category}`);
  return (
    <View style={styles.container}>
      <Pressable style={[styles.categoryContainer, isSelected && styles.categorySelected]} onPress={onPress}>
        <MapMarker category={category} />
        <GSMText>{text}</GSMText>
      </Pressable>
      <Pressable style={styles.questionButton} onPress={onQuestionPress}>
        <QuestionIcon color={theme.textFaded} />
      </Pressable>
    </View>
  );
};
