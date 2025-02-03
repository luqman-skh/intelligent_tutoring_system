// src/QuizResults.js
import React from 'react';
import './test.css';

const QuizResults = () => {
  return (
    <div className="quiz-results">
      <div className="score-bar">
        <div className="score-bar-fill" style={{ width: '60%' }}></div>
      </div>
      <div className="score-text">
        <h2>Score: 3 / 5</h2>
        <p>60% correct</p>
      </div>
      <div className="questions-to-review">
        <h3>Questions to Review (2)</h3>
        <div className="question">
          <h4>What is the capital of France?</h4>
          <div className="answer correct">Paris <span>Correct answer</span></div>
          <div className="answer incorrect">Lyon <span>Your answer</span></div>
          <div className="answer">Marseille</div>
          <div className="answer">Bordeaux</div>
          <button className="view-explanation">View Explanation</button>
        </div>
        <div className="question">
          <h4>Which planet is known as the Red Planet?</h4>
          <div className="answer correct">Mars <span>Correct answer</span></div>
          <div className="answer incorrect">Venus <span>Your answer</span></div>
          <div className="answer">Jupiter</div>
          <div className="answer">Saturn</div>
          <button className="view-explanation">View Explanation</button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
