import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet({
  container: { gap: 24 },
  contentWrapper: {
    alignItems: 'center',
    gap: 24,
  },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 12 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  label: {
    width: '100%',
    textAlign: 'left',
    marginBottom: -12,
  },
});
