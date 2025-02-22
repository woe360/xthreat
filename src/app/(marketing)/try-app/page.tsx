// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { questions } from '@/data/questions';

// const TryQuiz = () => {
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);
//   const [score, setScore] = useState(0);
//   const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
//   const [email, setEmail] = useState('');
//   const [emailSubmitted, setEmailSubmitted] = useState(false);

//   const currentQuestion = questions[currentQuestionIndex];

//   useEffect(() => {
//     if (currentQuestion) {
//       shuffleOptions();
//     }
//   }, [currentQuestionIndex]);

//   const shuffleOptions = () => {
//     const options = [...currentQuestion.options];
//     for (let i = options.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [options[i], options[j]] = [options[j], options[i]];
//     }
//     setShuffledOptions(options);
//   };

//   const handleOptionClick = (index: number) => {
//     setSelectedOption(index);
//   };

//   const handleNextQuestion = () => {
//     if (shuffledOptions[selectedOption!] === currentQuestion.options[currentQuestion.answer]) {
//       setScore(score + 1);
//     }
//     setSelectedOption(null);
//     setCurrentQuestionIndex(currentQuestionIndex + 1);
//   };

//   const handleEmailSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Simulate email submission
//     console.log(`Email submitted: ${email}`);
//     setEmailSubmitted(true);
//   };

//   const isQuizFinished = currentQuestionIndex >= questions.length;

//   return (
//     <main className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center antialiased">
//       <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
//       <Link href="/" passHref>
//         <button className="absolute top-10 left-10 p-2 rounded-lg bg-[#1F1F1F] text-white hover:bg-white hover:text-black transition">
//           ‹ Home
//         </button>
//       </Link>
//       <div className="flex flex-col items-center relative z-50">
//         {!quizStarted ? (
//           <>
//             <h1 className="text-6xl md:text-8xl pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//               Try Our Quiz
//             </h1>
//             <p className="text-xl md:text-2xl text-center text-neutral-400 mt-4">
//               Test your cybersecurity awareness with our interactive quiz.
//             </p>
//             <div className="flex justify-center gap-4 mt-8 mb-12">
//               <Button
//                 size={'lg'}
//                 className="p-6 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                 onClick={() => setQuizStarted(true)}
//               >
//                 <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                   Start Quiz →
//                 </span>
//               </Button>
//             </div>
//           </>
//         ) : (
//           <>
//             {isQuizFinished ? (
//               <div className="text-center">
//                 <h1 className="text-3xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//                   Quiz Completed
//                 </h1>
//                 <p className="text-xl md:text-2xl text-center text-neutral-400 mt-4">
//                   Your score: {score} / {questions.length}
//                 </p>
//                 {!emailSubmitted ? (
//                   <form onSubmit={handleEmailSubmit} className="mt-8 flex flex-col items-center">
//                     <label className="block text-xl text-neutral-400 mb-2">
//                       Enter your email to receive feedback:
//                     </label>
//                     <input
//                       type="email"
//                       className="p-4 rounded-lg bg-[#1F1F1F] text-white border border-[#4D4D4D] w-full sm:w-96"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                     <button
//                       type="submit"
//                       className="mt-4 p-4 rounded-lg bg-[#4D4D4D] text-white hover:bg-white hover:text-black transition w-full sm:w-96"
//                     >
//                       Submit
//                     </button>
//                   </form>
//                 ) : (
//                   <p className="text-xl text-neutral-400 mt-4">
//                     Thank you! We will send your feedback to {email}.
//                   </p>
//                 )}
//               </div>
//             ) : (
//               <div className="text-center flex flex-col items-center justify-center">
//                 <h1 className="text-3xl md:text-3xl w-full bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//                   {currentQuestion.userStory}
//                 </h1>
//                 <p className="text-2xl md:text-2xl text-center text-neutral-400 mt-4">
//                   {currentQuestion.question}
//                 </p>
//                 <p className="text-xl text-neutral-400 mt-2">
//                   Question {currentQuestionIndex + 1} of {questions.length}
//                 </p>
//                 <div className="flex flex-col mt-8 mb-12 items-center w-full">
//                   {shuffledOptions.map((option, index) => (
//                     <button
//                       key={index}
//                       className={`p-4 mb-4 text-lg w-full sm:w-96 border-2 rounded-xl ${
//                         selectedOption === index
//                           ? "border-green-500 bg-green-700"
//                           : "border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white"
//                       } group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500`}
//                       onClick={() => handleOptionClick(index)}
//                     >
//                       <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-200 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                         {option}
//                       </span>
//                     </button>
//                   ))}
//                   <button
//                     onClick={handleNextQuestion}
//                     disabled={selectedOption === null}
//                     className="p-4 mt-4 text-lg w-full sm:w-96 border-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                   >
//                     <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                       Next Question →
//                     </span>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </main>
//   );
// };

// export default TryQuiz;


'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/button';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Define the questions directly in the file
const questions = [
  {
    userStory: "You receive an urgent email from your bank",
    question: "The email asks you to click a link to verify your account due to suspicious activity. What should you do?",
    options: [
      "Click the link immediately to protect your account",
      "Open your browser and log into your bank's website directly",
      "Reply to the email asking for more information",
      "Forward the email to your friends to warn them"
    ],
    answer: 1 // Index of correct answer
  },
  {
    userStory: "You're working from a coffee shop",
    question: "Which network should you use for accessing work emails?",
    options: [
      "The free public WiFi",
      "Your neighbor's WiFi",
      "Your mobile hotspot or VPN",
      "Any available WiFi network"
    ],
    answer: 2
  },
  {
    userStory: "Creating a new online account",
    question: "What's the best approach for creating a secure password?",
    options: [
      "Use your birthday and name",
      "Use a long phrase with numbers, symbols, and mixed case",
      "Use the same password as other accounts",
      "Use your phone number"
    ],
    answer: 1
  },
  {
    userStory: "You receive a call from 'Tech Support'",
    question: "They say your computer has a virus and need remote access. What's your response?",
    options: [
      "Give them access immediately",
      "Install their suggested software",
      "Provide your credit card details",
      "Hang up and contact official support channels"
    ],
    answer: 3
  },
  {
    userStory: "Your coworker needs your login credentials",
    question: "They're working on an urgent project while you're away. What do you do?",
    options: [
      "Share your credentials via email",
      "Text them your password",
      "Decline and suggest they contact IT",
      "Share credentials through a chat app"
    ],
    answer: 2
  },
  {
    userStory: "You find a USB drive in the parking lot",
    question: "What's the safest action to take with this drive?",
    options: [
      "Plug it in to see who owns it",
      "Turn it in to security/IT without plugging it in",
      "Give it to your supervisor",
      "Keep it for yourself"
    ],
    answer: 1
  },
  {
    userStory: "Working on sensitive documents",
    question: "What's the best practice when stepping away from your computer?",
    options: [
      "Leave it unlocked for convenience",
      "Lock your screen or log out",
      "Turn off the monitor only",
      "Close the document only"
    ],
    answer: 1
  },
  {
    userStory: "You receive a strange social media friend request",
    question: "The profile claims to be from your company's CEO. What should you do?",
    options: [
      "Accept it immediately",
      "Message them first",
      "Verify through official channels",
      "Share it with colleagues"
    ],
    answer: 2
  },
  {
    userStory: "Downloading new software for work",
    question: "What's the safest approach to install new software?",
    options: [
      "Download from any website that has it",
      "Use official sources and verify with IT",
      "Ask a colleague for their copy",
      "Download the fastest version available"
    ],
    answer: 1
  },
  {
    userStory: "Sharing company information",
    question: "A vendor requests internal documentation via email. What's the proper response?",
    options: [
      "Send it right away to be helpful",
      "Share through personal email",
      "Verify the request through established channels",
      "Upload to a public cloud service"
    ],
    answer: 2
  }
];

const TryApp = () => {
  const router = useRouter();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion) {
      shuffleOptions();
    }
  }, [currentQuestionIndex]);

  const shuffleOptions = () => {
    const options = [...currentQuestion.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
  };

  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (shuffledOptions[selectedOption!] === currentQuestion.options[currentQuestion.answer]) {
      setScore(score + 1);
    }
    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Email submitted: ${email}`);
    setEmailSubmitted(true);
  };

  const isQuizFinished = currentQuestionIndex >= questions.length;

  return (
    <main className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center antialiased">
      <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
      <button 
              onClick={() => router.back()}>
              <button className="absolute flex text-sm top-10 left-10 p-2 rounded-lg bg-[#1F1F1F] text-white hover:bg-neutral-800 transition">
                <ChevronLeft className="mr-1 mt-[3px]" size={14} color="white"/> Back
              </button>
            </button>
      <div className="flex flex-col items-center relative z-50">
        {!quizStarted ? (
          <>
            <h1 className="text-4xl md:text-6xl pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
              Try our solutions with our quiz
            </h1>
            <p className="text-xl md:text-2xl text-center text-neutral-400 mt-4">
              Test your cybersecurity awareness with our interactive quiz.
            </p>
            <div className="flex justify-center gap-4 mt-8 mb-12">
              <Button
                size={'lg'}
                className="p-6 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                onClick={() => setQuizStarted(true)}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                  Start Quiz →
                </span>
              </Button>
            </div>
          </>
        ) : (
          <>
            {isQuizFinished ? (
              <div className="text-center">
                <h1 className="text-3xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Quiz Completed
                </h1>
                <p className="text-xl md:text-2xl text-center text-neutral-400 mt-4">
                  Your score: {score} / {questions.length}
                </p>
                {!emailSubmitted ? (
                  <form onSubmit={handleEmailSubmit} className="mt-8 flex flex-col items-center">
                    <label className="block text-xl text-neutral-400 mb-2">
                      Enter your email to receive feedback:
                    </label>
                    <input
                      type="email"
                      className="p-4 rounded-lg bg-[#1F1F1F] text-white border border-[#4D4D4D] w-full sm:w-96"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="mt-4 p-4 rounded-lg bg-[#4D4D4D] text-white hover:bg-white hover:text-black transition w-full sm:w-96"
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <p className="text-xl text-neutral-400 mt-4">
                    Thank you! We will send your feedback to {email}.
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center flex flex-col items-center justify-center">
                <h1 className="text-3xl md:text-3xl w-full bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  {currentQuestion.userStory}
                </h1>
                <p className="text-2xl md:text-2xl text-center text-neutral-400 mt-4">
                  {currentQuestion.question}
                </p>
                <p className="text-xl text-neutral-400 mt-2">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <div className="flex flex-col mt-8 mb-12 items-center w-full">
                  {shuffledOptions.map((option, index) => (
                    <button
                      key={index}
                      className={`p-4 mb-4 text-lg w-full sm:w-96 border-2 rounded-xl ${
                        selectedOption === index
                          ? "border-green-500 bg-green-700"
                          : "border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white"
                      } group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500`}
                      onClick={() => handleOptionClick(index)}
                    >
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-200 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                        {option}
                      </span>
                    </button>
                  ))}
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedOption === null}
                    className="p-4 mt-4 text-lg w-full sm:w-96 border-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                      Next Question →
                    </span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default TryApp;