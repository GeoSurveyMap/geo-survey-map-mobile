import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  wrapper: {
    width: 48,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.outline,
    backgroundColor: theme.background,
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
