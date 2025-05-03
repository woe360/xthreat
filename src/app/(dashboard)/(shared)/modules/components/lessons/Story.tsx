import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, RotateCcw, Mail, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/card';

const SecurityStory = ({ onComplete }: { onComplete?: () => void }) => {
  const storyData = {
    title: "Email Security Scenario",
    scenarios: [
      {
        id: 1,
        type: 'email',
        content: {
          from: 'IT-Support@company-systems.net',
          subject: 'Urgent: Password Reset Required',
          body: `Dear Employee,\n\nDue to a recent security breach, all employees must verify their credentials immediately. Your account will be locked in 24 hours if not verified.\n\nClick here to reset your password: https://company-systems.verification.net\n\nBest regards,\nIT Support Team`
        },
        question: "You receive this email in your inbox. What do you do?",
        options: [
          {
            text: "Click the link to check if it's legitimate",
            feedback: "Clicking unknown links is risky - they could lead to phishing sites.",
            isCorrect: false
          },
          {
            text: "Call your colleague in IT first to verify",
            feedback: "Good instinct to verify, but reporting through proper channels is more efficient.",
            isCorrect: false
          },
          {
            text: "Report to IT security team immediately",
            feedback: "Excellent choice! Reporting suspicious emails helps protect the entire organization.",
            isCorrect: true
          }
        ]
      },
      {
        id: 2,
        type: 'webpage',
        content: {
          url: 'https://company-systems.verification.net/login',
          description: 'The webpage looks identical to your company\'s portal, but with a slightly different URL.'
        },
        question: "If you had clicked the link, you would see this login page. What would be the correct action?",
        options: [
          {
            text: "Enter your credentials to verify your account",
            feedback: "Never enter credentials on suspicious sites, even if they look legitimate.",
            isCorrect: false
          },
          {
            text: "Close the page immediately",
            feedback: "Good to avoid interaction, but the incident should still be reported.",
            isCorrect: false
          },
          {
            text: "Take a screenshot and report the phishing attempt",
            feedback: "Perfect! Documenting and reporting helps prevent future attacks.",
            isCorrect: true
          }
        ]
      }
    ]
  };

  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [showFeedbackFor, setShowFeedbackFor] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const currentScenario = storyData.scenarios[currentScenarioIndex];
  const scenarioId = currentScenario.id;
  const selectedOptionIndex = selectedOptions[scenarioId];
  const showFeedback = showFeedbackFor === scenarioId;

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;
    
    setSelectedOptions(prev => ({
      ...prev,
      [scenarioId]: optionIndex
    }));
    setShowFeedbackFor(scenarioId);
  };

  const handleNext = () => {
    setShowFeedbackFor(null);
    if (currentScenarioIndex < storyData.scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    setShowFeedbackFor(null);
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(currentScenarioIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentScenarioIndex(0);
    setSelectedOptions({});
    setShowFeedbackFor(null);
    setCompleted(false);
  };

  const handleCompletionAction = () => {
    if (onComplete) {
      onComplete();
    } else {
      handleReset();
    }
  };

  const renderContent = (scenario: any) => {
    const commonClasses = "p-4 mb-6 bg-black/20 border border-gray-800/40 rounded-lg";
    
    switch (scenario.type) {
      case 'email':
        return (
          <div className={commonClasses}>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-neutral-500 mt-1 flex-shrink-0" />
              <div className="flex-grow min-w-0">
                <div className="grid gap-0.5">
                  <div className="text-sm text-neutral-400 break-words">From: {scenario.content.from}</div>
                  <div className="text-sm text-neutral-400 break-words">Subject: {scenario.content.subject}</div>
                </div>
                <div className="mt-3 text-sm text-neutral-300 whitespace-pre-line break-words">{scenario.content.body}</div>
              </div>
            </div>
          </div>
        );
      case 'webpage':
        return (
          <div className={commonClasses}>
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-neutral-500 mt-1 flex-shrink-0" />
              <div className="flex-grow min-w-0">
                <div className="text-sm text-neutral-400 mb-2 break-words">URL: {scenario.content.url}</div>
                <div className="text-sm text-neutral-300 break-words">{scenario.content.description}</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (completed) {
    let score = 0;
    storyData.scenarios.forEach(scenario => {
      const selected = selectedOptions[scenario.id];
      if (selected !== undefined && scenario.options[selected]?.isCorrect) {
        score++;
      }
    });
    const totalScenarios = storyData.scenarios.length;

    return (
      <div className="max-w-3xl w-full mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 font-normal mb-6">
          Scenario Complete!
        </h1>
        
        <div className="relative w-full max-w-md mx-auto mb-12 py-8">
          <div className="absolute inset-0 flex items-center justify-center"></div>
          <div className="relative z-10 text-center">
            <div className="text-4xl font-light text-white mb-2">{score}/{totalScenarios}</div>
            <p className="text-neutral-400">
              Correct Decisions
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800/40 pt-8 mt-8 max-w-md mx-auto flex justify-center gap-4">
           <button
             onClick={handleReset}
             className="inline-flex items-center px-6 py-3 border border-gray-700 bg-gray-800/40 text-neutral-300 hover:bg-gray-700/50 rounded-lg transition"
           >
             <RotateCcw size={16} className="mr-1.5" /> Try Again
           </button>
           <button
             onClick={handleCompletionAction}
             className="inline-flex items-center px-6 py-3 border border-white/50 bg-white/20 text-white hover:bg-white/30 rounded-lg transition"
           >
             Continue <ChevronRight size={16} className="ml-1.5" />
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl w-full mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8 text-sm text-neutral-500">
        <span>{storyData.title}</span>
        <span>Scenario {currentScenarioIndex + 1} of {storyData.scenarios.length}</span>
      </div>

      <div className="bg-black/20 border border-gray-800/40 rounded-lg p-6">
        {renderContent(currentScenario)}
        
        <h4 className="text-base font-medium text-neutral-200 mb-5">
          {currentScenario.question}
        </h4>

        <div className="space-y-3">
          {currentScenario.options.map((option, index) => {
            const isSelected = selectedOptionIndex === index;
            let buttonClass = "border-gray-800 bg-black/20 text-neutral-300 hover:border-gray-700 hover:bg-black/40";
            let icon = null;

            if (isSelected) {
              if (showFeedback) {
                if (option.isCorrect) {
                  buttonClass = "border-green-500/50 bg-green-500/10 text-white";
                  icon = <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />;
                } else {
                  buttonClass = "border-red-500/50 bg-red-500/10 text-white";
                  icon = <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />;
                }
              } else {
                buttonClass = "border-purple-500/50 bg-purple-500/10 text-white";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-150 flex items-start gap-3 ${buttonClass}`}
              >
                {icon}
                <div className="flex-grow">
                  <p className="text-sm font-medium">{option.text}</p>
                  {showFeedback && isSelected && (
                    <p className={`mt-1.5 text-xs ${option.isCorrect ? 'text-green-400/90' : 'text-red-400/90'}`}>
                      {option.feedback}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800/40">
          <button
            onClick={handlePrevious}
            disabled={currentScenarioIndex === 0}
            className={`inline-flex items-center px-4 py-2 border rounded-lg transition text-sm ${ 
                currentScenarioIndex === 0 
                ? 'border-gray-800 text-neutral-600 cursor-not-allowed' 
                : 'border-gray-700 bg-gray-800/40 text-neutral-300 hover:bg-gray-700/50' 
            }`}
          >
            <ChevronLeft size={16} className="mr-1" /> Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!showFeedback}
            className={`inline-flex items-center px-4 py-2 border rounded-lg transition text-sm font-medium ${ 
              !showFeedback 
              ? 'bg-neutral-800/50 text-neutral-500 cursor-not-allowed border-transparent' 
              : 'border-white/50 bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {currentScenarioIndex === storyData.scenarios.length - 1 ? 'Complete Scenario' : 'Next'}
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityStory;