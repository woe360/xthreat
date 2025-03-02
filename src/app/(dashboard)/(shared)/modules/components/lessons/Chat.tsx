// import React, { useState } from 'react';
// import { AlertCircle, ThumbsUp } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// const SlackChat = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       sender: 'Fathima Parveen',
//       avatar: '/api/placeholder/32/32',
//       content: 'Thank you for kicking this off @Geeta. I need you to urgently process a vendor payment ASAP. Feel free to send that request my way...',
//       timestamp: 'Just now',
//       isPhishing: true,
//       flags: [],
//       mentionType: 'Mention in #design-team'
//     },
//     {
//       id: 2,
//       sender: 'Harry Boone',
//       avatar: '/api/placeholder/32/32',
//       content: "I spoke to Carmen last week, and she's happy with where we've landed so far. 🚀",
//       timestamp: '10:12 AM',
//       isPhishing: false,
//       flags: []
//     },
//     {
//       id: 3,
//       sender: 'Sara Parras',
//       avatar: '/api/placeholder/32/32',
//       content: 'Click this link to verify your account credentials immediately: hxxps://acme-portal.secure.invalid/verify',
//       timestamp: '10:15 AM',
//       isPhishing: true,
//       flags: []
//     },
//     {
//       id: 4,
//       sender: 'Alfonso Huertas',
//       avatar: '/api/placeholder/32/32',
//       content: 'Please add any other notes from our sync today to the canvas.',
//       timestamp: '11:30 AM',
//       isPhishing: false,
//       flags: []
//     }
//   ]);

//   const [score, setScore] = useState(0);
//   const [feedback, setFeedback] = useState(null);

//   const handleFlag = (messageId) => {
//     const message = messages.find(m => m.id === messageId);
    
//     setMessages(messages.map(msg => {
//       if (msg.id === messageId) {
//         return { ...msg, flags: [...msg.flags, 'suspicious'] };
//       }
//       return msg;
//     }));

//     if (message.isPhishing) {
//       setScore(prev => prev + 1);
//       setFeedback({
//         type: 'success',
//         message: `Good catch! This message shows several red flags:`,
//         details: message.id === 1 ? [
//           'Creates artificial urgency',
//           'Requests financial action',
//           'Uses informal language for a business request',
//           'Tries to bypass normal procedures'
//         ] : [
//           'Contains suspicious link',
//           'Creates urgency with "immediately"',
//           'Requests credential verification',
//           'Uses threatening language'
//         ]
//       });
//     } else {
//       setFeedback({
//         type: 'warning',
//         message: 'This appears to be a legitimate message.',
//         details: [
//           'Uses normal business language',
//           'No urgent demands',
//           'No suspicious links',
//           'Follows standard procedures'
//         ]
//       });
//     }

//     // Clear feedback after 5 seconds
//     setTimeout(() => {
//       setFeedback(null);
//     }, 5000);
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
//       {/* Header */}
//       <div className="p-4 border-b">
//         <h1 className="text-lg font-semibold"># design-team</h1>
//         <div className="text-sm text-gray-500">Security Training Exercise - Identify Suspicious Messages</div>
//         <div className="mt-2 text-sm font-medium">
//           Score: {score} suspicious messages identified
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="h-[600px] overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div key={message.id} 
//                className={`flex items-start space-x-3 p-4 rounded-lg ${
//                  message.flags.includes('suspicious') ? 'bg-red-50' : 'hover:bg-gray-50'
//                }`}>
//             <img
//               src={message.avatar}
//               alt={message.sender}
//               className="w-10 h-10 rounded-full"
//             />
//             <div className="flex-1 min-w-0">
//               <div className="flex items-baseline space-x-2">
//                 <span className="font-medium">{message.sender}</span>
//                 <span className="text-sm text-gray-500">{message.timestamp}</span>
//               </div>
//               {message.mentionType && (
//                 <div className="text-sm text-gray-500 mb-1">{message.mentionType}</div>
//               )}
//               <p className="text-gray-900 whitespace-pre-wrap">{message.content}</p>
              
//               <div className="mt-2 flex items-center space-x-4">
//                 {!message.flags.includes('suspicious') && (
//                   <button
//                     onClick={() => handleFlag(message.id)}
//                     className="text-sm text-gray-500 hover:text-red-600 flex items-center space-x-1"
//                   >
//                     <AlertCircle className="w-4 h-4" />
//                     <span>Flag as Suspicious</span>
//                   </button>
//                 )}
//                 {message.flags.includes('suspicious') && (
//                   <span className="text-sm text-red-600 flex items-center space-x-1">
//                     <AlertCircle className="w-4 h-4" />
//                     <span>Flagged as suspicious</span>
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Feedback Alert */}
//       {feedback && (
//         <Alert className="m-4" variant={feedback.type === 'success' ? 'default' : 'warning'}>
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>
//             <p className="font-medium">{feedback.message}</p>
//             <ul className="list-disc ml-4 mt-2">
//               {feedback.details.map((detail, index) => (
//                 <li key={index}>{detail}</li>
//               ))}
//             </ul>
//           </AlertDescription>
//         </Alert>
//       )}
//     </div>
//   );
// };

// export default SlackChat;



// import React, { useState } from 'react';
// import { AlertCircle, ChevronRight, MessageSquare } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const SlackChat = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       sender: 'Fathima Parveen',
//       avatar: '/api/placeholder/32/32',
//       content: 'Thank you for kicking this off @Geeta. I need you to urgently process a vendor payment ASAP. Feel free to send that request my way...',
//       timestamp: 'Just now',
//       isPhishing: true,
//       flags: [],
//       mentionType: 'Mention in #design-team'
//     },
//     {
//       id: 2,
//       sender: 'Harry Boone',
//       avatar: '/api/placeholder/32/32',
//       content: "I spoke to Carmen last week, and she's happy with where we've landed so far. 🚀",
//       timestamp: '10:12 AM',
//       isPhishing: false,
//       flags: []
//     },
//     {
//       id: 3,
//       sender: 'Sara Parras',
//       avatar: '/api/placeholder/32/32',
//       content: 'Click this link to verify your account credentials immediately: hxxps://acme-portal.secure.invalid/verify',
//       timestamp: '10:15 AM',
//       isPhishing: true,
//       flags: []
//     }
//   ]);

//   const [score, setScore] = useState({ correct: 0, total: 2 });
//   const [showResults, setShowResults] = useState(false);
//   const [feedback, setFeedback] = useState(null);

//   const handleFlag = (messageId) => {
//     const message = messages.find(m => m.id === messageId);
    
//     setMessages(messages.map(msg => {
//       if (msg.id === messageId) {
//         return { ...msg, flags: [...msg.flags, 'suspicious'] };
//       }
//       return msg;
//     }));

//     if (message.isPhishing) {
//       setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
//       setFeedback({
//         type: 'success',
//         message: 'Correct! This is a suspicious message.',
//         details: message.id === 1 ? [
//           'Creates artificial urgency',
//           'Requests financial action',
//           'Uses informal language for business',
//           'Tries to bypass normal procedures'
//         ] : [
//           'Contains suspicious link',
//           'Creates urgency with "immediately"',
//           'Requests credential verification',
//           'Uses threatening language'
//         ]
//       });
//     } else {
//       setFeedback({
//         type: 'warning',
//         message: 'This appears to be a legitimate message.',
//         details: [
//           'Uses normal business language',
//           'No urgent demands',
//           'No suspicious links',
//           'Follows standard procedures'
//         ]
//       });
//     }

//     const flaggedPhishingCount = messages
//       .filter(m => m.isPhishing && (m.flags.includes('suspicious') || m.id === messageId))
//       .length;
      
//     if (flaggedPhishingCount === 2) {
//       setShowResults(true);
//     }
//   };

//   if (showResults) {
//     return (
//       <div className="max-w-5xl mx-auto px-4">
//         <div className="bg-[#181b24] border border-gray-800/40 rounded-lg p-8">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-medium text-white mb-2">Training Complete!</h2>
//             <div className="flex flex-col items-center justify-center mt-8 mb-6">
//               <div className="relative">
//                 <div className="w-32 h-32 rounded-full bg-blue-500/10 border-4 border-blue-500/20 flex items-center justify-center">
//                   <span className="text-4xl font-bold text-blue-400">
//                     {Math.round((score.correct / score.total) * 100)}%
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-4 text-gray-400">
//                 <span className="text-xl font-medium text-blue-400">{score.correct}</span>
//                 <span className="mx-2">/</span>
//                 <span className="text-xl">{score.total}</span>
//                 <p className="text-sm mt-1">Phishing Messages Identified</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex justify-center">
//             <button 
//               onClick={() => window.location.reload()}
//               className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-6 py-2 rounded-lg flex items-center gap-2"
//             >
//               Try Again <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4">
//       <div className="flex justify-center mb-4">
//         <span className="text-sm text-gray-400">
//           Find all suspicious messages
//         </span>
//       </div>

//       <div className="grid grid-cols-[1fr,320px] gap-4">
//         {/* Messages Column */}
//         <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
//           <div className="h-1 bg-gray-800">
//             <div 
//               className="h-full bg-blue-500 transition-all duration-300" 
//               style={{ width: `${(score.correct / score.total) * 100}%` }}
//             />
//           </div>

//           <div className="p-6 space-y-4">
//             {messages.map((message) => (
//               <div 
//                 key={message.id}
//                 className={`p-4 rounded-lg border transition-all duration-200 ${
//                   message.flags.includes('suspicious')
//                     ? 'bg-blue-500/10 border-blue-500/40'
//                     : 'border-gray-800/40 hover:border-gray-800'
//                 }`}
//               >
//                 <div className="flex items-start space-x-3">
//                   <img
//                     src={message.avatar}
//                     alt={message.sender}
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-baseline space-x-2">
//                       <span className="font-medium text-white">{message.sender}</span>
//                       <span className="text-sm text-gray-500">{message.timestamp}</span>
//                     </div>
//                     {message.mentionType && (
//                       <div className="text-sm text-gray-500 mb-1">{message.mentionType}</div>
//                     )}
//                     <p className="text-gray-300 mt-1">{message.content}</p>
                    
//                     {!message.flags.includes('suspicious') && (
//                       <button
//                         onClick={() => handleFlag(message.id)}
//                         className="mt-3 bg-gray-800/30 hover:bg-gray-800/50 text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
//                       >
//                         <AlertCircle className="w-4 h-4" />
//                         Flag as Suspicious
//                       </button>
//                     )}
//                     {message.flags.includes('suspicious') && (
//                       <div className="mt-3 text-blue-400 flex items-center gap-2 text-sm">
//                         <AlertCircle className="w-4 h-4" />
//                         Flagged as suspicious
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Feedback Column */}
//         <div className="sticky top-4 h-fit">
//           {feedback ? (
//             <div className={`p-6 rounded-lg border ${
//               feedback.type === 'success' 
//                 ? 'bg-[#181b24] border-blue-500/40 text-blue-400'
//                 : 'bg-[#181b24] border-yellow-500/40 text-yellow-400'
//             }`}>
//               <h3 className="font-medium text-lg mb-4">{feedback.message}</h3>
//               <ul className="space-y-2">
//                 {feedback.details.map((detail, index) => (
//                   <li key={index} className="flex items-start gap-2">
//                     <span className="mt-1">•</span>
//                     <span>{detail}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : (
//             <div className="p-6 rounded-lg border border-gray-800/40 bg-[#181b24]">
//               <p className="text-gray-400">
//                 Review each message and flag any that appear suspicious.
//                 Look for signs of phishing such as urgency, unusual requests,
//                 or suspicious links.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SlackChat;




// import React, { useState } from 'react';
// import { AlertCircle, ChevronRight } from 'lucide-react';

// const SlackChat = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       sender: 'Fathima Parveen',
//       avatar: '/api/placeholder/32/32',
//       content: 'Thank you for kicking this off @Geeta. I need you to urgently process a vendor payment ASAP. Feel free to send that request my way...',
//       timestamp: 'Just now',
//       isPhishing: true,
//       flags: [],
//       mentionType: 'Mention in #design-team'
//     },
//     {
//       id: 2,
//       sender: 'Harry Boone',
//       avatar: '/api/placeholder/32/32',
//       content: "I spoke to Carmen last week, and she's happy with where we've landed so far. 🚀",
//       timestamp: '10:12 AM',
//       isPhishing: false,
//       flags: []
//     },
//     {
//       id: 3,
//       sender: 'Sara Parras',
//       avatar: '/api/placeholder/32/32',
//       content: 'Click this link to verify your account credentials immediately: hxxps://acme-portal.secure.invalid/verify',
//       timestamp: '10:15 AM',
//       isPhishing: true,
//       flags: []
//     }
//   ]);

//   const [score, setScore] = useState({ correct: 0, total: 2 });
//   const [showResults, setShowResults] = useState(false);
//   const [feedback, setFeedback] = useState(null);

//   const handleFlag = (messageId) => {
//     const message = messages.find(m => m.id === messageId);
    
//     setMessages(messages.map(msg => {
//       if (msg.id === messageId) {
//         return { ...msg, flags: [...msg.flags, 'suspicious'] };
//       }
//       return msg;
//     }));

//     if (message.isPhishing) {
//       setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
//       setFeedback({
//         type: 'success',
//         message: 'Correct! This is a suspicious message.',
//         details: message.id === 1 ? [
//           'Creates artificial urgency',
//           'Requests financial action',
//           'Uses informal language for business',
//           'Tries to bypass normal procedures'
//         ] : [
//           'Contains suspicious link',
//           'Creates urgency with "immediately"',
//           'Requests credential verification',
//           'Uses threatening language'
//         ]
//       });
//     } else {
//       setFeedback({
//         type: 'warning',
//         message: 'This appears to be a legitimate message.',
//         details: [
//           'Uses normal business language',
//           'No urgent demands',
//           'No suspicious links',
//           'Follows standard procedures'
//         ]
//       });
//     }

//     const flaggedPhishingCount = messages
//       .filter(m => m.isPhishing && (m.flags.includes('suspicious') || m.id === messageId))
//       .length;
      
//     if (flaggedPhishingCount === 2) {
//       setShowResults(true);
//     }
//   };

//   if (showResults) {
//     return (
//       <div className="max-w-3xl mx-auto px-4">
//         <div className="bg-[#181b24] border border-gray-800/40 rounded-lg p-8">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-medium text-white mb-2">Training Complete!</h2>
//             <div className="flex flex-col items-center justify-center mt-8 mb-6">
//               <div className="relative">
//                 <div className="w-32 h-32 rounded-full bg-blue-500/10 border-4 border-blue-500/20 flex items-center justify-center">
//                   <span className="text-4xl font-bold text-blue-400">
//                     {Math.round((score.correct / score.total) * 100)}%
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-4 text-gray-400">
//                 <span className="text-xl font-medium text-blue-400">{score.correct}</span>
//                 <span className="mx-2">/</span>
//                 <span className="text-xl">{score.total}</span>
//                 <p className="text-sm mt-1">Phishing Messages Identified</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex justify-center">
//             <button 
//               onClick={() => window.location.reload()}
//               className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-6 py-2 rounded-lg flex items-center gap-2"
//             >
//               Try Again <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full">
//       <div className="flex justify-center mb-4">
//         <span className="text-sm text-gray-400">
//           Find all suspicious messages
//         </span>
//       </div>

//       <div className="grid grid-cols-[1fr,320px] gap-4">
//         {/* Messages Column */}
//         <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
//           <div className="h-1 bg-gray-800">
//             <div 
//               className="h-full bg-blue-500 transition-all duration-300" 
//               style={{ width: `${(score.correct / score.total) * 100}%` }}
//             />
//           </div>

//           <div className="p-6 space-y-4">
//             {messages.map((message) => (
//               <div 
//                 key={message.id}
//                 className={`p-4 rounded-lg border transition-all duration-200 ${
//                   message.flags.includes('suspicious')
//                     ? 'bg-blue-500/10 border-blue-500/40'
//                     : 'border-gray-800/40 hover:border-gray-800'
//                 }`}
//               >
//                 <div className="flex items-start space-x-3">
//                   <img
//                     src={message.avatar}
//                     alt={message.sender}
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-baseline space-x-2">
//                       <span className="font-medium text-white">{message.sender}</span>
//                       <span className="text-sm text-gray-500">{message.timestamp}</span>
//                     </div>
//                     {message.mentionType && (
//                       <div className="text-sm text-gray-500 mb-1">{message.mentionType}</div>
//                     )}
//                     <p className="text-gray-300 mt-1">{message.content}</p>
                    
//                     {!message.flags.includes('suspicious') && (
//                       <button
//                         onClick={() => handleFlag(message.id)}
//                         className="mt-3 bg-gray-600/30 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
//                       >
//                         <AlertCircle className="w-4 h-4" />
//                         Flag as Suspicious
//                       </button>
//                     )}
//                     {message.flags.includes('suspicious') && (
//                       <div className="mt-3 text-blue-400 flex items-center gap-2 text-sm">
//                         <AlertCircle className="w-4 h-4" />
//                         Flagged as suspicious
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Feedback Column */}
//         <div className="sticky top-4 h-fit">
//           {feedback ? (
//             <div className={`p-6 rounded-lg border ${
//               feedback.type === 'success' 
//                 ? 'bg-[#181b24] border-blue-500/40 text-blue-400'
//                 : 'bg-[#181b24] border-yellow-500/40 text-yellow-400'
//             }`}>
//               <h3 className="font-medium text-lg mb-4">{feedback.message}</h3>
//               <ul className="space-y-2">
//                 {feedback.details.map((detail, index) => (
//                   <li key={index} className="flex items-start gap-2">
//                     <span className="mt-1">•</span>
//                     <span>{detail}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ) : (
//             <div className="p-6 rounded-lg border border-gray-800/40 bg-[#181b24]">
//               <p className="text-gray-400">
//                 Review each message and flag any that appear suspicious.
//                 Look for signs of phishing such as urgency, unusual requests,
//                 or suspicious links.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SlackChat;



// import React, { useState } from 'react';
// import { AlertCircle, ChevronRight } from 'lucide-react';

// const Chat = () => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       sender: 'Fathima Parveen',
//       avatar: '/api/placeholder/32/32',
//       content: 'Thank you for kicking this off @Geeta. I need you to urgently process a vendor payment ASAP. Feel free to send that request my way...',
//       timestamp: 'Just now',
//       isPhishing: true,
//       flags: [],
//       mentionType: 'Mention in #design-team'
//     },
//     {
//       id: 2,
//       sender: 'Harry Boone',
//       avatar: '/api/placeholder/32/32',
//       content: "I spoke to Carmen last week, and she's happy with where we've landed so far. 🚀",
//       timestamp: '10:12 AM',
//       isPhishing: false,
//       flags: []
//     },
//     {
//       id: 3,
//       sender: 'Sara Parras',
//       avatar: '/api/placeholder/32/32',
//       content: 'Click this link to verify your account credentials immediately: hxxps://acme-portal.secure.invalid/verify',
//       timestamp: '10:15 AM',
//       isPhishing: true,
//       flags: []
//     }
//   ]);

//   const [score, setScore] = useState({ correct: 0, total: 2 });
//   const [showResults, setShowResults] = useState(false);
//   const [feedback, setFeedback] = useState({
//     message: null,
//     details: [],
//     type: null,
//     allFound: false
//   });

//   const handleFlag = (messageId) => {
//     const message = messages.find(m => m.id === messageId);
    
//     // Update message flags
//     setMessages(messages.map(msg => {
//       if (msg.id === messageId) {
//         return { ...msg, flags: [...msg.flags, 'suspicious'] };
//       }
//       return msg;
//     }));

//     // Check if message is phishing
//     if (message.isPhishing) {
//       setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      
//       // Calculate if this was the last phishing message
//       const newFlaggedCount = messages
//         .filter(m => m.isPhishing && 
//           (m.flags.includes('suspicious') || m.id === messageId))
//         .length;
      
//       const isLastPhishing = newFlaggedCount === 2;

//       setFeedback({
//         type: 'success',
//         message: 'Correct! This is a suspicious message.',
//         details: message.id === 1 ? [
//           'Creates artificial urgency with "urgently" and "ASAP"',
//           'Requests financial action without proper context',
//           'Uses informal language for a business request',
//           'Tries to bypass normal procedures'
//         ] : [
//           'Contains suspicious link with unusual domain',
//           'Creates urgency with "immediately"',
//           'Requests credential verification unexpectedly',
//           'Uses threatening language to prompt action'
//         ],
//         allFound: isLastPhishing
//       });
//     } else {
//       setFeedback({
//         type: 'warning',
//         message: 'This appears to be a legitimate message.',
//         details: [
//           'Uses normal business language',
//           'No urgent demands',
//           'No suspicious links',
//           'Follows standard procedures'
//         ],
//         allFound: false
//       });
//     }
//   };

//   if (showResults) {
//     return (
//       <div className="max-w-3xl mx-auto px-4">
//         <div className="bg-[#181b24] border border-gray-800/40 rounded-lg p-8">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-medium text-white mb-2">Training Complete!</h2>
//             <div className="flex flex-col items-center justify-center mt-8 mb-6">
//               <div className="relative">
//                 <div className="w-32 h-32 rounded-full bg-blue-500/10 border-4 border-blue-500/20 flex items-center justify-center">
//                   <span className="text-4xl font-bold text-blue-400">
//                     {Math.round((score.correct / score.total) * 100)}%
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-4 text-gray-400">
//                 <span className="text-xl font-medium text-blue-400">{score.correct}</span>
//                 <span className="mx-2">/</span>
//                 <span className="text-xl">{score.total}</span>
//                 <p className="text-sm mt-1">Phishing Messages Identified</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="flex justify-center">
//             <button 
//               onClick={() => window.location.reload()}
//               className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-6 py-2 rounded-lg flex items-center gap-2"
//             >
//               Try Again <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full">
//       <div className="flex justify-center mb-4">
//         <span className="text-sm text-gray-400">
//           Find all suspicious messages
//         </span>
//       </div>

//       <div className="grid grid-cols-[1fr,320px] gap-4">
//         {/* Messages Column */}
//         <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
//           <div className="h-1 bg-gray-800">
//             <div 
//               className="h-full bg-blue-500 transition-all duration-300" 
//               style={{ width: `${(score.correct / score.total) * 100}%` }}
//             />
//           </div>

//           <div className="p-6 space-y-4">
//             {messages.map((message) => (
//               <div 
//                 key={message.id}
//                 className={`p-4 rounded-lg border transition-all duration-200 ${
//                   message.flags.includes('suspicious')
//                     ? 'bg-blue-500/10 border-blue-500/40'
//                     : 'border-gray-800/40 hover:border-gray-800'
//                 }`}
//               >
//                 <div className="flex items-start space-x-3">
//                   <img
//                     src={message.avatar}
//                     alt={message.sender}
//                     className="w-8 h-8 rounded-full"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-baseline space-x-2">
//                       <span className="font-medium text-white">{message.sender}</span>
//                       <span className="text-sm text-gray-500">{message.timestamp}</span>
//                     </div>
//                     {message.mentionType && (
//                       <div className="text-sm text-gray-500 mb-1">{message.mentionType}</div>
//                     )}
//                     <p className="text-gray-300 mt-1">{message.content}</p>
                    
//                     {!message.flags.includes('suspicious') && (
//                       <button
//                         onClick={() => handleFlag(message.id)}
//                         className="mt-3 bg-gray-600/30 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
//                       >
//                         <AlertCircle className="w-4 h-4" />
//                         Flag as Suspicious
//                       </button>
//                     )}
//                     {message.flags.includes('suspicious') && (
//                       <div className="mt-3 text-blue-400 flex items-center gap-2 text-sm">
//                         <AlertCircle className="w-4 h-4" />
//                         Flagged as suspicious
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Feedback Column */}
//         <div className="sticky top-4 h-fit">
//           {feedback.message ? (
//             <div className={`p-6 rounded-lg border ${
//               feedback.type === 'success' 
//                 ? 'bg-[#181b24] border-blue-500/40 text-blue-400'
//                 : 'bg-[#181b24] border-yellow-500/40 text-yellow-400'
//             }`}>
//               <h3 className="font-medium text-lg mb-4">{feedback.message}</h3>
//               <ul className="space-y-2">
//                 {feedback.details.map((detail, index) => (
//                   <li key={index} className="flex items-start gap-2">
//                     <span className="mt-1">•</span>
//                     <span>{detail}</span>
//                   </li>
//                 ))}
//               </ul>
//               {feedback.allFound && (
//                 <div className="mt-6 pt-4 border-t border-blue-500/20">
//                   <p className="text-sm mb-3">Great job! You've found all suspicious messages!</p>
//                   <button 
//                     onClick={() => setShowResults(true)}
//                     className="w-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-4 py-2 rounded-lg flex items-center justify-center gap-2"
//                   >
//                     View Results <ChevronRight className="w-4 h-4" />
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="p-6 rounded-lg border border-gray-800/40 bg-[#181b24]">
//               <p className="text-gray-400">
//                 Review each message and flag any that appear suspicious.
//                 Look for signs of phishing such as urgency, unusual requests,
//                 or suspicious links.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useState } from 'react';
import { AlertCircle, ChevronRight } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Fathima Parveen',
      avatar: '/api/placeholder/32/32',
      content: 'Thank you for kicking this off @Geeta. I need you to urgently process a vendor payment ASAP. Feel free to send that request my way...',
      timestamp: 'Just now',
      isPhishing: true,
      flags: [],
      mentionType: 'Mention in #design-team'
    },
    {
      id: 2,
      sender: 'Harry Boone',
      avatar: '/api/placeholder/32/32',
      content: "I spoke to Carmen last week, and she's happy with where we've landed so far. 🚀",
      timestamp: '10:12 AM',
      isPhishing: false,
      flags: []
    },
    {
      id: 3,
      sender: 'Sara Parras',
      avatar: '/api/placeholder/32/32',
      content: 'Click this link to verify your account credentials immediately: hxxps://acme-portal.secure.invalid/verify',
      timestamp: '10:15 AM',
      isPhishing: true,
      flags: []
    }
  ]);

  const [score, setScore] = useState({ correct: 0, total: 2 });
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState({
    message: null,
    details: [],
    type: null,
    allFound: false
  });

  const handleFlag = (messageId) => {
    const message = messages.find(m => m.id === messageId);
    
    // Update message flags
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        return { ...msg, flags: [...msg.flags, 'suspicious'] };
      }
      return msg;
    }));

    // Check if message is phishing
    if (message.isPhishing) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      
      // Calculate if this was the last phishing message
      const newFlaggedCount = messages
        .filter(m => m.isPhishing && 
          (m.flags.includes('suspicious') || m.id === messageId))
        .length;
      
      const isLastPhishing = newFlaggedCount === 2;

      setFeedback({
        type: 'success',
        message: 'Correct! This is a suspicious message.',
        details: message.id === 1 ? [
          'Creates artificial urgency with "urgently" and "ASAP"',
          'Requests financial action without proper context',
          'Uses informal language for a business request',
          'Tries to bypass normal procedures'
        ] : [
          'Contains suspicious link with unusual domain',
          'Creates urgency with "immediately"',
          'Requests credential verification unexpectedly',
          'Uses threatening language to prompt action'
        ],
        allFound: isLastPhishing
      });
    } else {
      setFeedback({
        type: 'error',
        message: 'Incorrect. This appears to be a legitimate message.',
        details: [
          'Uses normal business language',
          'No urgent demands',
          'No suspicious links',
          'Follows standard procedures'
        ],
        allFound: false
      });
    }
  };

  const getMessageStyle = (message) => {
    if (!message.flags.includes('suspicious')) {
      return 'border-gray-800/40 hover:border-gray-800';
    }
    return message.isPhishing 
      ? 'bg-green-500/10 border-green-500/40 text-green-400'
      : 'bg-red-500/10 border-red-500/40 text-red-400';
  };

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-[#181b24] border border-gray-800/40 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-white mb-2">Training Complete!</h2>
            <div className="flex flex-col items-center justify-center mt-8 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-blue-500/10 border-4 border-blue-500/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-400">
                    {Math.round((score.correct / score.total) * 100)}%
                  </span>
                </div>
              </div>
              <div className="mt-4 text-gray-400">
                <span className="text-xl font-medium text-blue-400">{score.correct}</span>
                <span className="mx-2">/</span>
                <span className="text-xl">{score.total}</span>
                <p className="text-sm mt-1">Phishing Messages Identified</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-6 py-2 rounded-lg flex items-center gap-2"
            >
              Try Again <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4">
        <span className="text-sm text-gray-400">
          Find all suspicious messages
        </span>
      </div>

      <div className="grid grid-cols-[1fr,320px] gap-4">
        {/* Messages Column */}
        <div className="bg-[#181b24] border border-gray-800/40 rounded-lg overflow-hidden">
          <div className="h-1 bg-gray-800">
            <div 
              className="h-full bg-blue-500 transition-all duration-300" 
              style={{ width: `${(score.correct / score.total) * 100}%` }}
            />
          </div>

          <div className="p-6 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${getMessageStyle(message)}`}
              >
                <div className="flex items-start space-x-3">
                  <img
                    src={message.avatar}
                    alt={message.sender}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline space-x-2">
                      <span className="font-medium text-white">{message.sender}</span>
                      <span className="text-sm text-gray-500">{message.timestamp}</span>
                    </div>
                    {message.mentionType && (
                      <div className="text-sm text-gray-500 mb-1">{message.mentionType}</div>
                    )}
                    <p className={`mt-1 ${message.flags.includes('suspicious') ? (message.isPhishing ? 'text-green-300' : 'text-red-300') : 'text-gray-300'}`}>
                      {message.content}
                    </p>
                    
                    {!message.flags.includes('suspicious') && (
                      <button
                        onClick={() => handleFlag(message.id)}
                        className="mt-3 bg-gray-600/30 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
                      >
                        <AlertCircle className="w-4 h-4" />
                        Flag as Suspicious
                      </button>
                    )}
                    {message.flags.includes('suspicious') && (
                      <div className={`mt-3 flex items-center gap-2 text-sm ${message.isPhishing ? 'text-green-400' : 'text-red-400'}`}>
                        <AlertCircle className="w-4 h-4" />
                        {message.isPhishing ? 'Correctly flagged as suspicious' : 'Incorrectly flagged as suspicious'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Column */}
        <div className="sticky top-4 h-fit">
          {feedback.message ? (
            <div className={`p-6 rounded-lg border ${
              feedback.type === 'success' 
                ? 'bg-[#181b24] border-blue-500/40 text-blue-400'
                : 'bg-[#181b24] border-blue-500/40 text-blue-400'
            }`}>
              <h3 className="font-medium text-lg mb-4">{feedback.message}</h3>
              <ul className="space-y-2">
                {feedback.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              {feedback.allFound && (
                <div className="mt-6 pt-4 border-t border-blue-500/20">
                  <p className="text-sm mb-3">Great job! You've found all suspicious messages!</p>
                  <button 
                    onClick={() => setShowResults(true)}
                    className="w-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 transition-colors px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    View Results <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 rounded-lg border border-gray-800/40 bg-[#181b24]">
              <p className="text-gray-400">
                Review each message and flag any that appear suspicious.
                Look for signs of phishing such as urgency, unusual requests,
                or suspicious links.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;