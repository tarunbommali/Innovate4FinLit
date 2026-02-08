// Service Worker for Financial Literacy Platform
const CACHE_NAME = 'finlit-v1';
const urlsToCache = [
  '/',
  '/auth/login',
  '/auth/register',
  '/dashboard',
  '/scenarios',
  '/manifest.json'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Background sync for offline decisions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-decisions') {
    event.waitUntil(syncDecisions());
  }
});

async function syncDecisions() {
  try {
    // Open IndexedDB
    const db = await openDB();
    const tx = db.transaction('decisions', 'readonly');
    const store = tx.objectStore('decisions');
    const unsyncedDecisions = await store.index('synced').getAll(false);

    // Sync each decision
    for (const decision of unsyncedDecisions) {
      try {
        const response = await fetch('http://localhost:3001/api/v1/decisions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify(decision.decision)
        });

        if (response.ok) {
          // Mark as synced
          const updateTx = db.transaction('decisions', 'readwrite');
          const updateStore = updateTx.objectStore('decisions');
          decision.synced = true;
          await updateStore.put(decision);
        }
      } catch (error) {
        console.error('Failed to sync decision:', error);
      }
    }

    console.log('Background sync completed');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('FinancialLiteracyDB', 1);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
