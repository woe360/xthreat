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
  const [selectedDifference, setSelectedDifference] = useState<string | null>(null)
  const [foundDifferences, setFoundDifferences] = useState<string[]>([])
  const [showHeaders, setShowHeaders] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<EmailLink | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(-1)

  const totalDifferences = differences.length
  const progress = (foundDifferences.length / totalDifferences) * 100

  const handleElementClick = (element: string) => {
    if (!foundDifferences.includes(element)) {
      setSelectedDifference(element)
      setFoundDifferences([...foundDifferences, element])
    }
  }

  const handleComplete = () => {
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
    const remainingHints = getRemainingHints()
    if (currentHintIndex < remainingHints.length - 1) {
      setCurrentHintIndex(prev => prev + 1)
    }
  }

  const getHighlightClass = (element: string) => {
    return foundDifferences.includes(element) 
      ? 'ring-2 ring-green-500/50 ring-offset-2 ring-offset-[#181b24] rounded-lg transition-all duration-300'
      : ''
  }

  const EmailView = ({ email, type }: { email: Email, type: 'legitimate' | 'phishing' }) => (
    <div className="flex-1 bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
      {/* <div className="border-b border-gray-800 p-2 flex items-center justify-between">
        <button 
          onClick={() => setShowHeaders(!showHeaders)}
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm text-gray-300"
        >
          <Eye size={16} />
          {showHeaders ? 'Hide' : 'Show'} Headers
        </button>
        <span className="text-sm text-gray-400">{type === 'legitimate' ? 'Legitimate Email' : 'Suspicious Email'}</span>
      </div> */}

      <div className="p-6 space-y-6">
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
    </div>
  )

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-[#181b24] border border-gray-800/40 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-white mb-2">Exercise Complete!</h2>
            <div className="flex flex-col items-center justify-center mt-8 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-blue-500/10 border-4 border-blue-500/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-400">
                    {Math.round((foundDifferences.length / totalDifferences) * 100)}%
                  </span>
                </div>
              </div>
              <div className="mt-4 text-gray-400">
                <span className="text-xl font-medium text-blue-400">{foundDifferences.length}</span>
                <span className="mx-2">/</span>
                <span className="text-xl">{totalDifferences}</span>
                <p className="text-sm mt-1">Differences Found</p>
              </div>
            </div>

            <div className="max-w-lg mx-auto text-left mb-8">
              <h3 className="text-gray-300 font-medium mb-3">You identified:</h3>
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
          </div>
          
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => router.push(`/modules/${moduleId}`)}
              className="border border-gray-500 hover:border-gray-400 text-gray-200 px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
            >
              Return to Module
            </button>
            <button 
              onClick={() => router.push(`/modules/${moduleId}/next`)}
              className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
            >
              Next Lesson <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[90vw] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-400">
          {foundDifferences.length} of {totalDifferences} differences found
        </span>
        <div className="flex items-center gap-4">
          {foundDifferences.length < totalDifferences && (
            <button
              onClick={handleShowHint}
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg flex items-center gap-2"
              disabled={currentHintIndex >= getRemainingHints().length - 1}
            >
              <HelpCircle size={16} />
              {currentHintIndex === -1 ? 'Show Hint' : 'Next Hint'}
            </button>
          )}
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium"
            onClick={handleComplete}
          >
            Complete Exercise
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-[3] flex gap-4">
          <EmailView email={legitimateEmail} type="legitimate" />
          <EmailView email={phishingEmail} type="phishing" />
        </div>

        <div className="flex-1 space-y-4">
          {selectedDifference && (
            <Alert className="bg-blue-900/20 border-blue-900/50">
              <ArrowLeftRight className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-200">
                {differences.find(d => d.id === selectedDifference)?.explanation}
              </AlertDescription>
            </Alert>
          )}

          {currentHintIndex >= 0 && (
            <Alert className="bg-gray-800/50 border-gray-700">
              <HelpCircle className="h-4 w-4 text-gray-400" />
              <AlertDescription className="text-gray-300 text-sm">
                Hint {currentHintIndex + 1}: {getRemainingHints()[currentHintIndex]?.hint}
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-[#181b24] border border-gray-800/40 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-200 mb-3">Key Differences Found:</h3>
            <div className="space-y-2">
              {foundDifferences.map((id) => {
                const diff = differences.find(d => d.id === id)
                return (
                  <div key={id} className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                      <Check size={16} />
                      <span className="font-medium capitalize">{id}</span>
                    </div>
                    <div className="text-sm text-gray-300">
                      {diff?.explanation}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailComparison