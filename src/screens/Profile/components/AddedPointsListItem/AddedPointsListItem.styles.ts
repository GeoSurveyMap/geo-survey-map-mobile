import { StyleSheet } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

import { hexToAlpha } from '@/utils/colors';

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    padding: 8,
    borderRadius: 12,
    flexDirection: 'row',
    gap: 8,
    paddingRight: 24,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: hexToAlpha(theme.textFaded, 0.3),
  },
  chevronWrapper: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  chevron: {
    transform: [{ rotate: '-90deg' }],
  },
  textsContainer: {
    gap: 4,
  },
}));
