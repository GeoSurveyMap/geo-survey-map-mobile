import { SCREEN_HEIGHT, SCREEN_WIDTH } from './platform';

import type { BoundingBox, Region } from 'react-native-maps';

// It calculates the offset for the latitude based on the screen size, knowing that the sheet takes 50% of the screen height,
// and the point should be in the center of top remaining area.
export const calculateLatitudeOffset = (latitude: number, delta: number = 111000) => {
  return latitude - (SCREEN_HEIGHT * 0.5) / delta / 2;
};

export const calculateBoundingBox = (region: Region) => {
  const minX = region.latitude - region.latitudeDelta / 2;
  const maxX = region.latitude + region.latitudeDelta / 2;
  const minY = region.longitude - region.longitudeDelta / 2;
  const maxY = region.longitude + region.longitudeDelta / 2;

  return {
    minX,
    maxX,
    minY,
    maxY,
  };
};

export const calculateMetersPerPixel = (boundingBox: BoundingBox): number => {
  const { northEast, southWest } = boundingBox;
  const longitudeDifference = northEast.longitude - southWest.longitude;
  const earthCircumference = 40075017; // in meters
  const metersPerDegree =
    (earthCircumference * Math.cos(((northEast.latitude + southWest.latitude) / 2) * (Math.PI / 180))) / 360;
  const totalMeters = longitudeDifference * metersPerDegree;
  return totalMeters / SCREEN_WIDTH;
};

const BASE = 10;
const POW = 3;

export const getGeometricalScaleValue = (value: number) => {
  return Math.round(Math.pow(BASE, POW * value));
};

export const getGeometricalScaleValueWorklet = (value: number) => {
  'worklet';
  return Math.round(Math.pow(BASE, POW * value));
};

export const getReverseOfGeometricalScaleValue = (geometricalValue: number) => {
  return Math.log(geometricalValue) / Math.log(BASE) / POW;
};
