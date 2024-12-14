import { StyleSheet } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@/utils/platform';

export const stylesheet = createStyleSheet((theme) => ({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
    flexDirection: 'column-reverse',
    paddingBottom: SCREEN_HEIGHT / 8,
  },
  gradientWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientBackground: {
    flex: 1,
    opacity: 0.5,
    zIndex: -1,
  },
  contentWrapper: { paddingHorizontal: 24 },
  iconWrapper: { alignSelf: 'center' },
  textsWrapper: {
    gap: 4,
  },
  mainHeader: { fontSize: 32 },

  howToList: {
    gap: 24,
  },

  instructionListItemWrapper: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  instructionListItemTextWrapper: { flex: 1, gap: 4 },

  categoriesList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryListItem: { width: (SCREEN_WIDTH - 2 * 24 - 8) / 2 },
}));
