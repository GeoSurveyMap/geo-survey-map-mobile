import { createStyleSheet } from 'react-native-unistyles';

const SIZE = 40;

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.outline,
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    gap: 8,
    height: SIZE,
    flex: 1,
  },
  categorySelected: {
    borderColor: theme.primary,
    borderWidth: 2,
    paddingLeft: 3,
  },
  questionButton: {
    width: SIZE,
    height: SIZE,
    borderRadius: 4,
    borderColor: theme.outline,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
