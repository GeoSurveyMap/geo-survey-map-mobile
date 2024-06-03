import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { ButtonType, MapButton } from '@/components/RectButton/MapButton';
import { useAuth } from '@/hooks/useAuth';

import { stylesheet } from './OverlayButtons.styles';

type Props = {
  onUserFocus: () => void;
  isUserFocused: boolean;
};

export const OverlayButtons: React.FC<Props> = ({ onUserFocus, isUserFocused }) => {
  const { styles, theme } = useStyles(stylesheet);
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();
  return (
    <SafeAreaView style={styles.container} pointerEvents={'box-none'}>
      <View style={styles.buttonRow}>
        <MapButton type={ButtonType.FILTER} />
        {isAuthenticated ? (
          <MapButton type={ButtonType.PROFILE} onPress={handleLogout} />
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
