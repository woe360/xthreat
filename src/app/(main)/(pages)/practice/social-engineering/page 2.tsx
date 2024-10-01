'use client'

// import React, { useState } from 'react';
// import Link from 'next/link';

// const ScamSimulator = () => {
//   const [messages, setMessages] = useState([
//     { text: 'Welcome to the Scam Simulator! How can I help you today?', isBot: true },
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [chatType, setChatType] = useState('Scam Simulation');

//   const handleSendMessage = () => {
//     if (inputValue.trim() !== '') {
//       setMessages([...messages, { text: inputValue, isBot: false }]);
//       setInputValue('');
      
//       // Simulate a bot response (this is where your bot logic will go)
//       setTimeout(() => {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { text: 'This is a bot response.', isBot: true },
//         ]);
//       }, 1000);
//     }
//   };

//   return (
//     <div className="min-h-screen overflow-hidden bg-black flex">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-gray-800 p-6">
//         {/* Back Button */}
//         <div className="flex justify-between items-center mb-8">
//           <Link className="text-gray-400 hover:text-white transition flex items-center" href="/practice">
//             ‹ Back
//           </Link>
//         </div>
//         <h2 className="text-white text-xl font-bold mb-4">Select Chat Type</h2>
//         <ul className="space-y-4">
//           <li>
//             <button
//               onClick={() => setChatType('Scam Simulation')}
//               className={`w-full text-left p-3 rounded-lg ${
//                 chatType === 'Scam Simulation' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
//               }`}
//             >
//               Scam Simulation
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setChatType('Technical Support')}
//               className={`w-full text-left p-3 rounded-lg ${
//                 chatType === 'Technical Support' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
//               }`}
//             >
//               Technical Support
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setChatType('Customer Service')}
//               className={`w-full text-left p-3 rounded-lg ${
//                 chatType === 'Customer Service' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
//               }`}
//             >
//               Customer Service
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Chat Container */}
//       <div className="w-3/4 h-screen bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col">
//         {/* Header */}
//         <div className="mb-4 text-white text-xl font-bold">
//           {chatType}
//         </div>

//         {/* Chat Area */}
//         <div className="flex-1 overflow-y-auto p-4">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`mb-4 p-3 rounded-lg text-lg ${
//                 message.isBot
//                   ? 'bg-gray-800 text-white self-start'
//                   : 'bg-purple-700 text-white self-end'
//               } max-w-full`}
//             >
//               {message.text}
//             </div>
//           ))}
//         </div>

//         {/* Input Area */}
//         <div className="flex items-center border-t border-gray-700 pt-4 mb-16">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//             className="flex-1 bg-gray-800 text-white p-4 rounded-lg text-lg focus:outline-none"
//             style={{ height: '60px' }}  // Increase the height here
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={handleSendMessage}
//             className="bg-purple-600 text-white ml-4 py-3 px-6 rounded-lg text-lg hover:bg-purple-700"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ScamSimulator;


// import React, { useState } from 'react';
// import { ChevronLeft } from 'lucide-react';
// import Link from 'next/link';

// const componentStyle = {
//   background: 'radial-gradient(125% 125% at 50% 25%, #222 5%, #223 70%)',
//   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
// };

// const ScamSimulator = () => {
//   const [messages, setMessages] = useState([
//     { sender: 'Scammer', content: 'Hello! I\'m from your bank. We\'ve noticed some suspicious activity on your account.' },
//   ]);
//   const [userInput, setUserInput] = useState('');

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (userInput.trim()) {
//       setMessages([...messages, { sender: 'You', content: userInput }]);
//       setUserInput('');
//       // Here you would typically add logic to process the user's response
//       // and generate the next "scammer" message
//     }
//   };

//   return (
//     <div className="min-h-screen font-sans bg-black p-6 text-white">
//       {/* Back Button */}
//       <div className="flex justify-between items-center mb-8">
//         <Link className="text-gray-400 hover:text-white transition flex items-center" href="/practice">
//           <ChevronLeft /> Back
//         </Link>
//       </div>

//       {/* Header */}
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-light">Scam Simulator</h1>
//       </div>

//       {/* Chat Container */}
//       <div
//         className="p-6 rounded-lg shadow-lg mb-8 border border-gray-700 h-[60vh] flex flex-col"
//         style={{
//           background: 'radial-gradient(125% 125% at 50% 25%, #000 20%, #223 100%)',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
//         }}
//       >
//         {/* Messages */}
//         <div className="flex-grow overflow-y-auto mb-4">
//           {messages.map((message, index) => (
//             <div key={index} className={`mb-4 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}>
//               <span className="font-bold">{message.sender}: </span>
//               <span className="bg-gray-800 inline-block p-2 rounded-lg">{message.content}</span>
//             </div>
//           ))}
//         </div>

//         {/* Input Form */}
//         <form onSubmit={handleSendMessage} className="flex">
//           <input
//             type="text"
//             value={userInput}
//             onChange={(e) => setUserInput(e.target.value)}
//             className="flex-grow bg-gray-800 text-white p-2 rounded-l-lg border border-gray-700"
//             placeholder="Type your response..."
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition"
//           >
//             Send
//           </button>
//         </form>
//       </div>

//       {/* Instructions or Tips */}
//       <div
//         className="p-6 rounded-lg shadow-lg border border-gray-700"
//         style={{
//           background: 'radial-gradient(125% 125% at 50% 25%, #000 20%, #223 100%)',
//           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
//         }}
//       >
//         <h2 className="text-xl font-semibold mb-4">How to Identify Scams</h2>
//         <ul className="list-disc pl-5 text-gray-300">
//           <li>Be wary of unsolicited messages claiming to be from your bank or other institutions.</li>
//           <li>Don't share personal information or account details over chat or email.</li>
//           <li>Look for pressure tactics or urgency in the scammer's messages.</li>
//           <li>Check for poor grammar or spelling, which can be indicators of a scam.</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ScamSimulator;

import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const ScamSimulator = () => {
  const [messages, setMessages] = useState([
    { sender: 'Scammer', content: 'Hello! NICCO I\'m from your bank. We\'ve noticed some suspicious activity on your account.' },
  ]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      setMessages([...messages, { sender: 'You', content: userInput }]);
      setUserInput('');
      // Here you would typically add logic to process the user's response
      // and generate the next "scammer" message
    }
  };

  return (
    <div className="min-h-min font-sans bg-black overscroll-y-none text-white relative">
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      <div className="relative z-10 p-5">
        {/* Back Button */}
        <div className="flex flex-row justify-between items-center mb-6">
          <Link className="text-gray-400 hover:text-white transition flex items-center" href="/practice">
            <ChevronLeft /> Back
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-4xl font-light mb-6">Scam Simulator</h1>

        <div className="flex gap-8">
          {/* Left Side: Tips and Guiding Questions */}
          <div className="w-1/3 p-6 rounded-lg shadow-lg border border-gray-700" style={{
            background: 'radial-gradient(125% 125% at 50% 25%, #222 20%, #223 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
          }}>
            <h2 className="text-2xl font-semibold mb-4">How to Identify Scams</h2>
            <ul className="list-disc pl-5 text-gray-300 mb-6">
              <li>Be wary of unsolicited messages claiming to be from your bank or other institutions.</li>
              <li>Don't share personal information or account details over chat or email.</li>
              <li>Look for pressure tactics or urgency in the scammer's messages.</li>
              <li>Check for poor grammar or spelling, which can be indicators of a scam.</li>
            </ul>
            <h2 className="text-2xl font-semibold mb-4">Guiding Questions</h2>
            <ul className="list-disc pl-5 text-gray-300">
              <li>Is the sender asking for sensitive information?</li>
              <li>Are they creating a sense of urgency?</li>
              <li>Does the message contain unexpected attachments or links?</li>
              <li>Is the sender's email address or phone number legitimate?</li>
              <li>Are there any unusual requests or offers that seem too good to be true?</li>
            </ul>
          </div>

          {/* Right Side: Chat Interface */}
          <div className="w-2/3 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col" style={{
            background: 'radial-gradient(125% 125% at 50% 25%, #000 20%, #223 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            height: 'calc(100vh - 233px)'
          }}>
            {/* Messages */}
            <div className="flex-grow overflow-y-auto mb-4">
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.sender === 'You' ? 'text-right' : 'text-left'}`}>
                  <span className="font-bold">{message.sender}: </span>
                  <span className="bg-gray-800 inline-block p-2 rounded-lg">{message.content}</span>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="flex-grow bg-gray-800 text-white p-2 rounded-l-lg border border-gray-700"
                placeholder="Type your response..."
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScamSimulator;


// import React, { useState } from 'react';
// import Link from 'next/link';

// const SocialEngineering = () => {
//   const [messages, setMessages] = useState([
//     { text: 'Welcome to the Scam Simulator! How can I help you today?', isBot: true },
//   ]);
//   const [inputValue, setInputValue] = useState('');
//   const [chatType, setChatType] = useState('Scam Simulation');

//   const handleSendMessage = () => {
//     if (inputValue.trim() !== '') {
//       setMessages([...messages, { text: inputValue, isBot: false }]);
//       setInputValue('');
      
//       // Simulate a bot response (this is where your bot logic will go)
//       setTimeout(() => {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { text: 'This is a bot response.', isBot: true },
//         ]);
//       }, 1000);
//     }
//   };

//   return (
//     <div className="overflow-hidden font-sans bg-black flex">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-gray-800 p-6 flex-shrink-0">
//         {/* Back Button */}
//         <div className="mb-8">
//           <Link className="text-gray-400 hover:text-white transition flex items-center" href="/practice">
//             ‹ Back
//           </Link>
//         </div>
//         <h2 className="text-white text-xl font-bold mb-4">Select Chat Type</h2>
//         <ul className="space-y-4">
//           <li>
//             <button
//               onClick={() => setChatType('Scam Simulation')}
//               className={`w-full text-left p-3 rounded-lg ${
//                 chatType === 'Scam Simulation' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
//               }`}
//             >
//               Scam Simulation
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setChatType('Technical Support')}
//               className={`w-full text-left p-3 rounded-lg ${
//                 chatType === 'Technical Support' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
//               }`}
//             >
//               Technical Support
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => setChatType('Customer Service')}
//               className={`w-full text-left p-3 rounded-lg ${
//                 chatType === 'Customer Service' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'
//               }`}
//             >
//               Customer Service
//             </button>
//           </li>
//         </ul>
//       </div>

//       {/* Chat Container */}
//       <div className="w-3/4 h-screen bg-gray-900 p-6 flex flex-col">
//         {/* Header */}
//         <div className="mb-4 text-white text-xl font-bold">
//           {chatType}
//         </div>

//         {/* Chat Area */}
//         <div className="flex-1 overflow-y-auto p-4">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`mb-4 p-3 rounded-lg text-lg ${
//                 message.isBot
//                   ? 'bg-gray-800 text-white self-start'
//                   : 'bg-purple-700 text-white self-end'
//               }`}
//               style={{ maxWidth: '75%' }} // Limit the width to make it more like a chat bubble
//             >
//               {message.text}
//             </div>
//           ))}
//         </div>

//         {/* Input Area */}
//         <div className="flex items-center border-t border-gray-700 pt-4 mb-16">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//             className="flex-1 bg-gray-800 text-white p-4 rounded-lg text-lg focus:outline-none"
//             style={{ height: '60px' }}  // Increase the height here
//             placeholder="Type your message..."
//           />
//           <button
//             onClick={handleSendMessage}
//             className="bg-purple-600 text-white ml-4 py-3 px-6 rounded-lg text-lg hover:bg-purple-700"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SocialEngineering;
