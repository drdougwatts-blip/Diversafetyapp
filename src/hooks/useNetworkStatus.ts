import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    // On web, use the browser's navigator.onLine API
    if (Platform.OS === 'web') {
      const update = () => setIsConnected(navigator.onLine);
      window.addEventListener('online', update);
      window.addEventListener('offline', update);
      setIsConnected(navigator.onLine);
      return () => {
        window.removeEventListener('online', update);
        window.removeEventListener('offline', update);
      };
    }

    // On native, use expo-network
    let mounted = true;
    let interval: ReturnType<typeof setInterval>;

    const init = async () => {
      try {
        const Network = await import('expo-network');
        const checkConnection = async () => {
          try {
            const state = await Network.getNetworkStateAsync();
            if (mounted) {
              setIsConnected(state.isConnected ?? true);
            }
          } catch {
            if (mounted) {
              setIsConnected(true);
            }
          }
        };

        checkConnection();
        interval = setInterval(checkConnection, 10000);
      } catch {
        if (mounted) setIsConnected(true);
      }
    };

    init();

    return () => {
      mounted = false;
      if (interval) clearInterval(interval);
    };
  }, []);

  return isConnected;
}
