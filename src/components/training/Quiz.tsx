import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
}

interface QuizProps {
  lessonId: number;
  onComplete: (score: number) => void;
}

const Quiz = ({ lessonId, onComplete }: QuizProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`/api/lessons/${lessonId}/quiz`);
        const data = await response.json();
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuizData();
  }, [lessonId]);

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      
      if (answer === questions[currentQuestion].correct_answer) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      onComplete(score);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
  };

  if (loading) {
    return (
      <Card className="border-gray-800 bg-gray-900/50">
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-800 rounded w-3/4"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (questions.length === 0) {
    return (
      <Card className="border-gray-800 bg-gray-900/50">
        <CardContent className="pt-6">
          <p className="text-gray-400 text-center">No questions available for this quiz.</p>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <Card className="border-gray-800 bg-gray-900/50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
          <span className="text-sm text-gray-400">
            Score: {score}/{questions.length}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-lg text-gray-200">{currentQ.question}</p>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-lg border text-left transition-all ${
                  isAnswered
                    ? option === currentQ.correct_answer
                      ? 'border-green-500 bg-green-500/10 text-green-400'
                      : option === selectedAnswer
                      ? 'border-red-500 bg-red-500/10 text-red-400'
                      : 'border-gray-800 bg-gray-800/50 text-gray-400'
                    : selectedAnswer === option
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-gray-800 hover:border-gray-700 hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {isAnswered && (
                    option === currentQ.correct_answer ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : option === selectedAnswer ? (
                      <XCircle className="h-5 w-5 text-red-400" />
                    ) : null
                  )}
                </div>
              </button>
            ))}
          </div>

          {isAnswered && currentQ.explanation && (
            <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-blue-400 text-sm">{currentQ.explanation}</p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={resetQuiz}
              className="bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Quiz
            </Button>
            
            {isAnswered && (
              <Button
                onClick={handleNext}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Quiz;