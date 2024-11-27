import { StyleSheet } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

export const PADDING = 16;

export const stylesheet = createStyleSheet(() => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    padding: PADDING,
    justifyContent: 'space-between',
    flexDirection: 'column-reverse',
  },
  buttonRow: {
    justifyContent: 'space-between',
    gap: 8,
    flexDirection: 'row',
  },
  rowReversed: {
    flexDirection: 'row-reverse',
  },
}));
