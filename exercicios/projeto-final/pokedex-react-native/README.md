# Pokédex — Projeto Final (React Native + Expo)

App de Pokédex com os 151 pokémons da 1ª geração, usando a [PokeAPI](https://pokeapi.co) (pública, sem chave).
Decisões de arquitetura: [`ADR.md`](./ADR.md).

## Features

| # | Feature | Onde |
|---|---|---|
| 1 | **Lista** com dados reais da PokeAPI | `src/screens/ListScreen.tsx` |
| 2 | **Detalhe** (sprite, número, tipos, altura e peso) | `src/screens/DetailScreen.tsx` |
| 3 | **Busca** por nome ou número (ignora maiúsculas e acentos) | `src/logic/pokemonLogic.ts` |
| 4 | **Filtro por tipo** com o parâmetro real da API (`/type/{name}`) | `ListScreen.tsx` + `src/state/usePokemon.ts` |
| 5 | **Favoritos** que sobrevivem a fechar o app (AsyncStorage) | `src/state/FavoritesContext.tsx` + `src/storage/favoritesStore.ts` |

Também tem: estados de carregando, vazio e erro com botão "Tentar de novo"; tema claro e escuro conforme o sistema; tokens de design num arquivo só (`src/theme/tokens.ts`); cores por tipo de pokémon; favoritar direto da lista; contador na aba Favoritos; rótulos de acessibilidade.

## Como rodar

```bash
cd exercicios/projeto-final/pokedex-react-native
npm install
npx expo run:android      # 1ª vez compila o projeto nativo (precisa de emulador ou celular)
```

Verificações:

```bash
npm test                  # 12 testes Jest (lógica de busca/filtro/favoritos + persistência)
npm run typecheck         # tsc --noEmit
npx expo prebuild --platform android && cd android && ./gradlew assembleDebug   # build exigido pelo enunciado
```

Os flows Maestro em `flows/` continuam válidos (os `testID` do skeleton foram mantidos): `maestro test flows/`.

## Arquitetura

```
src/
  api/pokeApi.ts            dados remotos (fetch da PokeAPI)
  storage/favoritesStore.ts dados locais (AsyncStorage)
  logic/pokemonLogic.ts     regras puras: filtro, toggle, parse defensivo, formatação
  state/usePokemon.ts       hooks de dados (loading/erro/retry + cache em memória)
  state/FavoritesContext.tsx estado compartilhado de favoritos
  theme/tokens.ts           cores (claro/escuro), espaçamento, tipografia
  components/               PokemonCard, StateView
  screens/                  List, Detail, Favorites, BottomNav
__tests__/                  testes Jest
```

Nenhuma tela chama `fetch`: as telas usam os hooks de `state/`, que usam `api/` e `storage/`.

## Screenshots

> Adicionar pelo menos 3 prints na pasta `screenshots/` (lista, detalhe e favoritos) e referenciar aqui:

| Lista | Detalhe | Favoritos |
|---|---|---|
| `screenshots/lista.png` | `screenshots/detalhe.png` | `screenshots/favoritos.png` |
