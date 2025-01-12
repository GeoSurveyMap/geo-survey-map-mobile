import { TextType, availableLanguages } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { DefaultScreenContainer } from '@/components/DefaultScreenContainer/DefaultScreenContainer';
import { GSMSelect } from '@/components/GSMSelect/GSMSelect';
import { GSMText } from '@/components/GSMText/GSMText';
import { Section } from '@/components/Section/Section';
import { SubpageRedirector } from '@/components/SubpageRedirector/SubpageRedirector';
import { ScreenName, type SettingsScreenProps } from '@/navigation/navigation.types';
import { useAppLanguageStore } from '@/store/useAppLanguage';

import { stylesheet } from './Settings.styles';

export const Settings: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { language, setAppLanguage } = useAppLanguageStore();
  const { top } = useSafeAreaInsets();

  return (
    <DefaultScreenContainer scrollable style={[styles.container, { paddingTop: top + 24 }]}>
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
        <GSMText>
          {process.env.EXPO_PUBLIC_APP_VERSION} ({process.env.EXPO_PUBLIC_APP_BUILD_NUMBER})
        </GSMText>
      </Section>
      <SubpageRedirector
        title={t('settings.howToUse')}
        onPress={() => {
          navigation.navigate(ScreenName.HowToUse);
        }}
      />
      <SubpageRedirector
        title={t('settings.aboutSoils')}
        onPress={() => {
          navigation.navigate(ScreenName.SoilCategories);
        }}
      />
      <SubpageRedirector
        title={t('settings.privacyPolicy')}
        onPress={() => {
          navigation.navigate(ScreenName.PrivacyPolicy);
        }}
      />
      <Image
        source={require('geo-survey-map-shared-modules/lib/assets/images/funded_by_the_eu.png')} // eslint-disable-line
        style={styles.image}
      />
    </DefaultScreenContainer>
  );
};
