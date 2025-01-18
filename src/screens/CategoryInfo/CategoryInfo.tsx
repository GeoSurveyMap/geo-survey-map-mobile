import { TextType, categoryInformationPhoto } from 'geo-survey-map-shared-modules';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { DefaultScreenContainer } from '@/components/DefaultScreenContainer/DefaultScreenContainer';
import { GSMText } from '@/components/GSMText/GSMText';
import { createFontNameForWeight } from '@/styles/typography';

import { stylesheet } from './CategoryInfo.styles';

import type { CategoryInfoScreenProps } from '@/navigation/navigation.types';

export const CategoryInfo: React.FC<CategoryInfoScreenProps> = ({ route }) => {
  const { t } = useTranslation();
  const { styles } = useStyles(stylesheet);
  const { category } = route.params;

  const { source, uri } = categoryInformationPhoto[category];

  return (
    <DefaultScreenContainer hasCloseButton={true} style={{ flex: undefined, paddingBottom: 50 }}>
      <GSMText textStyle={TextType.TITLE} numberOfLines={2} adjustsFontSizeToFit>
        {t(`category.${category}`)}
      </GSMText>
      <GSMText style={{ lineHeight: 20 }}>
        <Trans
          i18nKey={`categoryInformation.${category}`}
          components={{
            b: <GSMText style={{ fontWeight: 700, fontFamily: createFontNameForWeight('700') }} />,
          }}
        />
      </GSMText>
      {uri && (
        <>
          <Image source={{ uri }} style={styles.image} />
          <GSMText textStyle={TextType.TOOLTIP} style={{ marginTop: 4, fontWeight: 400 }}>
            {source}
          </GSMText>
        </>
      )}
    </DefaultScreenContainer>
  );
};
