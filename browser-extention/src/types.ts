// browser-extension/src/types.ts
export interface Config {
  workDomains: string[];
  quizInterval: number;
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
}

export type MessageType = 
  | { type: 'SHOW_QUIZ'; targetUrl: string }
  | { type: 'QUIZ_COMPLETED' };