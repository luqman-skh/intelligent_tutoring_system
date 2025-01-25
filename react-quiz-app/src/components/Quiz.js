import React, { useState, useEffect, useContext } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './Firebase/FirebaseDB';
import './Quiz.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from './Firebase/UserContext'; // Import UserContext

const Quiz = () => {
    const ASK_API_URL = "https://e1a4-34-124-165-147.ngrok-free.app/fitness_calculation";
    const location = useLocation();
    const navigate = useNavigate(); // Use navigate to pass data to Result.js
    const { lessonId } = location.state || {};
    const user = useContext(UserContext); // Get the user from context

    const [loadingAsk, setLoadingAsk] = useState(false);
    const [errorAsk, setErrorAsk] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]); // Store details of incorrect answers
    const [difficultyDistribution, setDifficultyDistribution] = useState({});
    const [result, setResult] = useState(false);

    const topicId = lessonId?.toString(); // Convert lessonId to string

    useEffect(() => {
        const getDifficulty = async () => {
            if (!user) return; // Skip if no user is logged in
            setLoadingAsk(true);
            try {
                const response = await axios.post(
                    ASK_API_URL,
                    { user_id: user.uid }, // Use user.uid from context
                    { headers: { "Content-Type": "application/json" } }
                );
                if (response.data && response.data.difficulty_distribution) {
                    setDifficultyDistribution(response.data.difficulty_distribution);
                } else {
                    setErrorAsk("Unexpected response structure from the server.");
                }
            } catch (err) {
                console.error("Error fetching difficulty distribution:", err.message);
                setErrorAsk("Failed to fetch difficulty distribution. Please try again.");
            } finally {
                setLoadingAsk(false);
            }
        };

        getDifficulty();
    }, [user]);

    useEffect(() => {
        const fetchQuestions = async () => {
            if (!topicId || !difficultyDistribution) return;

            const questionsArray = [];
            const docRef = doc(db, 'quizzes', topicId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const quizData = docSnap.data();
                const keyArray = Object.keys(quizData);

                Object.entries(quizData).forEach(([subtopicID, subtopic]) => {
                    ['easy', 'medium', 'difficult'].forEach((difficulty) => {
                        if (subtopic[difficulty]) {
                            const questionIDs = Object.keys(subtopic[difficulty]);
                            const shuffledQuestions = shuffleArray(questionIDs);
                            const numQuestionsToPick = difficultyDistribution[difficulty] || 0;
                            shuffledQuestions.slice(0, numQuestionsToPick).forEach((questionID) => {
                                const questionObj = subtopic[difficulty][questionID];
                                questionsArray.push({
                                    questionID,
                                    questionText: questionObj.question,
                                    correctAnswer: questionObj.options[questionObj.correctAnswer],
                                    answerOptions: questionObj.options.map((option, index) => ({
                                        answerText: option,
                                        isCorrect: index.toString() === questionObj.correctAnswer,
                                    })),
                                });
                            });
                        }
                    });
                });
            }

            setQuestions(questionsArray);
        };

        fetchQuestions();
    }, [difficultyDistribution, topicId]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleAnswerOptionClick = async (isCorrect, selectedAnswer) => {
        if (!user) return; // Skip if no user is logged in
    
        const currentQ = questions[currentQuestion];
    
        if (isCorrect) {
            setScore(score + 1);
        } else {
            // Add the incorrectly answered question's details to the state
            setIncorrectAnswers((prev) => [
                ...prev,
                {
                    questionText: currentQ.questionText,  // Question text
                    answerOptions: currentQ.answerOptions, // All options
                    selectedAnswer, // The answer selected by the user
                    correctAnswer: currentQ.correctAnswer, // The correct answer
                },
            ]);
    
            const userDocRef = doc(db, 'users', user.uid);
            try {
                await updateDoc(userDocRef, {
                    [`progress.${topicId}.failedQuestions`]: [
                        ...(
                            (await getDoc(userDocRef)).data()?.progress?.[topicId]?.failedQuestions || []
                        ),
                        currentQ.questionID,
                    ],
                });
            } catch (error) {
                console.error('Error updating failedQuestions:', error);
            }
        }
    
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
            saveQuizScore(score + (isCorrect ? 1 : 0)); // Include the last correct answer in the score
        }
    };
    

    const saveQuizScore = async (finalScore) => {
        try {
            const userDocRef = doc(db, 'users', user.uid);
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



    const handleFinishQuiz = () => {
        navigate('/result', {
            state: {
                incorrectAnswers,
                score,
                totalQuestions: questions.length,
                questions,
                lessonId, // Pass lessonId to the result page
            },
        });
    };
    

    return (
        <div className="quiz-container">
            {showScore ? (
                <div>
                    <div className="score-section">
                        You scored {score} out of {questions.length}
                    </div>
                    <button onClick={handleFinishQuiz}>See Result</button>
                </div>
            ) : (
                <div>
                    <div className="question-section">
                        <div className="question-count">
                            Question {currentQuestion + 1}/{questions.length}
                        </div>
                        <div className="question-text">{questions[currentQuestion]?.questionText}</div>
                    </div>
                    <div className="answer-section">
                        {questions[currentQuestion]?.answerOptions.map((answerOption, index) => (
                            <button
                                key={index}
                                className="answer-button"
                                onClick={() =>
                                    handleAnswerOptionClick(answerOption.isCorrect, answerOption.answerText)
                                }
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
