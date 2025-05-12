import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CaseStudyProps {
  moduleId: string;
  onComplete?: () => void;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ moduleId, onComplete }) => {
  const router = useRouter();
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
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
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

  const isCurrentDecisionAnswered = selectedAnswers[currentDecision] !== undefined;

  return (
    <div className="max-w-3xl w-full mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8 text-sm text-neutral-500">
        <span>
          Decision {currentDecision + 1} of {caseData.decisions.length}
        </span>
      </div>

          {!completed ? (
            <>
              <div className="mb-8">
            <h3 className="text-xl font-medium text-white mb-3">{caseData.title}</h3>
                <p className="text-gray-400 mb-4">{caseData.context}</p>
            <div className="p-4 rounded-lg mt-4">
                  <h4 className="font-medium text-white mb-2">Incident Timeline:</h4>
                  <ul className="space-y-2">
                    {caseData.timeline.map((event, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                        <span>{event}</span>
                      </li>
                    ))}
                  </ul>
            </div>
                </div>

          <div className="mb-8">
            <h2 className="text-xl font-light text-white mb-4">
                  {caseData.decisions[currentDecision].question}
            </h2>
          </div>

          <div className="space-y-3 mb-8">
                  {caseData.decisions[currentDecision].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                className={`w-full text-left p-4 border rounded-lg transition-all ${
                  selectedAnswers[currentDecision] === index
                          ? showFeedback
                    ? caseData.decisions[currentDecision].options[index].isCorrect
                      ? 'border-green-500/40 bg-green-500/10 text-green-300'
                      : 'border-red-500/40 bg-red-500/10 text-red-300'
                    : "border-purple-500/50 bg-purple-500/10 text-white"
                  : "border-gray-800 bg-black/20 text-neutral-300 hover:border-gray-700 hover:bg-black/40"
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        {showFeedback && selectedAnswers[currentDecision] === index && (
                    caseData.decisions[currentDecision].options[index].isCorrect
                      ? <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      : <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          <p>{option.text}</p>
                          {showFeedback && selectedAnswers[currentDecision] === index && (
                      <p className={`mt-1.5 text-sm ${
                        caseData.decisions[currentDecision].options[index].isCorrect ? 'text-green-400/80' : 'text-red-400/80'
                      }`}>
                              {option.feedback}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
              </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800/40">
                {currentDecision > 0 ? (
                  <button
                onClick={() => {
                  setShowFeedback(false);
                  setCurrentDecision(prev => prev - 1)
                }}
                className="text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-1 px-3 py-2"
                  >
                <ChevronLeft size={16} /> Previous
                  </button>
                ) : (
                  <div />
                )}
                {showFeedback && (
                  <button
                    onClick={handleNext}
                className={`px-6 py-3 rounded-lg flex items-center justify-center transition-all border border-white/50 bg-white/20 text-white hover:bg-white/20`}
                  >
                    {currentDecision === caseData.decisions.length - 1 ? 'Complete Case Study' : 'Next Decision'}
                <ChevronRight size={16} className="ml-1" />
                  </button>
                )}
              </div>
            </>
          ) : (
        <div className="max-w-3xl w-full mx-auto py-12 px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 font-normal mb-12">
            Case Study Completed
          </h1>

          <div className="flex justify-center mb-12">
            <div className="w-24 h-24 rounded-full bg-green-500/10 border-4 border-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-400" />
                  </div>
                </div>
          <p className="text-neutral-400 mb-12">You have successfully analyzed the case scenario.</p>

          <div className="border-t border-gray-800/40 pt-8 mt-8 max-w-md mx-auto flex justify-center gap-4">
            <button
              onClick={() => router.push(`/modules/${moduleId}`)}
              className="inline-flex items-center px-6 py-3 border border-gray-800 rounded-lg text-white hover:bg-white/5 transition"
            >
              Return to Module
            </button>
              <button 
              onClick={onComplete}
              className="inline-flex items-center px-6 py-3 border border-white/50 bg-white/20 text-white hover:bg-white/20 rounded-lg transition"
              >
               Continue <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudy;