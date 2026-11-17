# ADR-0001: Stack mobile para app de catálogo e pedidos de loja de roupas local

## Status

`Aceito`

**Autor:** Matheus Chaves
**Matrícula:** 258071 | **Código de Pessoa:** 1391489

## Contexto

- **Produto:** app de catálogo (fotos, tamanhos, preços) e pedidos para uma loja de roupas local (Cenário C).
- **Escala alvo:** clientes de um único bairro/cidade, volume baixo de pedidos, sem previsão de várias lojas.
- **Time:** 3 desenvolvedores, todos com experiência em JavaScript/web e nenhuma em Kotlin, Swift ou Dart.
- **Prazo:** lançar em 2 meses, com o app disponível para Android e iOS (clientes usam os dois).
- **Restrição:** orçamento curto. Manter duas bases de código ou formar o time em outra linguagem consome o prazo.
- **Requisitos técnicos:** lista de produtos com imagens, carrinho, envio de pedido, notificação de status (push) e câmera/galeria só para fotos de perfil. Nada que exija hardware avançado ou desempenho gráfico extremo.

## Decisão

Adotaremos **React Native com Expo** (TypeScript) como stack, com uma única base de código para Android e iOS.

## Alternativas consideradas

| Alternativa | Prós | Contras |
|---|---|---|
| **React Native + Expo** (escolhida) | Reaproveita o conhecimento de JS/React do time, curva de aprendizado curta. Uma base de código para as duas lojas. Expo cuida de build, atualizações OTA e push (EAS), o que reduz trabalho de infraestrutura. Componentes nativos reais, com boa experiência de uso. | Dependência de bibliotecas de terceiros e das atualizações do ecossistema. Módulos nativos muito específicos exigem sair do fluxo gerenciado do Expo. Desempenho inferior ao nativo em casos extremos (não é o caso aqui). |
| **PWA** | Mesmo conhecimento web, sem loja de app, deploy instantâneo. Menor custo de manutenção. | Push no iOS tem suporte mais recente e limitado, e a instalação é menos óbvia para o cliente. O negócio quer presença nas lojas. Menos integração com recursos do sistema. |
| **Flutter** | UI consistente nas duas plataformas, bom desempenho, ferramentas de teste maduras. | Exige aprender Dart e o modelo de widgets. Com 2 meses de prazo, a curva de aprendizado de 3 pessoas consome parte relevante do cronograma. |
| **Nativo (Kotlin + Swift)** | Melhor desempenho e acesso total à plataforma. | Duas bases de código e duas linguagens novas para o time. Inviável no prazo e no orçamento. |

## Consequências

**Positivas:**
- O time começa a entregar funcionalidades desde a primeira semana, sem treinamento em nova linguagem.
- Uma única base de código reduz o custo de correção de bugs e de novas funcionalidades nas duas plataformas.
- O Expo (EAS Build e EAS Update) permite publicar correções pequenas sem esperar nova revisão das lojas, dentro das regras delas.

**Negativas:**
- Parte do ganho de velocidade depende de bibliotecas mantidas pela comunidade. Será preciso fixar versões e acompanhar as atualizações do Expo SDK.
- Se surgir um requisito que exija código nativo próprio (por exemplo, integração com um leitor de hardware), será necessário usar módulos nativos ou o fluxo bare, com custo maior.
- A Airbnb abandonou o React Native em 2018 por causa da escala e da manutenção de uma ponte para seus times nativos. O risco é baixo para um app pequeno de uma loja, mas a decisão deve ser revista se o produto crescer muito ou se o time passar a ter especialistas nativos.

## Referências

- React Native, documentação oficial. https://reactnative.dev/docs/getting-started
- Expo, documentação oficial (EAS Build, EAS Update, notificações). https://docs.expo.dev
- Nygard, M. (2011). *Documenting Architecture Decisions*, formato de ADR usado aqui. https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions
- Charland, A.; Leroux, B. (2011). *Mobile Application Development: Web vs. Native*. Communications of the ACM, 54(5).
- Airbnb Engineering (2018). *Sunsetting React Native*. https://medium.com/airbnb-engineering/sunsetting-react-native-1868ba28e30a
