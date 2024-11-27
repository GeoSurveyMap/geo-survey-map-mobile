import { getLocales } from 'expo-localization';
import { availableLanguages, fallbacks } from 'geo-survey-map-shared-modules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { useAppLanguageStore } from '@/store/useAppLanguage';

const FALLBACK_LNG = 'en';

export const getCurrentLanguage = (callback: (lng: string) => void) => {
  const systemLang = getLocales()[0].languageCode;

  if (systemLang && availableLanguages.some((l) => l.languageCode === systemLang)) {
    callback(systemLang);
    return systemLang;
  }

  callback(FALLBACK_LNG);
  return FALLBACK_LNG;
};

const DefaultNamespaces = Object.keys(fallbacks.pl);
const DefaultLanguages = Object.keys(fallbacks).filter((s) => typeof s === 'string');

const getInitialLanguage = (): string => {
  try {
    const appLanguageState = useAppLanguageStore?.getState();
    return (
      appLanguageState.language ||
      getCurrentLanguage((systemLng) => {
        appLanguageState.setAppLanguage(systemLng);
      })
    );
  } catch (error) {
    console.log(error);
    return FALLBACK_LNG;
  }
};

const language = getInitialLanguage();

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: language,
  fallbackLng: FALLBACK_LNG,
  debug: false,
  preload: DefaultLanguages,
  ns: DefaultNamespaces,
  defaultNS: 'Default',
  interpolation: {
    escapeValue: false,
  },
  resources: fallbacks,
});

export const t = i18n.t.bind(i18n);

export { i18n };
