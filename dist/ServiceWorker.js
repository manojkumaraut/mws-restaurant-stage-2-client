 const staticCacheName = 'restaurant-static-003';

/**
 *   Install and Caching of Asset
 */

self.addEventListener('install', event => {    
  event.waitUntil(
    caches.open(staticCacheName)
      .then(cache => {
        return cache.addAll([
          '/index.html',
          '/css/styles.css',
          '/css/font-awesome.min.css',
          '/js/dbhelper.js',
          '/js/registerServiceWorker.js',
          '/js/main.js',
          '/js/restaurant_info.js',
          '/data/restaurants.json',
          '/restaurant.html?id=1',
          '/restaurant.html?id=2',
          '/restaurant.html?id=3',
          '/restaurant.html?id=4',
          '/restaurant.html?id=5',
          '/restaurant.html?id=6',
          '/restaurant.html?id=7',
          '/restaurant.html?id=8',
          '/restaurant.html?id=9',
          '/restaurant.html?id=10',
          '/img/appoffline.png'
        ]).catch(error => {
          console.log('Caches open failed: ' + error);
        });
      })
  );
});

/**
 *   Fetch event and Offline Caching 
 */

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
            return caches.open(staticCacheName).then(cache => {
                if(event.request.url.indexOf('http') === 0){
                    cache.put(event.request, fetchResponse.clone());
                }
              return fetchResponse;
            });
          });
      }).catch(error => {
        if (event.request.url.includes('.jpg')) {
            return caches.match('/img/appoffline.png');
          }
          return new Response('Not connected to the internet', {
            status: 404,
            statusText: "Not connected to the internet"
          });
        console.log(error, 'no cache entry for:', event.request.url);
      })
    );
  });

/**
 *   Static Cache Clear
 */

  self.addEventListener('activate', event => {
    event.waitUntil(
       caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName.startsWith('restaurant-static-') && cacheName !== staticCacheName;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
    );
  });
