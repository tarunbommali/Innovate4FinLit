'use client';

import { useEffect, useState } from 'react';
import { SyncService } from '@/services/sync';

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [pendingSync, setPendingSync] = useState(0);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    // Check initial status
    setIsOnline(navigator.onLine);
    checkPendingSync();

    // Listen for online/offline events
    const handleOnline = async () => {
      setIsOnline(true);
      await handleSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check pending sync periodically
    const interval = setInterval(checkPendingSync, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  const checkPendingSync = async () => {
    try {
      const status = await SyncService.checkSyncStatus();
      setPendingSync(status.pendingCount);
    } catch (error) {
      console.error('Error checking sync status:', error);
      setPendingSync(0);
    }
  };

  const handleSync = async () => {
    if (!isOnline || syncing) return;
    
    setSyncing(true);
    try {
      await SyncService.manualSync();
      await checkPendingSync();
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setSyncing(false);
    }
  };

  if (isOnline && pendingSync === 0) {
    return null; // Don't show anything when online and synced
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 ${
        isOnline ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
      }`}>
        {!isOnline && (
          <>
            <span className="text-lg">📡</span>
            <span className="text-sm font-medium">Offline Mode</span>
          </>
        )}
        
        {isOnline && pendingSync > 0 && (
          <>
            <span className="text-lg">🔄</span>
            <span className="text-sm font-medium">
              {syncing ? 'Syncing...' : `${pendingSync} pending`}
            </span>
            {!syncing && (
              <button
                onClick={handleSync}
                className="ml-2 text-xs underline hover:no-underline"
              >
                Sync now
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
