// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD6aFAprFX3_iw0dLj-D1AXy2PUAm_CVbg",
  authDomain: "todo-auth-app-1057d.firebaseapp.com",
  projectId: "todo-auth-app-1057d",
  storageBucket: "todo-auth-app-1057d.appspot.com",
  messagingSenderId: "756905781348",
  appId: "1:756905781348:web:0b7cf4f91e35fea2215771",
  measurementId: "G-75FJJ72LVC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
