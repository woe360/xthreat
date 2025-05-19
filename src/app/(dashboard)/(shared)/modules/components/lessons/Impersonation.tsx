import React, { useState } from 'react';
import { Mail, AlertCircle, AlertTriangle, DollarSign, Building, Clock, User, Globe, CheckCircle2, ChevronRight, LucideIcon } from 'lucide-react';

interface HighlightPoint {
  id: string;
  element: string;
  legitimate: string;
  fraudulent: string;
  explanation: string;
  icon: React.ElementType;
  position: 'domain' | 'sender' | 'time' | 'greeting' | 'content' | 'signature' | 'request';
}

interface CaseExample {
  company: string;
  year: number;
  amount: string;
  description: string;
}

interface ExecutiveImpersonationExampleProps {
  moduleId?: string;
  onComplete?: () => void;
}

const ExecutiveImpersonationExample: React.FC<ExecutiveImpersonationExampleProps> = ({ 
  moduleId, 
  onComplete 
}) => {
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [showAllDifferences, setShowAllDifferences] = useState(false);

  const highlightPoints: HighlightPoint[] = [
    {
      id: 'domain',
      element: 'Email Domain',
      legitimate: 'ceo@acmecorp.com',
      fraudulent: 'ceo@acme-corp.com',
      explanation: 'Attackers often use domains that look similar to legitimate ones, adding hyphens or slight spelling variations that can be easily missed.',
      icon: Globe,
      position: 'domain'
    },
    {
      id: 'sender',
      element: 'Sender Name',
      legitimate: 'John Maxwell, CEO',
      fraudulent: 'John Maxwell',
      explanation: 'Slight variations in how the sender name appears can indicate a fraudulent email. The legitimate email includes the title.',
      icon: User,
      position: 'sender'
    },
    {
      id: 'time',
      element: 'Sending Time',
      legitimate: 'Sent: Tuesday, 10:23 AM',
      fraudulent: 'Sent: Wednesday, 11:47 PM',
      explanation: 'BEC emails are often sent outside of business hours or during unusual times when recipients might be less attentive to details.',
      icon: Clock,
      position: 'time'
    },
    {
      id: 'greeting',
      element: 'Greeting Style',
      legitimate: 'Hello Sarah,',
      fraudulent: 'Sarah,',
      explanation: "Attackers may not know or use the usual greeting style of the executive they're impersonating.",
      icon: User,
      position: 'greeting'
    },
    {
      id: 'content',
      element: 'Email Style/Tone',
      legitimate: 'As discussed in our budget meeting yesterday, we need to process the vendor payment for the new IT infrastructure project.',
      fraudulent: 'I\'m currently in a confidential meeting and need you to process an urgent wire transfer immediately.',
      explanation: 'BEC emails often create a sense of urgency and confidentiality to pressure recipients into acting quickly without verification.',
      icon: AlertTriangle,
      position: 'content'
    },
    {
      id: 'signature',
      element: 'Signature',
      legitimate: 'Best regards,\nJohn Maxwell\nChief Executive Officer\nACME Corporation\n(555) 123-4567',
      fraudulent: 'Regards,\nJohn\nSent from my iPhone',
      explanation: 'Attackers often use simplified signatures and mobile signatures to explain away formatting differences and lack of company templates.',
      icon: CheckCircle2,
      position: 'signature'
    },
    {
      id: 'request',
      element: 'Requested Action',
      legitimate: 'Please initiate the payment of $247,500 to Horizon Technologies using our standard payment process and the details in the attached PO #AC-7734.',
      fraudulent: 'Need you to wire $247,500 to this new account ASAP:\nBank: Overseas Bank\nAccount: 7729388450\nRouting: 8844293\nBeneficiary: Horizon Tech Ltd',
      explanation: 'Legitimate requests follow standard company procedures and reference established business processes, while BEC attacks often request unusual payment methods or new account details.',
      icon: DollarSign,
      position: 'request'
    }
  ];

  const realWorldCases: CaseExample[] = [
    {
      company: "FACC (Aerospace)",
      year: 2016,
      amount: "$54 million",
      description: "Attackers impersonated the CEO in emails to the finance department, resulting in a $54 million wire transfer to fraudulent accounts. The CEO and CFO were fired as a result of the incident despite being victims."
    },
    {
      company: "Ubiquiti Networks",
      year: 2015,
      amount: "$46.7 million",
      description: "Finance employees were tricked by BEC emails impersonating executives and lawyers into transferring funds to overseas accounts. The company disclosed the fraud in SEC filings, impacting investor confidence."
    },
    {
      company: "Crelan Bank",
      year: 2016,
      amount: "$75.8 million",
      description: "The Belgian bank was targeted in a sophisticated BEC attack where attackers impersonated the CEO. The fraud was only discovered during a routine audit, highlighting how these attacks can go undetected."
    },
    {
      company: "Scoular Corporation",
      year: 2014,
      amount: "$17.2 million",
      description: "An executive received emails supposedly from the CEO and external auditor directing international wire transfers for a secret acquisition. The company was only able to recover a small portion of the stolen funds."
    },
    {
      company: "Mattel",
      year: 2015,
      amount: "$3 million",
      description: "A finance executive received an email appearing to be from the new CEO requesting a wire transfer. Fortunately, the company was able to work with banks and authorities to recover the funds due to quick action."
    }
  ];

  const handleHighlightClick = (id: string) => {
    if (activeHighlight === id) {
      setActiveHighlight(null);
    } else {
      setActiveHighlight(id);
    }
  };

  const toggleExpandCase = (company: string) => {
    if (expandedCase === company) {
      setExpandedCase(null);
    } else {
      setExpandedCase(company);
    }
  };

  const toggleShowAllDifferences = () => {
    setShowAllDifferences(!showAllDifferences);
    // When showing all differences, clear any single active highlight
    if (!showAllDifferences) {
      setActiveHighlight(null);
    }
  };

  const getHighlightColor = (point: HighlightPoint) => {
    if (activeHighlight === point.id || showAllDifferences) {
      return 'bg-red-500/20 border-red-500/30 text-red-300';
    }
    return 'bg-transparent border-transparent text-inherit';
  };

  const renderEmailContent = (isLegitimate: boolean) => {
    const getHighlightClasses = (position: string, legitimate: boolean) => {
      const point = highlightPoints.find(p => p.position === position);
      if (!point) return "";
      
      if (legitimate) {
        return activeHighlight === point.id || showAllDifferences
          ? 'bg-green-500/20 border border-green-500/30 rounded px-1'
          : '';
      } else {
        return activeHighlight === point.id || showAllDifferences
          ? 'bg-red-500/20 border border-red-500/30 rounded px-1'
          : '';
      }
    };

    return (
      <div className={`border rounded-lg overflow-hidden ${isLegitimate ? 'border-green-500/20' : 'border-red-500/20'}`}>
        <div className={`p-3 flex justify-between items-center ${isLegitimate ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
          <div className="flex items-center gap-2">
            <Mail className={`w-4 h-4 ${isLegitimate ? 'text-green-400' : 'text-red-400'}`} />
            <span className={`text-sm font-medium ${isLegitimate ? 'text-green-400' : 'text-red-400'}`}>
              {isLegitimate ? 'Legitimate Email' : 'Fraudulent BEC Email'}
            </span>
          </div>
        </div>
        
        <div className="p-4 bg-gray-950 text-sm">
          <div className="mb-3">
            <p className="text-gray-500 text-xs">From: <span className={getHighlightClasses('sender', isLegitimate)}>
              {isLegitimate ? highlightPoints.find(p => p.position === 'sender')?.legitimate : highlightPoints.find(p => p.position === 'sender')?.fraudulent}
            </span> &lt;<span className={getHighlightClasses('domain', isLegitimate)}>
              {isLegitimate ? highlightPoints.find(p => p.position === 'domain')?.legitimate : highlightPoints.find(p => p.position === 'domain')?.fraudulent}
            </span>&gt;</p>
            <p className="text-gray-500 text-xs">To: sarah.smith@acmecorp.com</p>
            <p className="text-gray-500 text-xs">Subject: {isLegitimate ? 'Vendor Payment Approval - Project Horizon' : 'URGENT: Wire Transfer Needed'}</p>
            <p className="text-gray-500 text-xs">{isLegitimate ? highlightPoints.find(p => p.position === 'time')?.legitimate : 
              <span className={getHighlightClasses('time', isLegitimate)}>
                {highlightPoints.find(p => p.position === 'time')?.fraudulent}
              </span>}
            </p>
          </div>
          
          <div className="space-y-3 text-gray-300">
            <p><span className={getHighlightClasses('greeting', isLegitimate)}>
              {isLegitimate ? highlightPoints.find(p => p.position === 'greeting')?.legitimate : highlightPoints.find(p => p.position === 'greeting')?.fraudulent}
            </span></p>
            
            <p><span className={getHighlightClasses('content', isLegitimate)}>
              {isLegitimate ? highlightPoints.find(p => p.position === 'content')?.legitimate : highlightPoints.find(p => p.position === 'content')?.fraudulent}
            </span></p>
            
            <p><span className={getHighlightClasses('request', isLegitimate)}>
              {isLegitimate ? highlightPoints.find(p => p.position === 'request')?.legitimate : highlightPoints.find(p => p.position === 'request')?.fraudulent}
            </span></p>
            
            <div className="pt-3 border-t border-gray-800 mt-4">
              <pre className={`font-sans text-xs text-gray-400 ${getHighlightClasses('signature', isLegitimate)}`}>
                {isLegitimate ? highlightPoints.find(p => p.position === 'signature')?.legitimate : highlightPoints.find(p => p.position === 'signature')?.fraudulent}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-light text-white mb-6">Business Email Compromise (BEC)</h2>
      
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-medium text-white mb-2">High Financial Impact</h3>
            <p className="text-gray-400 text-sm">
              Business Email Compromise (BEC) attacks impersonating executives have the highest financial impact among B2B phishing variants, with average losses exceeding $125,000 per incident. The FBI reports that BEC scams have cost organizations over $43 billion globally between 2016 and 2023.
            </p>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-medium text-white mb-4">Email Comparison</h3>
      <p className="text-gray-400 mb-6">
        Compare a legitimate executive email with a sophisticated BEC attempt. Toggle the red flags below to highlight differences, or view all differences at once.
      </p>
      
      <div className="flex justify-end mb-4">
        <button 
          onClick={toggleShowAllDifferences}
          className={`px-3 py-1.5 rounded text-sm flex items-center gap-1.5 transition-colors ${
            showAllDifferences 
              ? 'bg-red-500/20 text-red-300' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {showAllDifferences ? 'Hide All Differences' : 'Show All Differences'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {renderEmailContent(true)}
        {renderEmailContent(false)}
      </div>
      
      <h3 className="text-xl font-medium text-white mb-4">Red Flags Analysis</h3>
      <p className="text-gray-400 mb-6">
        Select each element to see differences between legitimate and fraudulent emails. These subtle variations are easy to miss but critical for identifying BEC attempts.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
        {highlightPoints.map((point) => (
          <button
            key={point.id}
            onClick={() => handleHighlightClick(point.id)}
            className={`p-3 border rounded-lg text-left transition-all ${
              activeHighlight === point.id
                ? 'border-purple-500/50 bg-purple-500/10 text-white'
                : 'border-gray-800 bg-black/20 text-neutral-300 hover:border-gray-700 hover:bg-black/40'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <point.icon className="w-4 h-4" />
              <span className="font-medium">{point.element}</span>
            </div>
            <p className="text-xs text-gray-500">
              Click to highlight differences
            </p>
          </button>
        ))}
      </div>
      
      {activeHighlight && (
        <div className="border border-purple-500/30 bg-purple-500/5 rounded-lg p-4 mb-10">
          <h4 className="font-medium text-purple-300 mb-2">
            {highlightPoints.find(p => p.id === activeHighlight)?.element}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div className="bg-gray-900 rounded p-3 border border-green-500/20">
              <p className="text-xs text-green-400 mb-1">Legitimate:</p>
              <p className="text-sm text-gray-300">{highlightPoints.find(p => p.id === activeHighlight)?.legitimate}</p>
            </div>
            <div className="bg-gray-900 rounded p-3 border border-red-500/20">
              <p className="text-xs text-red-400 mb-1">Fraudulent:</p>
              <p className="text-sm text-gray-300">{highlightPoints.find(p => p.id === activeHighlight)?.fraudulent}</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            {highlightPoints.find(p => p.id === activeHighlight)?.explanation}
          </p>
        </div>
      )}
      
      <h3 className="text-xl font-medium text-white mb-4">Real-World BEC Impacts</h3>
      <p className="text-gray-400 mb-6">
        These examples demonstrate the severe financial and reputational damage caused by successful BEC attacks targeting organizations worldwide.
      </p>
      
      <div className="space-y-3 mb-8">
        {realWorldCases.map((caseExample) => (
          <div 
            key={caseExample.company}
            className="border border-gray-800 rounded-lg overflow-hidden"
          >
            <div 
              className="p-3 bg-gray-900 flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpandCase(caseExample.company)}
            >
              <div className="flex items-center gap-3">
                <Building className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-white">{caseExample.company}</span>
                <span className="text-gray-500 text-sm">{caseExample.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-red-400">{caseExample.amount}</span>
                <ChevronRight className={`w-5 h-5 text-gray-500 transition-transform ${
                  expandedCase === caseExample.company ? 'rotate-90' : ''
                }`} />
              </div>
            </div>
            {expandedCase === caseExample.company && (
              <div className="p-4 bg-gray-950 border-t border-gray-800">
                <p className="text-gray-300 text-sm">{caseExample.description}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5 mb-8">
        <h3 className="text-lg font-medium text-white mb-3">Key Lessons from BEC Attacks</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-gray-300 text-sm">
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
            <span>Always verify unusual payment requests through a different communication channel (phone call, in-person)</span>
          </li>
          <li className="flex items-start gap-2 text-gray-300 text-sm">
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
            <span>Implement dual authorization for wire transfers and threshold-based approval processes</span>
          </li>
          <li className="flex items-start gap-2 text-gray-300 text-sm">
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
            <span>Create clear procedures for handling financial requests from executives</span>
          </li>
          <li className="flex items-start gap-2 text-gray-300 text-sm">
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
            <span>Provide specific training for finance staff on recognizing BEC attacks</span>
          </li>
          <li className="flex items-start gap-2 text-gray-300 text-sm">
            <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
            <span>Set up email authentication protocols (DMARC, SPF, DKIM) to detect domain spoofing</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExecutiveImpersonationExample;