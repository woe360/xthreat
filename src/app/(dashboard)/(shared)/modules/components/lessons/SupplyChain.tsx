// import React, { useState, useEffect } from 'react';
// import { CheckCircle2, AlertCircle, ChevronRight, ChevronLeft, Mail, Phone, FileText, ExternalLink, Shield, X, FileWarning } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// interface ScenarioNode {
//   id: string;
//   type: 'email' | 'call' | 'portal' | 'document' | 'result';
//   title: string;
//   content: string;
//   choices?: {
//     id: string;
//     text: string;
//     securityImpact: number; // -10 to 10, negative is bad
//     nextNode: string;
//     feedback: string;
//     redFlags?: string[];
//   }[];
//   image?: string;
//   from?: string;
//   subject?: string;
//   timestamp?: string;
//   redFlags?: {
//     element: string;
//     explanation: string;
//   }[];
// }

// interface SupplyChainSimulationProps {
//   moduleId: string;
//   onComplete?: () => void;
// }

// const SupplyChainSimulation: React.FC<SupplyChainSimulationProps> = ({ moduleId, onComplete }) => {
//   const router = useRouter();
//   const [currentNodeId, setCurrentNodeId] = useState<string>('start');
//   const [scenarioPath, setScenarioPath] = useState<string[]>(['start']);
//   const [securityScore, setSecurityScore] = useState<number>(100);
//   const [showFeedback, setShowFeedback] = useState<boolean>(false);
//   const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
//   const [completed, setCompleted] = useState<boolean>(false);
//   const [showRedFlags, setShowRedFlags] = useState<boolean>(false);
//   const [discoveredRedFlags, setDiscoveredRedFlags] = useState<Set<string>>(new Set());

//   // Scenario tree
//   const scenarioNodes: { [key: string]: ScenarioNode } = {
//     'start': {
//       id: 'start',
//       type: 'email',
//       title: 'Urgent: Updated Payment Information',
//       content: 'Dear [Your Name],\n\nDue to recent upgrades in our payment processing system, we need all clients to update their vendor payment information immediately. This is time-sensitive as payments may be delayed if not completed within 24 hours.\n\nPlease click the secure link below to access our vendor portal and confirm your payment details:\n\n[SECURE VENDOR PORTAL ACCESS]\n\nBest regards,\nSarah Thompson\nAccounts Receivable Manager\nAcme Industrial Supplies',
//       from: 'sarah.thompson@acme-industrials-inc.com',
//       subject: 'URGENT: Action Required for Continued Payment Processing',
//       timestamp: 'Today, 9:18 AM',
//       redFlags: [
//         { 
//           element: 'Domain name',
//           explanation: 'The email is from "acme-industrials-inc.com" not the legitimate "acmeindustrial.com"' 
//         },
//         { 
//           element: 'Urgency',
//           explanation: 'Creating false urgency with a 24-hour deadline is a common pressure tactic' 
//         },
//         { 
//           element: 'Generic greeting',
//           explanation: 'Using [Your Name] instead of your actual name indicates a mass phishing attempt' 
//         },
//         {
//           element: 'Threatening consequences',
//           explanation: 'Warning of payment delays creates anxiety and rushed decision-making'
//         }
//       ],
//       choices: [
//         {
//           id: 'click_link',
//           text: 'Click the portal link to update payment information',
//           securityImpact: -10,
//           nextNode: 'fake_portal',
//           feedback: 'Clicking links in suspicious emails is risky. Legitimate vendors typically don\'t request payment information updates through unexpected emails.',
//           redFlags: ['Suspicious URL', 'Request for financial details']
//         },
//         {
//           id: 'call_vendor',
//           text: 'Call your Acme Industrial Supplies representative directly',
//           securityImpact: 10,
//           nextNode: 'vendor_call',
//           feedback: 'Great decision! Verifying unexpected requests through established contact methods is a strong security practice.',
//           redFlags: []
//         },
//         {
//           id: 'forward_it',
//           text: 'Forward the email to your IT security team',
//           securityImpact: 5,
//           nextNode: 'it_team',
//           feedback: 'Good choice. Your IT team can investigate suspicious emails and provide guidance on next steps.',
//           redFlags: []
//         }
//       ]
//     },
    
//     'fake_portal': {
//       id: 'fake_portal',
//       type: 'portal',
//       title: 'Vendor Payment Portal',
//       content: 'Welcome to the Acme Industrial Supplies Vendor Portal\n\nPlease verify your identity by providing the following information to update your payment details:\n\n• Company ID\n• Account Number\n• Banking Information\n• Authorized Contact Details',
//       redFlags: [
//         { 
//           element: 'URL',
//           explanation: 'The URL is "vendor-acme-portal.com" not matching the official company domain' 
//         },
//         { 
//           element: 'SSL Certificate',
//           explanation: 'The site has an invalid or missing SSL certificate' 
//         },
//         { 
//           element: 'Excessive information',
//           explanation: 'Requesting extensive financial details in one form is suspicious' 
//         },
//         {
//           element: 'Design inconsistency',
//           explanation: 'The portal design doesn't match Acme's brand guidelines and official communications'
//         }
//       ],
//       choices: [
//         {
//           id: 'submit_details',
//           text: 'Complete the form with your company's financial information',
//           securityImpact: -20,
//           nextNode: 'compromised',
//           feedback: 'This action exposes critical financial information. Always verify the authenticity of payment update requests through official channels.',
//           redFlags: ['Insecure connection', 'Suspicious domain']
//         },
//         {
//           id: 'close_portal',
//           text: 'Close the browser and contact Acme directly',
//           securityImpact: 5,
//           nextNode: 'vendor_call',
//           feedback: 'Good decision! Recognizing the suspicious portal and verifying through official channels protects your company's financial security.',
//           redFlags: []
//         }
//       ]
//     },
    
//     'vendor_call': {
//       id: 'vendor_call',
//       type: 'call',
//       title: 'Call with Acme Representative',
//       content: 'You call your account manager at Acme Industrial Supplies using the number from your records.\n\nYour account manager confirms they did NOT send any email about updating payment information and have NOT changed their payment systems.\n\nThey thank you for your vigilance and confirm they'll report this to their security team.',
//       choices: [
//         {
//           id: 'report_phishing',
//           text: 'Report the phishing attempt to your security team',
//           securityImpact: 10,
//           nextNode: 'security_team',
//           feedback: 'Excellent! Reporting confirmed phishing attempts helps protect your entire organization and improves security measures.',
//           redFlags: []
//         },
//         {
//           id: 'ignore_email',
//           text: 'Delete the email and continue with your work',
//           securityImpact: -5,
//           nextNode: 'ignore_result',
//           feedback: 'While you avoided the attack, not reporting the incident means other colleagues might still fall for it.',
//           redFlags: []
//         }
//       ]
//     },
    
//     'it_team': {
//       id: 'it_team',
//       type: 'email',
//       title: 'Response from IT Security',
//       content: 'Your IT security team responds promptly:\n\n"Thank you for forwarding this suspicious email. We've confirmed this is a sophisticated phishing attempt targeting multiple employees in procurement roles.\n\nWe've blocked the malicious domain and are scanning for any similar attempts. Please continue to forward any suspicious communications."\n\nThey attach guidelines for identifying supply chain phishing attempts.',
//       from: 'security@yourcompany.com',
//       subject: 'RE: URGENT: Action Required for Continued Payment Processing',
//       timestamp: 'Today, 10:22 AM',
//       choices: [
//         {
//           id: 'review_guidelines',
//           text: 'Review the security guidelines and share with your team',
//           securityImpact: 10,
//           nextNode: 'team_training',
//           feedback: 'Proactive learning and team education significantly improves your organization's security posture.',
//           redFlags: []
//         },
//         {
//           id: 'thank_it',
//           text: 'Thank IT and continue with your work',
//           securityImpact: 5,
//           nextNode: 'safe_outcome',
//           feedback: 'You've helped protect the company, though sharing knowledge with colleagues would further strengthen security.',
//           redFlags: []
//         }
//       ]
//     },
    
//     'compromised': {
//       id: 'compromised',
//       type: 'result',
//       title: 'Security Incident Detected',
//       content: 'Three days later, your finance department discovers unauthorized wire transfers to international accounts. An investigation reveals that banking details were changed through fraudulent means.\n\nYour company has suffered a significant financial loss and must now implement emergency security protocols while attempting to recover the stolen funds.',
//       choices: [
//         {
//           id: 'lesson_learned',
//           text: 'Review what went wrong and complete the simulation',
//           securityImpact: 0,
//           nextNode: 'complete',
//           feedback: 'This outcome demonstrates how supply chain phishing can lead to direct financial damage. Always verify unexpected financial requests through established channels.',
//           redFlags: []
//         }
//       ]
//     },
    
//     'ignore_result': {
//       id: 'ignore_result',
//       type: 'result',
//       title: 'Incident Affects Colleagues',
//       content: 'A week later, you learn that several colleagues from other departments fell victim to the same phishing campaign.\n\nWhile you avoided the attack personally, the organization still experienced a security breach that could have been mitigated with earlier reporting.',
//       choices: [
//         {
//           id: 'review_outcome',
//           text: 'Understand the importance of reporting and complete',
//           securityImpact: 0,
//           nextNode: 'complete',
//           feedback: 'Reporting suspicious activities helps protect the entire organization, not just your own account.',
//           redFlags: []
//         }
//       ]
//     },
    
//     'security_team': {
//       id: 'security_team',
//       type: 'document',
//       title: 'Security Team Response',
//       content: 'The security team thanks you for your report and launches an investigation. They discover this is part of a coordinated attack targeting multiple vendors in your industry.\n\nYour prompt reporting helps them alert other companies and collaborate with law enforcement to track the source.\n\nThe CISO sends a company-wide commendation for your vigilance.',
//       choices: [
//         {
//           id: 'complete_training',
//           text: 'Complete the simulation with excellent security practices',
//           securityImpact: 5,
//           nextNode: 'complete',
//           feedback: 'Your actions exemplify best practices in vendor phishing prevention: verification through official channels and prompt reporting of suspicious activity.',
//           redFlags: []
//         }
//       ]
//     },
    
//     'team_training': {
//       id: 'team_training',
//       type: 'result',
//       title: 'Improved Team Security Awareness',
//       content: 'After sharing the IT guidelines with your procurement team, everyone becomes more vigilant about vendor communications.\n\nThe following month, two team members identify and report similar phishing attempts before any damage occurs.\n\nYour department is recognized for exceptional security practices in the quarterly business review.',
//       choices: [
//         {
//           id: 'complete_training',
//           text: 'Complete the simulation with excellent security practices',
//           securityImpact: 5,
//           nextNode: 'complete',
//           feedback: 'Sharing security knowledge creates a multiplier effect, dramatically improving organizational resilience against phishing attacks.',
//           redFlags: []
//         }
//       ]
//     },
    
//     'safe_outcome': {
//       id: 'safe_outcome',
//       type: 'result',
//       title: 'Attack Avoided',
//       content: 'Thanks to your vigilance, your company avoided a potentially costly phishing attack. The security team implements additional email filtering rules based on this attempt.\n\nWhile you personally made good security decisions, sharing this experience with colleagues could have further strengthened organizational awareness.',
//       choices: [
//         {
//           id: 'complete_outcome',
//           text: 'Complete the simulation with good security practices',
//           securityImpact: 0,
//           nextNode: 'complete',
//           feedback: 'You successfully avoided the phishing attempt through verification and reporting, demonstrating solid security awareness.',
//           redFlags: []
//         }
//       ]
//     },
    
//     'complete': {
//       id: 'complete',
//       type: 'result',
//       title: 'Simulation Completed',
//       content: 'You have completed the Supply Chain Phishing Simulation.',
//       choices: []
//     }
//   };

//   const currentNode = scenarioNodes[currentNodeId];

//   useEffect(() => {
//     if (currentNode.type === 'result' && currentNode.id === 'complete') {
//       setCompleted(true);
//     }
//   }, [currentNode]);

//   const handleChoiceSelect = (choiceId: string) => {
//     if (showFeedback) return;
    
//     const selectedOption = currentNode.choices?.find(choice => choice.id === choiceId);
//     if (!selectedOption) return;
    
//     setSelectedChoice(choiceId);
//     setShowFeedback(true);
//     setSecurityScore(prev => Math.max(0, Math.min(100, prev + selectedOption.securityImpact)));
//   };

//   const handleNext = () => {
//     if (!selectedChoice) return;
    
//     const selectedOption = currentNode.choices?.find(choice => choice.id === selectedChoice);
//     if (!selectedOption) return;
    
//     const nextNodeId = selectedOption.nextNode;
//     setCurrentNodeId(nextNodeId);
//     setScenarioPath(prev => [...prev, nextNodeId]);
//     setShowFeedback(false);
//     setSelectedChoice(null);
//     setShowRedFlags(false);
//   };

//   const handlePrevious = () => {
//     if (scenarioPath.length <= 1) return;
    
//     const newPath = [...scenarioPath];
//     newPath.pop();
//     setScenarioPath(newPath);
//     setCurrentNodeId(newPath[newPath.length - 1]);
//     setShowFeedback(false);
//     setSelectedChoice(null);
//     setShowRedFlags(false);
//   };

//   const toggleRedFlags = () => {
//     setShowRedFlags(!showRedFlags);
//   };

//   const markRedFlagAsDiscovered = (flag: string) => {
//     setDiscoveredRedFlags(prev => {
//       const updated = new Set(prev);
//       updated.add(flag);
//       return updated;
//     });
//   };

//   const getSecurityRating = () => {
//     if (securityScore >= 90) return { text: "Excellent", color: "text-green-400" };
//     if (securityScore >= 70) return { text: "Good", color: "text-blue-400" };
//     if (securityScore >= 50) return { text: "Fair", color: "text-yellow-400" };
//     return { text: "Poor", color: "text-red-400" };
//   };

//   const getTypeIcon = (type: string) => {
//     switch (type) {
//       case 'email': return <Mail className="w-5 h-5" />;
//       case 'call': return <Phone className="w-5 h-5" />;
//       case 'document': return <FileText className="w-5 h-5" />;
//       case 'portal': return <ExternalLink className="w-5 h-5" />;
//       case 'result': return <Shield className="w-5 h-5" />;
//       default: return <Mail className="w-5 h-5" />;
//     }
//   };

//   const renderNodeContent = () => {
//     switch (currentNode.type) {
//       case 'email':
//         return (
//           <div className="border border-gray-800 rounded-lg overflow-hidden mb-8">
//             <div className="bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
//               <div>
//                 <p className="text-sm text-gray-400">From: <span className="text-white">{currentNode.from}</span></p>
//                 <p className="text-sm text-gray-400">Subject: <span className="text-white">{currentNode.subject}</span></p>
//               </div>
//               <p className="text-xs text-gray-500">{currentNode.timestamp}</p>
//             </div>
//             <div className="p-4 bg-gray-950">
//               <pre className="whitespace-pre-wrap font-sans text-gray-300">{currentNode.content}</pre>
//             </div>
//             {currentNode.redFlags && (
//               <div className="border-t border-gray-800 p-2">
//                 <button 
//                   onClick={toggleRedFlags}
//                   className="text-xs flex items-center gap-1 px-3 py-1.5 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
//                 >
//                   <FileWarning className="w-3 h-3" />
//                   {showRedFlags ? "Hide Red Flags" : "Analyze for Red Flags"}
//                 </button>
//               </div>
//             )}
//           </div>
//         );
        
//       case 'portal':
//         return (
//           <div className="border border-gray-800 rounded-lg overflow-hidden mb-8">
//             <div className="bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center">
//               <div className="flex items-center gap-2">
//                 <ExternalLink className="w-4 h-4 text-gray-400" />
//                 <p className="text-sm text-red-400">https://vendor-acme-portal.com/login</p>
//               </div>
//               <p className="text-xs bg-red-900/30 text-red-400 px-2 py-0.5 rounded flex items-center gap-1">
//                 <X className="w-3 h-3" /> Not Secure
//               </p>
//             </div>
//             <div className="p-6 bg-gray-950">
//               <h3 className="text-xl font-medium text-white mb-4">{currentNode.title}</h3>
//               <pre className="whitespace-pre-wrap font-sans text-gray-300">{currentNode.content}</pre>
//             </div>
//             {currentNode.redFlags && (
//               <div className="border-t border-gray-800 p-2">
//                 <button 
//                   onClick={toggleRedFlags}
//                   className="text-xs flex items-center gap-1 px-3 py-1.5 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
//                 >
//                   <FileWarning className="w-3 h-3" />
//                   {showRedFlags ? "Hide Red Flags" : "Analyze for Red Flags"}
//                 </button>
//               </div>
//             )}
//           </div>
//         );
        
//       case 'call':
//       case 'document':
//       case 'result':
//       default:
//         return (
//           <div className="border border-gray-800 rounded-lg overflow-hidden mb-8">
//             <div className="bg-gray-900 p-4 border-b border-gray-800">
//               <div className="flex items-center gap-2">
//                 {getTypeIcon(currentNode.type)}
//                 <h3 className="text-lg font-medium text-white">{currentNode.title}</h3>
//               </div>
//             </div>
//             <div className="p-6 bg-gray-950">
//               <pre className="whitespace-pre-wrap font-sans text-gray-300">{currentNode.content}</pre>
//             </div>
//           </div>
//         );
//     }
//   };

//   if (completed) {
//     const securityRating = getSecurityRating();
    
//     return (
//       <div className="max-w-3xl w-full mx-auto py-12 px-4 text-center">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 font-normal mb-6">
//           Simulation Completed
//         </h1>
        
//         <div className="relative w-full max-w-md mx-auto mb-12 py-8">
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className={`w-36 h-36 rounded-full ${
//               securityScore >= 70 ? 'bg-green-500/10 border-green-500/20' : 
//               securityScore >= 50 ? 'bg-yellow-500/10 border-yellow-500/20' : 
//               'bg-red-500/10 border-red-500/20'
//             } border-4 flex items-center justify-center`}>
//               <div className="text-center">
//                 <div className="text-4xl font-light text-white">{securityScore}</div>
//                 <p className={`${securityRating.color} text-sm`}>{securityRating.text}</p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         <p className="text-neutral-400 max-w-xl mx-auto mb-12">
//           Your security score reflects how well you handled the supply chain phishing attempt. Remember that verifying unexpected requests through established channels and reporting suspicious activity are key to protecting your organization.
//         </p>

//         <div className="border-t border-gray-800/40 pt-8 mt-8 max-w-md mx-auto flex justify-center gap-4">
//           <button
//             onClick={() => router.push(`/modules/${moduleId}`)} 
//             className="inline-flex items-center px-6 py-3 border border-gray-800 rounded-lg text-white hover:bg-white/5 transition"
//           >
//             Return to Module
//           </button>
//           <button
//             onClick={onComplete} 
//             className="inline-flex items-center px-6 py-3 border border-white/50 bg-white/20 text-white hover:bg-white/20 rounded-lg transition"
//           >
//             Continue <ChevronRight size={16} className="ml-1" />
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl w-full mx-auto py-12 px-4">
//       <div className="flex justify-between items-center mb-8">
//         <div className="flex items-center gap-2 text-sm">
//           <span className={`inline-flex items-center gap-1 px-2 py-1 rounded ${
//             currentNode.type === 'result' ? 'bg-purple-500/20 text-purple-300' :
//             currentNode.type === 'email' ? 'bg-blue-500/20 text-blue-300' :
//             currentNode.type === 'portal' ? 'bg-red-500/20 text-red-300' :
//             currentNode.type === 'call' ? 'bg-green-500/20 text-green-300' :
//             'bg-yellow-500/20 text-yellow-300'
//           }`}>
//             {getTypeIcon(currentNode.type)}
//             <span className="capitalize">{currentNode.type}</span>
//           </span>
//           <span className="text-gray-500">|</span>
//           <span className="text-gray-400">Security Score: 
//             <span className={`ml-1 font-medium ${
//               securityScore >= 70 ? 'text-green-400' : 
//               securityScore >= 50 ? 'text-yellow-400' : 
//               'text-red-400'
//             }`}>
//               {securityScore}
//             </span>
//           </span>
//         </div>
//       </div>
      
//       {/* Red Flags Analysis Panel */}
//       {showRedFlags && currentNode.redFlags && (
//         <div className="mb-6 border border-yellow-500/30 bg-yellow-500/5 rounded-lg p-4">
//           <h4 className="font-medium text-yellow-300 mb-3 flex items-center gap-2">
//             <FileWarning className="w-4 h-4" />
//             Red Flags Analysis
//           </h4>
//           <ul className="space-y-3">
//             {currentNode.redFlags.map((flag, index) => (
//               <li 
//                 key={index} 
//                 className={`p-3 border ${
//                   discoveredRedFlags.has(flag.element) 
//                     ? 'border-green-500/30 bg-green-500/10' 
//                     : 'border-gray-800 bg-gray-900'
//                 } rounded-lg cursor-pointer hover:bg-gray-800 transition-colors`}
//                 onClick={() => markRedFlagAsDiscovered(flag.element)}
//               >
//                 <div className="flex justify-between items-start">
//                   <div className="font-medium text-white">{flag.element}</div>
//                   {discoveredRedFlags.has(flag.element) && (
//                     <CheckCircle2 className="w-4 h-4 text-green-400 mt-1" />
//                   )}
//                 </div>
//                 {discoveredRedFlags.has(flag.element) && (
//                   <p className="mt-2 text-sm text-gray-400">{flag.explanation}</p>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
      
//       {renderNodeContent()}
      
//       {currentNode.choices && currentNode.choices.length > 0 && (
//         <div className="space-y-3 mb-8">
//           {currentNode.choices.map((choice) => (
//             <button
//               key={choice.id}
//               onClick={() => handleChoiceSelect(choice.id)}
//               className={`w-full text-left p-4 border rounded-lg transition-all ${
//                 selectedChoice === choice.id
//                   ? showFeedback
//                     ? choice.securityImpact >= 0
//                       ? 'border-green-500/40 bg-green-500/10 text-green-300'
//                       : 'border-red-500/40 bg-red-500/10 text-red-300'
//                     : "border-purple-500/50 bg-purple-500/10 text-white"
//                   : "border-gray-800 bg-black/20 text-neutral-300 hover:border-gray-700 hover:bg-black/40"
//               }`}
//               disabled={showFeedback}
//             >
//               <div className="flex items-start gap-3">
//                 {showFeedback && selectedChoice === choice.id && (
//                   choice.securityImpact >= 0
//                     ? <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
//                     : <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
//                 )}
//                 <div>
//                   <p>{choice.text}</p>
//                   {showFeedback && selectedChoice === choice.id && (
//                     <p className={`mt-1.5 text-sm ${
//                       choice.securityImpact >= 0 ? 'text-green-400/80' : 'text-red-400/80'
//                     }`}>
//                       {choice.feedback}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       )}
      
//       <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-800/40">
//         {scenarioPath.length > 1 ? (
//           <button
//             onClick={handlePrevious}
//             className="text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-1 px-3 py-2"
//           >
//             <ChevronLeft size={16} /> Previous
//           </button>
//         ) : (
//           <div />
//         )}
        
//         {showFeedback && currentNode.choices && currentNode.choices.length > 0 && (
//           <button
//             onClick={handleNext}
//             className="px-6 py-3 rounded-lg flex items-center justify-center transition-all border border-white/50 bg-white/20 text-white hover:bg-white/20"
//           >
//             Continue <ChevronRight size={16} className="ml-1" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SupplyChainSimulation;