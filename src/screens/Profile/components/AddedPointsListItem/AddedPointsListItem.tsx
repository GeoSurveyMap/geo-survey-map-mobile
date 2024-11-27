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

import { stylesheet } from './AddedPointsListItem.styles';

type Props = {
  item: Survey;
  index: number;
  onPress: () => void;
};

export const AddedPointsListItem: React.FC<Props> = ({ item, index, onPress }) => {
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
        <GSMText>{formatDateTime(item.createdAt)}</GSMText>
      </View>
      <View style={styles.chevronWrapper}>
        <ChevronDown color={theme.textFaded} style={styles.chevron} />
      </View>
    </Pressable>
  );
};

const Minimap = memo(({ survey }: { survey: Survey }) => (
  <MapView
    style={{ width: 80, height: 80, borderRadius: 8, pointerEvents: 'none' }}
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
));

Minimap.displayName = 'Minimap';
