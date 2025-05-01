// src/firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6aFAprFX3_iw0dLj-D1AXy2PUAm_CVbg",
  authDomain: "todo-auth-app-1057d.firebaseapp.com",
  projectId: "todo-auth-app-1057d",
  storageBucket: "todo-auth-app-1057d.appspot.com",
  messagingSenderId: "756905781348",
  appId: "1:756905781348:web:0b7cf4f91e35fea2215771",
  measurementId: "G-75FJJ72LVC",
};

// ✅ Prevent re-initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
