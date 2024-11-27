import { Permissions, Role, useRegisterUser } from 'geo-survey-map-shared-modules';

import { kindeClient } from '@/libs/kinde';
import { useAuthStore } from '@/store/useAuthStore';

kindeClient.isAuthenticated.then((isAuthenticated) => useAuthStore.setState({ isAuthenticated }));

export const useAuth = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const { mutate: registerUser } = useRegisterUser();

  const handleLogin = async () => {
    const token = await kindeClient.login();
    if (token) {
      setIsAuthenticated(true);
      handleBackendRegister();
    }
  };

  const handleRegister = async () => {
    const token = await kindeClient.register();

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
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
