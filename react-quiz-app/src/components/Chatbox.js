import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';
import { db } from './Firebase/FirebaseDB';
import DOMPurify from 'dompurify';

const Chatbox = ({ lessonId, subtopicId }) => {
    const [content, setContent] = useState('');
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [loadingAsk, setLoadingAsk] = useState(false);
    const [errorAsk, setErrorAsk] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(true);
    const [initialMessage, setInitialMessage] = useState("");

    const ASK_API_URL = `${process.env.REACT_APP_BACKEND_API_KEY}/content_explanation`;
    const RESET_API_URL = `${process.env.REACT_APP_BACKEND_API_KEY}/reset_conversation`;

    // Fetch initial message from Firebase
    useEffect(() => {
        const fetchInitialMessage = async () => {
            if (!lessonId) return;
            setLoadingMessage(true);
            try {
                const topicRef = doc(db, `topics/${lessonId}`);
                const docSnap = await getDoc(topicRef);
                console.log(docSnap.data());

                if (docSnap.exists()) {
                    const initialMessage = subtopicId ? docSnap.data().subtopics[subtopicId].content : docSnap.data().content || "No content available.";
                    setInitialMessage(initialMessage);
                    setChatLog([{ user: "Tutor", message: initialMessage }]);
                } else {
                    setChatLog([{ user: "Tutor", message: "Content not found." }]);
                }
            } catch (error) {
                console.error("Error fetching content:", error);
                setChatLog([{ user: "Tutor", message: "Error loading content." }]);
            } finally {
                setLoadingMessage(false);
            }
        };

        fetchInitialMessage();
    }, [lessonId, subtopicId]); // Include subtopicId in the dependency array

    // Make API call to RESET_API_URL on initial load and when subtopicId changes
    useEffect(() => {
        const resetContent = async () => {
            try {
                await axios.post(RESET_API_URL, {
                }, { headers: { "Content-Type": "application/json" } });
            } catch (error) {
                console.error("Error resetting content:", error);
            }
        };

        resetContent();
    }, [lessonId, subtopicId]); // Include subtopicId in the dependency array

    const askAnything = async (question) => {
        if (!question.trim()) {
            setErrorAsk("Please enter a question.");
            return;
        }

        const userMessage = { user: "me", message: question };
        setChatLog([...chatLog, userMessage]);

        setLoadingAsk(true);
        setErrorAsk("");
        try {
            console.log(lessonId, subtopicId);
            console.log(typeof lessonId);
            const response = await axios.post(
                ASK_API_URL,
                {
                    topic: question,
                    lessonId: lessonId.toString(), // Send lessonId as a separate field
                    subtopicId: subtopicId.toString() // Send subtopicId as a separate field
                },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data && response.data.response) {
                const llamaMessage = { user: "Tutor", message: response.data.response };
                setChatLog((prevChatLog) => [...prevChatLog, llamaMessage]);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        askAnything(input);
        setInput("");
    };

    useEffect(() => {
        if (lessonId && subtopicId) {
            setContent(`Displaying content for Lesson ID: ${lessonId}, Subtopic ID: ${subtopicId}`);
            console.log(`Displaying content for Lesson ID: ${lessonId}, Subtopic ID: ${subtopicId}`);
        } else if (lessonId) {
            setContent(lessonId);
        } else {
            setContent('Please select a lesson and subtopic.');
        }
    }, [lessonId, subtopicId]);

    return (
        <section className="chatbox">
            <div className="chat-log">
                {loadingMessage ? <div>Loading initial content...</div> : (
                    chatLog.map((chat, index) =>
                        chat.user === "me" ? (
                            <ChatMessage key={index} message={chat} />
                        ) : (
                            <ChatMessageLlama key={index} message={chat} />
                        )
                    )
                )}
            </div>
            <div className="chat-box-holder">
                <form onSubmit={handleSubmit}>
                    <input
                        className="chat-input-textarea"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button type="submit" disabled={loadingAsk}>
                        Ask
                    </button>
                </form>
                {loadingAsk && <div>Loading...</div>}
                {errorAsk && <div style={{ color: 'red' }}>{errorAsk}</div>}
            </div>
        </section>
    );
};

const ChatMessage = ({ message }) => (
    <div className="chat-message">
        <div className="chat-message-center">
            <div className="avatar">Student : </div>
            <ReactMarkdown>{message.message}</ReactMarkdown>
        </div>
    </div>
);



const ChatMessageLlama = ({ message }) => {
    // Sanitize the HTML content using DOMPurify
    const safeHTML = DOMPurify.sanitize(message.message);

    return (
        <div className="chat-message-llama">
            <div className="chat-message-center">
                <div className="avatar-llama">Tutor</div>
                <div className="message" dangerouslySetInnerHTML={{ __html: safeHTML }} />
            </div>
        </div>
    );
};


export default Chatbox;
