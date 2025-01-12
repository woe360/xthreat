import React, { useState } from 'react';
import type { NextPage } from 'next';
import { 
  Building2, 
  AlertTriangle, 
  Shield,
  CheckCircle,
  XCircle,
  Mail,
  FileText,
  DollarSign,
  Users,
  ArrowRight,
  Clock,
  Eye
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BusinessScenario {
  id: string;
  type: string;
  title: string;
  context: string;
  content: string;
  sender: string;
  timestamp: string;
  urgencyLevel: 'High' | 'Medium' | 'Low';
  attachments?: string[];
  suspiciousElements: {
    id: string;
    type: string;
    description: string;
    hint: string;
  }[];
  correctActions: string[];
  incorrectActions: string[];
}

const scenarios: BusinessScenario[] = [
  {
    id: 'invoice-urgent',
    type: 'Invoice Fraud',
    title: 'Urgent: Payment Required - Updated Banking Details',
    context: 'You are the accounts payable manager at TechCorp. A regular supplier sends an urgent invoice.',
    content: `Dear [Finance Team],

We're updating our banking details for all future payments. Please process the attached invoice using our new account:

Bank: International Bank
Account: 8742****890
SWIFT: INTL****XXX

This payment is urgently required to maintain our service level agreement.

Best regards,
Sarah Johnson
Account Manager
Acme IT Solutions`,
    sender: 'sarah.johnson@acme-it-s0lutions.com',
    timestamp: '10:15 AM',
    urgencyLevel: 'High',
    attachments: ['Invoice_Dec2024.pdf.exe'],
    suspiciousElements: [
      {
        id: 'domain',
        type: 'sender',
        description: 'Suspicious sender domain (acme-it-s0lutions vs acme-it-solutions)',
        hint: 'Check the sender domain carefully'
      },
      {
        id: 'banking',
        type: 'content',
        description: 'Unexpected banking detail change with urgency',
        hint: 'Consider the request type and urgency'
      },
      {
        id: 'attachment',
        type: 'file',
        description: 'Executable file disguised as PDF',
        hint: 'Check the file extension'
      }
    ],
    correctActions: [
      'Contact supplier through existing contact details',
      'Report to IT security team',
      'Do not open attachment',
      'Verify banking changes through official channels'
    ],
    incorrectActions: [
      'Open attachment to verify invoice',
      'Process payment to new account',
      'Reply directly to email',
      'Forward to colleagues'
    ]
  }
];

const B2BPhishingVariants: NextPage = () => {
  const [currentScenario, setCurrentScenario] = useState<BusinessScenario>(scenarios[0]);
  const [identifiedElements, setIdentifiedElements] = useState<string[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showHints, setShowHints] = useState(false);

  const handleElementClick = (elementId: string) => {
    if (!identifiedElements.includes(elementId)) {
      setIdentifiedElements([...identifiedElements, elementId]);
      setScore(score + 10);
    }
  };

  const handleActionSelect = (action: string) => {
    if (!selectedActions.includes(action)) {
      setSelectedActions([...selectedActions, action]);
    } else {
      setSelectedActions(selectedActions.filter(a => a !== action));
    }
  };

  const checkResults = () => {
    let finalScore = score;
    
    // Score correct actions
    selectedActions.forEach(action => {
      if (currentScenario.correctActions.includes(action)) {
        finalScore += 15;
      } else {
        finalScore -= 10;
      }
    });

    setScore(finalScore);
    setShowFeedback(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building2 className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold">B2B Phishing Simulator</h1>
            <p className="text-sm text-gray-400">Interactive Training Scenario</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-xl font-bold">{score}</span>
          </div>
          <button
            onClick={() => setShowHints(!showHints)}
            className="bg-gray-800 p-2 rounded-lg text-blue-400 hover:bg-gray-700"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scenario Context */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <div className="flex items-center gap-2 text-yellow-400 mb-2">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-medium">Scenario Context</span>
        </div>
        <p className="text-gray-300">{currentScenario.context}</p>
      </div>

      {/* Email Viewer */}
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <div className="bg-gray-700 p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleElementClick('domain')}
                className="text-left hover:bg-gray-600 p-2 rounded"
              >
                <div className="font-medium">From: {currentScenario.sender}</div>
                <div className="text-sm text-gray-400">To: finance@techcorp.com</div>
              </button>
            </div>
            <span className="text-sm text-gray-400">{currentScenario.timestamp}</span>
          </div>
          <div className="font-medium text-lg">{currentScenario.title}</div>
        </div>
        
        <div className="p-6 space-y-4">
          <button
            onClick={() => handleElementClick('content')}
            className="text-left w-full whitespace-pre-wrap hover:bg-gray-700 p-2 rounded"
          >
            {currentScenario.content}
          </button>

          {currentScenario.attachments && (
            <div className="border-t border-gray-700 pt-4">
              <button
                onClick={() => handleElementClick('attachment')}
                className="flex items-center gap-2 text-blue-400 hover:bg-gray-700 p-2 rounded"
              >
                <FileText className="w-5 h-5" />
                {currentScenario.attachments[0]}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Action Selection */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="font-medium mb-4">Select Appropriate Actions:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...currentScenario.correctActions, ...currentScenario.incorrectActions]
            .sort(() => Math.random() - 0.5)
            .map((action, index) => (
              <button
                key={index}
                onClick={() => handleActionSelect(action)}
                className={`p-3 rounded-lg border text-left flex items-center gap-2 transition-all ${
                  selectedActions.includes(action)
                    ? 'bg-blue-900 border-blue-500 text-blue-100'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                {selectedActions.includes(action) ? (
                  <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-600 rounded-full shrink-0" />
                )}
                <span>{action}</span>
              </button>
            ))}
        </div>
      </div>

      {/* Hints */}
      {showHints && (
        <div className="bg-blue-900/50 p-4 rounded-lg border border-blue-800">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-5 h-5 text-blue-400" />
            <span className="font-medium">Security Tips</span>
          </div>
          <ul className="space-y-2">
            {currentScenario.suspiciousElements.map(element => (
              <li key={element.id} className="text-sm text-blue-100">
                • {element.hint}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={checkResults}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
      >
        Submit Analysis
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Feedback */}
      {showFeedback && (
        <Alert className={score >= 70 ? "bg-green-900 border-green-800" : "bg-red-900 border-red-800"}>
          {score >= 70 ? (
            <CheckCircle className="w-4 h-4 text-green-400" />
          ) : (
            <XCircle className="w-4 h-4 text-red-400" />
          )}
          <AlertDescription className={score >= 70 ? "text-green-100" : "text-red-100"}>
            {score >= 70 
              ? "Great job! You successfully identified the key phishing indicators and selected appropriate actions."
              : "Some room for improvement. Review the security tips and try again to better identify phishing indicators."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default B2BPhishingVariants;