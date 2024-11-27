import { LinearGradient } from 'expo-linear-gradient';
import {
  Category,
  colors,
  gradientForSurveyMapMarker,
  iconForSurveyMapMarker,
  icons,
} from 'geo-survey-map-shared-modules';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useStyles } from 'react-native-unistyles';

import { useMap } from '@/store/useMap';
import { usePointFocusStore } from '@/store/usePointFocus';
import { hexToAlpha } from '@/utils/colors';
import { calculateMetersPerPixel } from '@/utils/map';
import { SCREEN_WIDTH, isAndroid } from '@/utils/platform';

import { stylesheet } from './MapMarker.styles';

import type { BoundingBox } from 'react-native-maps';

type Props = {
  category?: Category;
  affectedArea?: number;
  isFocused?: boolean;
};

const QuestionMark = icons.Question as React.FunctionComponent<React.SVGAttributes<SVGElement>>;

export const MapMarker: React.FC<Props> = ({ category, affectedArea, isFocused }) => {
  const { styles } = useStyles(stylesheet);
  const backgroundGradient = category ? gradientForSurveyMapMarker[category] : [colors.GRAY, colors.GRAY];
  const Icon = category ? iconForSurveyMapMarker[category] : QuestionMark;
  const iconColor = category === Category.DRY_SOILS ? colors.BLACK : colors.WHITE;

  return (
    <Animated.View style={[styles.marker, isFocused && styles.markerFocused]} entering={FadeIn} exiting={FadeOut}>
      {isFocused && affectedArea !== undefined && (
        <AffectedAreaCircle radius={affectedArea} color={backgroundGradient[0]} />
      )}
      <LinearGradient colors={backgroundGradient} style={styles.background} />
      <Icon color={iconColor} />
    </Animated.View>
  );
};

const AffectedAreaCircle: React.FC<{ radius: number; color: string }> = ({ radius, color }) => {
  const { mapRef } = useMap();
  const [size, setSize] = useState(0);
  const { selectedPoint } = usePointFocusStore();

  useEffect(() => {
    if (!selectedPoint) return;

    mapRef.current?.setCamera({
      center: { latitude: selectedPoint.location.x, longitude: selectedPoint.location.y },
      altitude: 100,
      zoom: 15, // TODO: Test on Android
    });
  }, [mapRef, selectedPoint]);

  const handleZoomOut = useCallback(async () => {
    const camera = await mapRef.current?.getCamera();
    if (!camera) return;

    if (isAndroid) {
      if (camera.zoom !== undefined) {
        camera.zoom -= 1;
      }
    } else {
      if (camera.altitude !== undefined) {
        camera.altitude *= 2;
      }
    }

    mapRef.current?.setCamera(camera);
    return mapRef.current?.getMapBoundaries();
  }, [mapRef]);

  const handleZoomIn = useCallback(async () => {
    const camera = await mapRef.current?.getCamera();
    if (!camera) return;

    if (isAndroid) {
      if (camera.zoom !== undefined) {
        camera.zoom += 1;
      }
    } else {
      if (camera.altitude !== undefined) {
        camera.altitude /= 2;
      }
    }

    mapRef.current?.setCamera(camera);
    return mapRef.current?.getMapBoundaries();
  }, [mapRef]);

  const calculateSize = useCallback(
    (boundingBox: BoundingBox) => {
      const metersPerPixel = calculateMetersPerPixel(boundingBox);
      return (radius * 2) / metersPerPixel;
    },
    [radius],
  );

  const setCircleSize = useCallback(async () => {
    const mapBoundaries = await mapRef.current?.getMapBoundaries();
    if (!mapBoundaries) return;

    let size = calculateSize(mapBoundaries);

    while (size > SCREEN_WIDTH || (radius > 5 && size <= 50)) {
      if (size < 50) {
        const newMapBoundaries = await handleZoomIn();
        if (!newMapBoundaries) return;
        size = calculateSize(newMapBoundaries);
      } else {
        const newMapBoundaries = await handleZoomOut();
        if (!newMapBoundaries) return;
        size = calculateSize(newMapBoundaries);
      }
    }

    setSize(size);
  }, [calculateSize, handleZoomIn, handleZoomOut, mapRef, radius]);

  useEffect(() => {
    setCircleSize();
  }, [setCircleSize]);

  return (
    <View
      style={{
        width: size,
        height: size,
        backgroundColor: hexToAlpha(color, 0.3),
        borderColor: color,
        borderRadius: 9999,
        borderWidth: 2,
        opacity: 0.7,
        position: 'absolute',
      }}
    />
  );
};
