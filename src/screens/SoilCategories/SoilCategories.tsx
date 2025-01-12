import { TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { DefaultScreenContainer } from '@/components/DefaultScreenContainer/DefaultScreenContainer';
import { GSMText } from '@/components/GSMText/GSMText';
import { ScreenName, type SoilCategoriesScreenProps } from '@/navigation/navigation.types';

import { AboutSoilsContent } from '../Onboarding/Onboarding';

import { stylesheet } from './SoilCategories.styles';

import type { Category } from 'geo-survey-map-shared-modules';

export const SoilCategories: React.FC<SoilCategoriesScreenProps> = ({ navigation }) => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();

  const handleOpenCategory = (category: Category) => {
    navigation.navigate(ScreenName.CategoryInfo, { category });
  };

  return (
    <DefaultScreenContainer scrollable={true} hasBackButton style={styles.container}>
      <GSMText textStyle={TextType.TITLE}>{t('settings.aboutSoils')}</GSMText>
      <View style={styles.contentContainer}>
        <AboutSoilsContent handleOpenCategoryInfo={handleOpenCategory} hasTitle={false} />
      </View>
    </DefaultScreenContainer>
  );
};
