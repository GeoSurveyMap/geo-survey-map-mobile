import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  container: { width: '100%', gap: 12, alignItems: 'center' },
  takePhotoContainer: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.outline,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
}));
