import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, RotateCcw, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/card';

const SecurityStory = ({ onComplete }: { onComplete: () => void }) => {
  const storyData = {
    title: "Email Security Scenario",
    scenarios: [
      {
        id: 1,
        type: 'email',
        content: {
          from: 'IT-Support@company-systems.net',
          subject: 'Urgent: Password Reset Required',
          body: `Dear Employee,

Due to a recent security breach, all employees must verify their credentials immediately. Your account will be locked in 24 hours if not verified.

Click here to reset your password: https://company-systems.verification.net

Best regards,
IT Support Team`
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

  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswers({
      ...selectedAnswers,
      [currentScenario]: optionIndex
    });
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentScenario < storyData.scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
    } else {
      setCompleted(true);
      onComplete?.();
    }
  };

  const handleReset = () => {
    setCurrentScenario(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setCompleted(false);
  };

  const renderContent = (scenario: any) => {
    switch (scenario.type) {
      case 'email':
        return (
          <Card className="bg-gray-800/30 border-gray-700 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-400">From: {scenario.content.from}</div>
                    <div className="text-sm text-gray-400">Subject: {scenario.content.subject}</div>
                  </div>
                  <div className="mt-3 text-gray-300 whitespace-pre-line">{scenario.content.body}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'webpage':
        return (
          <Card className="bg-gray-800/30 border-gray-700 mb-6">
            <CardContent className="p-4">
              <div className="text-sm text-gray-400 mb-2">URL: {scenario.content.url}</div>
              <div className="text-gray-300">{scenario.content.description}</div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex justify-center mb-4">
        <span className="text-sm text-gray-400">
          Scenario {currentScenario + 1} of {storyData.scenarios.length}
        </span>
      </div>

      <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
        <div className="h-1 bg-gray-800">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${((currentScenario + 1) / storyData.scenarios.length) * 100}%` }}
          />
        </div>

        <div className="p-6">
          {!completed ? (
            <>
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-4">{storyData.title}</h3>
                
                {renderContent(storyData.scenarios[currentScenario])}
                
                <h4 className="text-lg font-medium text-white mb-4">
                  {storyData.scenarios[currentScenario].question}
                </h4>

                <div className="space-y-3">
                  {storyData.scenarios[currentScenario].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 
                        ${selectedAnswers[currentScenario] === index
                          ? showFeedback
                            ? option.isCorrect
                              ? 'bg-green-500/10 border-green-500/40 text-green-400'
                              : 'bg-red-500/10 border-red-500/40 text-red-400'
                            : 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                          : 'border-transparent bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 hover:text-white'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        {showFeedback && selectedAnswers[currentScenario] === index && (
                          option.isCorrect 
                            ? <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                            : <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        )}
                        <div>
                          <p>{option.text}</p>
                          {showFeedback && selectedAnswers[currentScenario] === index && (
                            <p className={`mt-2 text-sm ${option.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                              {option.feedback}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-800/40">
                {currentScenario > 0 ? (
                  <button
                    onClick={() => setCurrentScenario(prev => prev - 1)}
                    className="text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                ) : (
                  <div />
                )}
                
                {showFeedback && (
                  <button
                    onClick={handleNext}
                    className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    {currentScenario === storyData.scenarios.length - 1 ? 'Complete Scenario' : 'Next'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-white mb-2">Scenario Complete!</h2>
              <div className="flex flex-col items-center justify-center mt-8 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-blue-500/10 border-4 border-blue-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-16 h-16 text-blue-400" />
                  </div>
                </div>
                <div className="mt-4 text-gray-400">
                  <p className="text-lg">You've completed the security awareness scenario!</p>
                </div>
              </div>
              
              <button 
                onClick={handleReset}
                className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityStory;