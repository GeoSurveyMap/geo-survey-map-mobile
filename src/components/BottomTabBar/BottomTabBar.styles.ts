import { StyleSheet } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.surface,
    overflow: 'hidden',
  },

  navigator: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: 8,
  },

  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
    gap: 4,
  },

  mapTab: {
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    width: 52,
    borderRadius: 16,
    shadowColor: theme.textFaded,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
}));
