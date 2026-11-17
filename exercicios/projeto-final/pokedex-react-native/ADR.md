# ADR-0001: Framework e gerenciamento de estado da Pokédex

## Status

`Aceito` · **Data:** 2026-11-16 · **Autor:** Matheus Chaves (preencher com os demais integrantes do grupo)

## Contexto

- App de Pokédex com 5 features: lista, detalhe, busca, filtro por tipo e favoritos persistidos.
- Dados da PokeAPI: pública, sem chave, 151 itens. A lista inteira cabe em memória, então busca e filtro podem ser locais.
- O grupo já usou React Native na Atividade 2, Flutter na 3 e KMP na 5. O prazo é curto (uma aula).
- Critério eliminatório: o app precisa buildar para Android.

## Decisão

Usar **React Native com Expo** (TypeScript) e gerenciar o estado com **hooks próprios + um React Context** só para os favoritos, persistidos em **AsyncStorage**.

## Alternativas consideradas

| Alternativa | Prós | Contras |
|---|---|---|
| **React Native + Expo** (escolhida) | Skeleton pronto com os `testID` dos flows Maestro. Time conhece TypeScript. Jest roda sem emulador. | Dependência das versões do Expo SDK (precisamos alinhar com `expo install --fix`). |
| Flutter | UI consistente, bom desempenho, testes de widget maduros. | Dart é menos familiar ao grupo. Build mais pesado na máquina dos integrantes. |
| KMP + Compose Multiplatform | Código nativo Kotlin, UI compartilhada. | Toolchain mais pesada (Android Studio + Gradle). Menos tempo para polir UI. |

**Estado:**

| Alternativa | Por que não |
|---|---|
| Zustand / Redux | O estado global se resume a um `Set` de ids favoritos. Uma biblioteca extra não se paga aqui. |
| TanStack Query | Resolveria cache e retry, mas são só 3 endpoints. Um hook `useAsync` com cache em memória cobre o caso com menos dependências. |

## Consequências

**Positivas:**
- Camadas claras: `api/` e `storage/` (dados), `logic/` e `state/` (regras e estado), `screens/` e `components/` (UI). As telas nunca chamam `fetch`.
- A lógica de busca, filtro e favoritos é pura e foi testada sem renderizar telas (12 testes Jest).
- Favoritos são atualizados de forma otimista: a UI muda na hora e o AsyncStorage grava em seguida.

**Negativas:**
- O cache da lista é só em memória: sem internet na primeira abertura, o app mostra o erro com "Tentar de novo" em vez de dados antigos.
- Se o estado global crescer (login, listas, sincronização), o Context vai gerar renders desnecessários e valerá migrar para Zustand.
- AsyncStorage é assíncrono: há um instante no início em que os favoritos ainda não carregaram (tratado com o estado `ready`).

## Referências

- React Native, documentação oficial: https://reactnative.dev/docs/getting-started
- Expo, documentação oficial: https://docs.expo.dev
- PokeAPI, documentação: https://pokeapi.co/docs/v2
- Nygard, M. (2011). *Documenting Architecture Decisions*. https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions
