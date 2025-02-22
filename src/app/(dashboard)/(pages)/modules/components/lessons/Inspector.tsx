import React, { useState } from 'react';
import { Card, CardContent } from "@/components/card";
import { Link, AlertTriangle, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAnalytics } from '@/hooks/useAnalytics';

interface URLInspectorChallengeProps {
  onComplete?: () => void;
  isLastSubLesson?: boolean;
  moduleId: string;
  lessonId: string;
}

const URLInspectorChallenge: React.FC<URLInspectorChallengeProps> = ({ onComplete, isLastSubLesson, moduleId, lessonId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnalysis, setUserAnalysis] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();
  const { trackInteraction, trackCompletion } = useAnalytics();

  const challenges = [
    {
      url: "http://paypa1.com/secure-login/account/verify",
      decodedElements: [
        {
          element: "paypa1.com",
          type: "domain",
          issue: "Lookalike domain using number '1' instead of 'l'",
          hint: "Look closely at the domain spelling"
        },
        {
          element: "/secure-login/",
          type: "path",
          issue: "Attempting to appear legitimate with security-related terms",
          hint: "Consider why these specific words were chosen"
        }
      ],
      explanation: "This URL uses a common technique of replacing letters with similar-looking numbers to create a convincing fake PayPal domain."
    },
    {
      url: "https://mybank.secure-verification.com/login.php?token=dXNlcj1hZG1pbiZwYXNzPTEyMzQ=",
      decodedElements: [
        {
          element: "secure-verification.com",
          type: "domain",
          issue: "Unrelated domain using security-related terms",
          hint: "Is this the actual bank's domain?"
        },
        {
          element: "token=dXNlcj1hZG1pbiZwYXNzPTEyMzQ=",
          type: "parameter",
          issue: "Base64 encoded data attempting to hide malicious content",
          hint: "Encoded parameters can hide malicious content"
        }
      ],
      explanation: "This URL combines multiple deception techniques: a fake domain name with security terms and encoded parameters that could contain malicious data."
    },
    {
      url: "https://drive.google.com.download-docs.net/file/important.pdf",
      decodedElements: [
        {
          element: "google.com.download-docs.net",
          type: "domain",
          issue: "Domain impersonation by adding legitimate domain as subdomain",
          hint: "What's the actual top-level domain here?"
        },
        {
          element: "/file/important.pdf",
          type: "path",
          issue: "Generic file name designed to create interest",
          hint: "Consider if this file name is specific enough to be legitimate"
        }
      ],
      explanation: "This URL tricks users by making 'google.com' appear to be the main domain, when it's actually part of a subdomain on 'download-docs.net'."
    }
  ];

  const handleElementClick = (elementType) => {
    setUserAnalysis({
      ...userAnalysis,
      [elementType]: true
    });

    const currentChallenge = challenges[currentStep];
    const allElementsFound = currentChallenge.decodedElements.every(
      elem => userAnalysis[elem.type] || elem.type === elementType
    );

    if (allElementsFound) {
      setShowFeedback(true);
      setScore(score + 1);
    }
  };

  const handleNextChallenge = () => {
    setCurrentStep(currentStep + 1);
    setUserAnalysis({});
    setShowFeedback(false);
  };

  const handleUrlCheck = async (url) => {
    await trackInteraction({
      interactionType: 'url_check',
      moduleId,
      lessonId,
      componentType: 'url_inspector',
      details: { url }
    });
    // ... rest of your code
  };

  if (showFeedback && currentStep === challenges.length - 1) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-[#181b24] border border-gray-800/40 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-white mb-2">Challenge Complete!</h2>
            <div className="flex flex-col items-center justify-center mt-8 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-blue-500/10 border-4 border-blue-500/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-400">
                    {Math.round((score / challenges.length) * 100)}%
                  </span>
                </div>
              </div>
              <div className="mt-4 text-gray-400">
                <span className="text-xl font-medium text-blue-400">{score}</span>
                <span className="mx-2">/</span>
                <span className="text-xl">{challenges.length}</span>
                <p className="text-sm mt-1">Challenges Completed</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => {
                if (isLastSubLesson) {
                  router.push(`/modules/${moduleId}`)
                } else if (onComplete) {
                  onComplete()
                }
              }}
              className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-6 py-2 rounded-lg flex items-center gap-2"
            >
              {isLastSubLesson ? 'Return to Module' : 'Next Lesson'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentChallenge = challenges[currentStep];

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex justify-center mb-4">
        <span className="text-sm text-gray-400">
          Challenge {currentStep + 1} of {challenges.length}
        </span>
      </div>

      <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
        <div className="h-1 bg-gray-800">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${((currentStep + 1) / challenges.length) * 100}%` }}
          />
        </div>

        <div className="p-6">
          <div className="bg-gray-800/30 p-4 rounded-lg mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Link className="w-5 h-5 text-gray-400" />
              <code className="text-lg font-mono text-gray-300">{currentChallenge.url}</code>
            </div>
            <p className="text-sm text-gray-400">Analyze this URL by clicking on suspicious elements below</p>
          </div>

          <div className="space-y-3">
            {currentChallenge.decodedElements.map((element, index) => (
              <button
                key={index}
                onClick={() => handleElementClick(element.type)}
                disabled={userAnalysis[element.type] || showFeedback}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  userAnalysis[element.type]
                    ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                    : 'border-transparent bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 hover:text-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-5 h-5 mt-1 ${
                    userAnalysis[element.type] ? 'text-blue-400' : 'text-gray-500'
                  }`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <code className="font-mono bg-gray-800/50 px-2 py-1 rounded">
                        {element.element}
                      </code>
                      <span className="text-sm text-gray-500">({element.type})</span>
                    </div>
                    {userAnalysis[element.type] && (
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{element.issue}</p>
                        <p className="text-sm text-gray-500">Hint: {element.hint}</p>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className="mt-6">
              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-blue-400 mb-2">Analysis Complete!</h3>
                <p className="text-sm text-gray-400">{currentChallenge.explanation}</p>
              </div>
              
              {currentStep < challenges.length - 1 && (
                <div className="flex justify-end pt-4 border-t border-gray-800/40">
                  <button
                    onClick={handleNextChallenge}
                    className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    Next Challenge <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default URLInspectorChallenge;