import { create } from 'zustand';

import { kindeClient } from '@/libs/kinde';

type AuthStore = {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
}));
kindeClient.isAuthenticated.then((isAuthenticated) => useAuthStore.setState({ isAuthenticated }));

export const useAuth = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  const handleLogin = async () => {
    const token = await kindeClient.login();
    if (token) {
      setIsAuthenticated(true);
    }
  };

  const handleRegister = async () => {
    const token = await kindeClient.register();

    if (token) {
      setIsAuthenticated(true);
    }
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
