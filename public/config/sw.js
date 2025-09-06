// Main Site Service Worker - Version 1.1.51 - Released 2025-09-06 18:06:57
const CACHE_NAME = 'bru-masribera-v1';
const OFFLINE_URLS = ['/', '/index.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(OFFLINE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => 
      Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension:')) return;
  if (event.request.url.includes('/tools/timer/') && !event.request.url.includes('bru.masribera.com')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(() => event.request.mode === 'navigate' ? caches.match('/index.html') : undefined)
      )
  );
});