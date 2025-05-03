import React, { useState } from 'react'
import { Alert, AlertDescription } from '@/components/alert'
import { useRouter } from 'next/navigation'
import { 
  Mail, 
  AlertTriangle, 
  Paperclip, 
  ExternalLink, 
  Eye,
  ChevronRight,
  Check,
  HelpCircle,
  ArrowLeftRight
} from 'lucide-react'

interface EmailLink {
  text: string
  url: string
}

interface EmailAttachment {
  name: string
  size: string
  type: string
}

interface Email {
  from: string
  to: string
  subject: string
  date: string
  content: string
  links: EmailLink[]
  attachments: EmailAttachment[]
}

interface Difference {
  id: string
  legitimateElement: string
  phishingElement: string
  explanation: string
}

const legitimateEmail: Email = {
  from: 'service@paypal.com',
  to: 'user@company.com',
  subject: 'PayPal: Action required for your account',
  date: '09:15 AM',
  content: `Dear PayPal Customer,

We noticed some unusual activity on your PayPal account. To ensure your account's security, please review your recent account activity.

You can do this by:
1. Signing in to your PayPal account
2. Going to your Account Overview
3. Reviewing your recent transactions

If you notice any unauthorized transactions, please contact our support team immediately.

For your security, always access PayPal by typing www.paypal.com directly in your browser.`,
  links: [
    { text: 'Sign in to PayPal', url: 'https://www.paypal.com/signin' }
  ],
  attachments: []
}

const phishingEmail: Email = {
  from: 'service@paypa1-secure.com',
  to: 'user@company.com',
  subject: 'PayPal: Your account requires immediate verification',
  date: '09:15 AM',
  content: `Dear Valued PayPal Member,

We have detected suspicious login attempts on your account from an unrecognized device in Bangkok, Thailand. As a security measure, we have temporarily limited access to your account.

Recent suspicious activities:
• Multiple failed login attempts
• Security settings changes
• Unusual transaction patterns

To prevent any unauthorized access and restore full account functionality, please verify your identity immediately.

⚠️ Important: If you do not complete this security verification within 24 hours, we may need to permanently restrict access to your account.`,
  links: [
    { text: 'Secure Account Verification', url: 'http://paypa1-secure-verification.com/login' }
  ],
  attachments: [{
    name: 'PayPal_Verification.pdf.exe',
    size: '245 KB',
    type: 'executable'
  }]
}

const differences: Difference[] = [
  {
    id: 'sender',
    legitimateElement: 'service@paypal.com',
    phishingElement: 'service@paypa1-secure.com',
    explanation: 'Legitimate PayPal emails always come from @paypal.com. The phishing email uses a similar-looking domain with the number "1" instead of the letter "l".'
  },
  {
    id: 'subject',
    legitimateElement: 'Action required for your account',
    phishingElement: 'Your account requires immediate verification',
    explanation: 'The phishing email creates artificial urgency with words like "immediate" and threats of account restriction.'
  },
  {
    id: 'content',
    legitimateElement: 'Clear instructions to visit PayPal directly',
    phishingElement: 'Pressure tactics and urgent threats',
    explanation: 'The phishing email uses fear and urgency to pressure immediate action, while the legitimate email provides clear, calm instructions.'
  },
  {
    id: 'links',
    legitimateElement: 'https://www.paypal.com/signin',
    phishingElement: 'http://paypa1-secure-verification.com/login',
    explanation: 'Legitimate PayPal links always go to paypal.com. The phishing email uses a deceptive domain.'
  },
  {
    id: 'attachments',
    legitimateElement: 'No attachments',
    phishingElement: 'PayPal_Verification.pdf.exe',
    explanation: 'PayPal rarely sends attachments. The .exe file is disguised as a PDF and is likely malicious.'
  }
]

interface EmailComparisonProps {
  moduleId: string
  onComplete?: () => void
}

export function EmailComparison({ moduleId, onComplete }: EmailComparisonProps) {
  const router = useRouter()
  const [foundDifferences, setFoundDifferences] = useState<string[]>([])
  const [showHeaders, setShowHeaders] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<EmailLink | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(-1)
  const [showHintWarning, setShowHintWarning] = useState(false)
  const [showHintConfirm, setShowHintConfirm] = useState(false)
  const [currentHint, setCurrentHint] = useState<string | null>(null)

  const totalDifferences = differences.length
  const progress = (foundDifferences.length / totalDifferences) * 100

  const handleElementClick = (element: string) => {
    if (!foundDifferences.includes(element)) {
      setFoundDifferences([...foundDifferences, element])
    }
  }

  const handleComplete = () => {
    console.log('handleComplete called!');
    setIsComplete(true)
    if (onComplete) {
      onComplete()
    }
  }

  const getRemainingHints = () => {
    return differences
      .filter(diff => !foundDifferences.includes(diff.id))
      .map(diff => ({
        element: diff.id,
        hint: `Compare the ${diff.id} between the two emails`
      }))
  }

  const handleShowHint = () => {
    if (currentHintIndex === -1) {
      setShowHintWarning(true);
      return;
    }
    
    const remainingHints = getRemainingHints()
    if (currentHintIndex < remainingHints.length - 1) {
      const nextHint = remainingHints[currentHintIndex + 1];
      setCurrentHint(nextHint.hint);
      setShowHintConfirm(true);
    }
  }

  const handleConfirmFirstHint = () => {
    setShowHintWarning(false);
    const remainingHints = getRemainingHints();
    if (remainingHints.length > 0) {
      setCurrentHint(remainingHints[0].hint);
      setShowHintConfirm(true);
    }
  };

  const handleConfirmHint = () => {
    setCurrentHintIndex(prev => prev + 1);
    setShowHintConfirm(false);
    setCurrentHint(null);
  };

  const getHighlightClass = (element: string) => {
    return foundDifferences.includes(element) 
      ? 'ring-1 ring-green-500/40 ring-offset-2 ring-offset-[#0d0d0d] rounded-lg transition-all duration-300'
      : ''
  }

  const EmailView = ({ email, type }: { email: Email, type: 'legitimate' | 'phishing' }) => (
    <div className="flex-1 rounded-lg overflow-hidden pr-2 pl-1 pb-1 space-y-6 bg-black/20">
      <div className="border-b border-gray-800/60 pb-3 mb-4">
        <span className={`text-sm font-medium ${type === 'legitimate' ? 'text-green-400' : 'text-red-400'}`}>
          {type === 'legitimate' ? 'Legitimate Example' : 'Phishing Example'}
        </span>
      </div>

      <button 
        onClick={() => handleElementClick('sender')}
        className={`flex items-center gap-3 group w-full p-2 ${getHighlightClass('sender')}`}
      >
        <Mail className="text-gray-400" size={20} />
        <div className="text-left">
          <div className="font-medium text-gray-200">
            {email.from}
          </div>
          <div className="text-sm text-gray-400">to: {email.to}</div>
        </div>
        <div className="ml-auto text-gray-400">
          <span className="text-sm">{email.date}</span>
        </div>
      </button>

      <button 
        onClick={() => handleElementClick('content')}
        className={`text-left w-full p-2 ${getHighlightClass('content')}`}
      >
        <div className="text-xl font-medium mb-4">{email.subject}</div>
        <div className="text-gray-300 whitespace-pre-line">{email.content}</div>
      </button>

      <div className="space-y-4">
        {email.links.map((link, index) => (
          <div 
            key={index}
            className="relative inline-block"
            onMouseEnter={() => setHoveredLink(link)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <button
              onClick={() => handleElementClick('links')}
              className={`text-blue-400 hover:underline flex items-center gap-1 p-2 ${getHighlightClass('links')}`}
            >
              {link.text} <ExternalLink size={16} />
            </button>
            {hoveredLink === link && (
              <div className="absolute left-0 bottom-full mb-2 bg-gray-950 text-xs p-2 rounded-lg">
                {link.url}
              </div>
            )}
          </div>
        ))}
      </div>

      {email.attachments.map((attachment, index) => (
        <button 
          key={index}
          onClick={() => handleElementClick('attachments')}
          className={`flex items-center gap-2 text-gray-300 hover:text-gray-200 p-2 ${getHighlightClass('attachments')}`}
        >
          <Paperclip size={20} />
          <span>{attachment.name}</span>
          <span className="text-sm text-gray-400">({attachment.size})</span>
        </button>
      ))}
    </div>
  )

  if (isComplete) {
    return (
      <div className="max-w-3xl w-full mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 font-normal mb-6">
          Exercise Complete!
        </h1>
        
        <div className="relative w-full max-w-md mx-auto mb-12 py-8">
          <div className="absolute inset-0 flex items-center justify-center"></div>
          <div className="relative z-10 text-center">
            <div className="text-4xl font-light text-white mb-2">{foundDifferences.length}/{totalDifferences}</div>
            <p className="text-neutral-400">
              Differences Identified
            </p>
          </div>
        </div>

        <div className="max-w-lg mx-auto text-left mb-8 text-sm">
          <h3 className="text-gray-300 font-medium mb-3">Review:</h3>
          <div className="space-y-2">
            {foundDifferences.map((id) => (
              <div key={id} className="flex items-center gap-2 text-green-400">
                <Check size={16} />
                <span>{differences.find(d => d.id === id)?.explanation}</span>
              </div>
            ))}
          </div>

          {foundDifferences.length < totalDifferences && (
            <div className="mt-4">
              <h3 className="text-gray-300 font-medium mb-3">You missed:</h3>
              <div className="space-y-2">
                {differences
                  .filter(diff => !foundDifferences.includes(diff.id))
                  .map(diff => (
                    <div key={diff.id} className="flex items-center gap-2 text-red-400">
                      <AlertTriangle size={16} />
                      <span>{diff.explanation}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800/40 pt-8 mt-8 max-w-md mx-auto flex justify-center gap-4">
          <button
            onClick={() => router.push(`/modules/${moduleId}`)}
            className="inline-flex items-center px-6 py-3 border border-white/50 bg-white/20 text-white hover:bg-white/20 rounded-lg transition"
          >
            Continue <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto py-12">
      <div className="flex justify-between items-center mb-8 text-sm text-neutral-500">
        <span>Identify {totalDifferences} key differences</span>
        <div className="flex items-center gap-3">
          {foundDifferences.length < totalDifferences && (
            <button
              onClick={handleShowHint}
              className="px-3 py-1.5 border border-gray-800 rounded-full text-xs text-neutral-400 hover:border-gray-700 hover:text-neutral-300 transition-colors flex items-center gap-1"
              disabled={currentHintIndex >= getRemainingHints().length - 1}
            >
              <HelpCircle size={14} /> Hint
            </button>
          )}
          <button 
            className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 text-sm transition-all ${ 
                foundDifferences.length === totalDifferences 
                ? "bg-white/70 text-black hover:bg-white/60" 
                : "bg-neutral-800/50 text-neutral-500 cursor-not-allowed" 
            }`}
            onClick={handleComplete}
            disabled={foundDifferences.length < totalDifferences}
          >
            I'm Done <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-[3] flex flex-col md:flex-row gap-4">
          <EmailView email={legitimateEmail} type="legitimate" />
          <EmailView email={phishingEmail} type="phishing" />
        </div>

        <div className="flex-1 space-y-4 lg:max-w-sm">
          <div className="">
            <h3 className="text-lg font-medium text-gray-200 mb-3">Key Differences Found:</h3>
            <div className="space-y-2">
              {foundDifferences.map((id) => {
                const diff = differences.find(d => d.id === id)
                return (
                  <div 
                    key={id} 
                    className="p-3 rounded-lg border border-green-500/50 bg-green-500/10"
                  >
                    <div className="flex items-center gap-2 text-green-400 mb-1.5">
                      <Check size={16} />
                      <span className="font-medium capitalize text-sm text-white">{id}</span>
                    </div>
                    <div className="text-xs text-green-300/90 pl-6">
                      {diff?.explanation}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {showHintWarning && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div className="bg-black border border-gray-700/50 rounded-xl p-6 max-w-md w-full mx-auto shadow-xl">
            <h3 className="text-lg font-medium text-gray-100 mb-2">Show Hint?</h3>
            <p className="text-sm text-neutral-300 mb-6">
              Are you sure you want to see a hint? Compare the elements between the two emails first!
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowHintWarning(false)}
                className="px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmFirstHint}
                className="border border-white/50 bg-white/10 text-white hover:bg-white/20 
                  transition-colors px-4 py-2 rounded-lg font-medium"
              >
                Show Hint
              </button>
            </div>
          </div>
        </div>
      )}
      {showHintConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div className="bg-black border border-gray-700/50 rounded-xl p-6 max-w-md w-full mx-auto shadow-xl">
            <h3 className="text-lg font-medium text-gray-100 mb-2">Hint {currentHintIndex + 2}</h3>
            <p className="text-sm text-neutral-300 mb-6">
              {currentHint}
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleConfirmHint}
                className="border border-white/50 bg-white/10 text-white hover:bg-white/20 
                  transition-colors px-4 py-2 rounded-lg font-medium"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmailComparison