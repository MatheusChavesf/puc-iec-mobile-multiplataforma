jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadFavorites, toggleFavorite } from '../src/storage/favoritesStore';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('favoritesStore (persistência)', () => {
  test('começa vazio', async () => {
    expect((await loadFavorites()).size).toBe(0);
  });

  test('toggleFavorite grava e um novo load enxerga o favorito', async () => {
    await toggleFavorite(25);
    expect([...(await loadFavorites())]).toEqual([25]);
  });

  test('segundo toggle remove do storage', async () => {
    await toggleFavorite(25);
    await toggleFavorite(25);
    expect((await loadFavorites()).size).toBe(0);
  });
});
