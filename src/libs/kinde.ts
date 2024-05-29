import { KindeSDK } from '@kinde-oss/react-native-sdk-0-7x';
import { useEffect, useState } from 'react';

export const client = new KindeSDK(
  process.env.EXPO_PUBLIC_KINDE_ISSUER_URL || '',
  process.env.EXPO_PUBLIC_KINDE_POST_CALLBACK_URL || '',
  process.env.EXPO_PUBLIC_KINDE_CLIENT_ID || '',
  process.env.EXPO_PUBLIC_KINDE_POST_LOGOUT_REDIRECT_URL || '',
);

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    client.isAuthenticated.then(setIsAuthenticated);
  }, []);

  const handleLogin = async () => {
    const token = await client.login();
    if (token) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = async () => {
    await client.logout();
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    handleLogin,
    handleLogout,
  };
};
