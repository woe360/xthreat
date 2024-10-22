// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { questions } from '@/app/(main)/(pages)/modules/training/training-data/questions';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// const TryQuiz = () => {
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);
//   const [score, setScore] = useState(0);
//   const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
//   const [email, setEmail] = useState('');
//   const [submissionStatus, setSubmissionStatus] = useState('');

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
//     console.log('Email submission started:', email); // Debugging log
    
//     // Simulate submission process
//     setSubmissionStatus('Submitting...');
    
//     // Simulate API call delay
//     setTimeout(() => {
//       setSubmissionStatus(`Email submitted successfully: ${email}`);
//       console.log('Email submitted successfully:', email); // Debugging log
//     }, 1500);
//   };

//   const isQuizFinished = currentQuestionIndex >= questions.length;

//   const router = useRouter()

//   return (
//     <main className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center antialiased">
//       <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
//       <Link href="/" passHref>
//         <button onClick={() => router.back()} className="absolute top-10 flex flex-row left-10 p-2 rounded-lg text-gray-400 hover:text-white transition">
//         <ChevronLeft/> Back
//         </button>
//       </Link>
//       <div className="flex flex-col items-center relative z-50 mt-8">
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
//                 className="px-4 py-2 mb-8 md:mb-10 text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#dad9d9] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                 onClick={() => setQuizStarted(true)}
//               >
//                 <span className="bg-clip-text inline-flex text-transparent bg-gradient-to-r from-gray-600 to-gray-900 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                   Start <ChevronRight className="mt-1 ml-1" color="black"/>
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
                
//                 {/* Immediate feedback area */}
//                 {submissionStatus && (
//                   <div className="mt-4 p-4 bg-blue-500 text-white rounded-lg">
//                     {submissionStatus}
//                   </div>
//                 )}
                
//                 <form onSubmit={handleEmailSubmit} className="mt-8 flex flex-col outline-none items-center">
//                   <label className="block text-xl text-neutral-400 mb-2">
//                     Enter your email to receive feedback:
//                   </label>
//                   <input
//                     type="email"
//                     className="p-4 rounded-lg bg-[#1F1F1F] text-white border border-[#4D4D4D] w-full sm:w-96"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                   <button
//                     type="submit"
//                     className="mt-4 p-4 rounded-lg bg-[#4D4D4D] text-white hover:bg-white hover:text-black transition w-full sm:w-96"
//                   >
//                     Submit
//                   </button>
//                 </form>
//               </div>
//             ) : (
//               <div className="text-center flex flex-col items-center justify-center">
//                 <h1 className="text-4xl md:text-4xl w-[70%] bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//                   {currentQuestion.userStory}
//                 </h1>
//                 <p className="text-2xl md:text-2xl font-normla text-center text-neutral-400 mt-4">
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
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { questions } from '@/app/(main)/(pages)/modules/training/training-data/questions';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TryQuiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

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
    setSubmissionStatus('Submitting...');
    
    setTimeout(() => {
      setSubmissionStatus(`Email submitted successfully: ${email}`);
    }, 1500);
  };

  const isQuizFinished = currentQuestionIndex >= questions.length;
  const router = useRouter();

  return (
    <main className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center antialiased">
      <div className="absolute inset-0 h-full w-full items-center px-3 py-16 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
      
      <Link href="/" passHref>
        <button onClick={() => router.back()} className="absolute top-4 left-4 md:top-10 md:left-10 p-2 rounded-lg text-gray-400 hover:text-white transition flex items-center gap-1">
          <ChevronLeft size={20}/> 
          <span className="text-sm md:text-base">Back</span>
        </button>
      </Link>

      <div className="flex flex-col items-center relative z-50 w-full px-4 md:px-8">
        {!quizStarted ? (
          <>
            <h1 className="text-4xl sm:text-6xl md:text-8xl text-center pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
              Try Our Quiz
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-center text-neutral-400 mt-4 max-w-2xl">
              Test your cybersecurity awareness with our interactive quiz.
            </p>
            <div className="flex justify-center mt-8 mb-12 max-w-md">
              <Button
                size={'lg'}
                className="px-6 py-2 sm:px-4 sm:py-2 mb-8 md:mb-10 text-lg sm:text-2xl w-full sm:w-fit border-t-2 rounded-xl border-[#4D4D4D] bg-[#dad9d9] hover:bg-white group transition-all flex items-center justify-center gap-2 sm:gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                onClick={() => setQuizStarted(true)}
              >
                <span className="bg-clip-text inline-flex text-transparent bg-gradient-to-r from-gray-600 to-gray-900 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                  Start <ChevronRight className="mt-1 sm:mt-1 ml-0.5 sm:ml-1 w-5 h-5 sm:w-6 sm:h-6" color="black"/>
                </span>
              </Button>
            </div>
          </>
        ) : (
          <>
            {isQuizFinished ? (
              <div className="text-center w-full max-w-md px-4">
                <h1 className="text-3xl sm:text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Quiz Completed
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-center text-neutral-400 mt-4">
                  Your score: {score} / {questions.length}
                </p>
                
                {submissionStatus && (
                  <div className="mt-4 p-3 bg-blue-500 text-white rounded-lg text-sm sm:text-base">
                    {submissionStatus}
                  </div>
                )}
                
                <form onSubmit={handleEmailSubmit} className="mt-6 flex flex-col outline-none items-center">
                  <label className="block text-base sm:text-lg text-neutral-400 mb-2">
                    Enter your email to receive feedback:
                  </label>
                  <input
                    type="email"
                    className="p-3 rounded-lg bg-[#1F1F1F] text-white border border-[#4D4D4D] w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="mt-4 p-3 rounded-lg bg-[#4D4D4D] text-white hover:bg-white hover:text-black transition w-full"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center flex flex-col items-center justify-center w-full max-w-2xl px-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold leading-tight">
                  {currentQuestion.userStory}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl font-normal text-center text-neutral-400 mt-4">
                  {currentQuestion.question}
                </p>
                <p className="text-base sm:text-lg text-neutral-400 mt-2">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <div className="flex flex-col mt-6 mb-8 items-center w-full">
                  {shuffledOptions.map((option, index) => (
                    <button
                      key={index}
                      className={`p-3 mb-3 text-base sm:text-lg w-full border-2 rounded-xl ${
                        selectedOption === index
                          ? "border-green-500 bg-green-700"
                          : "border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white"
                      } group transition-all flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-neutral-500 duration-500`}
                      onClick={() => handleOptionClick(index)}
                    >
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-200 text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                        {option}
                      </span>
                    </button>
                  ))}
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedOption === null}
                    className="p-3 mt-3 text-base sm:text-lg w-full border-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500 text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
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

export default TryQuiz;



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



