# ENTREGA — Atividade 4 (PWA)

**Nome:** Matheus Chaves · **GitHub:** MatheusChavesf

---

## 1. Site comum × PWA — 3 diferenças

Comparação entre `https://pwa-tmdb-aula4.vercel.app` (PWA) e `themoviedb.org` (site comum).

| # | Site comum | PWA | Print/evidência |
|---|---|---|---|
| 1 | Em modo avião, ao recarregar aparece a página de erro do navegador ("sem internet"). | Em modo avião, recarrega normalmente: o shell vem do precache do Service Worker e a lista vem do cache/IndexedDB. | `evidencias/01-modo-aviao.png` |
| 2 | Não pode ser instalado. Fica só como aba do navegador, com a barra de endereço. | Pode ser instalado (manifest + Service Worker). Abre em janela própria (`display: standalone`), com ícone na tela inicial. | `evidencias/02-instalar.png` |
| 3 | Ao fechar e reabrir, baixa de novo HTML, JS e imagens da rede. | Ao fechar e reabrir, abre na hora com os arquivos do cache. Os pôsteres já vistos aparecem mesmo sem rede (`tmdb-images`, CacheFirst). | `evidencias/03-reabrir.png` |

## 2. Prova do offline no meu build

- [ ] Print do **DevTools → Application → Cache Storage** com `tmdb-api` e `tmdb-images` (com itens) — `evidencias/cache-storage.png`
- [ ] Print do app em **modo avião** carregando a lista — `evidencias/offline-lista.png`
- [ ] Print do aviso **"Nova versão disponível"** — `evidencias/nova-versao.png`

Como reproduzir: `npm run build && npm run preview` → abrir http://localhost:4173 e recarregar uma vez → navegar pela lista → DevTools → Network → Offline → recarregar. Para o aviso de versão: com o preview aberto, alterar um texto, rodar `npm run build` de novo e clicar em **Update** em Application → Service Workers.

## 3. Reflexão

Para um app de **checkout** eu escolheria `prompt`. Trocar a versão no meio de um pagamento pode recarregar a página, perder o carrinho ou o formulário, ou misturar código novo com dados antigos. Com `prompt`, o usuário termina a compra e atualiza quando quiser. O risco é ele clicar em "Depois" sempre e ficar numa versão velha, o que pede uma versão mínima forçada pelo backend se houver mudança de API ou correção de segurança. Para um app de **notícias** eu escolheria `autoUpdate`. O conteúdo é leitura, recarregar custa pouco, e o importante é todo mundo ver a correção ou o layout novo logo. O risco é a página recarregar enquanto a pessoa lê e ela perder a posição no texto.

## 4. Declaração de uso de IA

Usei IA (assistente no editor) para implementar os TODOs, escrever o teste 3 do serviço TMDB e redigir este documento. Revisei o código, as estratégias de cache e a reflexão.
