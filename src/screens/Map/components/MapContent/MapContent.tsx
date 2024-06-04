import { useGetAllSurveys } from 'geo-survey-map-shared-modules';
import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useStyles } from 'react-native-unistyles';

import { MapMarker } from '@/components/MapMarker/MapMarker';
import { useSurveyFormInitialization } from '@/hooks/useSurveyInitialization';
import { useFormStore } from '@/store/useFormStore';
import { useMap } from '@/store/useMap';

import { stylesheet } from './MapContent.styles';

type Props = {
  onMapMove: () => void;
};

export const MapContent: React.FC<Props> = ({ onMapMove }) => {
  const { styles } = useStyles(stylesheet);
  const { data } = useGetAllSurveys();
  const { triggerFormSheet } = useSurveyFormInitialization();
  const { mapRef } = useMap();
  const { location, category } = useFormStore();

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onLongPress={(event) => {
          triggerFormSheet({ x: event.nativeEvent.coordinate.latitude, y: event.nativeEvent.coordinate.longitude });
        }}
        mapType='hybrid'
        showsPointsOfInterest={false}
        showsUserLocation={true}
        showsCompass={false}
        onTouchMove={onMapMove}
      >
        {data?.map((survey) => (
          <Marker
            key={survey.id}
            coordinate={{
              latitude: survey.location.x,
              longitude: survey.location.y,
            }}
            onPress={() => {
              console.log(survey);
            }}
          >
            <MapMarker category={survey.category} />
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
            <MapMarker category={category} />
          </Marker>
        )}
      </MapView>
    </View>
  );
};
