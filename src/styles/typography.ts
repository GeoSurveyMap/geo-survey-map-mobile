import { TextType, typography } from 'geo-survey-map-shared-modules';

import type { TextStyle } from 'react-native';

const { size, fontFamily, weight, fontWeight } = typography;

const createFontNameForWeight = (weight: keyof typeof fontWeight): string => {
  switch (weight) {
    case '400':
      return `${fontFamily}-Regular`;
    case '500':
      return `${fontFamily}-Medium`;
    case '600':
      return `${fontFamily}-SemiBold`;
    case '700':
      return `${fontFamily}-Bold`;
    default:
      return '';
  }
};

export const appTypography: Record<TextType, TextStyle> = {
  [TextType.H1]: {
    fontSize: size.H1,
    fontWeight: weight.H1,
    fontFamily: createFontNameForWeight(weight.H1),
  },
  [TextType.H2]: {
    fontSize: size.H2,
    fontWeight: weight.H2,
    fontFamily: createFontNameForWeight(weight.H2),
  },
  [TextType.H3]: {
    fontSize: size.H3,
    fontWeight: weight.H3,
    fontFamily: createFontNameForWeight(weight.H3),
  },
  [TextType.H4]: {
    fontSize: size.H4,
    fontWeight: weight.H4,
    fontFamily: createFontNameForWeight(weight.H4),
  },
  [TextType.P]: {
    fontSize: size.P,
    fontWeight: weight.P,
    fontFamily: createFontNameForWeight(weight.P),
  },
  [TextType.TOOLTIP]: {
    fontSize: size.TOOLTIP,
    fontWeight: weight.TOOLTIP,
    fontFamily: createFontNameForWeight(weight.TOOLTIP),
  },
};
