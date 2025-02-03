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
                { id: 1, name: "The Environment", description: "Natural world and ecosystems.", image: "environment.jpg" },
                { id: 2, name: "Biology",description: "Study of living organisms", image: "biology.jpg" },
                { id: 3, name: "Cells",description: "Basic units of life.", image: "cells.jpg" }
            ]
        },
        {
            id: 2,
            name: "Unit 2",
            topics: [
                { id: 4, name: "Green Plants",description: " Photosynthesis and plant life.", image: "plants.jpg" },
                { id: 5, name: "Soil and Nutrients",description: "Essential for plant growth.", image: "soil.jpg" },
                { id: 6, name: "Cell Division",description: "Process of cell reproduction.", image: "division.jpg" },
                { id: 7, name: "Groups of Living Things",description: "Classification of organisms.", image: "classification.jpg" },
                { id: 8, name: "Other Types of Living Organisms",description: "Diverse forms of life.", image: "organisms.jpg" }
            ]
        },
        {
            id: 3,
            name: "Unit 3",
            topics: [
                { id: 9, name: "The Digestive System",description: "Breaks down food for energy.", image: "digestive.jpg" },
                { id: 10, name: "The Circulatory System",description: "Transports blood through the body.", image: "circulatory.jpg" },
                { id: 11, name: "The Respiratory System",description: "Facilitates breathing and gas exchange.", image: "respiratory.jpg" },
                { id: 12, name: "The Excretory System",description: "Removes waste from the body.", image: "excretory.jpg" }
            ]
        }
    ];

    // Function to navigate to a specific lesson
    const fetchUnitInfo = (lessonId) => {
        navigate('/Lesson', { state: { lessonId } });
    };

    // Function to handle revision click
    const handleRevisionClick = (topics) => {
        const topicIds = topics.map((topic) => topic.id);
        navigate('/ReviseTest', { state: { topicIds } });
    };

    // Function to navigate to the quiz for a specific unit
    // const handleTakeQuiz = (topics) => {
    //     const topicIds = topics.map((topic) => topic.id);
    //     navigate('/ReviseTest', { state: { topicIds } });
    // };

    return (
        <div className="container my-5">
            <h1 className="text-center fw-bold text">Course Syllabus</h1>
            <hr className="border-dark" />
            {units.map((unit) => (
                <div key={unit.id} className="unit-section my-4">
                    <h3 className="fw-bold text">{unit.name}</h3>
                    <hr className="border-dark" />
                    <div className="row">
                        {unit.topics.map((topic) => (
                            <div key={topic.id} className="col-md-4 mb-3">
                                <div className="card shadow-sm p-3 border-0 rounded">
                                    <div className="card-body">
                                        <h5 className="fw-bold text">
                                            <i className="bi bi-book me-2"></i>
                                            {topic.name}
                                        </h5>
                                        <p>{topic.description}</p>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                fetchUnitInfo(topic.id);
                                            }}
                                            className="btn btn-dark mt-3"
                                        >
                                            Learn Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="col-md-4 mb-3 revision-section">
                            <div className="card shadow-sm p-3 border-0 rounded">
                                <div className="card-body text-center">
                                    <h5 className="fw-bold">
                                        <i className="bi bi-patch-question me-2"></i>
                                        Revise your weak points
                                    </h5>
                                    <p className="text-muted m-0">Review and strengthen your understanding of challenging topics</p>
                                    <button
                                        onClick={handleRevisionClick(unit.topics)}
                                        className="btn btn-dark mt-3"
                                    >
                                        Start Revision
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="text-center mt-3">
                        <button
                            onClick={() => handleTakeQuiz(unit.topics)}
                            className="btn btn-primary"
                        >
                            Take Unit Test
                        </button>
                    </div> */}
                </div>
            ))}
        </div>
    );
}

export default LearnPage;
