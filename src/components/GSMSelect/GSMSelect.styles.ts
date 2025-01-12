import { TextType } from 'geo-survey-map-shared-modules';
import { createStyleSheet } from 'react-native-unistyles';

import { appTypography } from '@/styles/typography';

export const stylesheet = createStyleSheet((theme) => ({
  wrapper: { width: '100%', gap: 5 },
  label: {
    color: theme.textFaded,
  },
  container: {
    borderWidth: 1,
    borderColor: theme.outline,
    paddingVertical: 12,
    paddingHorizontal: 16,
    paddingRight: 0,
    borderRadius: 8,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    right: 16,
  },
  selectIOS: {
    ...(appTypography[TextType.H4] as Record<string, unknown>),
    color: theme.text,
  },
  selectAndroid: {
    ...(appTypography[TextType.H4] as Record<string, unknown>),
    color: theme.text,
  },
}));
