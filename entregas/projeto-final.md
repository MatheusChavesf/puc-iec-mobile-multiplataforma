# Projeto Final — Pokédex em React Native (30 pts)

**Matrícula:** 258071 | **Código de Pessoa:** 1391489
**Grupo:** Matheus Chaves + (preencher, 3 a 4 pessoas)

## Onde está o código

`exercicios/projeto-final/pokedex-react-native/`. Parti do skeleton `pokeapi/react-native` (Opção A, tema PokeAPI).

- `README.md`: features, como rodar, arquitetura e lugar dos screenshots.
- `ADR.md`: por que React Native, por que Context + AsyncStorage e as alternativas que descartei.

| Feature | Como ficou |
|---|---|
| 1 Lista | 151 pokémons da PokeAPI, com estados de carregando, erro e "Tentar de novo" |
| 2 Detalhe | sprite, número, tipos coloridos, altura e peso |
| 3 Busca | por nome ou número, sem diferenciar maiúsculas e acentos |
| 4 Filtro | chips de tipo usando `/type/{name}` da API |
| 5 Favoritos | Context + AsyncStorage, dá para favoritar na lista ou no detalhe, e a aba mostra o contador |

Para a nota de UI/UX também fiz tema claro e escuro, tokens de design em `src/theme/tokens.ts`, cores por tipo, estados vazios com dica, acessibilidade e orientação livre.

## Testes

- `npm test`: 12 testes passando (o enunciado pede pelo menos 3).
- `npm run typecheck`: sem erros.
- `npx expo export --platform android`: o bundle JS compila.
- Dependências alinhadas com o Expo SDK 57 (`expo install --fix`).
