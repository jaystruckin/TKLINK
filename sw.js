const CACHE_NAME = 'tklink-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Cache-first for static app assets and fonts (fast repeat loads)
  if (url.origin === self.location.origin ||
      url.hostname === 'fonts.googleapis.com' ||
      url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        // Return cache immediately, update in background (stale-while-revalidate)
        const fetchPromise = fetch(event.request).then(response => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(event.request, clone))
              .catch(() => {});
          }
          return response;
        }).catch(() => cached);

        return cached || fetchPromise;
      })
    );
    return;
  }

  // Network-first for API calls (live data)
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(() =>
        caches.match(event.request).then(cached =>
          cached || new Response('Offline — please reconnect', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
          })
        )
      )
  );
});
