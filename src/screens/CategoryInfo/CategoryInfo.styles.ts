import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  container: {
    gap: 12,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    marginTop: 24,
  },
}));
