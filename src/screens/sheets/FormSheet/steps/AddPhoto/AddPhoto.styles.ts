import { createStyleSheet } from 'react-native-unistyles';

export const PADDING = 12;

export const stylesheet = createStyleSheet((theme) => ({
  container: { width: '100%', gap: PADDING, paddingBottom: PADDING },
  buttonsContainer: { gap: PADDING, alignItems: 'center' },
  takePhotoContainer: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.outline,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },

  closeIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 22,
    overflow: 'hidden',
  },
  closeIcon: {
    padding: 10,
  },
  image: {
    width: '100%',
  },
}));
