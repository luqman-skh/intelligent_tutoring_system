import React, { useState } from 'react'
import axios from "axios";

function QuizGenerator() {
    const [quiz, setQuiz] = useState("");
    const [errorQuiz, setErrorQuiz] = useState("");
    const [errorAsk, setErrorAsk] = useState("");
    const [loadingTopic, setLoadingTopic] = useState(false);
    const [loadingQuiz, setLoadingQuiz] = useState(false);

    const QUIZ_API_URL = `${process.env.REACT_APP_BACKEND_API_KEY}/generate_quiz`;


    // Function to fetch the quiz
    const fetchQuiz = async () => {
        setLoadingQuiz(true);
        setErrorQuiz("");
        setQuiz("");
        try {
            const response = await axios.post(
                QUIZ_API_URL,
                { topic: "states of matter" },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data && response.data.quiz) {
                setQuiz(response.data.quiz);
            } else {
                setErrorQuiz("Unexpected response structure from the server.");
            }
        } catch (err) {
            console.error("Error fetching quiz:", err.response || err.message);
            setErrorQuiz("Failed to fetch quiz. Please try again.");
        } finally {
            setLoadingQuiz(false);
        }
    };

    return (
        <div>
            {/* Quiz Section */}
            <section>
                <h2>Generate a Quiz</h2>
                <p>Click the button below to generate a quiz on "States of Matter".</p>
                <button onClick={fetchQuiz} disabled={loadingQuiz}>
                    {loadingQuiz ? "Loading..." : "Generate Quiz"}
                </button>

                {quiz && (
                    <div className="quiz-container">
                        <h3>Generated Quiz:</h3>
                        <p>{quiz}</p>
                    </div>
                )}

                {errorQuiz && <p className="error">{errorQuiz}</p>}
            </section>
        </div>
    )
}

export default QuizGenerator
