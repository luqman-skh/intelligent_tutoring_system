// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const auth = getAuth(app);
