import { registerSheet } from 'react-native-actions-sheet';

import { FormSheet } from '@/components/FormSheet/FormSheet';
import { LoginSheet } from '@/components/LoginSheet/LoginSheet';

import type { FormStepName } from '@/components/FormSheet/FormSheet';
import type { Location } from 'geo-survey-map-shared-modules';
import type { RouteDefinition, SheetDefinition } from 'react-native-actions-sheet';

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
      routes: {
        [FormStepName.CHOOSE_CATEGORY]: RouteDefinition;
        [FormStepName.CHOOSE_AREA]: RouteDefinition;
        [FormStepName.ADD_PHOTO]: RouteDefinition;
        [FormStepName.ADD_DETAILS]: RouteDefinition;
        [FormStepName.SUCCESS]: RouteDefinition;
        [FormStepName.ERROR]: RouteDefinition;
      };
    }>;
  }
}

export {};
