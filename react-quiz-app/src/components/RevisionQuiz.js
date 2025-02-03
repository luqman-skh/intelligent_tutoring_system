import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function RevisionQuiz({ unitName, topics, onTakeQuiz }) {
    return (
        <div className="revision-quiz my-4">
            <h4 className="fw-bold text-primary">Revise {unitName}</h4>
            <hr className="border-primary" />
            <p className="text-muted">Test your knowledge on the topics you've learned in this unit.</p>
            <button
                onClick={() => onTakeQuiz(topics)}
                className="btn btn-primary"
            >
                Take Revision Quiz
            </button>
        </div>
    );
}

export default RevisionQuiz;
