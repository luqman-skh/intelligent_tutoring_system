import React, { useState, useEffect } from 'react';
import { collection, doc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db } from './FirebaseDB';
import { getDoc } from 'firebase/firestore';
import './Quiz.css';
import { useLocation } from 'react-router-dom';
import axios from "axios";

const Quiz = () => {

    const ASK_API_URL = "https://aa57-34-125-57-70.ngrok-free.app/fitness_calculation";
    const location = useLocation();
    const { lessonId } = location.state || {};

    const [loadingAsk, setLoadingAsk] = useState(false);
    const [errorAsk, setErrorAsk] = useState("");
    const [askResponse, setAskResponse] = useState("");
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [result, setResult] = useState(false);
    const [currentSubtopicID, setCurrentSubtopicID] = useState('');
    const [currentquestionID, setCurrentQuestionID] = useState('');
    const [difficultyDistribution, setDifficultyDistribution] = useState({}); // Store difficulty distribution
    

    const topicId = '1'; // Hardcoded for testing purpose
    const userId = 'Nyyvlfd2PIb9Bwv2AYq8awVP0EY2'; // Hardcoded UID for testing

    // Function to handle "Ask Anything"
    const getDifficulty = async () => {
        setLoadingAsk(true);
        setErrorAsk("");
        setAskResponse("");
        console.log("Calling API..."); 
        try {
            const response = await axios.post(
                ASK_API_URL,
                { user_id : "Nyyvlfd2PIb9Bwv2AYq8awVP0EY2"},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("API Response: ", response);
            console.log(response.data)
            if (response.data ) {
                setAskResponse(response.data);
                console.log(response.data.difficulty_distribution)

                // Assuming the response contains difficulty distribution like: { easy: 2, medium: 1, difficult: 0 }
                setDifficultyDistribution(response.data.difficulty_distribution);
            } else {
                setErrorAsk("Unexpected response structure from the server.");
            }
        } catch (err) {
            console.error("Error asking question:", err.response || err.message);
            setErrorAsk("Failed to fetch answer. Please try again.");
        } finally {
            setLoadingAsk(false);
        }
    };

    useEffect(() => {
        // Call the getDifficulty API to fetch the difficulty distribution
        getDifficulty();
    }, []);



    useEffect(() => {
        const fetchQuestions = async () => {
            const questionsArray = [];
            const docRef = doc(db, 'quizzes', topicId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const quizData = docSnap.data(); // Get the data
                // console.log(quizData);
                const keyArray = Object.keys(quizData);
                setCurrentSubtopicID(keyArray[0]); // Store the first subtopic

                // Iterate through subtopics
                Object.entries(quizData).forEach(([subtopicID, subtopic]) => {
                    // For each subtopic, check the different difficulties
                    ['easy', 'medium', 'difficult'].forEach((difficulty) => {
                        if (subtopic[difficulty]) {
                            const questionIDs = Object.keys(subtopic[difficulty]); // Get all question IDs
                            if (questionIDs.length > 0) {
                                // Shuffle the questions randomly
                                const shuffledQuestions = shuffleArray(questionIDs);

                                // Use the difficulty distribution to limit the number of questions
                                const numQuestionsToPick = difficultyDistribution[difficulty] || 0;
                                const questionsToSelect = shuffledQuestions.slice(0, numQuestionsToPick);
                                console.log(difficultyDistribution)
                                questionsToSelect.forEach((questionID) => {
                                    const questionObj = subtopic[difficulty][questionID];
                                    questionsArray.push({
                                        questionID, // Store the questionID for later reference
                                        questionText: questionObj.question,
                                        answerOptions: questionObj.options.map((option, index) => ({
                                            answerText: option,
                                            isCorrect: index.toString() === questionObj.correctAnswer, // Check if the index matches the correctAnswer
                                        })),
                                    });
                                });
                            }
                        }
                    });
                });
            }

            setQuestions(questionsArray); // Update state with questions array
        };

        fetchQuestions();
    }, [difficultyDistribution]);

    const shuffleArray = (array) => {
        // Shuffle the array randomly using Fisher-Yates algorithm
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    };

    const handleAnswerOptionClick = async (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        } else {
            try {
                const userDocRef = doc(db, 'users', userId);

                // Add the failed questionId to Firestore
                console.log(currentquestionID);
                await updateDoc(userDocRef, {
                    [`progress.${topicId}.${currentSubtopicID}.failedQuestions`]: [
                        ...(
                            (await getDoc(userDocRef)).data()?.progress?.[topicId]?.[currentSubtopicID]?.failedQuestions || []
                        ),
                        currentquestionID
                    ],
                });

                console.log(`Question ${currentquestionID} added to failedQuestions.`);
            } catch (error) {
                console.error('Error updating failedQuestions: ', error);
            }
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
            setCurrentQuestionID(questions[nextQuestion]?.questionID); // Update to the next question ID
        } else {
            setShowScore(true);
            saveQuizScore(score + (isCorrect ? 1 : 0)); // Include the last correct answer in the score
        }
    };

    const saveQuizScore = async (finalScore) => {
        try {
            const userDocRef = doc(db, 'users', userId);
            var score = (finalScore / 5) * 100;
            const passingScore = 60; // Set your passing score threshold here
            setResult(score >= 60 ? true : false);

            // Update the quizScore inside the progress map
            await updateDoc(userDocRef, {
                [`progress.${topicId}.quizScore`]: score,
                [`progress.${topicId}.quizCompleted`]: score >= passingScore, // Mark as completed only if score meets threshold
            });

            console.log('Quiz score successfully updated!');
        } catch (error) {
            console.error('Error updating quiz score: ', error);
        }
    };

    return (
        <div className="quiz-container">
            {console.log("Taking quiz for chaper :" + lessonId)}
            {showScore ? (
                <div>
                    <div className="score-section">
                        You scored {score} out of {questions.length}
                    </div>
                    <div className="feedback">
                        {result ? (
                            <div>Congratulations! You can proceed to the next topic!</div>
                        ) : (
                            <div>We recommend you revise these topics again.</div>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <div className="question-section">
                        <div className="question-count">
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className="question-text">{questions[currentQuestion]?.questionText}</div>
                    </div>
                    <div className="answer-section">
                        {questions[currentQuestion]?.answerOptions.map((answerOption, index) => (
                            <button
                                key={index}
                                className="answer-button"
                                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                            >
                                {answerOption.answerText}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
