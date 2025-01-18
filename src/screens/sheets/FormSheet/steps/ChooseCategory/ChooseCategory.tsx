import { useNavigation } from '@react-navigation/native';
import { Category, TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { type ListRenderItemInfo, SectionList } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '@/components/GSMText/GSMText';
import { ScreenName } from '@/navigation/navigation.types';
import { useFormStore } from '@/store/useFormStore';
import { Sheet } from '@/types/sheets';

import { stylesheet } from './ChooseCategory.styles';
import { CategoryItem } from './components/CategoryItem/CategoryItem';

import type { RootStackParamList } from '@/navigation/navigation.types';
import type { NavigationProp } from '@react-navigation/native';

const otherCategories: Category[] = [Category.LOSS_OF_ORGANIC_MATTER, Category.PH, Category.BIODIVERSITY];

const categoriesWithoutOthers = Object.values(Category).filter((category) => !otherCategories.includes(category));

export const ChooseCategory = () => {
  const { styles } = useStyles(stylesheet);
  const { category, setCategory } = useFormStore();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Category>) => (
      <CategoryItem
        category={item}
        onPress={() => setCategory(item)}
        isSelected={category === item}
        onQuestionPress={async () => {
          await SheetManager.hide(Sheet.Form);
          setTimeout(() => {
            navigate(ScreenName.CategoryInfo, { category: item });
          }, 500);
        }}
      />
    ),
    [category, navigate, setCategory],
  );

  const renderSectionHeader = useCallback(
    ({ section: { title } }: { section: { title: string } }) => <GSMText textStyle={TextType.H4}>{title}</GSMText>,
    [],
  );

  return (
    <SectionList
      style={styles.categoriesContainer}
      contentContainerStyle={styles.contentContainer}
      sections={[
        { title: t('categories'), data: categoriesWithoutOthers },
        { title: t('other'), data: otherCategories },
      ]}
      stickySectionHeadersEnabled={false}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={(item) => item}
    />
  );
};
