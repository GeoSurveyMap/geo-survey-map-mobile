import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { stylesheet } from './GSMSheet.styles';

import type { PropsWithChildren } from 'react';
import type { ActionSheetProps } from 'react-native-actions-sheet';

export const GSMSheet: React.FC<PropsWithChildren<ActionSheetProps>> = ({ children, containerStyle, ...rest }) => {
  const { styles } = useStyles(stylesheet);
  const insets = useSafeAreaInsets();
  return (
    <ActionSheet
      closable={true}
      indicatorStyle={styles.indicator}
      headerAlwaysVisible={true}
      {...rest}
      containerStyle={{ ...styles.container, ...containerStyle }}
      safeAreaInsets={insets}
      enableRouterBackNavigation={true}
    >
      {children}
    </ActionSheet>
  );
};
