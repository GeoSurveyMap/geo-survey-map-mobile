import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  container: { gap: 24 },
  image: {
    width: 200,
    height: 52,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
}));
