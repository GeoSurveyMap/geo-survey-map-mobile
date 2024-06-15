import type { SheetDefinition } from 'react-native-actions-sheet';

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

export enum Sheet {
  Login = 'login-sheet',
  Form = 'form-sheet',
}
