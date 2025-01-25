import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from 'firebase/firestore';
import { db } from "../components/Firebase/FirebaseDB";

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [quizScores, setQuizScores] = useState([]);
  const [overallScore, setOverallScore] = useState(0);
  const [completedCourses, setCompletedCourses] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser({
          name: user.displayName || "Anonymous",
          email: user.email,
          initials: user.displayName
            ? user.displayName
              .split(" ")
              .map((n) => n[0])
              .join("")
            : "A",
          uid: user.uid,
        });

        // Fetch quiz scores and other data from backend
        fetchQuizScores(user.uid);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);


  const fetchQuizScores = async (uid) => {
    try {
      // Reference to the user's document in the Firestore database
      const userDocRef = doc(db, 'users', uid);

      // Fetch the user's document
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // Retrieve the progress field from the user's document
        const userData = userDocSnap.data();
        const progress = userData.progress || {}; // Default to an empty object if progress doesn't exist

        // Extract quiz data and count completed courses
        let completedCoursesCount = 0;
        const quizDataArray = await Promise.all(
          Object.keys(progress).map(async (topicId) => {
            const topicRef = doc(db, 'topics', topicId);
            const topicSnap = await getDoc(topicRef);
            if (topicSnap.exists() && progress[topicId].quizScore !== undefined) {
              const topicData = topicSnap.data();
              return {
                title: topicData.title || `Quiz ${topicId}`, // Default title if not available
                score: progress[topicId].quizScore,
                quizCompleted: progress[topicId].quizCompleted,
              };
            }
            return null;
          })
        );

        const validQuizData = quizDataArray.filter((data) => data !== null);

        // Count completed courses
        completedCoursesCount = validQuizData.filter((data) => data.quizCompleted).length;

        // Calculate overall score (average of all quiz scores)
        const totalScore = validQuizData.reduce((sum, data) => sum + data.score, 0);
        const averageScore = validQuizData.length > 0 ? totalScore / validQuizData.length : 0;

        // Update state with quiz data, overall score, and completed courses count
        setQuizScores(validQuizData);
        setOverallScore(Math.round(averageScore));
        setCompletedCourses(completedCoursesCount);

        console.log('Fetched quiz data:', validQuizData);
        console.log('Completed courses:', completedCoursesCount);
      } else {
        console.warn('No such user document!');
        setQuizScores([]);
        setOverallScore(0);
        setCompletedCourses(0);
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      setQuizScores([]);
      setOverallScore(0);
      setCompletedCourses(0);
    }
  };



  if (!isLoggedIn) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        {/* User Info */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center"
              style={{ width: "80px", height: "80px" }}
            >
              <span className="fs-3 fw-bold">{currentUser.initials}</span>
            </div>
            <div className="ms-3">
              <h2 className="mb-1">{currentUser.name}</h2>
              <p className="text-muted">{currentUser.email}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="row my-3">
          <div className="col-md-6">
            <div className="card bg-primary text-white p-3">
              <h5>Overall Score</h5>
              <p className="fs-4 fw-bold">{overallScore}</p>
              <small>out of 100</small>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-danger text-white p-3">
              <h5>Completed Courses</h5>
              <p className="fs-4 fw-bold">{completedCourses}</p>
              <small>out of 13 courses</small>
            </div>
          </div>

        </div>

        {/* Recent Activity */}
        <h5>Quiz Scores</h5>
        <ul className="list-group">
          {quizScores.map((quiz, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              <div>
                <h6 className="mb-1">{quiz.title}</h6>
              </div>
              <div className="text-end">
                <span className="fs-5 fw-bold text-primary">{quiz.score}</span>
                <p className="small text-muted mb-0">Score</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
