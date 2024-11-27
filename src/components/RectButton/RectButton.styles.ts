import { createStyleSheet } from 'react-native-unistyles';

const size = 52;

export const stylesheet = createStyleSheet((theme) => ({
  wrapper: {
    width: size,
    height: size,
    borderRadius: 10,
    backgroundColor: theme.background,
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
