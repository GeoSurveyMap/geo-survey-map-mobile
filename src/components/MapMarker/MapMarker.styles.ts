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
  markerFocused: {
    height: SIZE * 1.5,
    width: SIZE * 1.5,
    borderRadius: (SIZE * 1.5) / 2,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
}));
