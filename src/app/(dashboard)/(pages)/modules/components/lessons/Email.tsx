// import React, { useState } from 'react'
// import { Alert, AlertDescription } from '@/components/ui/alert'
// import { useRouter } from 'next/navigation'
// import { 
//   Mail, 
//   AlertTriangle, 
//   Paperclip, 
//   ExternalLink, 
//   Shield,
//   Eye,
//   ChevronDown,
//   ChevronRight,
//   CheckCircle,
//   Check,
//   HelpCircle,
//   X,
//   Lightbulb
// } from 'lucide-react'

// interface EmailLink {
//   text: string
//   url: string
// }

// interface EmailAttachment {
//   name: string
//   size: string
//   type: string
// }

// interface SampleEmail {
//   from: string
//   to: string
//   subject: string
//   date: string
//   content: string
//   links: EmailLink[]
//   attachments: EmailAttachment[]
//   suspiciousElements: Record<string, string>
// }

// // Add hints for each suspicious element
// const elementHints: Record<string, string> = {
//   sender: "Check the sender's email address carefully - does it look legitimate?",
//   urgency: "Look for language designed to make you act quickly without thinking",
//   link: "Hover over links to see their true destination",
//   attachment: "Be wary of executable files or unexpected attachments",
//   content: "Consider if the tone and requests match legitimate communications",
//   headers: "Email headers can reveal authentication failures"
// }

// const sampleEmail: SampleEmail = {
//   from: 'service@paypa1-secure.com',
//   to: 'user@company.com',
//   subject: 'PayPal: Your account requires immediate verification',
//   date: '2024-12-28 09:15 AM',
//   content: `Dear Valued PayPal Member,

// We have detected suspicious login attempts on your account from an unrecognized device in Bangkok, Thailand. As a security measure, we have temporarily limited access to your account.

// Recent suspicious activities:
// • Multiple failed login attempts
// • Security settings changes
// • Unusual transaction patterns

// To prevent any unauthorized access and restore full account functionality, please verify your identity by following these steps:

// 1. Click the secure verification link below
// 2. Confirm your account information
// 3. Review recent account activity

// ⚠️ Important: If you do not complete this security verification within 24 hours, we may need to permanently restrict access to your account.

// For your security, please use our secure verification system:`,
//   links: [
//     { text: 'Secure Account Verification', url: 'http://paypa1-secure-verification.com/login' }
//   ],
//   attachments: [{
//     name: 'PayPal_Verification.pdf.exe',
//     size: '245 KB',
//     type: 'executable'
//   }],
//   suspiciousElements: {
//     sender: 'Fraudulent domain using number "1" instead of letter "l" in PayPal',
//     urgency: 'Creates artificial urgency with account restriction threats',
//     link: 'Malicious URL masquerading as PayPal',
//     attachment: 'Malicious executable (.exe) file disguised as PDF',
//     content: 'Uses urgency and fear tactics to pressure user action'
//   }
// }

// interface EmailInspectorProps {
//   moduleId: string
//   onComplete?: () => void
// }

// export function EmailInspector({ moduleId, onComplete }: EmailInspectorProps) {
//   const router = useRouter()
//   const [selectedElement, setSelectedElement] = useState<string | null>(null)
//   const [activePopup, setActivePopup] = useState<string | null>(null)
//   const [score, setScore] = useState(0)
//   const [foundElements, setFoundElements] = useState<string[]>([])
//   const [hoveredLink, setHoveredLink] = useState<EmailLink | null>(null)
//   const [isComplete, setIsComplete] = useState(false)
//   const [currentHintIndex, setCurrentHintIndex] = useState(-1)
//   const [showHintConfirm, setShowHintConfirm] = useState(false)
//   const [showHintWarning, setShowHintWarning] = useState(false)
//   const [currentHint, setCurrentHint] = useState<string | null>(null)

//   const totalThreats = Object.keys(sampleEmail.suspiciousElements).length
//   const progress = (foundElements.length / totalThreats) * 100

//   // Add function to generate consistent color based on email
//   const generateColorFromEmail = (email: string) => {
//     const colors = [
//       'bg-blue-500/20', 'bg-green-500/20', 'bg-purple-500/20', 
//       'bg-orange-500/20', 'bg-pink-500/20', 'bg-teal-500/20'
//     ];
//     const index = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
//     return colors[index % colors.length];
//   };

//   // Get first letter of email sender
//   const getSenderInitial = (email: string) => {
//     return email.charAt(0).toUpperCase();
//   };

//   const highlightStyles = {
//     base: "cursor-pointer transition-all duration-200",
//     default: "",
//     found: "bg-green-500/20 rounded p-1",
//     popup: "absolute z-50 bg-slate-800 rounded-lg p-4 shadow-lg w-96 border border-gray-700/50 shadow-xl"
//   };

//   const getRemainingHints = () => {
//     return Object.entries(elementHints)
//       .filter(([key]) => !foundElements.includes(key))
//       .map(([key, hint]) => ({
//         element: key,
//         hint
//       }));
//   }

//   const handleShowHint = () => {
//     const remainingHints = getRemainingHints();
//     if (currentHintIndex < remainingHints.length - 1) {
//       setCurrentHintIndex(prev => prev + 1);
//     }
//   }

//   const handleElementClick = (element: string) => {
//     if (!foundElements.includes(element)) {
//       setSelectedElement(element)
//       setFoundElements([...foundElements, element])
//       setScore(score + 20)
//     }
//     // Toggle popup even if element was already found
//     setActivePopup(activePopup === element ? null : element)
    
//     // Close other popups when opening a new one
//     if (activePopup !== element) {
//       setActivePopup(element)
//     }
//   }

//   const handleReport = () => {
//     if (foundElements.length === totalThreats) {
//       setScore(prev => prev + 20)
//     }
//     setIsComplete(true)
//   }

//   const handleShowHintClick = () => {
//     if (currentHintIndex === -1) {
//       setShowHintWarning(true);
//       return;
//     }
    
//     const remainingHints = getRemainingHints();
//     if (currentHintIndex < remainingHints.length - 1) {
//       const nextHint = remainingHints[currentHintIndex + 1];
//       setCurrentHint(nextHint.hint);
//       setShowHintConfirm(true);
//     }
//   };

//   const handleConfirmFirstHint = () => {
//     setShowHintWarning(false);
//     const remainingHints = getRemainingHints();
//     if (remainingHints.length > 0) {
//       setCurrentHint(remainingHints[0].hint);
//       setShowHintConfirm(true);
//     }
//   };

//   const handleConfirmHint = () => {
//     setCurrentHintIndex(prev => prev + 1);
//     setShowHintConfirm(false);
//     setCurrentHint(null);
//   };

//   const remainingHints = getRemainingHints();
//   const hasRemainingHints = currentHintIndex < remainingHints.length - 1;

//   if (isComplete) {
//     return (
//       <div className="max-w-2xl mx-auto px-4 -mt-10">
//         <div className="bg-[#181b24] border border-gray-800/40 rounded-lg p-8">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-medium text-white mb-2">Exercise Complete!</h2>
//             <div className="flex flex-col items-center justify-center mt-8 mb-6">
//               <div className="relative">
//                 <div className="w-32 h-32 rounded-full bg-blue-500/10 border-4 border-blue-500/20 flex items-center justify-center">
//                   <span className="text-4xl font-bold text-blue-400">
//                     {Math.round((foundElements.length / totalThreats) * 100)}%
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-4 text-gray-400">
//                 <span className="text-xl font-medium text-blue-400">{foundElements.length}</span>
//                 <span className="mx-2">/</span>
//                 <span className="text-xl">{totalThreats}</span>
//                 <p className="text-sm mt-1">Threats Identified</p>
//               </div>
//             </div>

//             <div className="max-w-lg mx-auto text-left mb-8">
//               <h3 className="text-gray-300 font-medium mb-3">You identified:</h3>
//               <div className="space-y-2">
//                 {foundElements.map((element) => (
//                   <div key={element} className="flex items-center gap-2 text-green-400">
//                     <Check size={16} />
//                     <span>{sampleEmail.suspiciousElements[element]}</span>
//                   </div>
//                 ))}
//               </div>

//               {foundElements.length < totalThreats && (
//                 <div className="mt-4">
//                   <h3 className="text-gray-300 font-medium mb-3">You missed:</h3>
//                   <div className="space-y-2">
//                     {Object.entries(sampleEmail.suspiciousElements)
//                       .filter(([key]) => !foundElements.includes(key))
//                       .map(([key, value]) => (
//                         <div key={key} className="flex items-center gap-2 text-red-400">
//                           <AlertTriangle size={16} />
//                           <span>{value}</span>
//                         </div>
//                       ))
//                     }
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <div className="flex justify-center gap-4">
//             <button 
//               onClick={() => router.push(`/modules/${moduleId}`)}
//               className="border border-gray-500 hover:border-gray-400 text-gray-200 px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
//             >
//               Return to Module
//             </button>
//             <button 
//               onClick={() => {
//                 if (onComplete) {
//                   onComplete()
//                 }
//               }}
//               className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
//             >
//               Next Lesson <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="w-[90vw] mx-auto mt-8">
//       <div className="flex justify-between items-center mb-8">
//         <button
//           onClick={handleShowHintClick}
//           disabled={!hasRemainingHints}
//           className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
//             hasRemainingHints 
//               ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
//               : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
//           }`}
//         >
//           <Lightbulb size={16} />
//           {currentHintIndex === -1 ? 'Show Hint' : 'Next Hint'}
//         </button>

//         <span className="text-sm text-gray-400 whitespace-nowrap">
//           {foundElements.length} of {totalThreats} threats identified
//         </span>

//         <button 
//           onClick={handleReport}
//           disabled={foundElements.length < totalThreats}
//           className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
//             foundElements.length < totalThreats 
//               ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed' 
//               : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20'
//           }`}
//         >
//           Next Lesson
//           <ChevronRight className="w-4 h-4" />
//         </button>
//       </div>

//       {showHintWarning && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
//           <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700/50">
//             <h3 className="text-lg font-medium text-gray-200 mb-2">Show Hint?</h3>
//             <p className="text-gray-400 mb-6">
//               Are you sure you want to see a hint? Try to find the suspicious elements on your own first!
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setShowHintWarning(false)}
//                 className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700/50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleConfirmFirstHint}
//                 className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 
//                   transition-colors px-4 py-2 rounded-lg"
//               >
//                 Show Hint
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showHintConfirm && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
//           <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700/50">
//             <h3 className="text-lg font-medium text-gray-200 mb-2">Hint {currentHintIndex + 2}</h3>
//             <p className="text-gray-400 mb-6">
//               {currentHint}
//             </p>
//             <div className="flex justify-end">
//               <button
//                 onClick={handleConfirmHint}
//                 className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 
//                   transition-colors px-4 py-2 rounded-lg"
//               >
//                 Got it
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
//         <div className="h-1 bg-gray-800">
//           <div 
//             className="h-full bg-blue-500 transition-all duration-300" 
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//         <div className="p-6 space-y-6">
//           {/* Email Header */}
//           <div className="relative">
//             <div className="flex items-start gap-3">
//               <div className={`w-8 h-8 rounded-full ${generateColorFromEmail(sampleEmail.from)} 
//                 flex items-center justify-center text-white font-medium`}>
//                 {getSenderInitial(sampleEmail.from)}
//               </div>
//               <div className="flex-1 flex justify-between items-start">
//                 <div>
//                   <div 
//                     onClick={() => handleElementClick('sender')}
//                     className={`inline-block ${highlightStyles.base} ${
//                       foundElements.includes('sender') ? highlightStyles.found : highlightStyles.default
//                     }`}
//                   >
//                     {sampleEmail.from}
//                   </div>
//                   <div className="text-sm text-gray-400 mt-1">
//                     to: {sampleEmail.to}
//                   </div>
//                 </div>
//                 <div className="text-sm text-gray-400">{sampleEmail.date}</div>
//               </div>
//             </div>
//             {activePopup === 'sender' && (
//               <div className={`${highlightStyles.popup} top-full left-0 mt-2`}>
//                 <div className="flex justify-between items-start mb-2">
//                   <AlertTriangle className="text-red-400" />
//                   <button 
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setActivePopup(null);
//                     }}
//                     className="text-gray-400 hover:text-gray-300"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//                 <p className="text-sm text-gray-200">{sampleEmail.suspiciousElements.sender}</p>
//               </div>
//             )}
//           </div>

//           {/* Subject and Content */}
//           <div className="relative">
//             <button 
//               onClick={() => handleElementClick('content')}
//               className="text-left w-full"
//             >
//               <div className="text-xl font-medium mb-4">
//                 <span className={`${highlightStyles.base} ${
//                   foundElements.includes('content') ? highlightStyles.found : highlightStyles.default
//                 }`}>
//                   {sampleEmail.subject}
//                 </span>
//               </div>
//               <div className="text-gray-300 whitespace-pre-line">{sampleEmail.content}</div>
//             </button>
//           </div>

//           {/* Links */}
//           <div className="space-y-4">
//             {sampleEmail.links.map((link, index) => (
//               <div 
//                 key={index}
//                 className="relative inline-block"
//                 onMouseEnter={() => setHoveredLink(link)}
//                 onMouseLeave={() => setHoveredLink(null)}
//               >
//                 <button
//                   onClick={() => handleElementClick('link')}
//                   className={`text-blue-400 hover:underline flex items-center gap-1 ${
//                     foundElements.includes('link') ? highlightStyles.found : highlightStyles.default
//                   }`}
//                 >
//                   {link.text} <ExternalLink size={16} />
//                 </button>
//                 {hoveredLink === link && (
//                   <div className="absolute left-0 bottom-full mb-2 bg-gray-950 text-xs p-2 rounded-lg">
//                     {link.url}
//                   </div>
//                 )}
//                 {activePopup === 'link' && (
//                   <div className={`${highlightStyles.popup} top-full left-0 mt-2`}>
//                     <div className="flex justify-between items-start mb-2">
//                       <AlertTriangle className="text-red-400" />
//                       <button 
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setActivePopup(null);
//                         }}
//                         className="text-gray-400 hover:text-gray-300"
//                       >
//                         <X size={16} />
//                       </button>
//                     </div>
//                     <p className="text-sm text-gray-200">{sampleEmail.suspiciousElements.link}</p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Attachments */}
//           {sampleEmail.attachments.map((attachment, index) => (
//             <div key={index} className="relative">
//               <button 
//                 onClick={() => handleElementClick('attachment')}
//                 className={`flex items-center gap-2 text-gray-300 hover:text-gray-200 ${
//                   foundElements.includes('attachment') ? highlightStyles.found : highlightStyles.default
//                 }`}
//               >
//                 <Paperclip size={20} />
//                 <span>{attachment.name}</span>
//                 <span className="text-sm text-gray-400">({attachment.size})</span>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EmailInspector
                    
import React, { useState } from 'react'
import { Alert, AlertDescription } from '@/components/alert'
import { useRouter } from 'next/navigation'
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
  date: '2024-12-28 09:15 AM',
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
    content: 'Uses urgency and fear tactics to pressure user action'
  }
}

interface EmailInspectorProps {
  moduleId: string
  onComplete?: () => void
}

export function EmailInspector({ moduleId, onComplete }: EmailInspectorProps) {
  const router = useRouter()
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

  const totalThreats = Object.keys(sampleEmail.suspiciousElements).length
  const progress = (foundElements.length / totalThreats) * 100

  // Add function to generate consistent color based on email
  const generateColorFromEmail = (email: string) => {
    const colors = [
      'bg-blue-500/20', 'bg-green-500/20', 'bg-purple-500/20', 
      'bg-orange-500/20', 'bg-pink-500/20', 'bg-teal-500/20'
    ];
    const index = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  // Get first letter of email sender
  const getSenderInitial = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  const highlightStyles = {
    base: "cursor-pointer transition-all duration-200",
    default: "",
    found: "bg-green-500/20 rounded p-1",
    popup: "absolute z-50 bg-slate-800 rounded-lg p-4 shadow-lg w-96 border border-gray-700/50 shadow-xl"
  };

  const getRemainingHints = () => {
    return Object.entries(elementHints)
      .filter(([key]) => !foundElements.includes(key))
      .map(([key, hint]) => ({
        element: key,
        hint
      }));
  }

  const handleShowHint = () => {
    const remainingHints = getRemainingHints();
    if (currentHintIndex < remainingHints.length - 1) {
      setCurrentHintIndex(prev => prev + 1);
    }
  }

  const handleElementClick = (element: string) => {
    if (!foundElements.includes(element)) {
      setSelectedElement(element)
      setFoundElements([...foundElements, element])
      setScore(score + 20)
    }
    // Toggle popup even if element was already found
    setActivePopup(activePopup === element ? null : element)
    
    // Close other popups when opening a new one
    if (activePopup !== element) {
      setActivePopup(element)
    }
  }

  const handleReport = () => {
    if (foundElements.length === totalThreats) {
      setScore(prev => prev + 20)
    }
    setIsComplete(true)
  }

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

  const remainingHints = getRemainingHints();
  const hasRemainingHints = currentHintIndex < remainingHints.length - 1;

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 -mt-10">
        <div className="bg-[#181b24] border border-gray-800/40 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-white mb-2">Exercise Complete!</h2>
            <div className="flex flex-col items-center justify-center mt-8 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-blue-500/10 border-4 border-blue-500/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-400">
                    {Math.round((foundElements.length / totalThreats) * 100)}%
                  </span>
                </div>
              </div>
              <div className="mt-4 text-gray-400">
                <span className="text-xl font-medium text-blue-400">{foundElements.length}</span>
                <span className="mx-2">/</span>
                <span className="text-xl">{totalThreats}</span>
                <p className="text-sm mt-1">Threats Identified</p>
              </div>
            </div>

            <div className="max-w-lg mx-auto text-left mb-8">
              <h3 className="text-gray-300 font-medium mb-3">You identified:</h3>
              <div className="space-y-2">
                {foundElements.map((element) => (
                  <div key={element} className="flex items-center gap-2 text-green-400">
                    <Check size={16} />
                    <span>{sampleEmail.suspiciousElements[element]}</span>
                  </div>
                ))}
              </div>

              {foundElements.length < totalThreats && (
                <div className="mt-4">
                  <h3 className="text-gray-300 font-medium mb-3">You missed:</h3>
                  <div className="space-y-2">
                    {Object.entries(sampleEmail.suspiciousElements)
                      .filter(([key]) => !foundElements.includes(key))
                      .map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2 text-red-400">
                          <AlertTriangle size={16} />
                          <span>{value}</span>
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
              onClick={() => {
                if (onComplete) {
                  onComplete()
                }
              }}
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
    <div className="w-[90vw] mx-auto mt-8">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleShowHintClick}
          disabled={!hasRemainingHints}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            hasRemainingHints 
              ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
              : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Lightbulb size={16} />
          {currentHintIndex === -1 ? 'Show Hint' : 'Next Hint'}
        </button>

        <span className="text-sm text-gray-400 whitespace-nowrap">
          {foundElements.length} of {totalThreats} threats identified
        </span>

        <button 
          onClick={handleReport}
          disabled={foundElements.length < totalThreats}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
            foundElements.length < totalThreats 
              ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20'
          }`}
        >
          Next Lesson
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {showHintWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700/50">
            <h3 className="text-lg font-medium text-gray-200 mb-2">Show Hint?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to see a hint? Try to find the suspicious elements on your own first!
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowHintWarning(false)}
                className="px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700/50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmFirstHint}
                className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 
                  transition-colors px-4 py-2 rounded-lg"
              >
                Show Hint
              </button>
            </div>
          </div>
        </div>
      )}

      {showHintConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
          <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700/50">
            <h3 className="text-lg font-medium text-gray-200 mb-2">Hint {currentHintIndex + 2}</h3>
            <p className="text-gray-400 mb-6">
              {currentHint}
            </p>
            <div className="flex justify-end">
              <button
                onClick={handleConfirmHint}
                className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 
                  transition-colors px-4 py-2 rounded-lg"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
        <div className="h-1 bg-gray-800">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="p-6 space-y-6">
          {/* Email Header */}
          <div className="relative">
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full ${generateColorFromEmail(sampleEmail.from)} 
                flex items-center justify-center text-white font-medium`}>
                {getSenderInitial(sampleEmail.from)}
              </div>
              <div className="flex-1 flex justify-between items-start">
                <div>
                  <div 
                    onClick={() => handleElementClick('sender')}
                    className={`inline-block ${highlightStyles.base} ${
                      foundElements.includes('sender') ? highlightStyles.found : highlightStyles.default
                    }`}
                  >
                    {sampleEmail.from}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">
                    to: {sampleEmail.to}
                  </div>
                </div>
                <div className="text-sm text-gray-400">{sampleEmail.date}</div>
              </div>
            </div>
            {activePopup === 'sender' && (
              <div className={`${highlightStyles.popup} top-full left-0 mt-2`}>
                <div className="flex justify-between items-start mb-2">
                  <AlertTriangle className="text-red-400" />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePopup(null);
                    }}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-200">{sampleEmail.suspiciousElements.sender}</p>
              </div>
            )}
          </div>

          {/* Subject and Content */}
          <div className="relative">
            <button 
              onClick={() => handleElementClick('content')}
              className="text-left w-full"
            >
              <div className="text-xl font-medium mb-4">
                <span className={`${highlightStyles.base} ${
                  foundElements.includes('content') ? highlightStyles.found : highlightStyles.default
                }`}>
                  {sampleEmail.subject}
                </span>
              </div>
              <div className="text-gray-300 whitespace-pre-line">{sampleEmail.content}</div>
            </button>
            {activePopup === 'content' && (
              <div 
                className={`fixed z-[100] bg-slate-800 rounded-lg p-4 shadow-lg w-96 border border-gray-700/50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
              >
                <div className="flex justify-between items-start mb-2">
                  <AlertTriangle className="text-red-400" />
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePopup(null);
                    }}
                    className="text-gray-400 hover:text-gray-300"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-200">{sampleEmail.suspiciousElements.content}</p>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="space-y-4">
            {sampleEmail.links.map((link, index) => (
              <div 
                key={index}
                className="relative inline-block"
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const rect = e.currentTarget.getBoundingClientRect();
                    const viewportWidth = window.innerWidth;
                    const popup = document.getElementById('popup-link');
                    
                    handleElementClick('link');
                    
                    if (popup) {
                      const spaceToRight = viewportWidth - rect.right;
                      const popupWidth = 400; // Width of the popup
                      const margin = 8; // Margin between element and popup

                      // Position to the right if there's enough space, otherwise to the left
                      if (spaceToRight >= popupWidth + margin) {
                        popup.style.left = `${rect.right + margin}px`;
                      } else {
                        popup.style.left = `${rect.left - popupWidth - margin}px`;
                      }
                      popup.style.top = `${rect.top + window.scrollY}px`;
                    }
                  }}
                  className={`text-blue-400 hover:underline flex items-center gap-1 ${
                    foundElements.includes('link') ? highlightStyles.found : highlightStyles.default
                  }`}
                >
                  {link.text} <ExternalLink size={16} />
                </button>
                {hoveredLink === link && (
                  <div className="absolute left-0 bottom-full mb-2 bg-gray-950 text-xs p-2 rounded-lg">
                    {link.url}
                  </div>
                )}
                {activePopup === 'link' && (
                  <div 
                    id="popup-link"
                    className="fixed z-[100] bg-slate-800 rounded-lg p-4 shadow-lg w-[400px] border border-gray-700/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <AlertTriangle className="text-red-400" />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePopup(null);
                        }}
                        className="text-gray-400 hover:text-gray-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-200">{sampleEmail.suspiciousElements.link}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Attachments */}
          {sampleEmail.attachments.map((attachment, index) => (
            <div key={index} className="relative">
              <button 
                onClick={() => handleElementClick('attachment')}
                className={`flex items-center gap-2 text-gray-300 hover:text-gray-200 ${
                  foundElements.includes('attachment') ? highlightStyles.found : highlightStyles.default
                }`}
              >
                <Paperclip size={20} />
                <span>{attachment.name}</span>
                <span className="text-sm text-gray-400">({attachment.size})</span>
              </button>
              {activePopup === 'attachment' && (
                <div 
                  className={`fixed z-[100] bg-slate-800 rounded-lg p-4 shadow-lg w-96 border border-gray-700/50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <AlertTriangle className="text-red-400" />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePopup(null);
                      }}
                      className="text-gray-400 hover:text-gray-300"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-200">{sampleEmail.suspiciousElements.attachment}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmailInspector
                    