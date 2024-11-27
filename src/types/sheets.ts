import type { Survey } from 'geo-survey-map-shared-modules';
import type { SheetDefinition } from 'react-native-actions-sheet';

declare module 'react-native-actions-sheet' {
  interface Sheets {
    [Sheet.Login]: SheetDefinition;
    [Sheet.Form]: SheetDefinition;
    [Sheet.Filters]: SheetDefinition;
    [Sheet.Point]: SheetDefinition<{
      payload: {
        point: Survey;
      };
    }>;
  }
}

export enum Sheet {
  Login = 'login-sheet',
  Form = 'form-sheet',
  Filters = 'filters-sheet',
  Point = 'point-sheet',
}
