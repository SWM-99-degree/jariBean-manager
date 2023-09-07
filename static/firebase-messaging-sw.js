importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.0/firebase-messaging.js');



const firebaseConfig = {
  apiKey: "AIzaSyCRGiwGkiatM1kHnKWfd0tXceWHWJxiWRA",
  authDomain: "jaribean-3af6f.firebaseapp.com",
  projectId: "jaribean-3af6f",
  storageBucket: "jaribean-3af6f.appspot.com",
  messagingSenderId: "508384819940",
  appId: "1:508384819940:web:f14eda8ab95a047e19caf1",
  measurementId: "G-CQJ8KGXR9L"
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = app.messaging();

// 백그라운드에서 수신한 알림 처리
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  // 알림을 생성하거나 사용자 정의 로직을 수행합니다.
  self.registration.showNotification(title, { body });
});

