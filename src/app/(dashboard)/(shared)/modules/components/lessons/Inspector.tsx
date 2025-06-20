import React, { useState } from 'react';
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
  const [userAnalysis, setUserAnalysis] = useState<{ [key: string]: boolean }>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const router = useRouter();
  const { trackInteraction, trackCompletion } = useAnalytics('email_inspector');

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

  const handleElementClick = (elementType: string) => {
    const updatedAnalysis = { ...userAnalysis, [elementType]: true };
    setUserAnalysis(updatedAnalysis);

    const currentChallenge = challenges[currentStep];
    const allElementsFound = currentChallenge.decodedElements.every(
      elem => updatedAnalysis[elem.type]
    );

    if (allElementsFound) {
      setShowFeedback(true);
      const previouslyFound = currentChallenge.decodedElements.every(
        elem => userAnalysis[elem.type]
      );
      if (!previouslyFound) {
        setScore(prevScore => prevScore + 1);
      }
    }
  };

  const handleNextChallenge = () => {
    if (currentStep < challenges.length - 1) {
      setCurrentStep(currentStep + 1);
      setUserAnalysis({});
      setShowFeedback(false);
    } else {
      handleCompletionNavigation();
    }
  };

  const handleUrlCheck = async (url: string) => {
    await trackInteraction({
      interactionType: 'url_check',
      moduleId,
      lessonId,
      componentType: 'url_inspector',
      details: { url }
    });
  };

  const handleCompletionNavigation = () => {
    trackCompletion({moduleId, lessonId, componentType: 'url_inspector', score: score });
    if (isLastSubLesson) {
      router.push(`/modules/${moduleId}`);
    } else if (onComplete) {
      onComplete();
    }
  };

  const currentChallenge = challenges[currentStep];

  const isChallengeComplete = showFeedback;
  const isFinalChallenge = currentStep === challenges.length - 1;
  const isFinished = isChallengeComplete && isFinalChallenge;

  if (isFinished) {
    return (
      <div className="max-w-3xl w-full mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 font-normal mb-6">
          Challenge Complete!
        </h1>
        
        <div className="relative w-full max-w-md mx-auto mb-12 py-8">
          <div className="absolute inset-0 flex items-center justify-center">
          </div>
          <div className="relative z-10 text-center">
            <div className="text-4xl font-light text-white mb-2">{score}/{challenges.length}</div> 
            <p className="text-neutral-400">
              Correctly identified elements
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800/40 pt-8 mt-8 max-w-md mx-auto flex justify-center gap-4">
           <button
             onClick={handleCompletionNavigation}
             className="inline-flex items-center px-6 py-3 border border-white/50 bg-white/20 text-white hover:bg-white/20 rounded-lg transition"
           >
             {isLastSubLesson ? 'Return to Module' : 'Next Lesson'} <ChevronRight size={16} className="ml-1" />
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl w-full mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8 text-sm text-neutral-500">
        <span>Challenge {currentStep + 1}/{challenges.length}</span>
        <span>Identified: {Object.keys(userAnalysis).length}/{currentChallenge.decodedElements.length}</span> 
      </div>

      <div className="p-4 border border-gray-800 rounded-lg mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Link className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <code className="text-base font-mono text-gray-200 break-all">{currentChallenge.url}</code>
        </div>
        <p className="text-sm text-gray-400">Analyze this URL by clicking on suspicious elements below</p>
      </div>

      <div className="space-y-3 mb-8">
        {currentChallenge.decodedElements.map((element, index) => (
          <button
            key={index}
            onClick={() => handleElementClick(element.type)}
            disabled={userAnalysis[element.type] || showFeedback}
            className={`w-full p-4 text-left border rounded-lg transition-all ${ 
              userAnalysis[element.type]
                ? "border-purple-500/50 bg-purple-500/10 text-white"
                : "border-gray-800 bg-black/20 text-neutral-300 hover:border-gray-700 hover:bg-black/40"
            } ${showFeedback && 'cursor-not-allowed'}`}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${ 
                userAnalysis[element.type] ? 'text-gray-400' : 'text-gray-500' 
              }`} />
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <code className="font-mono bg-gray-700/50 px-2 py-0.5 rounded text-sm text-gray-200">
                    {element.element}
                  </code>
                  <span className="text-xs text-gray-500">({element.type})</span>
                </div>
                 {userAnalysis[element.type] && (
                   <div className="mt-2 text-sm text-gray-400">
                     <p className="mb-1"><strong>Issue:</strong> {element.issue}</p>
                   </div>
                 )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {showFeedback && (
          <div className="mb-8 p-4 border border-gray-800 rounded-lg">
            <h3 className="font-medium text-gray-300 mb-2">Explanation</h3>
            <p className="text-sm text-gray-400">{currentChallenge.explanation}</p>
          </div>
      )}

      {showFeedback && !isFinalChallenge && (
          <button
            onClick={handleNextChallenge}
            className={`w-full py-3 rounded-lg flex items-center justify-center transition-all border border-white/50 bg-white/20 text-white hover:bg-white/20`}
          >
            Next Challenge <ChevronRight size={16} className="ml-1" />
          </button>
      )}
    </div>
  );
};

export default URLInspectorChallenge;