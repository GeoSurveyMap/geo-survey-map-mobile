import { TextType } from 'geo-survey-map-shared-modules';
import { createStyleSheet } from 'react-native-unistyles';

import { appTypography } from '@/styles/typography';

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    borderWidth: 1,
    borderColor: theme.outline,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
  },
  select: {
    ...(appTypography[TextType.H4] as Record<string, unknown>),
    color: theme.text,
  },
}));
