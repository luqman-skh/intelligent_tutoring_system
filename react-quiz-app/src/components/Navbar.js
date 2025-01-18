import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { onAuthStateChanged } from 'firebase/auth';


import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAT2KHPIlH2AUZvtiiU1AZYMpAXXViFuak",
    authDomain: "its-hcat.firebaseapp.com",
    projectId: "its-hcat",
    storageBucket: "its-hcat.firebasestorage.app",
    messagingSenderId: "172113702731",
    appId: "1:172113702731:web:79631e07c871e07165c2ce",
    measurementId: "G-LNC6MNX9ZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export function Navbar() {

    const [userID, setUserID] = useState(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // Subscribe to both auth state changes
        const unsubscribeUserInfo = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in
            setUserID(user.uid);
            console.log("User ID:", user.uid);
          } else {
            // User is signed out
            setUserID(null);
          }
        });
      
        const unsubscribeCurrentUser = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
      
        // Cleanup both subscriptions on unmount
        return () => {
          unsubscribeUserInfo();
          unsubscribeCurrentUser();
        };
      }, []);
      


    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };

    const handleSignOut = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Intelligent Tutoring System</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item mx-2">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/">Ask Anything</Link>
                            </li>
                            <li className="nav-item mx-2">
                                <Link className="nav-link" to="/learn">Learn</Link>
                            </li>
                        </ul>
                        {user ? (
                            <Button variant="danger mx-2" onClick={handleSignOut}>Sign Out</Button>
                        ) : (
                            <Button variant="primary mx-2" onClick={handleLogin}>Login with Google</Button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
