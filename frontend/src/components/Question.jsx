import React from 'react';
import "../styles/Survey.css";

const Question = ({ question, options, onAnswer }) => {
  const handleOptionChange = (event) => {
    onAnswer(event.target.value);
  };

  return (
    <div className="question-container">
      <h3 className="question-title">{question}</h3>
      <select onChange={handleOptionChange} className="question-select">
        <option value="" disabled selected>Elija una opción</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Question;
