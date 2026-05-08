import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration for openacs-bo project
const firebaseConfig = {
  apiKey: "AIzaSyA9p3jrmLj6apYmBkRMkhIjtAIvqBLhKlE",
  authDomain: "openacs-bo.firebaseapp.com",
  projectId: "openacs-bo",
  storageBucket: "openacs-bo.firebasestorage.app",
  messagingSenderId: "76939431270",
  appId: "1:76939431270:web:7641a8b23e00eb459dcca7",
  measurementId: "G-BSKM6EVK8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
