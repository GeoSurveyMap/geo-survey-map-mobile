import { StyleSheet } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

export const BOTTOM_BAR_PADDING_VERTICAL = 8;
export const BOTTOM_BAR_CONTENT_SIZE = 52;

export const stylesheet = createStyleSheet((theme) => ({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme.surface,
    overflow: 'hidden',
  },

  navigator: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: BOTTOM_BAR_PADDING_VERTICAL,
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
    height: BOTTOM_BAR_CONTENT_SIZE,
    width: BOTTOM_BAR_CONTENT_SIZE,
    borderRadius: 16,
    shadowColor: theme.textFaded,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
}));
