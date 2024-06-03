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

// eslint-disable-next-line @typescript-eslint/ban-types
export type LocalizedLabelKey = ParseKeys<'pl', {}, undefined>;

export type MetisTFunction = TFunction<'pl', undefined>;
