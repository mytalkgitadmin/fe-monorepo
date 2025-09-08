// public/firebase-messaging-sw.js
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyCYGaSLLNWAUv2C0eVDCakqpBgjwR6PdrE',
  authDomain: 'pwa-test-fed59.firebaseapp.com',
  projectId: 'pwa-test-fed59',
  storageBucket: 'pwa-test-fed59.firebasestorage.app',
  messagingSenderId: '560541991015',
  appId: '1:560541991015:web:5d812ccb2d4f3081e294c2',
});

const messaging = firebase.messaging();

// 기본 서비스 워커 이벤트
self.addEventListener('install', () => {
  console.log('Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim());
});

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  const options = {
    body: body || '',
    icon: '/icons/webapp_ic_feta_144.png',
  };

  return self.registration.showNotification(title || '새 알림', options);
});
