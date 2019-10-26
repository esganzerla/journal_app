const CACHE_NAME = 'journal';
const TODO_NOTIFICATION_TIME = 9;
const DEV_SERVER = location.host.indexOf('localhost') > -1;

self.addEventListener('message', scheduleNotification);
self.addEventListener('fetch', handleNetwork);
self.addEventListener('activate', clearOldCache);

function scheduleNotification(event) {
  setTimeout(function() {
    self.registration.showNotification('Remember your action points!');
  }, getTimeoutForNotification());

  function getTimeoutForNotification() {
    if (DEV_SERVER) return 1000;

    const nowDate = new Date();
    const notificationDay =
      nowDate.getHours() > 0 ? nowDate.getDate() : nowDate.getDate() + 1;
    const notificationDate = new Date(
      nowDate.getFullYear(),
      nowDate.getMonth(),
      notificationDay,
      TODO_NOTIFICATION_TIME,
    );

    return +notificationDate - +nowDate;
  }
}

function handleNetwork(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return fetch(event.request).then(function(response) {
        cache.put(event.request, response.clone());
        return response;
      });
    }),
  );
}

function clearOldCache(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            return cacheName !== CACHE_NAME;
          })
          .map(function(cacheName) {
            return caches.delete(cacheName);
          }),
      );
    }),
  );
}
