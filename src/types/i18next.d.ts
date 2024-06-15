import type { fallbacks } from 'geo-survey-map-shared-modules';
import type { ParseKeys, TFunction } from 'i18next';

/**
 * This is a custom type definition for i18next. It is used to provide type safety for the i18next instance.
 */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'pl';
    resources: {
      pl: typeof fallbacks.pl.Default;
      en: typeof fallbacks.en.Default;
    };
  }
}

export type LocalizedLabelKey = ParseKeys<'pl', {}, undefined>;

export type GSMTFunction = TFunction<'pl', undefined>;
