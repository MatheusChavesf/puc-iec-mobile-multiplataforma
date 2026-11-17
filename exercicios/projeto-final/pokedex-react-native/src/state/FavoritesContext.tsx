// Estado compartilhado de favoritos: uma fonte só para lista, detalhe e aba Favoritos.
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { loadFavorites, saveFavorites } from '../storage/favoritesStore';
import { toggleId } from '../logic/pokemonLogic';

type FavoritesValue = {
  ids: Set<number>;
  ready: boolean;
  isFavorite: (id: number) => boolean;
  toggle: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<Set<number>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadFavorites()
      .then(setIds)
      .catch(() => setIds(new Set()))
      .finally(() => setReady(true));
  }, []);

  const toggle = useCallback((id: number) => {
    setIds((prev) => {
      const next = toggleId(prev, id);
      // atualização otimista: a UI muda na hora e o storage grava em seguida
      saveFavorites(next).catch(() => {});
      return next;
    });
  }, []);

  const value = useMemo<FavoritesValue>(
    () => ({ ids, ready, isFavorite: (id) => ids.has(id), toggle }),
    [ids, ready, toggle],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites precisa estar dentro de <FavoritesProvider>');
  return ctx;
}
