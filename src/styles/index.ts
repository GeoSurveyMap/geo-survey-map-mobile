/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { darkTheme, lightTheme } from 'geo-survey-map-shared-modules';
import { UnistylesRegistry } from 'react-native-unistyles';

import type { Theme } from 'geo-survey-map-shared-modules';

enum ThemeName {
  LIGHT = 'light',
  DARK = 'dark',
}

export type AppThemes = {
  [ThemeName.LIGHT]: Theme;
  [ThemeName.DARK]: Theme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({ [ThemeName.LIGHT]: lightTheme, [ThemeName.DARK]: darkTheme }).addConfig({
  adaptiveThemes: true,
});
