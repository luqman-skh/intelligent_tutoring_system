import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './QuizResult.css'; // Make sure to import the CSS file

const QuizResult = () => {
    const QUIZ_EXPLAIN_API_URL = `${process.env.REACT_APP_BACKEND_API_KEY}/quiz_explanation`;
    const location = useLocation();
    const navigate = useNavigate();
    const { incorrectAnswers, score, totalQuestions, lessonId } = location.state || {};
    const [explanations, setExplanations] = useState({});
    const [loadingIndex, setLoadingIndex] = useState(null);
    const [error, setError] = useState(null);

    const handleBackToLesson = () => {
        navigate('/Lesson', { state: { lessonId } });
    };

    const handleNextTopic = () => {
        navigate('/Lesson', { state: { lessonId: lessonId + 1 } });
    };

    const handleViewExplanation = async (questionIndex, questionData) => {
        setLoadingIndex(questionIndex);
        setError(null);

        try {
            const transformedData = {
                topic: questionData.questionText,
                options: questionData.answerOptions.map((option) => option.answerText),
                correct_answer: questionData.correctAnswer,
                selected_answer: questionData.selectedAnswer,
            };

            const response = await axios.post(
                QUIZ_EXPLAIN_API_URL,
                transformedData,
                { headers: { "Content-Type": "application/json" } }
            );
            if (response.data) {
                setExplanations((prev) => ({
                    ...prev,
                    [questionIndex]: response.data.response,
                }));
            } else {
                setError("Unexpected response structure from the server.");
            }
        } catch (err) {
            console.error("Error fetching quiz explanation:", err.message);
            setError("Failed to fetch explanation. Please try again.");
        } finally {
            setLoadingIndex(null);
        }
    };

    const passThreshold = totalQuestions > 0 ? Math.ceil((score / totalQuestions) * 100) >= 60 : false;

    return (
        <div className="quiz-results">
            <div className="score-bar">
                <div className="score-bar-fill" style={{ width: `${(score / totalQuestions) * 100}%` }}></div>
            </div>
            <div className="score-text">
                <h2>Score: {score} / {totalQuestions}</h2>
                <p>{Math.ceil((score / totalQuestions) * 100)}% correct</p>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {incorrectAnswers.length > 0 ? (
                <div className="questions-to-review">
                    <h3>Questions to Review ({incorrectAnswers.length})</h3>
                    {incorrectAnswers.map((question, index) => (
                        <div key={index} className="question">
                            <h4>{question.questionText}</h4>
                            {question.answerOptions.map((option, idx) => (
                                <div
                                    key={idx}
                                    className={`answer ${option.answerText === question.correctAnswer ? 'correct' : option.answerText === question.selectedAnswer ? 'incorrect' : ''}`}
                                >
                                    {option.answerText}
                                    {option.answerText === question.correctAnswer && <span>Correct answer</span>}
                                    {option.answerText === question.selectedAnswer && <span>Your answer</span>}
                                </div>
                            ))}
                            <button
                                className="view-explanation"
                                onClick={() => handleViewExplanation(index, question)}
                                disabled={loadingIndex === index}
                            >
                                {loadingIndex === index ? "Loading..." : "View Explanation"}
                            </button>
                            {explanations[index] && (
                                <div className="explanation" dangerouslySetInnerHTML={{ __html: explanations[index] }} />
                            )}
                        </div>
                    ))}
                    <p>We recommend you to kindly study the subtopics of this chapter again for better understanding.</p>
                </div>
            ) : (
                <p>Great job! You got all questions correct.</p>
            )}

            {/* Conditionally render button based on passThreshold */}
            {passThreshold ? (
                <button onClick={handleNextTopic}>Proceed to the next topic</button>
            ) : (
                <button onClick={handleBackToLesson}>Go back to the chapter</button>
            )}
        </div>
    );
};

export default QuizResult;
