importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

const config = {
    apiKey: "AIzaSyBs5aP4ezt3BwGc0RqoM5vXV7YqaWK9QQM",
    authDomain: "investai-b490e.firebaseapp.com",
    projectId: "investai-b490e",
    storageBucket: "investai-b490e.appspot.com",
    messagingSenderId: "845090844995",
    appId: "1:845090844995:web:52b30317a0482761457ff6",
    measurementId: "G-QWZCEWE6M6"
  };


firebase.initializeApp(config)

//Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log("Received background message ", payload);
  
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/logo192.png",
    };
  
    // eslint-disable-next-line no-restricted-globals
    return self.registration.showNotification(
      notificationTitle,
      notificationOptions
    );
  });