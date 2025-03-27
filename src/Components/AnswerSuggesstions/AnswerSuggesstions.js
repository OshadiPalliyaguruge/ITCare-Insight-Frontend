
import React, { useState, useEffect } from 'react';
import Chatbox from '../Chatbox/Chatbox';
import './AnswerSuggesstions.css'

const toSentenceCase = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const AnswerSuggesstions = () => {
  const [problemsSolutions, setProblemsSolutions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/problems-solutions')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item) => ({
          question: toSentenceCase(item.question),
          answer: toSentenceCase(item.answer),
        }));
        setProblemsSolutions(formattedData);
      })
      .catch((error) => console.error('Error fetching problems and solutions:', error));
  }, []);

  return (
    <div className="ps-container">
      <h2 className="ps-main-title">Answer Suggestions Based on Previous Issues</h2>

      <div className="ps-chatbox-container">
        <Chatbox />
      </div>
    </div>
  );
};

export default AnswerSuggesstions;

