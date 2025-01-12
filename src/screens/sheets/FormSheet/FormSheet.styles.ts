import { createStyleSheet } from 'react-native-unistyles';

import { SCREEN_HEIGHT } from '@/utils/platform';

export const stylesheet = createStyleSheet(() => ({
  container: { gap: 24 },
  contentWrapper: {
    alignItems: 'center',
    gap: 24,
    maxHeight: SCREEN_HEIGHT * 0.6,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  fullButton: { width: '100%' },
}));
