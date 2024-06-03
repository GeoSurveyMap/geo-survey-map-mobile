import { createStyleSheet } from 'react-native-unistyles';

import { GSMButtonStyle } from './GSMButton.types';

export const stylesheet = createStyleSheet((theme) => ({
  commonButton: {
    minHeight: 51,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 24,
  },
  pressedIn: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.5,
  },
  [GSMButtonStyle.PRIMARY]: {
    backgroundColor: theme.primary,
  },
  [GSMButtonStyle.SECONDARY]: {
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.primary,
  },
  [GSMButtonStyle.DESTRUCTIVE]: {
    backgroundColor: 'invisible',
    paddingHorizontal: 0,
  },
  [GSMButtonStyle.SOFT_DESTRUCTIVE]: {
    backgroundColor: 'invisible',
    paddingHorizontal: 0,
  },
}));
