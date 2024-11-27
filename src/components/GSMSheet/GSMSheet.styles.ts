import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.background,
    padding: 24,
  },
  indicator: {
    height: 4,
    width: 44,
    borderRadius: 4,
    backgroundColor: theme.outline,
    position: 'absolute',
    top: 4,
    zIndex: 1000,
  },
}));
