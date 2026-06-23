const CACHE_NAME = 'hello-pwa-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/main.js',
  '/manifest.json',
  '/images/hello-icon-128.png',
  '/images/hello-icon-144.png',
  '/images/hello-icon-152.png',
  '/images/hello-icon-192.png',
  '/images/hello-icon-256.png',
  '/images/hello-icon-512.png'
];

// Install Service Worker and Cache Files
self.addEventListener('install', (event) => {
  console.log('Service Worker Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching App Files');
        return cache.addAll(urlsToCache);
      })
  );

  self.skipWaiting();
});

// Activate Service Worker and Remove Old Caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Removing Old Cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );

  return self.clients.claim();
});

// Fetch Cached Content When Offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached file if available
        if (response) {
          return response;
        }

        // Otherwise fetch from network
        return fetch(event.request);
      })
      .catch(() => {
        console.log('Fetch Failed');
      })
  );
});