import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { i18n } from '@/libs/i18n';
import { zustandStorage } from '@/libs/mmkv';

interface AppLanguageState {
  language: string;
  setAppLanguage: (language: string) => void;
}

export const useAppLanguageStore = create<AppLanguageState>()(
  persist(
    (set) => ({
      language: '',
      setAppLanguage: (language: string) => {
        set({ language });
        i18n.changeLanguage(language);
      },
    }),
    {
      name: 'app-language',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
