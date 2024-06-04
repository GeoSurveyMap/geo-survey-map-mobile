import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: '100%',
    height: 40,
  },
  slider: {
    width: '100%',
  },
  stepsWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 4,
  },
  step: {
    width: 1,
    height: 8,
    backgroundColor: theme.textFaded,
  },
}));
