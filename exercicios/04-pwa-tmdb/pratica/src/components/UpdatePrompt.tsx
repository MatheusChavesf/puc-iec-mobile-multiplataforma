// src/components/UpdatePrompt.tsx
// ✅ AVALIATIVO — TODO 3 (parte 2)
//
// Avisos do Service Worker (vite-plugin-pwa, registerType: 'prompt'):
//   - offlineReady → "App pronto para uso offline" (dispensável)
//   - needRefresh  → "Nova versão disponível" com Atualizar / Depois
// Sem aviso ativo, não renderiza nada.
// Só funciona no BUILD (npm run build && npm run preview).

import { useRegisterSW } from 'virtual:pwa-register/react';

const boxStyle: React.CSSProperties = {
  position: 'fixed',
  left: 16,
  right: 16,
  bottom: 80, // acima da BottomTabBar
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '12px 16px',
  borderRadius: 12,
  background: '#0d253f',
  color: '#fff',
  border: '1px solid #01b4e4',
  boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
  fontSize: 14,
};

const buttonStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
};

export function UpdatePrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (needRefresh) {
    return (
      <div role="alert" style={boxStyle}>
        <span style={{ flex: 1 }}>Nova versão disponível</span>
        <button
          type="button"
          style={{ ...buttonStyle, background: '#01b4e4', color: '#0d253f' }}
          onClick={() => updateServiceWorker(true)}
        >
          Atualizar
        </button>
        <button
          type="button"
          style={{ ...buttonStyle, background: 'transparent', color: '#90a4ae' }}
          onClick={() => setNeedRefresh(false)}
        >
          Depois
        </button>
      </div>
    );
  }

  if (offlineReady) {
    return (
      <div role="status" style={boxStyle}>
        <span style={{ flex: 1 }}>App pronto para uso offline</span>
        <button
          type="button"
          style={{ ...buttonStyle, background: 'transparent', color: '#90a4ae' }}
          onClick={() => setOfflineReady(false)}
        >
          OK
        </button>
      </div>
    );
  }

  return null;
}
