import { createStyleSheet } from 'react-native-unistyles';

const size = 48;

export const stylesheet = createStyleSheet((theme) => ({
  wrapper: {
    width: size,
    height: size,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.outline,
    backgroundColor: theme.background,
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
