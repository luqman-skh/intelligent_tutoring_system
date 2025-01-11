import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function LessonOverview() {

    const [topicResponse, setTopicResponse] = useState("");
    const [loadingTopic, setLoadingTopic] = useState(false);
    const [errorTopic, setErrorTopic] = useState("");

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/Lesson"); // Navigate to the LessonContent page
    };

    // API endpoints
    const ASK_API_URL = "https://b76b-34-105-126-138.ngrok-free.app/ask_anything";

    // Topics for learning
    const topics = [
        {
            id: 1, name: "Unit 1",
            subtopics: [
                { id: 101, name: "The Environment", },
                { id: 102, name: "Biology ", },
                { id: 103, name: "Cells", }
            ]
        },
        {
            id: 2, name: "Unit 2",
            subtopics: [
                { id: 201, name: "Green Plants", },
                { id: 202, name: "Soil and Nutrients", },
                { id: 203, name: "Groups of Living Things Classification", }
            ]
        },
        {
            id: 3, name: "Unit 3",
            subtopics: [
                { id: 301, name: "The Digestive System ", },
                { id: 302, name: "The Circulatory System", },
                { id: 303, name: "The Respiratory System ", }
            ]
        }
    ];


    // Function to handle topic click
    const fetchTopicInfo = async (chapter) => {
        setLoadingTopic(true);
        setErrorTopic("");
        setTopicResponse("");
        try {
            const response = await axios.post(
                ASK_API_URL,
                { topic: `Explain in detail what is ${chapter}` },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.data && response.data.response) {
                setTopicResponse(response.data.response);
            } else {
                setErrorTopic("Unexpected response structure from the server.");
            }
        } catch (err) {
            console.error("Error fetching topic info:", err.response || err.message);
            setErrorTopic("Failed to fetch topic information. Please try again.");
        } finally {
            setLoadingTopic(false);
        }
    };


    return (
        <div>
            {/* Topic Learning Section */}
            <section>
                <h2>What would you want to learn about today?</h2>
                <div className="topics-container">
                    <div className="row g-4">
                        {topics.map((topic) => (
                            <div key={topic.id} className="col-lg-4 col-md-4 col-sm-12 topic-box">
                                <h3>{topic.name}</h3>
                                <ul>
                                    {topic.subtopics.map((subtopic) => (
                                        <li key={subtopic.id}>
                                            <a href="/Lesson" onClick={() => fetchTopicInfo(subtopic.name)}>
                                                {subtopic.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {topicResponse && (
                    <div className="topic-response-container">
                        <h3>Topic Information:</h3>
                        <p>{topicResponse}</p>
                    </div>
                )}

                {errorTopic && <p className="error">{errorTopic}</p>}
            </section>
        </div>
    )
}

export default LessonOverview
