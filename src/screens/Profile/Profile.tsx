import { TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'react-native-unistyles';

import { DefaultScreenContainer } from '@/components/DefaultScreenContainer/DefaultScreenContainer';
import { GSMButton } from '@/components/GSMButton/GSMButton';
import { GSMButtonStyle } from '@/components/GSMButton/GSMButton.types';
import { GSMText } from '@/components/GSMText/GSMText';
import { useAuth } from '@/hooks/useAuth';

import { Section } from '../../components/Section/Section';

import { stylesheet } from './Profile.styles';

import type { ProfileScreenProps } from '@/navigation/navigation.types';

export const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { handleLogout } = useAuth();
  const { handleLogin, handleRegister, isAuthenticated } = useAuth();

  const logout = async () => {
    await handleLogout();
    navigation.goBack();
  };

  return (
    <DefaultScreenContainer style={styles.container}>
      <GSMText textStyle={TextType.TITLE}>{t('userProfile.title')}</GSMText>
      <Section title={t('userProfile.manageAccount')}>
        {isAuthenticated ? (
          <>
            <GSMButton title={t('userProfile.logout')} onPress={logout} />
            <GSMButton
              buttonStyle={GSMButtonStyle.SECONDARY}
              title={t('userProfile.removeAccount')}
              onPress={() => {}}
            />
          </>
        ) : (
          <>
            <GSMButton title={t('login')} buttonStyle={GSMButtonStyle.PRIMARY} onPress={handleLogin} />
            <GSMButton title={t('register')} buttonStyle={GSMButtonStyle.SECONDARY} onPress={handleRegister} />
          </>
        )}
      </Section>
      <Section title={'Added points'}>
        {isAuthenticated ? (
          <AddedPointsList />
        ) : (
          // TODO: translate
          <GSMText textStyle={TextType.P}>Log in to the applicaiton to see reported points.</GSMText>
        )}
      </Section>
    </DefaultScreenContainer>
  );
};

const AddedPointsList: React.FC = () => {
  return null; // TODO: implement
};
