// src/components/Survey.jsx
import React, { useState, useEffect } from 'react';
import { surveyQuestions } from '../local-variables/data';
import '../styles/Survey.css';

const Survey = ({ onSubmit }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const shuffled = [...surveyQuestions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled.slice(0, 4));
  }, []);

  const handleChange = (questionId, answer, category) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: { answer, category }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Survey - handleSubmit called');
    console.log('Survey - answers:', answers);
    if (typeof onSubmit === 'function') {
      onSubmit(answers);
    } else {
      console.error('Survey - onSubmit is not a function');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="survey-form">
      <h2 className="survey-title">Encuesta de Preferencias</h2>
      {selectedQuestions.map(question => (
        <div key={question.id} className="question-container">
          <p className="question-text">{question.question}</p>
          <div className="options-container">
            {question.options.map((option, index) => (
              <label key={index} className="option-label">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  onChange={() => handleChange(question.id, option, question.category)}
                  required
                  className="option-input"
                />
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className='submit-container'>
      <button type="submit" className="submit-button">
        Enviar
      </button>
      </div>
    </form>
  );
};

export default Survey;