// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
const { withAndroidManifest } = require('@expo/config-plugins');

const withGeoApiKey = (config, { apiKey }) => {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;
    const metaDataItem = {
      $: {
        'android:name': 'com.google.android.geo.API_KEY',
        'android:value': apiKey,
      },
    };

    // Dodajemy meta-data do AndroidManifest.xml
    if (!androidManifest.manifest.application[0]['meta-data']) {
      androidManifest.manifest.application[0]['meta-data'] = [];
    }
    androidManifest.manifest.application[0]['meta-data'].push(metaDataItem);

    return config;
  });
};

module.exports = withGeoApiKey;
