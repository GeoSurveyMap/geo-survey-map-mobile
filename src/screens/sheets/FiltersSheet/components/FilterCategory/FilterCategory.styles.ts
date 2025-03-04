import { createStyleSheet } from 'react-native-unistyles';

import { createFontNameForWeight } from '@/styles/typography';
import { SCREEN_WIDTH } from '@/utils/platform';

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    width: (SCREEN_WIDTH - 2 * 24 - 2 * 8) / 3,
    height: 80,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
  },
  containerSelected: {
    backgroundColor: `${theme.primary}1A`,
    borderColor: theme.primary,
  },
  containerUnselected: {
    borderColor: theme.outline,
  },
  text: { fontSize: 12, textAlign: 'center', fontFamily: createFontNameForWeight('500'), fontWeight: '500' },
}));
