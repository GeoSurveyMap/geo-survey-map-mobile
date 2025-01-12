import { type Survey, TextType } from 'geo-survey-map-shared-modules';
import { ChevronDown } from 'geo-survey-map-shared-modules/lib/assets/icons';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useStyles } from 'react-native-unistyles';

import { GSMText } from '@/components/GSMText/GSMText';
import { MapMarker } from '@/components/MapMarker/MapMarker';
import { formatDateTime } from '@/utils/format';
import { isIOS } from '@/utils/platform';

import { stylesheet } from './AddedPointsListItem.styles';

import type { SurveyStatus } from 'geo-survey-map-shared-modules';

type Props = {
  item: Survey;
  index: number;
  onPress: () => void;
};

const colorForStatus: Record<SurveyStatus, string> = {
  PENDING: 'orange',
  ACCEPTED: 'green',
  REJECTED: 'red',
};

export const AddedPointsListItem: React.FC<Props> = memo(({ item, index, onPress }) => {
  const { styles, theme } = useStyles(stylesheet);
  const { t } = useTranslation();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Minimap survey={item} />
      <View style={[styles.textsContainer, { justifyContent: 'space-between' }]}>
        <View style={styles.textsContainer}>
          <GSMText textStyle={TextType.H4}>
            <GSMText textStyle={TextType.H4} style={{ fontWeight: 400 }}>
              #{index + 1}{' '}
            </GSMText>
            {t(`category.${item.category}`)}
          </GSMText>
          <GSMText>{item.location.name}</GSMText>
        </View>
        <GSMText>
          {t('pointStatus.status')}:{' '}
          <GSMText
            color={colorForStatus[item.status]}
            style={{
              fontWeight: 'bold',
            }}
          >
            {t(`pointStatus.${item.status}`)}
          </GSMText>
        </GSMText>
        <GSMText>{formatDateTime(item.createdAt)}</GSMText>
      </View>
      <View style={styles.chevronWrapper}>
        <ChevronDown color={theme.textFaded} style={styles.chevron} />
      </View>
    </Pressable>
  );
});

AddedPointsListItem.displayName = 'AddedPointsListItem';

const Minimap = memo(({ survey }: { survey: Survey }) => (
  <View style={{ borderRadius: 8, height: 80, width: 80, pointerEvents: 'none', overflow: 'hidden' }}>
    <MapView
      // hides Google logo on Android
      style={{ width: 80, height: 120, transform: [{ translateY: isIOS ? -20 : -5 }] }}
      camera={{
        center: { latitude: survey.location.x, longitude: survey.location.y },
        altitude: 250,
        zoom: 15,
        heading: 0,
        pitch: 0,
      }}
      mapType='hybrid'
      showsPointsOfInterest={false}
      showsUserLocation={false}
      showsCompass={false}
      cacheEnabled={true}
      loadingEnabled={false}
    >
      <Marker
        coordinate={{
          latitude: survey.location.x,
          longitude: survey.location.y,
        }}
      >
        <MapMarker category={survey.category} />
      </Marker>
    </MapView>
  </View>
));

Minimap.displayName = 'Minimap';
