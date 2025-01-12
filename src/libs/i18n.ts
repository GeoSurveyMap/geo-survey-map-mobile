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

export const getInitialLanguage = (): string => {
  try {
    const { language, setAppLanguage } = useAppLanguageStore.getState();

    if (!language || language === '') {
      return getCurrentLanguage((systemLng) => {
        setAppLanguage(systemLng);
      });
    }

    return language;
  } catch (error) {
    console.log(error);
    return FALLBACK_LNG;
  }
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
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
