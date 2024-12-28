// browser-extension/src/background.ts
import { Config, Quiz } from './types';

const chrome = window.chrome;

let config: Config = {
  workDomains: [],
  quizInterval: 30 * 60 * 1000 // 30 minutes
};

chrome.runtime.onInstalled.addListener(async () => {
  try {
    const response = await fetch('https://your-xthreat-domain.com/api/browser-extension/config');
    config = await response.json();
  } catch (error) {
    console.error('Failed to load config:', error);
  }
});

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) return;
  
  const url = new URL(details.url);
  
  if (!isWorkDomain(url.hostname)) {
    const storage = await chrome.storage.local.get('lastQuizTime');
    const now = Date.now();
    
    if (!storage.lastQuizTime || (now - storage.lastQuizTime) >= config.quizInterval) {
      chrome.tabs.sendMessage(details.tabId, {
        type: 'SHOW_QUIZ' as const,
        targetUrl: details.url
      });
      
      return { cancel: true };
    }
  }
});

function isWorkDomain(domain: string): boolean {
  return config.workDomains.some(workDomain => 
    domain.includes(workDomain)
  );
}