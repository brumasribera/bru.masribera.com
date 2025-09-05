// Timer Service Worker - Version 1.1.47 - Released 2025-09-05 15:05:44// Main Site Service Worker - Version 1.1.45 - Released 2025-09-05 14:53:54
const CACHE_NAME = 'bru-masribera-v1';
const OFFLINE_URLS = [
  '/',
  '/index.html',
  '/apple-touch-icon.png'
];

// Main Site Service Worker - Version 1.1.41 - Released 2025-09-05 14:45:44

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching essential files');
        return cache.addAll(OFFLINE_URLS);
      })
      .then(() => {
        console.log('Service Worker installed successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('Service Worker activated successfully - all caches cleared');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other unsupported schemes
  if (event.request.url.startsWith('chrome-extension:') || 
      event.request.url.startsWith('moz-extension:') ||
      event.request.url.startsWith('safari-extension:') ||
      event.request.url.startsWith('chrome-extension://') ||
      event.request.url.includes('chrome-extension://')) {
    return;
  }

  // Skip external timer app resources - let them be handled by the external app
  if (event.request.url.includes('/tools/timer/') && 
      !event.request.url.includes('bru.masribera.com')) {
    return;
  }

  // Skip navigation requests to /tools/timer to allow redirect
  if (event.request.mode === 'navigate' && event.request.url.includes('/tools/timer')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache if not a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the response for future use
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If network fails and it's a navigation request, show offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Force reload when service worker updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FORCE_RELOAD') {
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({ type: 'RELOAD' });
      });
    });
  }
});

console.log('Service Worker loaded successfully');