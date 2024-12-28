import React, { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  AlertTriangle, 
  Paperclip, 
  Link, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  User,
  Calendar,
  Shield,
  Eye,
  ExternalLink,
  Clock
} from 'lucide-react';

// Enhanced sample phishing email data
const sampleEmail = {
  from: 'paypa1-security@secure-login.com',
  to: 'user@company.com',
  subject: 'Urgent: Account Security Update Required',
  date: '2024-12-28 09:15 AM',
  content: 'Dear Valued Customer, We have detected unusual activity on your account. Click here to verify your identity and prevent account suspension. This requires immediate attention.',
  links: [
    { text: 'Click here', url: 'http://malicious-site.com/login' }
  ],
  attachments: [{
    name: 'Security_Update.pdf.exe',
    size: '245 KB',
    type: 'executable'
  }],
  suspiciousElements: {
    sender: 'Suspicious domain mimicking PayPal (paypa1 instead of paypal)',
    urgency: 'Creates false sense of urgency with threatening language',
    link: 'Hover preview shows suspicious URL: malicious-site.com',
    attachment: 'Executable file (.exe) disguised as PDF document',
    spelling: 'Multiple grammar and spelling errors in content',
    headers: 'Mismatched email headers and routing information'
  }
};

const EmailInspector = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [score, setScore] = useState(0);
  const [foundElements, setFoundElements] = useState([]);
  const [showHint, setShowHint] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleElementClick = (element) => {
    setSelectedElement(element);
    if (!foundElements.includes(element)) {
      setFoundElements([...foundElements, element]);
      setScore(score + 20);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-900 text-gray-100 min-h-screen">
      {/* Training Mode Indicator */}
      <div className="bg-yellow-900 text-yellow-100 px-4 py-2 rounded-lg flex items-center gap-2">
        <Shield size={20} />
        <span className="font-medium">Secure Training Environment Active</span>
      </div>

      {/* Security Score Panel */}
      <div className="bg-gray-800 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-700 p-3 rounded-full">
            <Shield className="text-blue-400" size={24} />
          </div>
          <div>
            <h3 className="font-medium text-gray-200">Security Awareness Score</h3>
            <div className="text-2xl font-bold text-blue-400">{score}/100</div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-sm text-gray-400">Threats Found</div>
            <div className="text-xl font-bold text-gray-200">
              {foundElements.length}/{Object.keys(sampleEmail.suspiciousElements).length}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400">Risk Level</div>
            <div className="text-xl font-bold text-red-400">High</div>
          </div>
        </div>
      </div>

      {/* Email Viewer */}
      <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
        {/* Email Controls */}
        <div className="bg-gray-700 p-2 flex gap-2">
          <button 
            onClick={() => setShowHeaders(!showHeaders)}
            className="flex items-center gap-1 px-3 py-1 rounded bg-gray-600 hover:bg-gray-500 text-sm"
          >
            <Eye size={16} />
            {showHeaders ? 'Hide' : 'Show'} Headers
          </button>
        </div>

        {/* Email Headers */}
        {showHeaders && (
          <div className="border-b border-gray-700 bg-gray-800 p-4 text-sm font-mono">
            <button 
              onClick={() => handleElementClick('headers')}
              className="text-gray-400 hover:text-gray-200 whitespace-pre-wrap"
            >
              Received: from mail.secure-login.com (192.168.1.1)
              {'\n'}by mx.google.com with ESMTPS id 123456789
              {'\n'}for <user@company.com>
            </button>
          </div>
        )}

        {/* Email Content */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-700 pb-4">
            <button 
              onClick={() => handleElementClick('sender')}
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded group"
            >
              <Mail className="text-gray-400 group-hover:text-blue-400" size={20} />
              <div className="text-left">
                <div className="font-medium">{sampleEmail.from}</div>
                <div className="text-sm text-gray-400">to: {sampleEmail.to}</div>
              </div>
            </button>
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={16} />
              <span className="text-sm">{sampleEmail.date}</span>
            </div>
          </div>

          <button 
            onClick={() => handleElementClick('urgency')}
            className="font-medium text-xl hover:bg-gray-700 p-2 rounded w-full text-left"
          >
            {sampleEmail.subject}
          </button>

          <div className="space-y-4">
            <button 
              onClick={() => handleElementClick('content')}
              className="text-left hover:bg-gray-700 p-2 rounded w-full"
            >
              {sampleEmail.content}
            </button>

            {/* Simulated Link */}
            <div 
              className="relative inline-block"
              onMouseEnter={() => setHoveredLink(sampleEmail.links[0])}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <button
                onClick={() => handleElementClick('link')}
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                Click here <ExternalLink size={16} />
              </button>
              {hoveredLink && (
                <div className="absolute left-0 bottom-full mb-2 bg-gray-900 text-xs p-2 rounded shadow-lg">
                  {hoveredLink.url}
                </div>
              )}
            </div>
          </div>

          {/* Attachments */}
          <div className="border-t border-gray-700 pt-4">
            <button 
              onClick={() => handleElementClick('attachment')}
              className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded w-full"
            >
              <Paperclip className="text-gray-400" size={20} />
              <span>{sampleEmail.attachments[0].name}</span>
              <span className="text-sm text-gray-400">({sampleEmail.attachments[0].size})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Area */}
      {selectedElement && (
        <Alert className="bg-red-900 border-red-700 text-red-100">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-100">
            {sampleEmail.suspiciousElements[selectedElement]}
          </AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button 
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
          onClick={() => {/* Report handling logic */}}
        >
          <AlertTriangle size={20} />
          Report as Phishing
        </button>
        <button 
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
          onClick={() => {/* Training reset logic */}}
        >
          <ChevronDown size={20} />
          Archive
        </button>
      </div>

      {/* Hint System */}
      {showHint && (
        <div className="mt-4 p-4 bg-blue-900 rounded-lg text-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle size={20} />
            <span className="font-medium">Security Tips</span>
          </div>
          <ul className="space-y-2 text-sm">
            <li>• Check sender emails carefully for misspellings or unusual domains</li>
            <li>• Be wary of urgent language or threats</li>
            <li>• Hover over links to preview their true destination</li>
            <li>• Never open unexpected executable attachments</li>
            <li>• Verify email headers for suspicious routing information</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EmailInspector;