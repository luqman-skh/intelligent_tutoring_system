import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tutor.css'; // Custom styles
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ASK_API_URL = `${process.env.REACT_APP_BACKEND_API_KEY}/ask_anything`;

function Tutor() {
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [displayedResult, setDisplayedResult] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendClick = async () => {
        setLoading(true);
        setDisplayedResult('');
        try {
            const response = await axios.post(ASK_API_URL,
                { topic: inputValue },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
            setResult(response.data.response);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (result) {
            let index = -1;
            const interval = setInterval(() => {
                setDisplayedResult((prev) => prev + result[index]);
                index++;
                if (index === result.length) {
                    clearInterval(interval);
                }
            }, 10); // Adjust the interval for faster/slower animation
        }
    }, [result]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="chat-header-text">
                    <h1>Hello, I'm your tutor.</h1>
                    <p>How can I help you today?</p>
                </div>
            </div>
            <div className="chat-body">
                <div className="chat-input-container">
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="Ask Anything"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <div className="chat-icons">
                        <button className="chat-icon" onClick={handleSendClick}>
                            <i className="bi bi-send" style={{ color: "black" }}></i>
                        </button>
                    </div>
                </div>
            </div>
            {loading && (
                <div className="loading-indicator">
                    <p>Loading...</p>
                </div>
            )}
            {displayedResult && (
                <div className="response-box">
                    <div dangerouslySetInnerHTML={{ __html: displayedResult }} />
                </div>
            )}
        </div>
    );
}

export default Tutor;
