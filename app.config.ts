import 'ts-node/register';
import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: process.env.EXPO_PUBLIC_APP_NAME,
  slug: 'geo-survey-map',
  version: process.env.EXPO_PUBLIC_APP_VERSION,
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  scheme: 'geosurveymap',
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
  plugins: [
    [
      'expo-font',
      {
        Montserrat: {
          '400': require.resolve('geo-survey-map-shared-modules/src/assets/fonts/Montserrat/Montserrat-Regular.ttf'),
          '700': require.resolve('geo-survey-map-shared-modules/src/assets/fonts/Montserrat/Montserrat-Bold.ttf'),
          '600': require.resolve('geo-survey-map-shared-modules/src/assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
          '500': require.resolve('geo-survey-map-shared-modules/src/assets/fonts/Montserrat/Montserrat-Medium.ttf'),
        },
      },
    ],
    [
      'expo-location',
      {
        locationWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
      },
    ],
    'expo-secure-store',
    [
      './plugins/expo-plugin-geo-api-key',
      {
        apiKey: process.env.EXPO_PUBLIC_GOOLE_API_KEY,
      },
    ],
  ],
};

// eslint-disable-next-line import/no-default-export
export default config;
