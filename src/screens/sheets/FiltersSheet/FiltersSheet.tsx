import { TextType } from 'geo-survey-map-shared-modules';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { useStyles } from 'react-native-unistyles';

import { GSMButton } from '@/components/GSMButton/GSMButton';
import { GSMButtonStyle } from '@/components/GSMButton/GSMButton.types';
import { GSMSheet } from '@/components/GSMSheet/GSMSheet';
import { GSMText } from '@/components/GSMText/GSMText';
import { useFiltersState } from '@/store/useFilters';
import { Sheet } from '@/types/sheets';

import { stylesheet } from './FiltersSheet.styles';
import { FilterCategory } from './components/FilterCategory/FilterCategory';

import type { Category } from 'geo-survey-map-shared-modules';

export const FiltersSheet: React.FC = () => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { reset, toggleCategory, categories } = useFiltersState();

  const gridItems = useCallback(
    () =>
      Object.entries(categories).map(([category, isSelected]) => (
        <FilterCategory
          key={category}
          category={category as Category}
          isSelected={isSelected}
          onPress={() => toggleCategory(category as Category)}
        />
      )),
    [categories, toggleCategory],
  );

  const handleApply = () => {
    SheetManager.hide(Sheet.Filters);
  };

  return (
    <GSMSheet enableRouterBackNavigation={true} containerStyle={{ paddingBottom: 0 }}>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <GSMText textStyle={TextType.H4}>{t('filters')}</GSMText>
          <GSMText style={styles.label}>{t('categories')}</GSMText>
          <View style={styles.categoriesGrid}>{gridItems()}</View>
        </View>

        <View style={styles.buttonsContainer}>
          <GSMButton onPress={reset} title={t('clear')} buttonStyle={GSMButtonStyle.DESTRUCTIVE} />
          <GSMButton onPress={handleApply} title={t('apply')} buttonStyle={GSMButtonStyle.PRIMARY} />
        </View>
      </View>
    </GSMSheet>
  );
};
