import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LessonContent from "./Pages/LessonContent";
import SideMenu from "./components/SideMenu";
import QuizPage from "./Pages/QuizPage";


function App() {
  const [topicResponse, setTopicResponse] = useState("");
  const [loadingTopic, setLoadingTopic] = useState(false);
  const [errorTopic, setErrorTopic] = useState("");

  return (
    <Router>
      <div className="App">
        <ConditionalSidebar />
        <header className="App-header">
          <h1>Intelligent Tutoring System</h1>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Lesson" element={<LessonContent />} />
            <Route path="/Quiz" element={<QuizPage />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

function ConditionalSidebar() {
  const location = useLocation();
  const sideMenuRoutes = ['/Lesson'];

  return sideMenuRoutes.includes(location.pathname) ? <SideMenu /> : null;
}

export default App;
