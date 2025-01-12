import { TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'react-native-unistyles';

import { DefaultScreenContainer } from '@/components/DefaultScreenContainer/DefaultScreenContainer';
import { GSMText } from '@/components/GSMText/GSMText';

import { InstructionStageContent } from '../Onboarding/Onboarding';

import { stylesheet } from './HowToUse.styles';

import type { HowToUseScreenProps } from '@/navigation/navigation.types';

export const HowToUse: React.FC<HowToUseScreenProps> = () => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  return (
    <DefaultScreenContainer scrollable={true} hasBackButton style={styles.container}>
      <GSMText textStyle={TextType.TITLE}>{t('settings.howToUse')}</GSMText>
      <InstructionStageContent hasTitle={false} />
    </DefaultScreenContainer>
  );
};
