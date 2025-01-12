import { colors } from 'geo-survey-map-shared-modules';
import { createStyleSheet } from 'react-native-unistyles';

import { createFontNameForWeight } from '@/styles/typography';

const SIZE = 24;

export const stylesheet = createStyleSheet((theme) => ({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  stage: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  stageText: { fontWeight: '600', fontFamily: createFontNameForWeight('600'), color: theme.textFaded },
  current: {
    backgroundColor: theme.primary,
  },
  currentText: { color: colors.BLACK },
  completed: { borderWidth: 1, borderColor: theme.primary },
  completedText: { color: theme.primary },
  line: { flex: 1, height: 1, backgroundColor: theme.outline },
  linePrimary: { backgroundColor: theme.primary },
}));
