import React, { useState } from 'react';
import type { NextPage } from 'next';
import { 
  MessageSquare, 
  AlertTriangle, 
  Shield,
  CheckCircle,
  XCircle,
  Phone,
  Calendar,
  Video,
  Link,
  MessageCircle,
  Clock,
  Eye,
  AlertCircle,
  FileText,
  Search,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PhishingMessage {
  id: string;
  channel: 'slack' | 'teams' | 'whatsapp' | 'sms' | 'calendar' | 'zoom';
  sender: string;
  content: string;
  timestamp: string;
  context: string;
  urgencyLevel: 'high' | 'medium' | 'low';
  hasLink: boolean;
  hasAttachment: boolean;
  suspicious: boolean;
  suspiciousElements: {
    id: string;
    element: string;
    description: string;
  }[];
  correctResponse: string;
}

const messages: PhishingMessage[] = [
  {
    id: 'slack-1',
    channel: 'slack',
    sender: 'alex.miller',
    content: "Hey! I'm stuck in a meeting. Can you quickly review this document? Need feedback ASAP 📎 projectreview.pdf.lnk",
    timestamp: '2 min ago',
    context: 'Direct message from a coworker you occasionally work with',
    urgencyLevel: 'high',
    hasLink: true,
    hasAttachment: true,
    suspicious: true,
    suspiciousElements: [
      {
        id: 'urgency',
        element: 'Urgent request',
        description: 'Creating time pressure to force quick action'
      },
      {
        id: 'file',
        element: '.lnk file extension',
        description: 'Suspicious file extension masquerading as PDF'
      },
      {
        id: 'context',
        element: 'Unusual request pattern',
        description: 'Unexpected urgent request from occasional contact'
      }
    ],
    correctResponse: 'Verify request through another channel'
  },
  {
    id: 'teams-1',
    channel: 'teams',
    sender: 'IT Support',
    content: '🚨 Security Alert: Your account requires immediate verification. Click here to maintain access: securityportal.example.net',
    timestamp: '5 min ago',
    context: 'Message appears to be from IT department',
    urgencyLevel: 'high',
    hasLink: true,
    hasAttachment: false,
    suspicious: true,
    suspiciousElements: [
      {
        id: 'domain',
        element: 'Suspicious URL',
        description: 'External domain not matching company URL'
      },
      {
        id: 'sender',
        element: 'Generic sender name',
        description: 'IT Support instead of specific staff member'
      }
    ],
    correctResponse: 'Contact IT department through official channels'
  }
];

const MultiChannelPhishingSimulator: NextPage = () => {
  const [activeChannel, setActiveChannel] = useState<string>('slack');
  const [selectedMessage, setSelectedMessage] = useState<PhishingMessage | null>(null);
  const [identifiedElements, setIdentifiedElements] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleElementIdentify = (messageId: string, elementId: string) => {
    const key = `${messageId}-${elementId}`;
    if (!identifiedElements.includes(key)) {
      setIdentifiedElements([...identifiedElements, key]);
      setScore(score + 10);
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'slack':
        return <MessageSquare />;
      case 'teams':
        return <MessageCircle />;
      case 'whatsapp':
        return <Smartphone />;
      case 'calendar':
        return <Calendar />;
      case 'zoom':
        return <Video />;
      default:
        return <MessageSquare />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold">Advanced Channel Phishing Simulator</h1>
            <p className="text-sm text-gray-400">Multi-Channel Security Training</p>
          </div>
        </div>
        <div className="bg-gray-800 px-4 py-2 rounded-lg flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-blue-400" />
          <span className="text-xl font-bold">{score}</span>
        </div>
      </div>

      {/* Channel Selection */}
      <div className="flex gap-2 p-2 bg-gray-800 rounded-lg overflow-x-auto">
        {['slack', 'teams', 'whatsapp', 'calendar', 'zoom'].map((channel) => (
          <button
            key={channel}
            onClick={() => setActiveChannel(channel)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeChannel === channel
                ? 'bg-blue-600 text-white'
                : 'hover:bg-gray-700 text-gray-400'
            }`}
          >
            {getChannelIcon(channel)}
            <span className="capitalize">{channel}</span>
          </button>
        ))}
      </div>

      {/* Message Interface */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        {/* Channel Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getChannelIcon(activeChannel)}
            <span className="font-medium capitalize">{activeChannel}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-400">Training Mode</span>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 space-y-4">
          {messages
            .filter((msg) => msg.channel === activeChannel)
            .map((message) => (
              <div key={message.id} className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center text-gray-300">
                    {message.sender.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.sender}</span>
                      <span className="text-sm text-gray-400">{message.timestamp}</span>
                    </div>
                    <div className="mt-1 p-3 bg-gray-700 rounded-lg">
                      {message.content}
                    </div>
                    
                    {/* Interactive Elements */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.suspiciousElements.map((element) => (
                        <button
                          key={element.id}
                          onClick={() => handleElementIdentify(message.id, element.id)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            identifiedElements.includes(`${message.id}-${element.id}`)
                              ? 'bg-blue-900 text-blue-100'
                              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                          }`}
                        >
                          {identifiedElements.includes(`${message.id}-${element.id}`) ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              {element.element}
                            </span>
                          ) : (
                            'Identify Suspicious Element'
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Context & Analysis */}
                <div className="ml-14 p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    <span className="font-medium">Message Context</span>
                  </div>
                  <p className="text-sm text-gray-300">{message.context}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Training Tips */}
      <Alert className="bg-blue-900/50 border-blue-800">
        <Eye className="w-4 h-4 text-blue-400" />
        <AlertDescription className="text-blue-100">
          Modern phishing attempts often use business messaging platforms to appear more legitimate.
          Always verify urgent requests through alternative channels and be cautious of unexpected links or files.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default MultiChannelPhishingSimulator;