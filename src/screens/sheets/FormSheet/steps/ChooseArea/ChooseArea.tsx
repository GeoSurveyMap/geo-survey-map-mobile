import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import { AffectedAreaSlider } from '@/components/AffectedAreaSlider/AffectedAreaSlider';
import { GSMText } from '@/components/GSMText/GSMText';
import { useFormStore } from '@/store/useFormStore';
import { getGeometricalScaleValue, getReverseOfGeometricalScaleValue } from '@/utils/map';

import { stylesheet } from './ChooseArea.styles';

export const ChooseArea: React.FC = () => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { radius, setRadius } = useFormStore();

  return (
    <View style={styles.container}>
      <GSMText style={styles.label}>{t('addPointForm.affectedArea.placeholder')}</GSMText>
      <AffectedAreaSlider
        maxValueLabel='1000 m'
        minValueLabel='1 m'
        onValueChange={(value) => setRadius(getGeometricalScaleValue(value))}
        value={radius ? getReverseOfGeometricalScaleValue(radius) : 0}
      />
    </View>
  );
};
