import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
  } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAT2KHPIlH2AUZvtiiU1AZYMpAXXViFuak",
  authDomain: "its-hcat.firebaseapp.com",
  projectId: "its-hcat",
  storageBucket: "its-hcat.firebasestorage.app",
  messagingSenderId: "172113702731",
  appId: "1:172113702731:web:79631e07c871e07165c2ce",
  measurementId: "G-LNC6MNX9ZR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db };