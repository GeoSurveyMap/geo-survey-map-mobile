import { createStyleSheet } from 'react-native-unistyles';

import { createFontNameForWeight } from '@/styles/typography';

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
  valueAbsoluteContainer: {
    position: 'absolute',
    top: -20,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueContainer: {
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 4,
    backgroundColor: theme.text,
  },
  valueText: {
    fontFamily: createFontNameForWeight('600'),
    color: theme.background,
  },
}));
