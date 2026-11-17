# Atividade 04 — PWA TMDB offline-first (15 pts)

**Matrícula:** 258071 | **Código de Pessoa:** 1391489
**Aluno:** Matheus Chaves

## Onde está o código

`exercicios/04-pwa-tmdb/pratica/`

| TODO | Arquivo | O que fiz |
|---|---|---|
| 1 | `src/services/tmdb.ts` | `fetchPopularMovies` chama `GET /movie/popular` com `language: 'pt-BR'` e `page` |
| 2 | `vite.config.ts` | `runtimeCaching` da API (`api.themoviedb.org`, NetworkFirst, 3 s, `tmdb-api`, 50 itens / 1 dia) e dos pôsteres (`image.tmdb.org`, CacheFirst, `tmdb-images`, 200 itens / 7 dias, aceitando status 0 das respostas opacas) |
| 3 | `vite.config.ts` e `src/components/UpdatePrompt.tsx` | `registerType: 'prompt'` e os avisos "App pronto para uso offline" e "Nova versão disponível", com os botões Atualizar e Depois |
| 4 | `src/screens/HomeScreen.tsx` | aba Favoritos com a lista e os dois estados vazios |
| 5 | `src/hooks/useOfflineStatus.ts` | hook com `online`/`offline` e cleanup, mais o banner na aba Favoritos |
| — | `src/__tests__/unit/02-tmdb-service.test.ts` | escrevi o teste 3 (`page=1`) que estava como `it.todo` |
| — | `ENTREGA.md` | 3 diferenças entre site e PWA, reflexão autoUpdate × prompt e declaração de uso de IA |

## Testes

- `npm test`: 11 testes passando.
- `tsc -b`: sem erros.
- `vite build`: o `sw.js` gerado tem as regras `tmdb-api` e `tmdb-images`.
