import React, { useState } from 'react';

const QuizPage = () => {
  const [answers, setAnswers] = useState(Array(5).fill(''));

  const questions = [
    "What is biology?",
    "What are cells, and why are they important in biology?",
    "How do plants get their energy?",
    "What is the process called when living things create new organisms similar to themselves?",
    "What does the study of ecology focus on?"
  ];

  const options = [
    [
      "A) The study of rocks",
      "B) The study of life and living organisms",
      "C) The study of weather",
      "D) The study of space"
    ],
    [
      "A) They are tiny building blocks that make up the structure of living organisms.",
      "B) They are a type of plant.",
      "C) They are tools used by scientists.",
      "D) They are a kind of food."
    ],
    [
      "A) By eating animals",
      "B) By drinking water",
      "C) Through a process called photosynthesis using sunlight",
      "D) By absorbing nutrients from the soil"
    ],
    [
      "A) Photosynthesis",
      "B) Reproduction",
      "C) Digestion",
      "D) Evolution"
    ],
    [
      "A) The study of weather patterns",
      "B) The interactions between living things and their environment",
      "C) The study of cells",
      "D) The study of ancient fossils"
    ]
  ];

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Answers: ", answers);
    // You can add your logic to process the answers here
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Quiz</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <p>{`${index + 1}. ${question}`}</p>
            <div>
              {options[index].map((option, optionIndex) => (
                <label key={optionIndex}>
                  <input 
                    type="radio" 
                    name={`question${index}`} 
                    value={option} 
                    onChange={() => handleChange(index, option)}
                  /> {option}
                  <br />
                </label>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>Submit</button>
      </form>
    </div>
  );
};

export default QuizPage;
