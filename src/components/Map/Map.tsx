import { Category, useCreateSurvey, useGetAllSurveys } from 'geo-survey-map-shared-modules';
import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useStyles } from 'react-native-unistyles';

import { MapMarker } from '../MapMarker/MapMarker';

import { stylesheet } from './Map.styles';

type Props = {};

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

export const MapContent: React.FC<Props> = ({}) => {
  const { styles } = useStyles(stylesheet);
  const { data } = useGetAllSurveys();
  const { mutate } = useCreateSurvey();

  return (
    <View style={styles.container}>
      <MapView
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
      >
        {data?.map((survey) => (
          <Marker
            key={survey.id}
            coordinate={{
              latitude: survey.location.x,
              longitude: survey.location.y,
            }}
          >
            <MapMarker category={survey.category} />
          </Marker>
        ))}
      </MapView>
    </View>
  );
};
