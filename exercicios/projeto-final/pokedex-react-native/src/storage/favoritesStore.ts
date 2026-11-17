// Camada de dados local: favoritos persistidos no AsyncStorage (sobrevivem a fechar o app).
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseFavoriteIds, toggleId } from '../logic/pokemonLogic';

const KEY = 'favorite_pokemon_ids';

export async function loadFavorites(): Promise<Set<number>> {
  return parseFavoriteIds(await AsyncStorage.getItem(KEY));
}

export async function saveFavorites(ids: Set<number>): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(Array.from(ids)));
}

export async function toggleFavorite(id: number): Promise<Set<number>> {
  const next = toggleId(await loadFavorites(), id);
  await saveFavorites(next);
  return next;
}
