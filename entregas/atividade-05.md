# Atividade 05 — KMP: Filmes Populares (10 pts)

**Matrícula:** 258071 | **Código de Pessoa:** 1391489
**Aluno:** Matheus Chaves

## Onde está o código

Mexi em um arquivo só, direto nele:
`exercicios/05-kmp/pratica/shared/src/commonMain/kotlin/org/example/project/App.kt`

| TODO | O que fiz |
|---|---|
| 1 | `when`: token em branco mostra `TokenMissingMessage()`, carregando mostra um `CircularProgressIndicator()` centralizado, erro mostra `ErrorMessage(error!!)` e nos demais casos mostra `MovieList(movies)` |
| 2 | `LazyColumn` (fillMaxSize, padding de 16 dp, espaço de 12 dp) com o cabeçalho "N filmes populares" e `items(movies) { MovieCard(it) }` |
| 3 | `Card` com `Row`: box de 56×84 dp com a inicial do título, e uma coluna com título (2 linhas), sinopse (2 linhas) e "⭐ nota" com o ano |

Formatei a nota com uma função própria, porque `String.format` não existe em `commonMain`.

## Testes

- `./gradlew :androidApp:assembleDebug`: build concluído com sucesso.
