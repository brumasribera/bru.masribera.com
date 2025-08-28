// Timer Service Worker - Version 1.1.18 - Released 2025-08-28 10:35:20
const CACHE_NAME = 'stretch-timer-v1';
const urlsToCache = [
  '/',
  '/tools/timer',
  '/tools/timer/',
  '/favicons/favicon-timer.svg',
  '/timer-sounds/start-gong.mp3',
  '/timer-sounds/middle-gong.mp3',
  '/timer-sounds/1m-gong.mp3',
  '/timer-sounds/end-gong.mp3',
  '/tools/timer/manifest.webmanifest'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
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
});
