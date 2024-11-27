declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_API_URL: string;
      EXPO_PUBLIC_IMAGES_URL: string;
      EXPO_PUBLIC_APP_NAME: string;
      EXPO_PUBLIC_APP_VERSION: string;
      EXPO_PUBLIC_KINDE_ISSUER_URL: string;
      EXPO_PUBLIC_KINDE_POST_CALLBACK_URL: string;
      EXPO_PUBLIC_KINDE_CLIENT_ID: string;
      EXPO_PUBLIC_KINDE_POST_LOGOUT_REDIRECT_URL: string;
      EXPO_PUBLIC_GOOLE_API_KEY: string;
    }
  }
}

export {};
