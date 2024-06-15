import { KindeSDK } from '@kinde-oss/react-native-sdk-0-7x';
import { axiosClient } from 'geo-survey-map-shared-modules';

export const kindeClient = new KindeSDK(
  process.env.EXPO_PUBLIC_KINDE_ISSUER_URL,
  process.env.EXPO_PUBLIC_KINDE_POST_CALLBACK_URL,
  process.env.EXPO_PUBLIC_KINDE_CLIENT_ID,
  process.env.EXPO_PUBLIC_KINDE_POST_LOGOUT_REDIRECT_URL,
);

axiosClient.interceptors.request.use(
  async (config) => {
    const isAuthenticated = await kindeClient.isAuthenticated;

    if (isAuthenticated) {
      const token = await kindeClient.getToken();
      config.headers.Authorization = `Bearer ${token.access_token}`;
    }

    console.log(config);

    return config;
  },
  (error) => Promise.reject(error),
);
