// src/hooks/useOfflineStatus.ts
// ✅ AVALIATIVO — TODO 5
//
// Rastreia o status de conexão do navegador pelos eventos `online`/`offline`.
// Teste manual: DevTools → Network → Throttling → "Offline".

import { useState, useEffect } from 'react';

export function useOfflineStatus(): { isOnline: boolean } {
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator === 'undefined' ? true : navigator.onLine,
  );

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return { isOnline };
}
