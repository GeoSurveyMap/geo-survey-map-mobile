import { StyleSheet } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    padding: 16,
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
