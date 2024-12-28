// browser-extension/src/types.ts
export interface Quiz {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
  }
  
  export interface QuizResponse {
    employeeId: string;
    questionId: string;
    answer: number;
    correct: boolean;
  }
  
  export interface Config {
    workDomains: string[];
    quizInterval: number;
  }