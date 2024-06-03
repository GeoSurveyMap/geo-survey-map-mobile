import { KindeSDK } from '@kinde-oss/react-native-sdk-0-7x';

export const kindeClient = new KindeSDK(
  process.env.EXPO_PUBLIC_KINDE_ISSUER_URL || '',
  process.env.EXPO_PUBLIC_KINDE_POST_CALLBACK_URL || '',
  process.env.EXPO_PUBLIC_KINDE_CLIENT_ID || '',
  process.env.EXPO_PUBLIC_KINDE_POST_LOGOUT_REDIRECT_URL || '',
);
