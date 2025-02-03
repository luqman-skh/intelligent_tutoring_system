import React, { useState } from 'react';
import axios from "axios";
import './Tutor.css'; // Make sure to import the CSS file

function AskAnything() {
    const [loadingAsk, setLoadingAsk] = useState(false);
    const [errorAsk, setErrorAsk] = useState("");
    const [askResponse, setAskResponse] = useState("");
    const [question, setQuestion] = useState("");

    // const ASK_API_URL = "https://a29c-34-125-203-212.ngrok-free.app/ask_anything";
    const ASK_API_URL = `${process.env.REACT_APP_BACKEND_API_KEY}/ask_anything`;

    // Function to handle "Ask Anything"
    const askAnything = async () => {
        if (!question.trim()) {
            setErrorAsk("Please enter a question.");
            return;
        }

        setLoadingAsk(true);
        setErrorAsk("");
        setAskResponse("");
        try {
            const response = await axios.post(
                ASK_API_URL,
                { topic: question },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
            if (response.data && response.data.response) {
                setAskResponse(response.data.response);
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

    return (
        <div className="ask-anything-container">
            {/* Ask Anything Section */}
            <section>
                <h2>Ask Anything</h2>
                <p>Type your question below and click "Ask" to get an answer.</p>
                <input
                    type="text"
                    placeholder="Enter your question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={loadingAsk}
                />
                <button onClick={askAnything} disabled={loadingAsk}>
                    {loadingAsk ? "Loading..." : "Ask"}
                </button>

                {askResponse && (
                    <div className="ask-response-container">
                        <h3>Answer:</h3>
                        <div dangerouslySetInnerHTML={{ __html: askResponse }} />
                    </div>
                )}

                {errorAsk && <p className="error">{errorAsk}</p>}
            </section>
        </div>
    );
}

export default AskAnything;
