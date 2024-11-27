import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { BOTTOM_BAR_CONTENT_SIZE, BOTTOM_BAR_PADDING_VERTICAL } from '@/components/BottomTabBar/BottomTabBar.styles';
import { GSMButton } from '@/components/GSMButton/GSMButton';
import { ButtonType, MapButton } from '@/components/RectButton/MapButton';
import { useLocation } from '@/hooks/useLocation';
import { useSurveyFormInitialization } from '@/hooks/useSurveyInitialization';
import { useAuthStore } from '@/store/useAuthStore';
import { Sheet } from '@/types/sheets';

import { PADDING, stylesheet } from './OverlayButtons.styles';

export const OverlayButtons: React.FC = () => {
  const { styles } = useStyles(stylesheet);
  const { bottom } = useSafeAreaInsets();
  const { getLocation, isLocationLoading } = useLocation();
  const { triggerFormSheet } = useSurveyFormInitialization();
  const { isAuthenticated } = useAuthStore();
  const { t } = useTranslation();

  const handleShowFilters = () => {
    SheetManager.show(Sheet.Filters);
  };

  const handleAddPointInCurrentLocation = async () => {
    if (!isAuthenticated) {
      SheetManager.show(Sheet.Login);
      return;
    }
    const location = await getLocation();
    if (!location) return;
    triggerFormSheet({ x: location.coords.latitude, y: location.coords.longitude });
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom:
            Math.max(bottom, BOTTOM_BAR_PADDING_VERTICAL) +
            BOTTOM_BAR_CONTENT_SIZE +
            BOTTOM_BAR_PADDING_VERTICAL +
            PADDING,
        },
      ]}
      pointerEvents={'box-none'}
    >
      <View style={styles.buttonRow}>
        <MapButton type={ButtonType.FILTER} onPress={handleShowFilters} />
        <GSMButton title={t('addPointHere')} onPress={handleAddPointInCurrentLocation} loading={isLocationLoading} />
      </View>
    </View>
  );
};
