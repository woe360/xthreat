// 'use client'

// import React, { useState } from 'react'
// import { Alert, AlertDescription } from '@/components/ui/alert'
// import { 
//   Mail, 
//   AlertTriangle, 
//   Paperclip, 
//   ExternalLink, 
//   Shield,
//   Eye,
//   Clock,
//   ChevronDown
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

// export function EmailInspector() {
//   const [selectedElement, setSelectedElement] = useState<string | null>(null)
//   const [score, setScore] = useState(0)
//   const [foundElements, setFoundElements] = useState<string[]>([])
//   const [showHeaders, setShowHeaders] = useState(false)
//   const [hoveredLink, setHoveredLink] = useState<EmailLink | null>(null)

//   const handleElementClick = (element: string) => {
//     if (!foundElements.includes(element)) {
//       setSelectedElement(element)
//       setFoundElements([...foundElements, element])
//       setScore(score + 20)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="bg-[#181b24] rounded-lg p-4 flex items-center justify-between border border-gray-800">
//         <div className="flex items-center gap-4">
//           <div className="bg-gray-800/50 p-3 rounded-full">
//             <Shield className="text-gray-400" size={24} />
//           </div>
//           <div>
//             <h3 className="font-medium text-gray-300">Security Score</h3>
//             <div className="text-2xl font-bold text-blue-400">{score}/100</div>
//           </div>
//         </div>
//         <div className="flex gap-6">
//           <div className="text-center">
//             <div className="text-sm text-gray-400">Threats Found</div>
//             <div className="text-xl font-bold text-gray-200">
//               {foundElements.length}/{Object.keys(sampleEmail.suspiciousElements).length}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-[#181b24] rounded-lg shadow-xl overflow-hidden border border-gray-800">
//         <div className="bg-[#181b24] border-b border-gray-800 p-2 flex items-center justify-between">
//           <button 
//             onClick={() => setShowHeaders(!showHeaders)}
//             className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm text-gray-300"
//           >
//             <Eye size={16} />
//             {showHeaders ? 'Hide' : 'Show'} Headers
//           </button>
//         </div>

//         {showHeaders && (
//           <div className="border-b border-gray-800 bg-gray-900/50 p-4 text-sm font-mono">
//             <button 
//               onClick={() => handleElementClick('headers')}
//               className="text-gray-400 hover:text-gray-200 whitespace-pre-wrap w-full text-left"
//             >
//               Return-Path: &lt;{sampleEmail.from}&gt;
//               {'\n'}Authentication-Results: spf=fail (sender IP is 192.168.1.1)
//             </button>
//           </div>
//         )}

//         <div className="p-6 space-y-6">
//           <button 
//             onClick={() => handleElementClick('sender')}
//             className="flex items-center gap-3 group w-full"
//           >
//             <Mail className="text-gray-400" size={20} />
//             <div className="text-left">
//               <div className="font-medium text-gray-200">
//                 {sampleEmail.from}
//               </div>
//               <div className="text-sm text-gray-400">to: {sampleEmail.to}</div>
//             </div>
//             <div className="ml-auto text-gray-400">
//               <span className="text-sm ml-2">{sampleEmail.date}</span>
//             </div>
//           </button>

//           <button 
//             onClick={() => handleElementClick('content')}
//             className="text-left w-full"
//           >
//             <div className="text-xl font-medium mb-4">{sampleEmail.subject}</div>
//             <div className="text-gray-300 whitespace-pre-line">{sampleEmail.content}</div>
//           </button>

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
//                   className="text-blue-400 hover:underline flex items-center gap-1"
//                 >
//                   {link.text} <ExternalLink size={16} />
//                 </button>
//                 {hoveredLink === link && (
//                   <div className="absolute left-0 bottom-full mb-2 bg-gray-950 text-xs p-2 rounded-lg">
//                     {link.url}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {sampleEmail.attachments.map((attachment, index) => (
//             <button 
//               key={index}
//               onClick={() => handleElementClick('attachment')}
//               className="flex items-center gap-2 text-gray-300 hover:text-gray-200"
//             >
//               <Paperclip size={20} />
//               <span>{attachment.name}</span>
//               <span className="text-sm text-gray-400">({attachment.size})</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {selectedElement && (
//         <Alert className="bg-red-900/20 border-red-900/50 text-red-200">
//           <AlertTriangle className="h-4 w-4 text-red-400" />
//           <AlertDescription>
//             {sampleEmail.suspiciousElements[selectedElement]}
//           </AlertDescription>
//         </Alert>
//       )}

//       <div className="flex gap-4">
//         <button 
//           className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
//         >
//           <AlertTriangle size={20} />
//           Report as Phishing
//         </button>
//         <button 
//           className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
//         >
//           <ChevronDown size={20} />
//           Archive
//         </button>
//       </div>
//     </div>
//   )
// }

'use client'

import React, { useState } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'
import { 
  Mail, 
  AlertTriangle, 
  Paperclip, 
  ExternalLink, 
  Shield,
  Eye,
  Clock,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  X
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

export function EmailInspector({ moduleId }: { moduleId: string }) {
  const router = useRouter()
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [foundElements, setFoundElements] = useState<string[]>([])
  const [showHeaders, setShowHeaders] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<EmailLink | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  const totalThreats = Object.keys(sampleEmail.suspiciousElements).length
  const progress = (foundElements.length / totalThreats) * 100

  const handleElementClick = (element: string) => {
    if (!foundElements.includes(element)) {
      setSelectedElement(element)
      setFoundElements([...foundElements, element])
      setScore(score + 20)
    }
  }

  const handleReport = () => {
    if (foundElements.length === totalThreats) {
      setScore(prev => prev + 20)
    }
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <div className="max-w-3xl mx-auto px-4">
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

            {/* Found Threats */}
            <div className="max-w-lg mx-auto text-left mb-8">
              <h3 className="text-gray-300 font-medium mb-3">You identified:</h3>
              <div className="space-y-2">
                {foundElements.map((element) => (
                  <div key={element} className="flex items-center gap-2 text-green-400">
                    <CheckCircle size={16} />
                    <span>{sampleEmail.suspiciousElements[element]}</span>
                  </div>
                ))}
              </div>

              {/* Missed Threats */}
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
              className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
            >
              Return to Module
            </button>
            <button 
              onClick={() => router.push(`/modules/${moduleId}/next-lesson`)}
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
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex justify-center mb-4">
        <span className="text-sm text-gray-400">
          {foundElements.length} of {totalThreats} threats identified
        </span>
      </div>

      <div className="bg-[#181b24] rounded-lg p-4 flex items-center justify-between border border-gray-800">
        <div className="flex items-center gap-4">
          <div className="bg-gray-800/50 p-3 rounded-full">
            <Shield className="text-gray-400" size={24} />
          </div>
          <div>
            <h3 className="font-medium text-gray-300">Security Score</h3>
            <div className="text-2xl font-bold text-blue-400">{score}/100</div>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-sm text-gray-400">Threats Found</div>
            <div className="text-xl font-bold text-gray-200">
              {foundElements.length}/{totalThreats}
            </div>
          </div>
        </div>
      </div>

      {/* Email Viewer */}
      <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-gray-800">
          <div 
            className="h-full bg-blue-500 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="bg-[#181b24] border-b border-gray-800 p-2 flex items-center justify-between">
          <button 
            onClick={() => setShowHeaders(!showHeaders)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-sm text-gray-300"
          >
            <Eye size={16} />
            {showHeaders ? 'Hide' : 'Show'} Headers
          </button>
        </div>

        {showHeaders && (
          <div className="border-b border-gray-800 bg-gray-900/50 p-4 text-sm font-mono">
            <button 
              onClick={() => handleElementClick('headers')}
              className="text-gray-400 hover:text-gray-200 whitespace-pre-wrap w-full text-left"
            >
              Return-Path: &lt;{sampleEmail.from}&gt;
              {'\n'}Authentication-Results: spf=fail (sender IP is 192.168.1.1)
            </button>
          </div>
        )}

        <div className="p-6 space-y-6">
          <button 
            onClick={() => handleElementClick('sender')}
            className="flex items-center gap-3 group w-full"
          >
            <Mail className="text-gray-400" size={20} />
            <div className="text-left">
              <div className="font-medium text-gray-200">
                {sampleEmail.from}
              </div>
              <div className="text-sm text-gray-400">to: {sampleEmail.to}</div>
            </div>
            <div className="ml-auto text-gray-400">
              <span className="text-sm ml-2">{sampleEmail.date}</span>
            </div>
          </button>

          <button 
            onClick={() => handleElementClick('content')}
            className="text-left w-full"
          >
            <div className="text-xl font-medium mb-4">{sampleEmail.subject}</div>
            <div className="text-gray-300 whitespace-pre-line">{sampleEmail.content}</div>
          </button>

          <div className="space-y-4">
            {sampleEmail.links.map((link, index) => (
              <div 
                key={index}
                className="relative inline-block"
                onMouseEnter={() => setHoveredLink(link)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <button
                  onClick={() => handleElementClick('link')}
                  className="text-blue-400 hover:underline flex items-center gap-1"
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

          {sampleEmail.attachments.map((attachment, index) => (
            <button 
              key={index}
              onClick={() => handleElementClick('attachment')}
              className="flex items-center gap-2 text-gray-300 hover:text-gray-200"
            >
              <Paperclip size={20} />
              <span>{attachment.name}</span>
              <span className="text-sm text-gray-400">({attachment.size})</span>
            </button>
          ))}
        </div>
      </div>

      {selectedElement && (
        <Alert className="bg-red-900/20 border-red-900/50 text-red-200">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <AlertDescription>
            {sampleEmail.suspiciousElements[selectedElement]}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4">
        <button 
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
          onClick={handleReport}
        >
          <AlertTriangle size={20} />
          Report as Phishing
        </button>
        <button 
          className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-6 py-3 rounded-lg flex items-center gap-2 font-medium"
        >
          <ChevronDown size={20} />
          Archive
        </button>
      </div>
    </div>
  )
}