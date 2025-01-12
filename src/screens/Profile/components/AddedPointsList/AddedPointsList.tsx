import { type Survey, useGetUsersSurveys } from 'geo-survey-map-shared-modules';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStyles } from 'react-native-unistyles';

import { BOTTOM_BAR_CONTENT_SIZE, BOTTOM_BAR_PADDING_VERTICAL } from '@/components/BottomTabBar/BottomTabBar.styles';
import { GSMText } from '@/components/GSMText/GSMText';
import { useAuth } from '@/hooks/useAuth';

import { AddedPointsListItem } from '../AddedPointsListItem/AddedPointsListItem';

import { stylesheet } from './AddedPointsList.styles';

import type { StyleProp, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
  header: React.ReactElement;
  headerStyle?: StyleProp<ViewStyle>;
  onNavigateToDetails: (survey: Survey) => void;
};

export const AddedPointsList: React.FC<Props> = ({ style, header, headerStyle, onNavigateToDetails }) => {
  const { styles } = useStyles(stylesheet);
  const { data, isFetching, refetch } = useGetUsersSurveys();
  const { refreshing, handleRefresh } = useUserRefresh(refetch);
  const { isAuthenticated } = useAuth();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();

  const renderItem = useCallback(
    ({ item, index }: { item: Survey; index: number }) => {
      const handleItemPress = () => {
        onNavigateToDetails(item);
      };

      return <AddedPointsListItem item={item} index={index} onPress={handleItemPress} />;
    },
    [onNavigateToDetails],
  );

  const EmptyElement = () => {
    if (!isAuthenticated) {
      return <GSMText style={styles.emptyText}>{t('pointsList.unauthorized')}</GSMText>;
    }
    if (isFetching) {
      return <ActivityIndicator />;
    }

    return <GSMText style={styles.emptyText}>{t('pointsList.noPoints')}</GSMText>;
  };

  return (
    <FlatList<Survey>
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, i) => item.id?.toString() ?? `${i}`}
      ListHeaderComponent={header}
      ListHeaderComponentStyle={headerStyle}
      ListEmptyComponent={<EmptyElement />}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      style={[styles.screen, style]}
      contentContainerStyle={[
        styles.list,
        {
          paddingBottom:
            Math.max(bottom, BOTTOM_BAR_PADDING_VERTICAL) + BOTTOM_BAR_CONTENT_SIZE + BOTTOM_BAR_PADDING_VERTICAL + 100,
        },
      ]}
    />
  );
};

// Custom hook to handle refreshing, using just tanstack-query causes view to jump and flicker
function useUserRefresh<T>(refetch: () => Promise<T>) {
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().then(() => setRefreshing(false));
  }, [refetch]);
  return { refreshing, handleRefresh };
}
