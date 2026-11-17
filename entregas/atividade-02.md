# Atividade 02 — App RN: Favoritos + MMKV + Reanimated (15 pts)

**Matrícula:** 258071 | **Código de Pessoa:** 1391489
**Aluno:** Matheus Chaves

## Onde está o código

Editei os arquivos direto no starter, porque o autograder lê o código de lá:
`exercicios/02-app-rn-navegacao-estado/starter/`

| Arquivo | O que fiz |
|---|---|
| `src/store/counterStore.ts` | `increment`, `decrement` e `reset` (TASK 1) |
| `src/queries/movies/get-popular-movies.ts` | `useQuery` de verdade, com `staleTime` de 5 min (TASK 2) |
| `src/screens/MovieList.tsx` | `FlatList` com `MovieCard` e pull-to-refresh (TASK 3) |
| `src/store/favoritesStore.ts` | `ids`, `add`, `remove`, `toggle`, `clear` e `isFavorite`, carregando do storage ao iniciar e salvando via `subscribe` (TASKs 5 e 7) |
| `src/storage/mmkv.ts` | MMKV no Android/iOS, `localStorage` na web e memória no Jest (TASK 7) |
| `src/components/HeartButton.tsx` | arquivo novo, animação "heart pop" (opção A) com `useSharedValue`, `useAnimatedStyle` e `withSequence`/`withSpring` (TASK 8) |
| `src/components/MovieCard.tsx` e `src/screens/MovieDetail.tsx` | liguei o coração ao store (TASKs 6 e 8) |
| `__tests__/counterStore.test.ts` | 5 testes |
| `__tests__/favoritesStore.test.ts` | 6 testes, um deles confere a gravação no storage |
| `tsconfig.json` | coloquei `"./src/*"` no `paths`, que resolveu o erro do TypeScript 5.9 no painel Problems |

## Testes

- `npm test`: 11 testes passando (o CI pede 6).
- `npx tsc --noEmit`: sem erros.
