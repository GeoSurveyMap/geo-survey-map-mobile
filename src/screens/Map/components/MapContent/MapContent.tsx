import { useGetAllSurveys } from 'geo-survey-map-shared-modules';
import React, { useEffect, useMemo } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useStyles } from 'react-native-unistyles';

import { getGeometricalScaleValue } from '@/components/GSMSlider/GSMSlider';
import { MapMarker } from '@/components/MapMarker/MapMarker';
import { useSurveyFormInitialization } from '@/hooks/useSurveyInitialization';
import { useFiltersState } from '@/store/useFilters';
import { useFormStore } from '@/store/useFormStore';
import { useMap } from '@/store/useMap';
import { usePointFocusStore } from '@/store/usePointFocus';
import { calculateLatitudeOffset } from '@/utils/map';

import { stylesheet } from './MapContent.styles';

type Props = {
  onMapMove: () => void;
};

export const MapContent: React.FC<Props> = ({ onMapMove }) => {
  const { styles } = useStyles(stylesheet);
  const { categories } = useFiltersState();
  const { data } = useGetAllSurveys();
  const { triggerFormSheet } = useSurveyFormInitialization();
  const { mapRef } = useMap();
  const { location, category, radius } = useFormStore();
  const filteredData = useMemo(() => data?.filter((survey) => categories[survey.category]), [data, categories]);
  const { setSelectedPoint, selectedPoint } = usePointFocusStore();

  useEffect(() => {
    if (!location || !radius) return;
    console.log(getGeometricalScaleValue(radius));
    const radiusValue = getGeometricalScaleValue(radius);
    const delta = radiusValue / 10000;
    mapRef.current?.animateToRegion({
      latitude: calculateLatitudeOffset(location.x, radiusValue * 11000),
      longitude: location.y,
      latitudeDelta: delta,
      longitudeDelta: delta,
    });
  }, [location, mapRef, radius]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onLongPress={(event) => {
          triggerFormSheet({
            x: event.nativeEvent.coordinate.latitude,
            y: event.nativeEvent.coordinate.longitude,
          });
        }}
        mapType='hybrid'
        showsPointsOfInterest={false}
        showsUserLocation={true}
        showsCompass={false}
        onTouchMove={onMapMove}
      >
        {filteredData?.map((survey) => (
          <Marker
            key={survey.id}
            coordinate={{
              latitude: survey.location.x,
              longitude: survey.location.y,
            }}
            onPress={() => {
              setSelectedPoint(survey);
            }}
          >
            <MapMarker category={survey.category} isFocused={selectedPoint === survey} />
          </Marker>
        ))}
        {location && (
          <Marker
            key={'form_marker'}
            coordinate={{
              latitude: location.x,
              longitude: location.y,
            }}
          >
            <MapMarker category={category} isFocused />
          </Marker>
        )}
      </MapView>
    </View>
  );
};
