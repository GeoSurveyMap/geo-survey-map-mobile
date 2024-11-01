import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  wrapper: { flex: 1 },
  safeAreaView: {
    backgroundColor: theme.background,
    flex: 1,
  },
  container: {
    paddingBottom: 12,
    paddingHorizontal: 12,
    flex: 1,
  },
  wrapperContentContainer: {
    alignSelf: 'stretch',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    padding: 12,
    paddingBottom: 24,
  },
}));
