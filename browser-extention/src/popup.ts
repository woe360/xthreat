import { Quiz } from './types';

let currentQuiz: Quiz | null = null;

async function loadQuiz() {
  try {
    const response = await fetch('https://your-xthreat-domain.com/api/quiz');
    currentQuiz = await response.json();
    displayQuiz(currentQuiz);
  } catch (error) {
    console.error('Failed to load quiz:', error);
  }
}

function displayQuiz(quiz: Quiz) {
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  
  if (questionElement && optionsElement && quiz) {
    questionElement.textContent = quiz.question;
    optionsElement.innerHTML = '';
    
    quiz.options.forEach((option, index) => {
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz-option';
      radio.value = index.toString();
      radio.id = `option-${index}`;
      
      const label = document.createElement('label');
      label.htmlFor = `option-${index}`;
      label.textContent = option;
      
      optionsElement.appendChild(radio);
      optionsElement.appendChild(label);
      optionsElement.appendChild(document.createElement('br'));
    });
  }
}

document.getElementById('submit')?.addEventListener('click', async () => {
  const selectedOption = document.querySelector<HTMLInputElement>('input[name="quiz-option"]:checked');
  
  if (!selectedOption || !currentQuiz) return;
  
  const answer = parseInt(selectedOption.value);
  
  if (answer === currentQuiz.correctAnswer) {
    await chrome.storage.local.set({ lastQuizTime: Date.now() });
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, { type: 'QUIZ_COMPLETED' });
    }
    window.close();
  } else {
    alert('Incorrect answer. Please try again!');
  }
});

document.addEventListener('DOMContentLoaded', loadQuiz); 