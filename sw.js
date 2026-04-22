// Change this version number (e.g., v11, v12) every time you update index.html
const CACHE_NAME = 'statz-v11-cache';

const ASSETS = [
  'index.html',
  'manifest.json',
  'sw.js'
];

// Install stage: Caches the files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate stage: Cleans up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch stage: Serves the app from cache even when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});