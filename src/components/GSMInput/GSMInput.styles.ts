import { colors } from 'geo-survey-map-shared-modules';
import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  wrapper: { width: '100%', gap: 5 },
  label: {
    color: theme.textFaded,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.outline,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    color: theme.text,
    fontWeight: 'semibold',
    textAlignVertical: 'top',
  },
  multiline: {
    minHeight: 100,
  },
  inputError: {
    borderColor: colors.RED,
  },
}));
