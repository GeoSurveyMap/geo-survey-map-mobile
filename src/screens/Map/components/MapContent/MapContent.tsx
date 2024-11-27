import { useGetAllSurveys } from 'geo-survey-map-shared-modules';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { SheetManager } from 'react-native-actions-sheet';
import MapView, { Marker } from 'react-native-maps';
import { useStyles } from 'react-native-unistyles';

import { MapMarker } from '@/components/MapMarker/MapMarker';
import { useSurveyFormInitialization } from '@/hooks/useSurveyInitialization';
import { useFiltersState } from '@/store/useFilters';
import { useFormStore } from '@/store/useFormStore';
import { useMap } from '@/store/useMap';
import { usePointFocusStore } from '@/store/usePointFocus';
import { Sheet } from '@/types/sheets';

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
              SheetManager.show(Sheet.Point, { payload: { point: survey } });
              setSelectedPoint(survey);
            }}
          >
            <MapMarker
              category={survey.category}
              affectedArea={survey.affectedArea}
              isFocused={selectedPoint?.id === survey.id}
            />
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
            <MapMarker category={category} affectedArea={radius} isFocused />
          </Marker>
        )}
      </MapView>
    </View>
  );
};
