import React, { useState } from 'react';
import axios from 'axios';

function Chatbox() {
    const [input, setInput] = useState("");
    const [chatLog, setChatLog] = useState([
        {
            user: "llama", message: "Biology is the scientific study of life and living organisms. It explores everything from the tiniest bacteria to the largest animals, like whales. By studying biology, we learn how these organisms live, grow, and interact with their surroundings. In simple terms, biology helps us understand the world of living things in all its forms and functions.One of the basic ideas in biology is that all living things are made up of cells.Cells are like tiny building blocks that make up the structure of an organism.Some living things, like humans, are made of trillions of cells, while others, like bacteria, are made of just one single cell.No matter how many cells an organism has, each cell plays an important role in keeping it alive.Another important part of biology is understanding how living things use energy.Every living organism needs energy to survive, grow, and reproduce.For example, plants get their energy from the sun through a process called photosynthesis.This process allows them to make their own food.Animals, on the other hand, get their energy by eating plants or other animals.Growth and reproduction are also key areas of study in biology.All living things grow and change throughout their lives.They also reproduce, which means they create new organisms similar to themselves.This process is controlled by genes, which are like instruction manuals found in the cells of living things.Genes tell the cells how to grow, develop, and function.Biology also looks at how different species interact with each other and their environment.This branch of biology is called ecology.For example, in a forest, trees, animals, and insects all depend on each other for survival.Trees provide shelter and food for animals, while animals help spread seeds and pollinate plants.These interactions create a balanced ecosystem where all living things play a role.Another fascinating aspect of biology is the study of evolution.Evolution explains how living things change over time to better adapt to their environments.Over many generations, species can develop new traits that help them survive.For example, the long neck of a giraffe helps it reach leaves high up in trees, giving it a better chance to find food.In summary, biology is the study of life in all its incredible diversity.It helps us understand the complex systems that make up living organisms and the ways they interact with each other and their environments.From the smallest cells to entire ecosystems, biology offers us a deeper appreciation for the living world and our place within it." } // Initial message from Llama
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
                        row="1"
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
                <div className="message">{message.message}</div>
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
