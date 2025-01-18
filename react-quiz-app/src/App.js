import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LessonContent from "./Pages/LessonContent";
import SideMenu from "./components/SideMenu";
import QuizPage from "./Pages/QuizPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import Quiz from "./components/Quiz";
import LearnPage from "./Pages/LearnPage";
import FetchTest from "./components/FetchTest";

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



function App() {
  const [topicResponse, setTopicResponse] = useState("");
  const [loadingTopic, setLoadingTopic] = useState(false);
  const [errorTopic, setErrorTopic] = useState("");
  const [user, setUser] = useState(null);


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
    <Router>
      <Navbar />
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Lesson" element={<LessonContent />} />
            <Route path="/Quiz" element={<Quiz />} />
            <Route path="/fetch" element={<FetchTest />} />
            <Route path="/learn" element={<LearnPage />} />
          </Routes>
        </header>
    </Router>
  );
}


export default App;
