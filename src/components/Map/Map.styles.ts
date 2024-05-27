import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
}));
