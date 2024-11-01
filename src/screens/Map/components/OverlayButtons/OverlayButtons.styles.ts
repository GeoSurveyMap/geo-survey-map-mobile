import { StyleSheet } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet(() => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    padding: 16,
    justifyContent: 'space-between',
    paddingBottom: 16 + 30,
  },
  buttonRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rowReversed: {
    flexDirection: 'row-reverse',
  },
}));
