import { useState, useEffect } from 'react';
import * as Network from 'expo-network';

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    const checkConnection = async () => {
      try {
        const state = await Network.getNetworkStateAsync();
        if (mounted) {
          setIsConnected(state.isConnected ?? true);
        }
      } catch {
        if (mounted) {
          setIsConnected(true); // Assume connected if check fails
        }
      }
    };

    checkConnection();

    // Poll every 10 seconds
    const interval = setInterval(checkConnection, 10000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return isConnected;
}
