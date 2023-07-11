import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed!');
  self.skipWaiting();
});

self.addEventListener('push', (event) => {
  console.log('Service Worker: Pushed!');

  const dataJson = event.data.json();
  const notification = {
    title: dataJson.title,
    options: {
      body: dataJson.body,
      icon: dataJson.icon,
      image: dataJson.image,
    },
  };

  event.waitUntil(self
    .registration
    .showNotification(notification.title, notification.options));
});

self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification;
  clickedNotification.close();

  const promiseChain = async () => {
    await self.clients.openWindow('https://dicoding.com');
  };

  event.waitUntil(promiseChain());
});
