import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "A",
  authDomain: "its-hcat.firebaseapp.com",
  projectId: "its-hcat",
  storageBucket: "its-hcat.firebasestorage.app",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db };
