import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { MMKV } from 'react-native-mmkv';

import type { MMKVConfiguration } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

const encryptedStorageConfig: MMKVConfiguration = {
  id: 'gsm-storage',
};

const storage = new MMKV(encryptedStorageConfig);

// -- Tanstack Query with MMKV storage

const queryStorage = {
  setItem: (key: string, value: string | number | boolean) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
};

export const queryClientPersister = createSyncStoragePersister({ storage: queryStorage });

// -- Zustand with MMKV storage

export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};
