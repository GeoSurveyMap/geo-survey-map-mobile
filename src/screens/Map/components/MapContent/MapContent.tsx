import { Category, useCreateSurvey, useGetAllSurveys } from 'geo-survey-map-shared-modules';
import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useStyles } from 'react-native-unistyles';

import { MapMarker } from '@/components/MapMarker/MapMarker';

import { stylesheet } from './MapContent.styles';

// TODO: remove once adding form is done
const categories = [
  Category.DRY_SOILS,
  Category.WET_SOILS,
  Category.EROSION,
  Category.SEALED_SOILS,
  Category.DEGRADATION,
  Category.LOSS_OF_ORGANIC_MATTER,
  Category.PH,
  Category.BIODIVERSITY,
];

type Props = {
  mapRef: React.RefObject<MapView>;
  onMapMove: () => void;
};

export const MapContent: React.FC<Props> = ({ mapRef, onMapMove }) => {
  const { styles } = useStyles(stylesheet);
  const { data, status, error } = useGetAllSurveys();
  const { mutate } = useCreateSurvey();

  console.log(status, error);
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onLongPress={(event) => {
          mutate({
            locationRequest: {
              x: event.nativeEvent.coordinate.latitude,
              y: event.nativeEvent.coordinate.longitude,
            },
            category: categories[Math.floor(Math.random() * categories.length)],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            solution: 'test',
          });
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
      </MapView>
    </View>
  );
};
