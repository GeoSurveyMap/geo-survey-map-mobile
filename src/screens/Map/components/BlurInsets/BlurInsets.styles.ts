import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 10,
  },
}));
