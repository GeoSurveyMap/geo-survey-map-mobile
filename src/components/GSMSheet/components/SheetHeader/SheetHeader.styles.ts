import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    height: 4,
    width: 44,
    borderRadius: 4,
    backgroundColor: theme.outline,
  },
}));
