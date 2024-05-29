import { darkTheme, lightTheme } from 'geo-survey-map-shared-modules';
import { UnistylesRegistry } from 'react-native-unistyles';

type AppThemes = {
  light: typeof lightTheme;
  dark: typeof darkTheme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({ light: lightTheme, dark: darkTheme }).addConfig({
  adaptiveThemes: true,
});
