import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { useStyles } from 'react-native-unistyles';

import { stylesheet } from './GSMSheet.styles';
import { SheetHeader } from './components/SheetHeader/SheetHeader';

import type { PropsWithChildren } from 'react';
import type { ActionSheetProps } from 'react-native-actions-sheet';

interface Props extends ActionSheetProps {}

export const GSMSheet: React.FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <ActionSheet
      containerStyle={styles.container}
      closable={true}
      CustomHeaderComponent={<SheetHeader />}
      headerAlwaysVisible={true}
      {...rest}
    >
      {children}
    </ActionSheet>
  );
};
