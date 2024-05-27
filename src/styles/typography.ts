import { TextType, typography } from 'geo-survey-map-shared-modules';

import type { TextStyle } from 'react-native';

const { size, fontFamily, weight } = typography;

const commonTypography = {
  fontFamily: fontFamily,
};

export const appTypography: Record<TextType, TextStyle> = {
  [TextType.H1]: {
    fontSize: size.H1,
    fontWeight: weight.H1,
    ...commonTypography,
  },
  [TextType.H2]: {
    fontSize: size.H2,
    fontWeight: weight.H2,
    ...commonTypography,
  },
  [TextType.H3]: {
    fontSize: size.H3,
    fontWeight: weight.H3,
    ...commonTypography,
  },
  [TextType.H4]: {
    fontSize: size.H4,
    fontWeight: weight.H4,
    ...commonTypography,
  },
  [TextType.P]: {
    fontSize: size.P,
    fontWeight: weight.P,
    ...commonTypography,
  },
  [TextType.TOOLTIP]: {
    fontSize: size.TOOLTIP,
    fontWeight: weight.TOOLTIP,
    ...commonTypography,
  },
};
