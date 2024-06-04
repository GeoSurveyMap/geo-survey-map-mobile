import { Category } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useCallback } from 'react';
import { FlatList, type ListRenderItemInfo } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { useFormStore } from '@/store/useFormStore';

import { stylesheet } from './ChooseCategory.styles';
import { CategoryItem } from './components/CategoryItem/CategoryItem';

export const ChooseCategory = () => {
  const { styles } = useStyles(stylesheet);
  const { category, setCategory } = useFormStore();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Category>) => (
      <CategoryItem
        category={item}
        onPress={() => setCategory(item)}
        isSelected={category === item}
        onQuestionPress={() => {}}
      />
    ),
    [category, setCategory],
  );

  return (
    <FlatList
      style={styles.categoriesContainer}
      contentContainerStyle={styles.contentContainer}
      data={Object.values(Category)}
      renderItem={renderItem}
    />
  );
};
