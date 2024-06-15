import { Dimensions } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet({
  container: { gap: 24 },
  contentWrapper: {
    alignItems: 'center',
    gap: 24,
    maxHeight: Dimensions.get('window').height * 0.4,
  },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  label: {
    width: '100%',
    textAlign: 'left',
    marginBottom: -12,
  },
});
