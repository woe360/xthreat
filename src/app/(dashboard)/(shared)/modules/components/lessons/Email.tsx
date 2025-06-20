import React, { useState } from 'react'
import { Alert, AlertDescription } from '@/components/alert'
import { useRouter } from 'next/navigation'
import { useAnalytics } from '@/hooks/useAnalytics'
import { 
  Mail, 
  AlertTriangle, 
  Paperclip, 
  ExternalLink, 
  Shield,
  Eye,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Check,
  HelpCircle,
  X,
  Lightbulb
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

interface SampleEmail {
  from: string
  to: string
  subject: string
  date: string
  content: string
  links: EmailLink[]
  attachments: EmailAttachment[]
  suspiciousElements: Record<string, string>
}

// Add hints for each suspicious element
const elementHints: Record<string, string> = {
  sender: "Check the sender's email address carefully - does it look legitimate?",
  urgency: "Look for language designed to make you act quickly without thinking",
  link: "Hover over links to see their true destination",
  attachment: "Be wary of executable files or unexpected attachments",
  content: "Consider if the tone and requests match legitimate communications",
  headers: "Email headers can reveal authentication failures"
}

const sampleEmail: SampleEmail = {
  from: 'service@paypa1-secure.com',
  to: 'user@company.com',
  subject: 'PayPal: Your account requires immediate verification',
  date: '2024-12-28 09:11 AM',
  content: `Dear Valued PayPal Member,

We have detected suspicious login attempts on your account from an unrecognized device in Bangkok, Thailand. As a security measure, we have temporarily limited access to your account.

Recent suspicious activities:
• Multiple failed login attempts
• Security settings changes
• Unusual transaction patterns

To prevent any unauthorized access and restore full account functionality, please verify your identity by following these steps:

1. Click the secure verification link below
2. Confirm your account information
3. Review recent account activity

⚠️ Important: If you do not complete this security verification within 24 hours, we may need to permanently restrict access to your account.

For your security, please use our secure verification system:`,
  links: [
    { text: 'Secure Account Verification', url: 'http://paypa1-secure-verification.com/login' }
  ],
  attachments: [{
    name: 'PayPal_Verification.pdf.exe',
    size: '245 KB',
    type: 'executable'
  }],
  suspiciousElements: {
    sender: 'Fraudulent domain using number "1" instead of letter "l" in PayPal',
    urgency: 'Creates artificial urgency with account restriction threats',
    link: 'Malicious URL masquerading as PayPal',
    attachment: 'Malicious executable (.exe) file disguised as PDF',
    // content: 'Uses urgency and fear tactics to pressure user action'
  }
}

interface EmailInspectorProps {
  moduleId: string
  onComplete?: () => void
}

export function EmailInspector({ moduleId, onComplete }: EmailInspectorProps) {
  const router = useRouter()
  const analytics = useAnalytics()
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [activePopup, setActivePopup] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [foundElements, setFoundElements] = useState<string[]>([])
  const [hoveredLink, setHoveredLink] = useState<EmailLink | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(-1)
  const [showHintConfirm, setShowHintConfirm] = useState(false)
  const [showHintWarning, setShowHintWarning] = useState(false)
  const [currentHint, setCurrentHint] = useState<string | null>(null)

  // Track lesson start when component mounts
  React.useEffect(() => {
    analytics.trackLessonStart(moduleId, 'email_inspector');
  }, [moduleId, analytics]);

  const totalThreats = Object.keys(sampleEmail.suspiciousElements).length
  
  // Use quiz styling for found elements, but without revealing borders initially
  const getHighlightClass = (element: string) => {
    return foundElements.includes(element) 
      ? "bg-purple-500/10 text-white rounded-lg" // Selected style (no border)
      : "bg-transparent text-neutral-300 hover:bg-black/30 rounded-lg"; // Default style (no border, subtle hover)
  };

  const getRemainingHints = () => {
    return Object.entries(elementHints)
      .filter(([key]) => !foundElements.includes(key))
      .map(([key, hint]) => ({ element: key, hint }));
  }

  const handleElementClick = (element: string) => {
    if (!foundElements.includes(element)) {
      const newFound = [...foundElements, element];
      setFoundElements(newFound);
      setScore(newFound.length); // Simple score: 1 point per element found
      
      // Track element found
      analytics.trackInteraction('element_found', { 
        element, 
        score: newFound.length, 
        total_elements: totalThreats 
      });
    }
    setActivePopup(activePopup === element ? null : element);
  };

  const handleReport = () => {
    // Track completion analytics
    analytics.trackLessonComplete({
      lesson_id: 'email_inspector',
      module_id: moduleId,
      time_spent: analytics.getTimeSpent(),
      completion_status: 'completed',
      interactions: analytics.getInteractionCount()
    });
    
    // Completion is triggered when all elements are found
    setIsComplete(true);
    // onComplete is called from the completion screen button
  };

  // --- Hint Logic handlers (keep as is) --- 
  const handleShowHintClick = () => {
    if (currentHintIndex === -1) {
      setShowHintWarning(true);
      return;
    }
    
    const remainingHints = getRemainingHints();
    if (currentHintIndex < remainingHints.length - 1) {
      const nextHint = remainingHints[currentHintIndex + 1];
      setCurrentHint(nextHint.hint);
      setShowHintConfirm(true);
    }
  };

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
  
  // --- Completion Navigation --- 
  const handleCompletionNavigation = () => {
    if (onComplete) {
      onComplete();
    } else {
      router.push(`/modules/${moduleId}`); // Fallback
    }
  };

  const remainingHints = getRemainingHints();
  const hasRemainingHints = currentHintIndex < remainingHints.length - 1;
  const allElementsFound = foundElements.length === totalThreats;

  // --- Completion Screen --- 
  if (isComplete) {
    return (
      // Match Quiz completion screen layout
      <div className="max-w-3xl w-full mx-auto py-12 px-4 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 font-normal mb-6">
          Analysis Complete!
        </h1>
        
        <div className="relative w-full max-w-md mx-auto mb-12 py-8">
          <div className="absolute inset-0 flex items-center justify-center"></div>
          <div className="relative z-10 text-center">
            <div className="text-4xl font-light text-white mb-2">{score}/{totalThreats}</div>
            <p className="text-neutral-400">
              Threats Identified
            </p>
          </div>
        </div>

         {/* Review Found/Missed - Simplified */}
         <div className="max-w-lg mx-auto text-left mb-8 text-sm">
           <h3 className="text-gray-300 font-medium mb-3">Review:</h3>
           <div className="space-y-2">
              {Object.entries(sampleEmail.suspiciousElements).map(([key, value]) => (
                <div key={key} className={`flex items-start gap-2 ${foundElements.includes(key) ? 'text-green-400' : 'text-red-400'}`}>
                  {foundElements.includes(key) ? <Check size={16} className="mt-0.5 flex-shrink-0" /> : <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />}
                  <span><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</span>
                </div>
              ))}
            </div>
         </div>

         {/* Action Buttons - Match Quiz completion */}
        <div className="border-t border-gray-800/40 pt-8 mt-8 max-w-md mx-auto flex justify-center gap-4">
           <button
             onClick={handleCompletionNavigation} // Use helper
             className="inline-flex items-center px-6 py-3 border border-white/50 bg-white/20 text-white hover:bg-white/20 rounded-lg transition"
           >
             Continue <ChevronRight size={16} className="ml-1" />
           </button>
        </div>
      </div>
    );
  }

  // --- Exercise In Progress --- 
  return (
     // Match Quiz container style
    <div className="max-w-3xl w-full mx-auto py-12 px-4">
      {/* Header - Match Quiz header style */} 
      <div className="flex justify-between items-center mb-8 text-sm text-neutral-500">
        <span>Identify {totalThreats} suspicious elements</span>
        <div className="flex items-center gap-3">
          {hasRemainingHints && (
             <button
              onClick={handleShowHintClick}
              className="px-3 py-1.5 border border-gray-800 rounded-full text-xs text-neutral-400 hover:border-gray-700 hover:text-neutral-300 transition-colors flex items-center gap-1"
            >
              <HelpCircle size={14} /> Hint
            </button>
          )}
          <button 
             // Style like enabled quiz button, disable until all found
             className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 text-sm transition-all ${ 
                 allElementsFound 
                 ? "bg-white/70 text-black hover:bg-white/60" 
                 : "bg-neutral-800/50 text-neutral-500 cursor-not-allowed" 
             }`}
            onClick={handleReport} // Triggers completion state
            disabled={!allElementsFound}
          >
            Analyze <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Main Content: Email Display - Simplified Container */} 
      <div className="p-6 space-y-4 bg-black/20 border border-gray-800/40 rounded-lg">
          
          {/* --- Clickable Elements --- */} 
          {/* Apply quiz option button styling to each clickable element */} 
          
          {/* Sender */} 
          <div className="relative">
            <button 
              onClick={() => handleElementClick('sender')}
              className={`w-full p-4 text-left transition-all ${getHighlightClass('sender')}`}
              disabled={foundElements.includes('sender')} 
            >
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 mt-1 flex-shrink-0 text-gray-400" />
                <div className="flex-1 flex justify-between items-start">
                  <div className="text-sm">
                    <div className="font-medium text-gray-200">{sampleEmail.from}</div>
                    <div className="text-gray-400 mt-1">to: {sampleEmail.to}</div>
                  </div>
                  <div className="text-xs text-gray-400 flex-shrink-0 ml-4">{sampleEmail.date}</div>
                </div>
              </div>
            </button>
            {/* Popup for Sender - Apply consistent styling */} 
            {activePopup === 'sender' && (
              <div className={`absolute z-50 bg-black rounded-lg p-4 shadow-xl w-80 border border-gray-700/50 top-full left-0 mt-2`}> 
                <div className="flex justify-between items-start mb-2">
                  <AlertTriangle className="text-red-400 flex-shrink-0 mr-2" size={18} />
                  <p className="text-sm text-neutral-300 flex-grow">{sampleEmail.suspiciousElements.sender}</p>
                  <button onClick={(e) => { e.stopPropagation(); setActivePopup(null); }} className="text-gray-500 hover:text-gray-300 ml-2 flex-shrink-0"><X size={16} /></button>
                </div>
              </div>
            )}
          </div>

          {/* Subject/Content */} 
           <div className="relative">
            <button 
              onClick={() => handleElementClick('content')}
              className={`w-full p-4 text-left transition-all ${getHighlightClass('content')}`}
              disabled={foundElements.includes('content')}
            >
              <div className="mb-4">
                 <h3 className="text-lg font-medium text-white mb-2">{sampleEmail.subject}</h3> 
              </div>
              <div className="text-sm text-gray-300 whitespace-pre-line">{sampleEmail.content}</div>
            </button>
            {/* Popup for Content - Apply consistent styling */} 
            {activePopup === 'content' && (
               <div className={`absolute z-50 bg-black rounded-lg p-4 shadow-xl w-80 border border-gray-700/50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                 <div className="flex justify-between items-start mb-2">
                   <AlertTriangle className="text-red-400 flex-shrink-0 mr-2" size={18} />
                   <p className="text-sm text-neutral-300 flex-grow">{sampleEmail.suspiciousElements.content}</p>
                   <button onClick={(e) => { e.stopPropagation(); setActivePopup(null); }} className="text-gray-500 hover:text-gray-300 ml-2 flex-shrink-0"><X size={16} /></button>
                 </div>
               </div>
            )}
          </div>

          {/* Links */} 
           <div className="relative">
            <button 
                onClick={() => handleElementClick('link')}
                className={`w-full p-4 text-left transition-all ${getHighlightClass('link')}`}
                disabled={foundElements.includes('link')}
                onMouseEnter={() => sampleEmail.links[0] && setHoveredLink(sampleEmail.links[0])} 
                onMouseLeave={() => setHoveredLink(null)}
            >
              <div className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                  <ExternalLink size={16} /> 
                  <span>{sampleEmail.links[0]?.text || 'Link Text'}</span> 
              </div>
               {hoveredLink && (
                   <div className="mt-2 text-xs text-gray-500 break-all">{hoveredLink.url}</div>
               )}
            </button>
             {/* Popup for Link - Apply consistent styling */} 
            {activePopup === 'link' && (
               <div className={`absolute z-50 bg-black rounded-lg p-4 shadow-xl w-80 border border-gray-700/50 top-full left-0 mt-2`}>
                 <div className="flex justify-between items-start mb-2">
                   <AlertTriangle className="text-red-400 flex-shrink-0 mr-2" size={18} />
                   <p className="text-sm text-neutral-300 flex-grow">{sampleEmail.suspiciousElements.link}</p>
                   <button onClick={(e) => { e.stopPropagation(); setActivePopup(null); }} className="text-gray-500 hover:text-gray-300 ml-2 flex-shrink-0"><X size={16} /></button>
                 </div>
               </div>
            )}
          </div>

          {/* Attachments */} 
          {sampleEmail.attachments.length > 0 && (
            <div className="relative">
              <button 
                onClick={() => handleElementClick('attachment')}
                className={`w-full p-4 text-left transition-all ${getHighlightClass('attachment')}`}
                disabled={foundElements.includes('attachment')}
              >
                 <div className="flex items-center gap-2 text-gray-300">
                     <Paperclip size={16} />
                     <span>{sampleEmail.attachments[0].name}</span>
                     <span className="text-xs text-gray-500">({sampleEmail.attachments[0].size})</span>
                 </div>
              </button>
               {/* Popup for Attachment - Apply consistent styling */} 
              {activePopup === 'attachment' && (
                 <div className={`absolute z-50 bg-black rounded-lg p-4 shadow-xl w-80 border border-gray-700/50 top-full left-0 mt-2`}>
                   <div className="flex justify-between items-start mb-2">
                     <AlertTriangle className="text-red-400 flex-shrink-0 mr-2" size={18} />
                     <p className="text-sm text-neutral-300 flex-grow">{sampleEmail.suspiciousElements.attachment}</p>
                     <button onClick={(e) => { e.stopPropagation(); setActivePopup(null); }} className="text-gray-500 hover:text-gray-300 ml-2 flex-shrink-0"><X size={16} /></button>
                   </div>
                 </div>
              )}
            </div>
          )}
      </div>
      
      {/* Hint Modals (Apply consistent styling) */} 
      {showHintWarning && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          {/* Use pure black background */}
          <div className="bg-black border border-gray-700/50 rounded-xl p-6 max-w-md w-full mx-auto shadow-xl">
            <h3 className="text-lg font-medium text-gray-100 mb-2">Show Hint?</h3>
            <p className="text-sm text-neutral-300 mb-6">
              Are you sure you want to see a hint? Try to find the suspicious elements on your own first!
            </p>
            <div className="flex justify-end gap-3">
              {/* Cancel Button - Keep secondary style */}
              <button
                onClick={() => setShowHintWarning(false)}
                className="px-4 py-2 rounded-lg text-gray-300 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              {/* Show Hint Button - Use white border/bg style */}
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
           {/* Use pure black background */}
          <div className="bg-black border border-gray-700/50 rounded-xl p-6 max-w-md w-full mx-auto shadow-xl">
            <h3 className="text-lg font-medium text-gray-100 mb-2">Hint {currentHintIndex + 2}</h3>
            <p className="text-sm text-neutral-300 mb-6">
              {currentHint}
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleConfirmHint}
                // Use white border/bg style
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

export default EmailInspector
                    