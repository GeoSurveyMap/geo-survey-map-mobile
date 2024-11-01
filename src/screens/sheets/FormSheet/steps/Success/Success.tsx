import { icons } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '@/components/GSMText/GSMText';

import { stylesheet } from './Success.styles';

const { Success: SuccessIcon } = icons;

export const Success: React.FC = () => {
  const { styles, theme } = useStyles(stylesheet);
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <SuccessIcon color={theme.primary} />
      <GSMText>{t('addPointForm.successMessage')}</GSMText>
    </View>
  );
};
