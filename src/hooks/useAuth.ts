import { Permissions, Role, queryClient, useRegisterUser } from 'geo-survey-map-shared-modules';

import { kindeClient } from '@/libs/kinde';
import { useAppLanguageStore } from '@/store/useAppLanguage';
import { useAuthStore } from '@/store/useAuthStore';

kindeClient.isAuthenticated.then((isAuthenticated) => useAuthStore.setState({ isAuthenticated }));

export const useAuth = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const { language } = useAppLanguageStore();
  const { mutate: registerUser } = useRegisterUser();

  const handleLogin = async () => {
    const token = await kindeClient.login({
      lang: language,
    });
    if (token) {
      setIsAuthenticated(true);
      handleBackendRegister();
    }
  };

  const handleRegister = async () => {
    const token = await kindeClient.register({
      lang: language,
    });

    if (token) {
      setIsAuthenticated(true);
      handleBackendRegister();
    }
  };

  const handleBackendRegister = async () => {
    const { email, id } = await kindeClient.getUserDetails();
    registerUser({
      kindeId: id,
      email: email,
      permissions: [Permissions.POLAND],
      role: Role.ROLE_USER,
    });
  };

  const handleLogout = async () => {
    await kindeClient.logout();
    queryClient.clear();
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
