// Design tokens: cores, espaçamento, raio e tipografia num lugar só.
import { useColorScheme } from 'react-native';

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 } as const;
export const radius = { sm: 8, md: 12, lg: 16, pill: 999 } as const;
export const font = { caption: 12, body: 15, title: 18, h2: 22, h1: 28 } as const;

export type Palette = {
  background: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  onPrimary: string;
  danger: string;
};

const light: Palette = {
  background: '#F6F7FB',
  surface: '#FFFFFF',
  surfaceAlt: '#ECEEF4',
  border: '#DDE1EA',
  text: '#1B1E28',
  textMuted: '#6B7184',
  primary: '#D32F2F',
  onPrimary: '#FFFFFF',
  danger: '#B3261E',
};

const dark: Palette = {
  background: '#0F1117',
  surface: '#1A1D27',
  surfaceAlt: '#252936',
  border: '#2F3443',
  text: '#F1F3F8',
  textMuted: '#9AA1B5',
  primary: '#EF5350',
  onPrimary: '#FFFFFF',
  danger: '#F2B8B5',
};

// Cores oficiais aproximadas de cada tipo de pokémon (usadas em chips e badges).
export const typeColors: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#E0B800',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export function typeColor(type: string): string {
  return typeColors[type] ?? '#888888';
}

/** Tema atual (claro/escuro) conforme a configuração do sistema. */
export function useTheme(): Palette {
  return useColorScheme() === 'dark' ? dark : light;
}
