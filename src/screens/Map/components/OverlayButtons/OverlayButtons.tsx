import React from 'react';
import { View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { ButtonType, MapButton } from '@/components/RectButton/MapButton';
import { useAuth } from '@/hooks/useAuth';
import { Sheet } from '@/types/sheets';

import { stylesheet } from './OverlayButtons.styles';

type Props = {
  isUserFocused: boolean;
  onUserFocus: () => void;
  onOpenProfile: () => void;
};

export const OverlayButtons: React.FC<Props> = ({ isUserFocused, onUserFocus, onOpenProfile }) => {
  const { styles, theme } = useStyles(stylesheet);
  const { isAuthenticated, handleLogin } = useAuth();

  const showFilters = () => {
    SheetManager.show(Sheet.Filters);
  };

  return (
    <SafeAreaView style={styles.container} pointerEvents={'box-none'}>
      <View style={styles.buttonRow}>
        <MapButton type={ButtonType.FILTER} onPress={showFilters} />
        {isAuthenticated ? (
          <MapButton type={ButtonType.PROFILE} onPress={onOpenProfile} />
        ) : (
          <MapButton type={ButtonType.LOGIN} onPress={handleLogin} />
        )}
      </View>
      <View style={[styles.buttonRow, styles.rowReversed]}>
        <MapButton
          type={ButtonType.LOCALIZE}
          onPress={onUserFocus}
          iconColor={isUserFocused ? theme.primary : undefined}
        />
      </View>
    </SafeAreaView>
  );
};
