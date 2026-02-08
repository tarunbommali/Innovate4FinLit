// Background Sync Service
export class SyncService {
  static async registerSync() {
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        await (registration as any).sync.register('sync-decisions');
        console.log('Background sync registered');
      } catch (error) {
        console.error('Background sync registration failed:', error);
        // Fallback to manual sync
        await this.manualSync();
      }
    } else {
      // Fallback for browsers without background sync
      await this.manualSync();
    }
  }

  static async manualSync() {
    try {
      const { db } = await import('./indexeddb');
      const unsyncedDecisions = await db.decisions
        .where('synced')
        .equals(false)
        .toArray();

      if (unsyncedDecisions.length === 0) {
        console.log('No decisions to sync');
        return;
      }

      const { apiService } = await import('./api');
      let syncedCount = 0;

      for (const queuedDecision of unsyncedDecisions) {
        try {
          await apiService.submitDecision(queuedDecision);
          
          // Mark as synced
          await db.decisions.update(queuedDecision.clientEventId, {
            synced: true
          });
          
          syncedCount++;
        } catch (error) {
          console.error('Failed to sync decision:', error);
        }
      }

      console.log(`Synced ${syncedCount} of ${unsyncedDecisions.length} decisions`);
      return syncedCount;
    } catch (error) {
      console.error('Manual sync failed:', error);
      throw error;
    }
  }

  static async checkSyncStatus() {
    try {
      const { db } = await import('./indexeddb');
      
      // Check if decisions table exists
      if (!db.decisions) {
        return { hasPending: false, pendingCount: 0 };
      }

      const unsyncedCount = await db.decisions
        .where('synced')
        .equals(false)
        .count();
      
      return {
        hasPending: unsyncedCount > 0,
        pendingCount: unsyncedCount
      };
    } catch (error) {
      console.error('Failed to check sync status:', error);
      return { hasPending: false, pendingCount: 0 };
    }
  }
}

// Auto-sync when online
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    console.log('Connection restored, triggering sync...');
    SyncService.registerSync();
  });
}
