import { dexNumber, filterPokemon, formatHeight, formatWeight, parseFavoriteIds, toggleId } from '../src/logic/pokemonLogic';

const all = [
  { id: 4, name: 'charmander' },
  { id: 5, name: 'charmeleon' },
  { id: 6, name: 'charizard' },
  { id: 25, name: 'pikachu' },
];

describe('filterPokemon (busca + categoria)', () => {
  test('sem busca e sem tipo devolve tudo', () => {
    expect(filterPokemon(all, '', null)).toHaveLength(4);
  });

  test('busca ignora maiúsculas e espaços', () => {
    expect(filterPokemon(all, '  CHAR ', null).map((p) => p.id)).toEqual([4, 5, 6]);
  });

  test('busca pelo número com ou sem #', () => {
    expect(filterPokemon(all, '25', null).map((p) => p.name)).toEqual(['pikachu']);
    expect(filterPokemon(all, '#25', null).map((p) => p.name)).toEqual(['pikachu']);
  });

  test('filtro de tipo cruza com os nomes devolvidos pela API', () => {
    const fire = new Set(['charmander', 'charmeleon', 'charizard', 'moltres']);
    expect(filterPokemon(all, '', fire).map((p) => p.id)).toEqual([4, 5, 6]);
  });

  test('busca e tipo combinados', () => {
    const fire = new Set(['charmander', 'charizard']);
    expect(filterPokemon(all, 'zard', fire).map((p) => p.name)).toEqual(['charizard']);
    expect(filterPokemon(all, 'pika', fire)).toEqual([]);
  });
});

describe('favoritos', () => {
  test('toggleId adiciona e remove sem mutar o original', () => {
    const start = new Set([1]);
    const added = toggleId(start, 25);
    expect([...added]).toEqual([1, 25]);
    expect([...start]).toEqual([1]);
    expect([...toggleId(added, 25)]).toEqual([1]);
  });

  test('parseFavoriteIds tolera storage vazio, corrompido ou com lixo', () => {
    expect(parseFavoriteIds(null).size).toBe(0);
    expect(parseFavoriteIds('{nao é json').size).toBe(0);
    expect(parseFavoriteIds('{"a":1}').size).toBe(0);
    expect([...parseFavoriteIds('[25, "6", -1, 1.5, 6]')]).toEqual([25, 6]);
  });
});

describe('formatação', () => {
  test('dexNumber usa 3 dígitos', () => {
    expect(dexNumber(6)).toBe('#006');
    expect(dexNumber(151)).toBe('#151');
  });

  test('altura e peso convertem as unidades da PokeAPI', () => {
    expect(formatHeight(4)).toBe('0,4 m');
    expect(formatWeight(60)).toBe('6,0 kg');
  });
});
