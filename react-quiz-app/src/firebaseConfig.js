// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "",
    authDomain: "its-hcat.firebaseapp.com",
    projectId: "its-hcat",
    storageBucket: "its-hcat.firebasestorage.app",
    messagingSenderId: "",
    appId: "e",
    measurementId: ""
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
