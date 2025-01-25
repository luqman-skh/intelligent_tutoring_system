import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Chatbox = ({ lessonId, subtopicId }) => {
    const [content, setContent] = useState('');
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([
        {
            user: "llama", message: "The environment is not always the same. It changes over time due to natural events and human activities. These changes can be slow, like the way a tree grows taller each year, or they can happen very quickly, like after a storm or wildfire.\nThere are two types of changes in the environment: natural changes and human-made changes.\n1. Natural Changes: The environment changes naturally through events like weather, seasons, and natural disasters. For example, the seasons change every year, causing the temperature to rise and fall. During the winter, many plants and animals go into a resting state, and in spring, they wake up and grow. Natural disasters, like hurricanes, earthquakes, and floods, can also cause sudden and dramatic changes to the environment.\n2. Human-made Changes: People also change the environment in many ways. Some changes are positive, like planting trees and protecting wildlife. But many human activities have caused harm to the environment. For example, pollution from factories, cars, and waste affects the air, water, and soil, making it harder for plants and animals to live. Deforestation, or cutting down forests, is another human activity that changes the environment by destroying homes for many animals and plants.\nHow Can We Observe Changes in the Environment? One way scientists observe changes in the environment is by studying long-term data. This could mean looking at weather records over many years to understand how the temperature has changed. Another way to observe changes is by watching how plants and animals are affected by the environment. For example, scientists might observe how a river’s water level changes after a rainfall, or how the number of birds in a forest changes over time due to deforestation.\nWhy is It Important to Observe and Study Environmental Changes? Studying environmental changes helps us understand the effects of different factors on living things. It helps us figure out how we can protect our planet and its resources. By observing and understanding changes in the environment, we can make better choices about how to live more sustainably. This means finding ways to use resources wisely, reduce pollution, and protect natural habitats for plants and animals.\nConclusion The environment is constantly changing, and observation is an important tool for understanding these changes. Both natural events and human activities affect the environment, and it is crucial to study and monitor these changes so we can take action to protect our planet. By paying attention to how the environment changes, we can help create a healthier, more sustainable world for future generations." } // Initial message from Llama
    ]);
    const [loadingAsk, setLoadingAsk] = useState(false);
    const [errorAsk, setErrorAsk] = useState("");

    // The URL for the API endpoint
    const ASK_API_URL = "https://8387-34-125-149-96.ngrok-free.app/ask_anything"; // Replace with actual LLM API URL

    // Function to handle submitting a question
    const askAnything = async (question) => {
        if (!question.trim()) {
            setErrorAsk("Please enter a question.");
            return;
        }

        // Add the user's question to the chat log
        const userMessage = { user: "me", message: question };
        setChatLog([...chatLog, userMessage]);

        setLoadingAsk(true);
        setErrorAsk("");
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

            if (response.data && response.data.response) {
                const llamaMessage = { user: "llama", message: response.data.response };
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

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        askAnything(input); // Call askAnything with the current input
        setInput(""); // Clear input field
    };

    useEffect(() => {
        if (lessonId && subtopicId) {
          setContent(`Displaying content for Lesson ID: ${lessonId}, Subtopic ID: ${subtopicId}`);
        } else if (lessonId) {
          setContent(`Displaying content for Lesson ID: ${lessonId}`);
        } else {
          setContent('Please select a lesson and subtopic.');
        }
      }, [lessonId, subtopicId]);

    return (
        <section className="chatbox">
            <div className="chat-log">
                {chatLog.map((chat, index) =>
                    chat.user === "me" ? (
                        <ChatMessage key={index} message={chat} />
                    ) : (
                        <ChatMessageLlama key={index} message={chat} />
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
}

const ChatMessage = ({ message }) => {
    return (
        <div className="chat-message">
            <div className="chat-message-center">
                <div className="avatar">Student</div>
                <ReactMarkdown>{message.message}</ReactMarkdown>
            </div>
        </div>
    );
};

const ChatMessageLlama = ({ message }) => {
    return (
        <div className="chat-message-llama">
            <div className="chat-message-center">
                <div className="avatar-llama">Llama</div>
                <div className="message">{message.message}</div>
            </div>
        </div>
    );
};

export default Chatbox;
