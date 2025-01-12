import { TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { DefaultScreenContainer } from '@/components/DefaultScreenContainer/DefaultScreenContainer';
import { GSMButton } from '@/components/GSMButton/GSMButton';
import { GSMButtonStyle } from '@/components/GSMButton/GSMButton.types';
import { GSMText } from '@/components/GSMText/GSMText';
import { Section } from '@/components/Section/Section';
import { useAuth } from '@/hooks/useAuth';
import { type ProfileScreenProps, ScreenName } from '@/navigation/navigation.types';

import { stylesheet } from './Profile.styles';
import { AddedPointsList } from './components/AddedPointsList/AddedPointsList';

import type { Survey } from 'geo-survey-map-shared-modules';

export const Profile: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { handleLogin, handleRegister, handleLogout, handleDeleteAccount, isAuthenticated } = useAuth();
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();

  const logout = async () => {
    await handleLogout();
    navigation.goBack();
  };

  const handleNavigateToDetails = (survey: Survey) => {
    navigation.navigate(ScreenName.PointDetails, { survey });
  };

  const deleteAccountFirstConfirmation = () => {
    Alert.alert(
      t('userProfile.deleteAccountPopup.firstConfirmation.title'),
      t('userProfile.deleteAccountPopup.firstConfirmation.description'),
      [
        {
          text: t('userProfile.deleteAccountPopup.cancel'),
          style: 'cancel',
        },
        {
          text: t('userProfile.deleteAccountPopup.button'),
          style: 'destructive',
          onPress: () => {
            deleteAccountSecondConfirmation();
          },
        },
      ],
    );
  };

  const deleteAccountSecondConfirmation = () => {
    Alert.alert(
      t('userProfile.deleteAccountPopup.secondConfirmation.title'),
      t('userProfile.deleteAccountPopup.secondConfirmation.description'),
      [
        {
          text: t('userProfile.deleteAccountPopup.cancel'),
          style: 'cancel',
        },
        {
          text: t('userProfile.deleteAccountPopup.button'),
          style: 'destructive',
          onPress: () => {
            handleDeleteAccount();
          },
        },
      ],
    );
  };

  const ListHeader = () => (
    <>
      <GSMText textStyle={TextType.TITLE}>{t('userProfile.title')}</GSMText>
      <Section title={t('userProfile.manageAccount')}>
        {isAuthenticated ? (
          <>
            <GSMButton title={t('userProfile.logout')} onPress={logout} />
            <GSMButton
              buttonStyle={GSMButtonStyle.SECONDARY}
              title={t('userProfile.removeAccount')}
              onPress={deleteAccountFirstConfirmation}
            />
          </>
        ) : (
          <>
            <GSMButton title={t('login')} buttonStyle={GSMButtonStyle.PRIMARY} onPress={handleLogin} />
            <GSMButton title={t('register')} buttonStyle={GSMButtonStyle.SECONDARY} onPress={handleRegister} />
          </>
        )}
      </Section>
      <Section title={t('pointsList.title')} />
    </>
  );

  return (
    <DefaultScreenContainer scrollable={false}>
      <AddedPointsList
        style={{ paddingTop: top + 24 }}
        header={<ListHeader />}
        headerStyle={styles.container}
        onNavigateToDetails={handleNavigateToDetails}
      />
    </DefaultScreenContainer>
  );
};
