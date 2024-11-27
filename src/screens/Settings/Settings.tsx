import { TextType, availableLanguages } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'react-native-unistyles';

import { DefaultScreenContainer } from '@/components/DefaultScreenContainer/DefaultScreenContainer';
import { GSMSelect } from '@/components/GSMSelect/GSMSelect';
import { GSMText } from '@/components/GSMText/GSMText';
import { useAppLanguageStore } from '@/store/useAppLanguage';

import { Section } from '../../components/Section/Section';

import { stylesheet } from './Settings.styles';

import type { SettingsScreenProps } from '@/navigation/navigation.types';

export const Settings: React.FC<SettingsScreenProps> = () => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { language, setAppLanguage } = useAppLanguageStore();

  return (
    <DefaultScreenContainer style={styles.container}>
      <GSMText textStyle={TextType.TITLE}>{t('settings.title')}</GSMText>
      <Section title={t('settings.appLanguage')}>
        <GSMSelect
          items={availableLanguages.map(({ name, emoji, languageCode }) => ({
            label: `${emoji} ${name}`,
            value: languageCode,
          }))}
          value={language}
          onValueChange={setAppLanguage}
        />
      </Section>
      <Section title={t('settings.appVersion')}>
        {/* <GSMText>1.0.0 (23)</GSMText>  TODO: wyświetlać wersje apki wraz z build numberem */}
      </Section>
    </DefaultScreenContainer>
  );
};
