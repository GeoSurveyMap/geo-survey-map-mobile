import { StyleSheet } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
  top: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottom: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
}));
