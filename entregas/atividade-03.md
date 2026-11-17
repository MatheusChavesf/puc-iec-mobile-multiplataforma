# Atividade 03 — Flutter: UI + Estado + Firebase + Offline-first (15 pts)

**Matrícula:** 258071 | **Código de Pessoa:** 1391489
**Aluno:** Matheus Chaves

## Onde está o código

Como o enunciado pede, editei no lugar, sem subpasta: `exercicios/03-flutter-ui-estado/pratica/`

| TASK | Arquivo | O que fiz |
|---|---|---|
| 1 e 4 | `lib/widgets/movie_card.dart` | card com pôster, título, ⭐ nota, ano e coração (`ConsumerWidget`) |
| 2 e 7 | `lib/state/favorites.dart` | `NotifierProvider<Set<int>>` com `toggle` e `clear`, lendo e gravando `favorites/meus-favoritos` no Firestore |
| 5 e 6 | `lib/screens/home_screen.dart` | contador `♥ N` e botão de limpar (`Icons.delete_outline`) |
| 3, 7 e 10 | `lib/main.dart` | `Firebase.initializeApp` e `Settings(persistenceEnabled: true)` |
| 3 | `lib/firebase_options.dart` | arquivo novo com as configurações do Firebase |
| 9 | `test/favorites_test.dart` | 2 testes do provider com `ProviderContainer` |
| 11 | `lib/widgets/offline_banner.dart` | banner "Você está offline — mostrando dados salvos" |
| 12 | `lib/models/movie.dart` | `toJson` e `fromJson` (aceita nota inteira) |
| 13 e 14 | `lib/data/movie_repository.dart` | cache primeiro, com TTL (`cacheStatus` none/fresh/stale) |
| 15 | `lib/data/sync_queue.dart` | trata conflitos (a mesma ação não duplica, ação oposta cancela) e o `flush` roda em ordem e para no primeiro erro |
| — | `README.md` | seção de entrega com o parágrafo local × cloud × offline-first |

A TASK 8 (Remote Config) o professor adiou, então não fiz.

## Testes

- `flutter test`: todos os testes passaram (`app_test.dart`, `offline_test.dart`, `checklist_test.dart` e o meu `favorites_test.dart`).
- `flutter analyze`: sem erros nem warnings.
