import { createStyleSheet } from 'react-native-unistyles';

const SIZE = 30;

export const stylesheet = createStyleSheet(() => ({
  marker: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
}));
