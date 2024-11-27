import { createStyleSheet } from 'react-native-unistyles';

import { DEFAULT_SCREEN_CONTAINER_PADDING } from '@/components/DefaultScreenContainer/DefaultScreenContainer.styles';

export const stylesheet = createStyleSheet({
  screen: {
    flex: 1,
    marginHorizontal: -DEFAULT_SCREEN_CONTAINER_PADDING,
    paddingHorizontal: DEFAULT_SCREEN_CONTAINER_PADDING,
  },
  emptyText: { padding: 12, paddingVertical: 24, opacity: 0.8, textAlign: 'center' },
  list: {
    gap: 12,
  },
});
