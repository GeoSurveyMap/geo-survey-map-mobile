import { createStyleSheet } from 'react-native-unistyles';

const SIZE = 24;

export const stylesheet = createStyleSheet((theme) => ({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
  stage: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stageText: { fontWeight: '600', color: theme.textFaded },
  current: {
    backgroundColor: theme.primary,
  },
  currentText: { color: theme.text },
  completed: { borderWidth: 1, borderColor: theme.primary },
  completedText: { color: theme.primary },
  line: { flex: 1, height: 1, backgroundColor: theme.outline },
  linePrimary: { backgroundColor: theme.primary },
}));
