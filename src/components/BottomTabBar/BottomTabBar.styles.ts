import { StyleSheet } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

export const BOTTOM_TAB_BAR_HEIGHT = 80;

export const stylesheet = createStyleSheet((theme) => ({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    height: 160,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
  },
  navigator: {
    width: 216,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.surface,
    gap: 24,
  },

  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    zIndex: 100,
  },

  mapTabWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapTab: {
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 48,
    borderRadius: 8,
  },
}));
