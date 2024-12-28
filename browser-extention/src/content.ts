// browser-extension/src/content.ts
import { Quiz, QuizResponse } from './types';

let currentQuiz: Quiz | null = null;
let targetUrl: string | null = null;

const chrome = window.chrome;

chrome.runtime.onMessage.addListener(async (
  message: { type: 'SHOW_QUIZ', targetUrl: string }
) => {
  if (message.type === 'SHOW_QUIZ') {
    targetUrl = message.targetUrl;
    
    try {
      const response = await fetch('https://your-xthreat-domain.com/api/browser-extension');
      currentQuiz = await response.json();
      
      if (currentQuiz) {
        showQuizModal(currentQuiz);
      }
    } catch (error) {
      console.error('Failed to fetch quiz:', error);
    }
  }
});

function showQuizModal(quiz: Quiz): void {
  const modal = document.createElement('div');
  modal.className = 'xthreat-quiz-modal';
  
  const content = document.createElement('div');
  content.className = 'quiz-content';
  
  const title = document.createElement('h2');
  title.textContent = quiz.question;
  content.appendChild(title);
  
  quiz.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => submitAnswer(index);
    content.appendChild(button);
  });
  
  modal.appendChild(content);
  
  // Add styles
  const styles = document.createElement('style');
  styles.textContent = `
    .xthreat-quiz-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999999;
    }
    .quiz-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
    }
  `;
  
  document.head.appendChild(styles);
  document.body.appendChild(modal);
}

async function submitAnswer(answerIndex: number): Promise<void> {
  if (!currentQuiz) return;
  
  try {
    const quizResponse: QuizResponse = {
      employeeId: 'current-employee-id', // You'll need to get this from your auth system
      questionId: currentQuiz.id,
      answer: answerIndex,
      correct: answerIndex === currentQuiz.correctAnswer
    };
    
    await fetch('https://your-xthreat-domain.com/api/browser-extension', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quizResponse)
    });
    
    await chrome.storage.local.set({ lastQuizTime: Date.now() });
    
    const modal = document.querySelector('.xthreat-quiz-modal');
    if (modal) {
      modal.remove();
    }
    
    if (targetUrl) {
      window.location.href = targetUrl;
    }
  } catch (error) {
    console.error('Failed to submit answer:', error);
  }
}