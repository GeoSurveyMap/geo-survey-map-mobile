import { useMMKVBoolean } from 'react-native-mmkv';

export const useOnboarding = () => {
  const [isOnboarded, setIsOnboarded] = useMMKVBoolean('isOnboarded');

  return { isOnboarded, setIsOnboarded };
};
