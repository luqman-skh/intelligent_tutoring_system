import React, { useState, useEffect, useContext } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './Firebase/FirebaseDB';
import './Quiz.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from './Firebase/UserContext'; // Import UserContext

const ReviseTest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { topicIds } = location.state || {}; // topicIds passed from handleTakeQuiz
    const user = useContext(UserContext); // Get the user from context

    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]); // Store details of incorrect answers

    useEffect(() => {
        const fetchFailedQuestions = async () => {
            if (!user || !topicIds || topicIds.length === 0) return;

            const questionsArray = [];
            try {
                for (const topicId of topicIds) {
                    // Fetch failed questions for the current user and topic
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const failedQuestions =
                            userDocSnap.data()?.progress?.[topicId]?.failedQuestions || [];

                        // Fetch question details for each failedQuestion ID
                        const topicDocRef = doc(db, 'quizzes', topicId.toString());
                        const topicDocSnap = await getDoc(topicDocRef);

                        if (topicDocSnap.exists()) {
                            const topicData = topicDocSnap.data();

                            failedQuestions.forEach((questionId) => {
                                const subtopicKeys = Object.keys(topicData);

                                // Search for the question in all subtopics
                                subtopicKeys.forEach((subtopicId) => {
                                    const subtopic = topicData[subtopicId];
                                    ['easy', 'medium', 'difficult'].forEach((difficulty) => {
                                        if (subtopic[difficulty]?.[questionId]) {
                                            const questionObj =
                                                subtopic[difficulty][questionId];
                                            questionsArray.push({
                                                questionID: questionId,
                                                questionText: questionObj.question,
                                                correctAnswer:
                                                    questionObj.options[
                                                        questionObj.correctAnswer
                                                    ],
                                                answerOptions: questionObj.options.map(
                                                    (option, index) => ({
                                                        answerText: option,
                                                        isCorrect:
                                                            index.toString() ===
                                                            questionObj.correctAnswer,
                                                    })
                                                ),
                                            });
                                        }
                                    });
                                });
                            });
                        }
                    }
                }

                setQuestions(questionsArray);
            } catch (error) {
                console.error('Error fetching failed questions:', error);
            }
        };

        fetchFailedQuestions();
    }, [user, topicIds]);

    const handleAnswerOptionClick = (isCorrect, selectedAnswer) => {
        const currentQ = questions[currentQuestion];

        if (isCorrect) {
            setScore(score + 1);
        } else {
            // Add the incorrectly answered question's details to the state
            setIncorrectAnswers((prev) => [
                ...prev,
                {
                    questionText: currentQ.questionText,
                    answerOptions: currentQ.answerOptions,
                    selectedAnswer,
                    correctAnswer: currentQ.correctAnswer,
                },
            ]);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const handleFinishQuiz = () => {
        navigate('/result', {
            state: {
                incorrectAnswers,
                score,
                totalQuestions: questions.length,
                questions,
            },
        });
    };

    return (<div 
    style={{
        marginTop: 20,
        padding: 10
        }}
        >
        <h3>Revise these questions from this Unit which you missed to answer correctly before continuing to the Unit quiz</h3>
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
        </div>
    );
};

export default ReviseTest;
