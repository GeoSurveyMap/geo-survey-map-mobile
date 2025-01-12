import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet({
  container: {
    paddingVertical: 16,
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
});
