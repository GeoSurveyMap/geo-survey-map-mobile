import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  container: {
    gap: 12,
    flex: 1,
  },
  text: {
    flexGrow: 1,
    lineHeight: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    marginTop: 24,
  },
}));
