import { Dimensions } from 'react-native';
import { createStyleSheet } from 'react-native-unistyles';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const stylesheet = createStyleSheet((theme) => ({
  wrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: theme.background,
    borderRadius: 24,
    maxHeight: 240,
    width: SCREEN_WIDTH - 32,
    margin: 16,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  dragHandle: {
    height: 4,
    width: 44,
    borderRadius: 4,
    backgroundColor: theme.outline,
    position: 'absolute',
    top: 4,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    paddingTop: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: '100%',
  },
  contentContainer: {
    padding: 12,
    gap: 8,
    width: '100%',
  },
  label: {
    fontSize: 10,
  },
  seeMoreContainer: {
    padding: 12,
  },
  seeMoreText: {
    textDecorationLine: 'underline',
  },
}));
