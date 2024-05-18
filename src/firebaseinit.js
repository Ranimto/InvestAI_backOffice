import { initializeApp } from 'firebase/app';
import { getMessaging,getToken, onMessage } from 'firebase/messaging';

const config = {
    apiKey: "AIzaSyBs5aP4ezt3BwGc0RqoM5vXV7YqaWK9QQM",
    authDomain: "investai-b490e.firebaseapp.com",
    projectId: "investai-b490e",
    storageBucket: "investai-b490e.appspot.com",
    messagingSenderId: "845090844995",
    appId: "1:845090844995:web:52b30317a0482761457ff6",
    measurementId: "G-QWZCEWE6M6"
  };


// Initialize Firebase
const app = initializeApp(config);

// Initialize Firebase Messaging
const messaging = getMessaging(app);

const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const getFirebaseToken = async (setTokenFound) => {
  let currentToken = '';
  try {
      currentToken = await getToken(messaging, { vapidKey: publicKey });
      if (currentToken) {
          setTokenFound(true);
      } else {
          setTokenFound(false);
      }
  } catch (error) {
      console.error("An error occurred while retrieving token. ", error);
  }
  return currentToken;
};

export const onFirebaseMessageListener = () =>
  new Promise((resolve) => {
      onMessage(messaging, (payload) => {
          resolve(payload);
      });
  });