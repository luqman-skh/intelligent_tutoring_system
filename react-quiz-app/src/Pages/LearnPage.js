import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './LearnPage.css'; // Import custom styles for blurred backgrounds

function LearnPage() {
    const navigate = useNavigate();

    // Units for learning
    const units = [
        {
            id: 1,
            name: "Unit 1",
            topics: [
                { id: 1, name: "The Environment", image: "environment.jpg" },
                { id: 2, name: "Biology", image: "biology.jpg" },
                { id: 3, name: "Cells", image: "cells.jpg" }
            ]
        },
        {
            id: 2,
            name: "Unit 2",
            topics: [
                { id: 4, name: "Green Plants", image: "plants.jpg" },
                { id: 5, name: "Soil and Nutrients", image: "soil.jpg" },
                { id: 6, name: "Cell Division", image: "division.jpg" },
                { id: 7, name: "Groups of Living Things", image: "classification.jpg" },
                { id: 8, name: "Other Types of Living Organisms", image: "organisms.jpg" }
            ]
        },
        {
            id: 3,
            name: "Unit 3",
            topics: [
                { id: 9, name: "The Digestive System", image: "digestive.jpg" },
                { id: 10, name: "The Circulatory System", image: "circulatory.jpg" },
                { id: 11, name: "The Respiratory System", image: "respiratory.jpg" },
                { id: 12, name: "The Excretory System", image: "excretory.jpg" }
            ]
        }
    ];

    // Function to navigate to a specific lesson
    const fetchUnitInfo = (lessonId) => {
        navigate('/Lesson', { state: { lessonId } });
    };

    // Function to navigate to the quiz for a specific unit
    const handleTakeQuiz = (topics) => {
        const topicIds = topics.map((topic) => topic.id); // Extract topic IDs
        console.log(typeof(topicIds))
        navigate('/ReviseTest', { state: { topicIds } }); // Pass topic IDs as state
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">What do you want to Learn Today ?</h1>
            <div className="row">
                {units.map((unit) => (
                    <div key={unit.id} className="col-md-4">
                        <h2 className="text-center mb-3">{unit.name}</h2>
                        {unit.topics.map((topic) => (
                            <div
                                key={topic.id}
                                className="card card-blurred shadow-sm mb-4"
                                style={{
                                    backgroundImage: `url(/assets/${topic.image})`
                                }}
                            >
                                <div className="card-body text-white d-flex flex-column justify-content-center align-items-center">
                                    <h5 className="card-title">{topic.name}</h5>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            fetchUnitInfo(topic.id);
                                        }}
                                        className="btn btn-light mt-3"
                                    >
                                        Learn Now
                                    </button>
                                </div>
                            </div>
                        ))}
                        {/* Add Take Unit Quiz Button */}
                        <div className="text-center mt-3">
                            <button
                                onClick={() => handleTakeQuiz(unit.topics)}
                                className="btn btn-primary"
                            >
                                Take Unit Quiz
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LearnPage;
