import { Dimensions } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  container: { gap: 24 },
  contentWrapper: {
    alignItems: 'center',
    gap: 24,
    maxHeight: Dimensions.get('window').height * 0.4,
  },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  fullButton: { width: '100%' },
}));
