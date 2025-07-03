const CACHE_NAME = 'dasc-discord-safety-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/README.md',
  '/portals/discord-safety.md',
  '/portals/dasc.md',
  '/categories/safety-guidelines.md',
  '/categories/updates.md',
  '/assets/css/style.css',
  '/assets/js/app.js',
  '/manifest.json'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then(response => {
      return response || fetch(evt.request);
    })
  );
});
