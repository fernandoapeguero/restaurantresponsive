var staticCacheName = 'res-v1';


self.addEventListener('install', function (event) {
    var cacheFiles = [
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/data/restaurants.json',
        '/js/main.js',
        '/js/dbhelper.js',
        '/js/restaurant_info.js',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg'

    ];

    event.waitUntil(

        caches.open(staticCacheName).then(function (cache) {

            return cache.addAll(cacheFiles);
        }).catch(function (err) {
            console.log('error ', err);
        })
    )
});

self.addEventListener('fetch', function (event) {

    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) return response;
            return fetch(event.request);
        })
    );

});



self.addEventListener('activate', function (event) {

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('res-') &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            )
        })
    );

});