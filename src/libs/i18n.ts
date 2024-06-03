import { fallbacks } from 'geo-survey-map-shared-modules';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const FALLBACK_LNG = 'pl';

const DefaultNamespaces = Object.keys(fallbacks.pl);
const DefaultLanguages = Object.keys(fallbacks).filter((s) => typeof s === 'string');

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: FALLBACK_LNG,
  fallbackLng: FALLBACK_LNG,
  debug: __DEV__,
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
