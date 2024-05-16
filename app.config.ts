import 'ts-node/register';
import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: process.env.EXPO_PUBLIC_APP_NAME || 'Geo Survey Map',
  slug: 'geo-survey-map',
  version: process.env.EXPO_PUBLIC_APP_VERSION || '0.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'light',
  splash: {
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.geosurvey.map.mobile',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.geosurvey.map.mobile',
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
