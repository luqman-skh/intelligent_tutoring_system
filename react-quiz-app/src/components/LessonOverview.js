import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function LessonOverview() {

    const [unitResponse, setUnitResponse] = useState("");
    const [loadingUnit, setLoadingUnit] = useState(false);
    const [errorUnit, setErrorUnit] = useState("");

    const navigate = useNavigate();


    // API endpoints
    const ASK_API_URL = "https://b76b-34-105-126-138.ngrok-free.app/ask_anything";

    // Units for learning
    const units = [
        {
            id: 1, name: "Unit 1",
            topics: [
                { id: 1, name: "The Environment", },
                { id: 2, name: "Biology ", },
                { id: 3, name: "Cells", }
            ]
        },
        {
            id: 2, name: "Unit 2",
            topics: [
                { id: 4, name: "Green Plants", },
                { id: 5, name: "Soil and Nutrients", },
                { id: 6, name: "Cell Division", },
                { id: 7, name: "Groups of Living Things", },
                { id: 8, name: "Other Types of Living Organisms", }
            ]
        },
        {
            id: 3, name: "Unit 3",
            topics: [
                { id: 9, name: "The Digestive System ", },
                { id: 10, name: "The Circulatory System", },
                { id: 11, name: "The Respiratory System ", },
                { id: 12, name: "The Excretory System ", }
            ]
        }
    ];

    const fetchUnitInfo = (lessonId) => {
        navigate('/Lesson', { state: {lessonId}});
    };


    return (
        <div>
            {/* Unit Learning Section */}
            <section>
                <h2>What would you want to learn about today?</h2>
                <div className="lessons-container">
                    <div className="row g-4">
                        {units.map((unit) => (
                            <div key={unit.id} className="col-lg-4 col-md-4 col-sm-12 lesson-box">
                                <h3>{unit.name}</h3>
                                <ul>
                                    {unit.topics.map((topic) => (
                                        <li key={topic.id}>
                                            <a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    fetchUnitInfo(topic.id);
                                                }}
                                            >
                                                {topic.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {unitResponse && (
                    <div className="unit-response-container">
                        <h3>Unit Information:</h3>
                        <p>{unitResponse}</p>
                    </div>
                )}

                {errorUnit && <p className="error">{errorUnit}</p>}
            </section>
        </div>
    )
}

export default LessonOverview
