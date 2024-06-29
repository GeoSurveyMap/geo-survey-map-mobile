import { useGetAllSurveys } from 'geo-survey-map-shared-modules';
import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useStyles } from 'react-native-unistyles';

import { MapMarker } from '@/components/MapMarker/MapMarker';
import { useSurveyFormInitialization } from '@/hooks/useSurveyInitialization';
import { useFiltersState } from '@/store/useFilters';
import { useFormStore } from '@/store/useFormStore';
import { useMap } from '@/store/useMap';
import { usePointFocusStore } from '@/store/usePointFocus';
import { calculateBoundingBox } from '@/utils/map';

import { stylesheet } from './MapContent.styles';

// {
//   ...boundingBox,
//   categories: Object.entries(categories)
//     .filter(([_, value]) => value)
//     .map(([key]) => key as Category),
// }
type Props = {
  onMapMove: () => void;
};

export const MapContent: React.FC<Props> = ({ onMapMove }) => {
  const { styles } = useStyles(stylesheet);
  const { categories } = useFiltersState();
  // const [boundingBox, setBoundingBox] = useState({
  //   minX: 0,
  //   minY: 0,
  //   maxX: 0,
  //   maxY: 0,
  // });
  const { data } = useGetAllSurveys();
  const { triggerFormSheet } = useSurveyFormInitialization();
  const { mapRef } = useMap();
  const { location, category } = useFormStore();
  const filteredData = useMemo(() => data?.filter((survey) => categories[survey.category]), [data, categories]);
  const { setSelectedPoint, selectedPoint } = usePointFocusStore();

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
        // onRegionChangeComplete={(region) => {
        //   setBoundingBox(calculateBoundingBox(region));
        // }}
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
