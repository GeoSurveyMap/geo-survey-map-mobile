import { TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { useStyles } from 'react-native-unistyles';

import { GSMButton } from '@/components/GSMButton/GSMButton';
import { useAuth } from '@/hooks/useAuth';
import { Sheet } from '@/libs/sheets';

import { GSMButtonStyle } from '../GSMButton/GSMButton.types';
import { GSMSheet } from '../GSMSheet/GSMSheet';
import { GSMText } from '../GSMText/GSMText';

import { stylesheet } from './LoginSheet.styles';

export const LoginSheet: React.FC = () => {
  const { styles } = useStyles(stylesheet);
  const { handleLogin, handleRegister } = useAuth();
  const { t } = useTranslation();

  const onLogin = async () => {
    await SheetManager.hide(Sheet.Login);
    await handleLogin();
  };

  const onRegister = async () => {
    await SheetManager.hide(Sheet.Login);
    await handleRegister();
  };

  return (
    <GSMSheet>
      <View style={styles.textsContainer}>
        <GSMText textStyle={TextType.H2} style={styles.textCentered}>
          {t('notAuthenticatedModal.title')}
        </GSMText>
        <GSMText textStyle={TextType.P} style={styles.textCentered}>
          {t('notAuthenticatedModal.message')}
        </GSMText>
      </View>
      <View style={styles.buttonsContainer}>
        <GSMButton title={t('login')} buttonStyle={GSMButtonStyle.PRIMARY} onPress={onLogin} />
        <GSMButton title={t('register')} buttonStyle={GSMButtonStyle.SECONDARY} onPress={onRegister} />
      </View>
    </GSMSheet>
  );
};
