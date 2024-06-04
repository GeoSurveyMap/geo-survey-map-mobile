import { registerSheet } from 'react-native-actions-sheet';

import { FormSheet } from '@/screens/sheets/FormSheet/FormSheet';
import { LoginSheet } from '@/screens/sheets/LoginSheet/LoginSheet';

import type { Location } from 'geo-survey-map-shared-modules';
import type { SheetDefinition } from 'react-native-actions-sheet';

export enum Sheet {
  Login = 'login-sheet',
  Form = 'form-sheet',
}

registerSheet(Sheet.Login, LoginSheet);
registerSheet(Sheet.Form, FormSheet);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
  interface Sheets {
    [Sheet.Login]: SheetDefinition;
    [Sheet.Form]: SheetDefinition<{
      payload: {
        location: Location;
      };
    }>;
  }
}

export {};
