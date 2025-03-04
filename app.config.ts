import 'ts-node/register';
import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: process.env.EXPO_PUBLIC_APP_NAME,
  slug: 'geo-survey-map',
  version: process.env.EXPO_PUBLIC_APP_VERSION,
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  scheme: 'geosurveymap',
  icon: './assets/icon.png',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'eu.loess.geosurveymap',
    buildNumber: process.env.EXPO_PUBLIC_APP_BUILD_NUMBER,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'eu.loess.geosurveymap',
  },
  plugins: [
    [
      'expo-font',
      {
        fonts: [
          require.resolve('geo-survey-map-shared-modules/lib/assets/fonts/Montserrat/Montserrat-Regular.ttf'),
          require.resolve('geo-survey-map-shared-modules/lib/assets/fonts/Montserrat/Montserrat-Bold.ttf'),
          require.resolve('geo-survey-map-shared-modules/lib/assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
          require.resolve('geo-survey-map-shared-modules/lib/assets/fonts/Montserrat/Montserrat-Medium.ttf'),
        ],
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
    'expo-localization',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#000000',
        image: './assets/splash-icon.png',
        dark: {
          image: './assets/splash-icon.png',
          backgroundColor: '#222222',
        },
        imageWidth: 200,
      },
    ],
  ],
};

// eslint-disable-next-line import/no-default-export
export default config;
