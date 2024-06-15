import { registerSheet } from 'react-native-actions-sheet';

import { FormSheet } from '@/screens/sheets/FormSheet/FormSheet';
import { LoginSheet } from '@/screens/sheets/LoginSheet/LoginSheet';
import { Sheet } from '@/types/sheets';

registerSheet(Sheet.Login, LoginSheet);
registerSheet(Sheet.Form, FormSheet);
