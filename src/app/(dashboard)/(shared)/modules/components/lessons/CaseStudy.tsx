import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

interface CaseStudyProps {
  onComplete?: () => void;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ onComplete }) => {
  const caseData = {
    title: "Enterprise Email Compromise Incident",
    context: "A large financial firm experienced a sophisticated phishing attack targeting their senior financial analysts. The attack resulted in a potential data breach.",
    timeline: [
      "Day 1: CFO receives urgent wire transfer request from CEO's email",
      "Day 2: Multiple employees report similar suspicious emails",
      "Day 3: IT discovers unauthorized access to financial system"
    ],
    decisions: [
      {
        id: 1,
        question: "What should be the first response action?",
        options: [
          {
            text: "Immediately shut down all email servers",
            feedback: "This would disrupt business operations unnecessarily. A more targeted approach is needed.",
            isCorrect: false
          },
          {
            text: "Isolate affected systems and notify security team",
            feedback: "Correct! This contains the threat while enabling proper investigation.",
            isCorrect: true
          },
          {
            text: "Send company-wide email about the incident",
            feedback: "Premature communication could alert attackers and cause panic.",
            isCorrect: false
          }
        ]
      },
      {
        id: 2,
        question: "What preventive measure would have been most effective?",
        options: [
          {
            text: "Implementing mandatory 2FA for all financial transactions",
            feedback: "Correct! This would have prevented unauthorized access even with compromised credentials.",
            isCorrect: true
          },
          {
            text: "Blocking all external emails",
            feedback: "Too disruptive to business operations and wouldn't address internal threats.",
            isCorrect: false
          },
          {
            text: "Daily password changes",
            feedback: "This could lead to password fatigue and potentially less secure practices.",
            isCorrect: false
          }
        ]
      }
    ]
  };

  const [currentDecision, setCurrentDecision] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    if (showFeedback) return;
    
    setSelectedAnswers({
      ...selectedAnswers,
      [currentDecision]: optionIndex
    });
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentDecision < caseData.decisions.length - 1) {
      setCurrentDecision(currentDecision + 1);
    } else {
      setCompleted(true);
      onComplete?.();
    }
  };

  const handleReset = () => {
    setCurrentDecision(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setCompleted(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex justify-center mb-4">
        <span className="text-sm text-gray-400">
          Decision {currentDecision + 1} of {caseData.decisions.length}
        </span>
      </div>

      <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
        <div className="h-1 bg-gray-800">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${((currentDecision + 1) / caseData.decisions.length) * 100}%` }}
          />
        </div>

        <div className="p-6">
          {!completed ? (
            <>
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-2">{caseData.title}</h3>
                <p className="text-gray-400 mb-4">{caseData.context}</p>
                
                {/* Timeline */}
                <div className="bg-gray-800/30 p-4 rounded-lg mb-6">
                  <h4 className="font-medium text-white mb-2">Incident Timeline:</h4>
                  <ul className="space-y-2">
                    {caseData.timeline.map((event, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-300">
                        <ChevronRight className="w-5 h-5 mt-0.5 text-blue-400" />
                        <span>{event}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h4 className="text-lg font-medium text-white mb-4">
                  {caseData.decisions[currentDecision].question}
                </h4>

                <div className="space-y-3">
                  {caseData.decisions[currentDecision].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 
                        ${selectedAnswers[currentDecision] === index
                          ? showFeedback
                            ? option.isCorrect
                              ? 'bg-green-500/10 border-green-500/40 text-green-400'
                              : 'bg-red-500/10 border-red-500/40 text-red-400'
                            : 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                          : 'border-transparent bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 hover:text-white'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        {showFeedback && selectedAnswers[currentDecision] === index && (
                          option.isCorrect 
                            ? <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                            : <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        )}
                        <div>
                          <p>{option.text}</p>
                          {showFeedback && selectedAnswers[currentDecision] === index && (
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
                {currentDecision > 0 ? (
                  <button
                    onClick={() => setCurrentDecision(prev => prev - 1)}
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
                    {currentDecision === caseData.decisions.length - 1 ? 'Complete Case Study' : 'Next Decision'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-medium text-white mb-2">Case Study Complete!</h2>
              <div className="flex flex-col items-center justify-center mt-8 mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-blue-500/10 border-4 border-blue-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-16 h-16 text-blue-400" />
                  </div>
                </div>
                <div className="mt-4 text-gray-400">
                  <p className="text-lg">You've completed all decisions in this case study!</p>
                </div>
              </div>
              
              <button 
                onClick={handleReset}
                className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                Restart Case Study
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudy;