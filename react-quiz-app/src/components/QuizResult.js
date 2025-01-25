import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const QuizResult = () => {
    const ASK_API_URL = "https://e1a4-34-124-165-147.ngrok-free.app/quiz_explanation";
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
                ASK_API_URL,
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
        <div>
            <h1>Quiz Results</h1>
            <p>
                You scored {score} out of {totalQuestions}.
            </p>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {incorrectAnswers.length > 0 ? (
                <>
                    <h3>Review Incorrect Answers</h3>
                    {incorrectAnswers.map((question, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <h3>Question: {question.questionText}</h3>
                            <h3>Options:</h3>
                            <h4>
                                {question.answerOptions.map((option, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            color:
                                                option.answerText === question.correctAnswer
                                                    ? 'green'
                                                    : option.answerText === question.selectedAnswer
                                                        ? 'red'
                                                        : 'white',
                                        }}
                                    >
                                        {option.answerText}
                                    </li>
                                ))}
                            </h4>
                            <p>
                                <strong>Your Answer:</strong> {question.selectedAnswer}
                            </p>
                            <p>
                                <strong>Correct Answer:</strong> {question.correctAnswer}
                            </p>
                            <button
                                onClick={() => handleViewExplanation(index, question)}
                                disabled={loadingIndex === index}
                            >
                                {loadingIndex === index ? "Loading..." : "View Explanation"}
                            </button>
                            {explanations[index] && (
                                <div style={{ margin: '20px', color: 'white', borderRadius: "1px", borderColor: "white" }}>
                                    <h4>Explanation:</h4> {explanations[index]}
                                </div>
                            )}
                        </div>
                    ))}
                    <p>We recommend you to kindly study the subtopics of this chapter again for better understanding.</p>
                </>
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
