// src/storage/mmkv.ts
//
// ATIVIDADE 2 — TASK 7 (storage síncrono)
//
// MMKV (C++ via JSI) é ~30x mais rápido que AsyncStorage e é síncrono.
// Funciona em iOS/Android nativo. Em web usa localStorage. Se o módulo nativo
// não estiver disponível (ex.: Jest em Node), cai para um Map em memória, para
// que o app e os testes nunca quebrem por falta de storage.
//
// Doc: https://github.com/mrousavy/react-native-mmkv

type Adapter = {
  getString: (key: string) => string | undefined;
  set: (key: string, value: string) => void;
  delete: (key: string) => void;
};

function createMemoryAdapter(): Adapter {
  const map = new Map<string, string>();
  return {
    getString: (k) => map.get(k),
    set: (k, v) => {
      map.set(k, v);
    },
    delete: (k) => {
      map.delete(k);
    },
  };
}

function createAdapter(): Adapter {
  const isWeb =
    typeof window !== 'undefined' &&
    typeof window.localStorage !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    navigator.product !== 'ReactNative' &&
    typeof (globalThis as { jest?: unknown }).jest === 'undefined' &&
    typeof process !== 'undefined' &&
    process.env.JEST_WORKER_ID === undefined;

  if (isWeb) {
    return {
      getString: (k) => window.localStorage.getItem(k) ?? undefined,
      set: (k, v) => window.localStorage.setItem(k, v),
      delete: (k) => window.localStorage.removeItem(k),
    };
  }

  try {
    // require tardio: só carrega o módulo nativo quando realmente estamos em iOS/Android.
    const { MMKV } = require('react-native-mmkv');
    const storage = new MMKV({ id: 'favorites-store' });
    return {
      getString: (k) => storage.getString(k),
      set: (k, v) => storage.set(k, v),
      delete: (k) => storage.delete(k),
    };
  } catch {
    return createMemoryAdapter();
  }
}

const adapter = createAdapter();

// Mesma interface usada pelo Zustand (compatível com StateStorage).
export const mmkvStorage = {
  getItem: (name: string): string | null => adapter.getString(name) ?? null,
  setItem: (name: string, value: string): void => adapter.set(name, value),
  removeItem: (name: string): void => adapter.delete(name),
};
