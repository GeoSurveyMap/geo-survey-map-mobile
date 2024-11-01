import { TextType, availableLanguages } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'react-native-unistyles';

import { DefaultScreenContainer } from '@/components/DefaultScreenContainer/DefaultScreenContainer';
import { GSMButton } from '@/components/GSMButton/GSMButton';
import { GSMButtonStyle } from '@/components/GSMButton/GSMButton.types';
import { GSMSelect } from '@/components/GSMSelect/GSMSelect';
import { GSMText } from '@/components/GSMText/GSMText';
import { useAuth } from '@/hooks/useAuth';
import { useAppLanguageStore } from '@/store/useAppLanguage';

import { stylesheet } from './Profile.styles';
import { ProfileSection } from './components/ProfileSection/ProfileSection';

import type { ProfileScreenProps } from '@/navigation/navigation.types';

export const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { handleLogout } = useAuth();
  const { language, setAppLanguage } = useAppLanguageStore();

  const logout = async () => {
    await handleLogout();
    navigation.goBack();
  };

  return (
    <DefaultScreenContainer hasBackButton style={styles.container}>
      <GSMText textStyle={TextType.TITLE}>{t('userProfile.title')}</GSMText>
      <ProfileSection title={'Ustawienia aplikacji'}>
        <GSMSelect
          items={availableLanguages.map(({ name, emoji, languageCode }) => ({
            label: `${emoji} ${name}`,
            value: languageCode,
          }))}
          value={language}
          onValueChange={setAppLanguage}
        />
      </ProfileSection>
      <ProfileSection title={t('userProfile.manageAccount')}>
        <GSMButton title={t('userProfile.logout')} onPress={logout} />
        <GSMButton buttonStyle={GSMButtonStyle.SECONDARY} title={t('userProfile.removeAccount')} onPress={() => {}} />
      </ProfileSection>
    </DefaultScreenContainer>
  );
};
