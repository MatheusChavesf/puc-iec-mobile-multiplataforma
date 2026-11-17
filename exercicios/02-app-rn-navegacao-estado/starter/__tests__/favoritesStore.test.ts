// __tests__/favoritesStore.test.ts
//
// Testes do useFavoritesStore (Zustand + persistência MMKV).

import { useFavoritesStore } from '../src/store/favoritesStore';
import { mmkvStorage } from '../src/storage/mmkv';

describe('favoritesStore', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ ids: [] });
  });

  test('toggle adiciona o id quando ele não existe', () => {
    useFavoritesStore.getState().toggle(10);
    expect(useFavoritesStore.getState().ids).toEqual([10]);
  });

  test('toggle remove o id quando ele já existe', () => {
    useFavoritesStore.getState().toggle(10);
    useFavoritesStore.getState().toggle(10);
    expect(useFavoritesStore.getState().ids).toEqual([]);
  });

  test('isFavorite retorna true após add e false após remove', () => {
    const store = useFavoritesStore.getState();
    store.add(7);
    expect(useFavoritesStore.getState().isFavorite(7)).toBe(true);
    store.remove(7);
    expect(useFavoritesStore.getState().isFavorite(7)).toBe(false);
  });

  test('add não duplica ids repetidos', () => {
    const store = useFavoritesStore.getState();
    store.add(3);
    store.add(3);
    expect(useFavoritesStore.getState().ids).toEqual([3]);
  });

  test('clear esvazia todos os favoritos', () => {
    const store = useFavoritesStore.getState();
    store.add(1);
    store.add(2);
    store.add(3);
    store.clear();
    expect(useFavoritesStore.getState().ids).toEqual([]);
  });

  test('persiste os ids no storage a cada mudança', () => {
    useFavoritesStore.getState().add(42);
    useFavoritesStore.getState().add(43);
    expect(JSON.parse(mmkvStorage.getItem('favorites-ids') ?? '[]')).toEqual([42, 43]);
  });
});
