import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { useStyles } from 'react-native-unistyles';

import { stylesheet } from './GSMSheet.styles';

import type { PropsWithChildren } from 'react';
import type { ActionSheetProps } from 'react-native-actions-sheet';

interface Props extends ActionSheetProps {}

export const GSMSheet: React.FC<PropsWithChildren<Props>> = ({ children, containerStyle, ...rest }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <ActionSheet
      closable={true}
      indicatorStyle={styles.indicator}
      headerAlwaysVisible={true}
      {...rest}
      containerStyle={{ ...styles.container, ...containerStyle }}
    >
      {children}
    </ActionSheet>
  );
};
