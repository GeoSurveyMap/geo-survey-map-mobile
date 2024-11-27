import { TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { DefaultScreenContainer } from '@/components/DefaultScreenContainer/DefaultScreenContainer';
import { GSMText } from '@/components/GSMText/GSMText';

import { stylesheet } from './CategoryInfo.styles';

import type { CategoryInfoScreenProps } from '@/navigation/navigation.types';

export const CategoryInfo: React.FC<CategoryInfoScreenProps> = ({ route }) => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { category } = route.params;

  // TODO: Replace with real image
  return (
    <DefaultScreenContainer hasCloseButton>
      <Pressable style={styles.container}>
        <GSMText textStyle={TextType.TITLE}>{t(`category.${category}`)}</GSMText>
        <GSMText style={{ lineHeight: 20 }}>{t(`categoryInformation.${category}`)}</GSMText>
      </Pressable>
      <Image
        source={{
          uri: 'https://media.istockphoto.com/id/1333041222/vector/television-screen-error.jpg?s=612x612&w=0&k=20&c=7FLqSpKGgTlGADvXK6yrWs4_0rDGjTRhZ38e5sGtGGM=',
        }}
        style={styles.image}
      />
    </DefaultScreenContainer>
  );
};
