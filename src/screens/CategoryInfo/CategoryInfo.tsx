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

  // TODO: Replace with real translated data and image
  return (
    <DefaultScreenContainer hasCloseButton>
      <Pressable style={styles.container}>
        <GSMText textStyle={TextType.TITLE}>{t(`category.${category}`)}</GSMText>
        <GSMText style={{ lineHeight: 20 }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam non animi libero expedita odio praesentium
          possimus illum! Ex perspiciatis officiis molestias eius inventore quod alias quas cupiditate, totam fuga
          reiciendis? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam doloremque aspernatur corporis
          reprehenderit nobis pariatur fuga explicabo deleniti nesciunt iusto in, at libero quos, eum dolore? Eveniet
          consequuntur debitis voluptates? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, non eaque
          mollitia consequuntur temporibus possimus dolore tempora consequatur, odio exercitationem amet aut, aspernatur
          in repudiandae obcaecati sit assumenda eius! Eligendi. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Molestiae minima earum accusamus quam inventore ipsum excepturi cupiditate ipsa a corrupti illum vero
          aperiam, adipisci provident laudantium. Vero magnam eveniet autem. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Eos quos nisi nihil? Quae porro expedita eos ad quod, illo ex sequi excepturi libero nulla
          officiis dolores quibusdam doloremque harum quaerat? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </GSMText>
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
