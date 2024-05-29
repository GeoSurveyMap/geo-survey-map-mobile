import { darkTheme, lightTheme } from 'geo-survey-map-shared-modules';
import { UnistylesRegistry } from 'react-native-unistyles';

import type { Theme } from 'geo-survey-map-shared-modules';

type AppThemes = {
  light: Theme;
  dark: Theme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({ light: lightTheme, dark: darkTheme }).addConfig({
  adaptiveThemes: true,
});
