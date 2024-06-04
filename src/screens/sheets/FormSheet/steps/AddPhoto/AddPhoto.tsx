import { TextType } from 'geo-survey-map-shared-modules';
import { icons } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '@/components/GSMText/GSMText';

import { stylesheet } from './AddPhoto.styles';

const { Camera, Library } = icons;

export const AddPhoto = () => {
  const { styles, theme } = useStyles(stylesheet);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Pressable style={styles.takePhotoContainer}>
        <Camera color={theme.textFaded} />
        <GSMText textStyle={TextType.H4} color={theme.textFaded}>
          {t('addPointForm.addPhoto.takePhoto')}
        </GSMText>
      </Pressable>
      <GSMText color={theme.textFaded}>{t('addPointForm.addPhoto.or')}</GSMText>
      <Pressable style={styles.takePhotoContainer}>
        <Library color={theme.textFaded} />
        <GSMText textStyle={TextType.H4} color={theme.textFaded}>
          {t('addPointForm.addPhoto.chooseFromGallery')}
        </GSMText>
      </Pressable>
    </View>
  );
};
