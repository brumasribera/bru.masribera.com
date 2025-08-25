const CACHE_NAME = 'bru-masribera-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Files to cache immediately (critical resources)
const STATIC_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/tools/timer',
  '/tools/timer/manifest.webmanifest',
  '/site.webmanifest',
  '/favicon.ico',
  '/favicon.svg',
  '/favicon.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
  '/styles/globals.css',
  '/timer-sounds/start-gong.mp3',
  '/timer-sounds/middle-gong.mp3',
  '/timer-sounds/1m-gong.mp3',
  '/timer-sounds/end-gong.mp3'
];

// Install event - cache static files immediately
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated and old caches cleaned');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement cache-first strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and non-HTTP(S) requests
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Skip external requests (Google Fonts, analytics, etc.)
  if (url.origin !== location.origin) {
    return;
  }

  // Handle different types of requests
  if (isStaticAsset(request.url)) {
    // Static assets: cache-first strategy
    event.respondWith(handleStaticAsset(request));
  } else if (isHTMLRequest(request.url)) {
    // HTML pages: network-first with cache fallback
    event.respondWith(handleHTMLRequest(request));
  } else if (isAPIRequest(request.url)) {
    // API requests: network-first with cache fallback
    event.respondWith(handleAPIRequest(request));
  } else {
    // Default: cache-first strategy
    event.respondWith(handleDefaultRequest(request));
  }
});

// Check if request is for a static asset
function isStaticAsset(url) {
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.mp3', '.mp4', '.webp'];
  return staticExtensions.some(ext => url.includes(ext)) || 
         url.includes('/favicon') || 
         url.includes('/timer-sounds') ||
         url.includes('/manifest');
}

// Check if request is for HTML content
function isHTMLRequest(url) {
  return url.includes('.html') || 
         url === '/' || 
         url.includes('/tools/') ||
         url.includes('/cv') ||
         url.includes('/legal') ||
         url.includes('/admin/');
}

// Check if request is for API data
function isAPIRequest(url) {
  return url.includes('/api/') || 
         url.includes('/data/') ||
         url.includes('.json');
}

// Handle static assets with cache-first strategy
async function handleStaticAsset(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If not in cache, fetch from network and cache
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Failed to handle static asset:', error);
    // Return a fallback response if possible
    return new Response('Offline - Static asset not available', { status: 503 });
  }
}

// Handle HTML requests with network-first strategy
async function handleHTMLRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Network failed for HTML request, trying cache...');
  }

  // Fallback to cache
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
  } catch (error) {
    console.error('Cache fallback failed:', error);
  }

      // Return offline page if everything fails
    return caches.match('/offline.html');
}

// Handle API requests with network-first strategy
async function handleAPIRequest(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('Network failed for API request, trying cache...');
  }

  // Fallback to cache
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
  } catch (error) {
    console.error('Cache fallback failed:', error);
  }

  // Return offline response
  return new Response('Offline - Data not available', { status: 503 });
}

// Handle default requests with cache-first strategy
async function handleDefaultRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If not in cache, fetch from network and cache
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Failed to handle default request:', error);
    return new Response('Offline - Resource not available', { status: 503 });
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Handle background sync
async function doBackgroundSync() {
  try {
    // Perform any background tasks here
    console.log('Performing background sync...');
    
    // Example: sync any pending data
    // await syncPendingData();
    
    console.log('Background sync completed');
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'New notification from Bru Mas Ribera',
      icon: '/favicon-192x192.png',
      badge: '/favicon-32x32.png',
      tag: 'bru-masribera-notification',
      data: data
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Bru Mas Ribera', options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

console.log('Service Worker loaded successfully');
