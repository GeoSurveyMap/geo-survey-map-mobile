import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { GSMSlider } from '@/components/GSMSlider/GSMSlider';
import { GSMText } from '@/components/GSMText/GSMText';
import { useFormStore } from '@/store/useFormStore';

import { stylesheet } from './ChooseArea.styles';

export const ChooseArea: React.FC = () => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { radius, setRadius } = useFormStore();

  return (
    <View style={styles.container}>
      <GSMText style={styles.label}>{t('addPointForm.affectedArea.placeholder')}</GSMText>
      <GSMSlider maxValueLabel='1km' minValueLabel='1m' onValueChange={setRadius} value={radius} />
    </View>
  );
};
