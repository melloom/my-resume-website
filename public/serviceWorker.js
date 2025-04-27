// Cache names
const CACHE_NAME = 'melvin-peralta-portfolio-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache immediately on install
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/photo 1.jpg',
  '/favicon.ico',
  '/manifest.json',
  '/static/js/main.js',
  '/static/css/main.css',
  '/icons/logo192.png',
  '/icons/logo512.png',
  '/icons/maskable_icon.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-16x16.png',
  '/icons/favicon-32x32.png',
  '/icons/safari-pinned-tab.svg',
  '/images/school/anne-arundel-cc.jpg',
  '/images/school/cat-north.jpg',
  '/images/school/Meade-hs.jpg',
  '/images/school/Resume/Resume.pdf'
];

// Install event - Cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching core assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
      .catch(error => console.log('Failed to cache assets: ', error))
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map(name => {
            console.log('Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper function to determine if request is an image
const isImage = (request) => {
  return request.destination === 'image' || 
    request.url.match(/\.(jpe?g|png|gif|svg|webp)$/i);
};

// Helper function to determine if request is a document
const isDocument = (request) => {
  return request.destination === 'document' || 
    request.url.endsWith('.html');
};

// Helper function to determine if request is for an API
const isApiRequest = (request) => {
  return request.url.includes('/api/');
};

// Helper function to determine if request is for a font
const isFont = (request) => {
  return request.destination === 'font' || 
    request.url.match(/\.(woff|woff2|ttf|otf|eot)$/i);
};

// Fetch event - Implement caching strategies
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached response if found
      if (cachedResponse) {
        return cachedResponse;
      }

      return caches.open(RUNTIME_CACHE).then(cache => {
        return fetch(event.request)
          .then(response => {
            // Cache successful responses
            if (response.status === 200) {
              // Cache images and fonts with cache-first strategy
              if (isImage(event.request) || isFont(event.request)) {
                cache.put(event.request, response.clone());
              }
              
              // Cache HTML pages with network-first strategy
              if (isDocument(event.request) && !event.request.url.includes('chrome-extension://')) {
                cache.put(event.request, response.clone());
              }
            }
            return response;
          })
          .catch(error => {
            console.log('Fetch failed; returning offline page instead.', error);
            
            // For HTML documents, return the offline page
            if (isDocument(event.request)) {
              return caches.match(OFFLINE_URL);
            }
            
            // For API requests, return an empty JSON response
            if (isApiRequest(event.request)) {
              return new Response(JSON.stringify({ error: 'You are offline' }), {
                headers: { 'Content-Type': 'application/json' }
              });
            }
            
            // For images, return a placeholder
            if (isImage(event.request)) {
              return caches.match('/icons/offline-image.png');
            }
            
            // Default fallback
            return new Response('Network error happened', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' },
            });
          });
      });
    })
  );
});

// Listen for push notifications
self.addEventListener('push', event => {
  const title = 'Melvin Peralta Portfolio';
  const options = {
    body: event.data.text() || 'New update from Melvin Peralta',
    icon: '/icons/logo192.png',
    badge: '/icons/notification-badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
