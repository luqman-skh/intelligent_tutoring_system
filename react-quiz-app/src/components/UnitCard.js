import React from 'react';

const UnitCard = ({ name, topics, onTakeQuiz }) => (
  <div className="card mb-4 bg-secondary text-white">
    <div className="card-body">
      <h5 className="card-title">{name}</h5>
      {topics.map((topic) => (
        <div key={topic.id} className="mb-3">
          <h6>{topic.name}</h6>
          <button
            onClick={(e) => {
              e.preventDefault();
              topic.onLearnNow(topic.id);
            }}
            className="btn btn-light mt-2"
          >
            Learn Now
          </button>
        </div>
      ))}
      <button
        onClick={() => onTakeQuiz(topics)}
        className="btn btn-primary mt-3"
      >
        Take Unit Quiz
      </button>
    </div>
  </div>
);

export default UnitCard;
