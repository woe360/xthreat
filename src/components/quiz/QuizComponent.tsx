// src/components/quiz/QuizComponent.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, AlertCircle } from 'lucide-react';

interface QuizAnswer {
  id: string;
  answer_text: string;
  is_correct: boolean;
}

interface QuizQuestion {
  id: string;
  question_text: string;
  explanation: string;
  order_number: number;
  quiz_answers: QuizAnswer[];
}

interface QuizComponentProps {
  questions: QuizQuestion[];
}

const QuizComponent: React.FC<QuizComponentProps> = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer: QuizAnswer) => {
    if (answer.is_correct) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  if (currentQuestion >= questions.length) {
    return (
      <div className="quiz-results">
        <h3>Jūsų rezultatas: {score}/{questions.length}</h3>
        <button onClick={() => window.location.reload()}>Bandyti dar kartą</button>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-progress">
        Klausimas {currentQuestion + 1} iš {questions.length}
      </div>
      
      <h3>{currentQ.question_text}</h3>
      
      <div className="options">
        {currentQ.quiz_answers.map((answer) => (
          <button
            key={answer.id}
            onClick={() => handleAnswer(answer)}
            className="option-button"
            disabled={showExplanation}
          >
            {answer.answer_text}
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="explanation">
          <p>{currentQ.explanation}</p>
          <button onClick={nextQuestion}>Kitas klausimas</button>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;