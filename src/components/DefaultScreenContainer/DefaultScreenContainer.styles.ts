import { createStyleSheet } from 'react-native-unistyles';

export const DEFAULT_SCREEN_CONTAINER_PADDING = 12;

export const stylesheet = createStyleSheet((theme) => ({
  wrapper: { flex: 1 },
  bg: {
    backgroundColor: theme.background,
    flex: 1,
  },
  container: {
    paddingBottom: DEFAULT_SCREEN_CONTAINER_PADDING,
    paddingHorizontal: DEFAULT_SCREEN_CONTAINER_PADDING,
    flex: 1,
    flexGrow: 1,
  },
  wrapperContentContainer: {
    alignSelf: 'stretch',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 32,
  },
  headerButton: {
    padding: DEFAULT_SCREEN_CONTAINER_PADDING,
    paddingBottom: 24,
  },
}));
