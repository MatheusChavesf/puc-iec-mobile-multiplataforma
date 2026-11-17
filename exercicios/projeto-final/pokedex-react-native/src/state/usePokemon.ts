// Hooks de dados: a UI nunca chama fetch diretamente, só consome estes estados.
import { useCallback, useEffect, useState } from 'react';
import { fetchDetail, fetchList, fetchNamesByType } from '../api/pokeApi';
import type { PokemonDetail, PokemonSummary } from '../types/pokemon';

type Async<T> = { data: T | null; loading: boolean; error: string | null; reload: () => void };

function useAsync<T>(load: () => Promise<T>, deps: unknown[]): Async<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    load()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(friendlyError(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);
  return { data, loading, error, reload };
}

// A lista de 151 é a mesma para todas as telas: cache em memória evita baixar de novo.
let listCache: PokemonSummary[] | null = null;

export function usePokemonList(): Async<PokemonSummary[]> {
  return useAsync(async () => {
    if (listCache) return listCache;
    listCache = await fetchList();
    return listCache;
  }, []);
}

export function usePokemonDetail(id: number): Async<PokemonDetail> {
  return useAsync(() => fetchDetail(id), [id]);
}

const typeCache = new Map<string, Set<string>>();

export function useTypeNames(type: string | null): Async<Set<string> | null> {
  return useAsync(async () => {
    if (!type) return null;
    const cached = typeCache.get(type);
    if (cached) return cached;
    const names = await fetchNamesByType(type);
    typeCache.set(type, names);
    return names;
  }, [type]);
}

function friendlyError(e: unknown): string {
  const msg = e instanceof Error ? e.message : String(e);
  if (/network request failed|failed to fetch/i.test(msg)) {
    return 'Sem conexão com a internet. Verifique a rede e tente de novo.';
  }
  return msg || 'Algo deu errado. Tente de novo.';
}
