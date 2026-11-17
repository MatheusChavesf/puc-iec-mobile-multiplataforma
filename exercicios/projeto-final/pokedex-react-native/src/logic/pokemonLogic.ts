// Regras puras (sem React, sem rede): fáceis de testar.
import type { PokemonSummary } from '../types/pokemon';

/**
 * Filtra a lista por categoria (nomes do tipo vindos da API) e por texto.
 * - `typeNames` null = sem filtro de tipo.
 * - A busca ignora maiúsculas, acentos e espaços nas pontas; também aceita o número (#25 ou 25).
 */
export function filterPokemon(
  all: PokemonSummary[],
  searchText: string,
  typeNames: Set<string> | null,
): PokemonSummary[] {
  const query = normalize(searchText).replace(/^#/, '');
  return all.filter((p) => {
    if (typeNames && !typeNames.has(p.name)) return false;
    if (!query) return true;
    return normalize(p.name).includes(query) || String(p.id) === query;
  });
}

/** Adiciona o id se não existir; remove se existir. Não muta o Set recebido. */
export function toggleId(ids: Set<number>, id: number): Set<number> {
  const next = new Set(ids);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

/** Lê a lista salva no storage de forma defensiva (JSON inválido ou valores errados viram vazio). */
export function parseFavoriteIds(raw: string | null): Set<number> {
  if (!raw) return new Set();
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((v): v is number => Number.isInteger(v) && v > 0));
  } catch {
    return new Set();
  }
}

/** "#025" — número da Pokédex com 3 dígitos. */
export function dexNumber(id: number): string {
  return `#${String(id).padStart(3, '0')}`;
}

/** A PokeAPI devolve altura em decímetros e peso em hectogramas. */
export function formatHeight(heightDm: number): string {
  return `${(heightDm / 10).toFixed(1).replace('.', ',')} m`;
}

export function formatWeight(weightHg: number): string {
  return `${(weightHg / 10).toFixed(1).replace('.', ',')} kg`;
}

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
