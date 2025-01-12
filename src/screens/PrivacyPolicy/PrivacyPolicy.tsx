import { TextType } from 'geo-survey-map-shared-modules';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'react-native-unistyles';
import WebView from 'react-native-webview';

import { DefaultScreenContainer } from '@/components/DefaultScreenContainer/DefaultScreenContainer';
import { GSMText } from '@/components/GSMText/GSMText';

import { stylesheet } from './PrivacyPolicy.styles';

import type { PrivacyPolicyScreenProps } from '@/navigation/navigation.types';

const PRIVACY_POLICY_URL = 'https://drive.google.com/file/d/1INLA9j3BOlkj4DDxGZPAXhoTJvptci4K/preview';

export const PrivacyPolicy: React.FC<PrivacyPolicyScreenProps> = () => {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  return (
    <DefaultScreenContainer scrollable={true} hasBackButton>
      <GSMText textStyle={TextType.TITLE}>{t('settings.privacyPolicy')}</GSMText>
      <WebView style={styles.webView} source={{ uri: PRIVACY_POLICY_URL }} />
    </DefaultScreenContainer>
  );
};
