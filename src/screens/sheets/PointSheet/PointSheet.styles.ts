import { createStyleSheet } from 'react-native-unistyles';

export const stylesheet = createStyleSheet((theme) => ({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 0,
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
    paddingTop: 18,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
    alignSelf: 'center',
  },
  seeMoreText: {
    textDecorationLine: 'underline',
  },
}));
