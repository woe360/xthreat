// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button'; // Adjust this path according to your file structure
// import { securityAwareness } from '@/data/SecurityAwareness'; // Update this path if necessary

// const SecurityAwareness: React.FC = () => {
//     const [quizStarted, setQuizStarted] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
//     const [score, setScore] = useState(0);
//     const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
//     const [quizCompleted, setQuizCompleted] = useState(false);
  
//     const currentQuestion = securityAwareness[currentQuestionIndex];
  
//     useEffect(() => {
//       if (currentQuestion && Array.isArray(currentQuestion.options)) {
//         shuffleOptions();
//       }
//     }, [currentQuestionIndex]);
  
//     const shuffleOptions = () => {
//       if (Array.isArray(currentQuestion?.options)) {
//         const options = [...currentQuestion.options];
//         for (let i = options.length - 1; i > 0; i--) {
//           const j = Math.floor(Math.random() * (i + 1));
//           [options[i], options[j]] = [options[j], options[i]];
//         }
//         setShuffledOptions(options);
//       } else {
//         console.error('Options is not an array or currentQuestion is undefined');
//         setShuffledOptions([]);
//       }
//     };

//   const toggleOption = (index: number) => {
//     if (currentQuestion.type === 'multiple') {
//       // Toggle option selection for multiple-answer questions
//       setSelectedOptions(prev =>
//         prev.includes(index)
//           ? prev.filter(opt => opt !== index)
//           : [...prev, index]
//       );
//     } else {
//       // Single-answer question, only one option can be selected
//       setSelectedOptions([index]);
//     }
//   };

//   const proceedToNextQuestion = () => {
//     if (currentQuestion.type === 'multiple') {
//       // Validate multiple-answer questions
//       const correctAnswers = currentQuestion.multipleAnswers || [];
//       if (
//         correctAnswers.length === selectedOptions.length &&
//         correctAnswers.every(opt => selectedOptions.includes(opt))
//       ) {
//         setScore(score + 1);
//       }
//     } else {
//       // Validate single-answer questions
//       if (selectedOptions[0] === currentQuestion.answer) {
//         setScore(score + 1);
//       }
//     }
//     setSelectedOptions([]);
//     setCurrentQuestionIndex(currentQuestionIndex + 1);
//     if (currentQuestionIndex + 1 >= securityAwareness.length) {
//       setQuizCompleted(true);
//     }
//   };

//   const isQuizFinished = currentQuestionIndex >= securityAwareness.length;

//   // Handle "All of the above" option
//   const isAllOfTheAbove = (option: string) => option.toLowerCase() === 'all of the above';

//   return (
//     <div className="flex flex-col min-h-full bg-gray-100">
//       <main className="flex-1 p-6 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#212_100%)] text-black">
//         <Link href="/lessons" passHref>
//           <button className="mb-4 p-2 rounded-lg bg-[#1F1F1F] text-white hover:bg-white hover:text-black transition">
//             ‹ Lessons
//           </button>
//         </Link>
//         <div className="flex flex-col items-center">
//           {!quizStarted ? (
//             <>
//               <h1 className="text-6xl md:text-8xl pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//               Security Awareness Quiz
//               </h1>
//               <p className="text-xl md:text-2xl text-center text-neutral-400 mt-4">
//                 Test your knowledge about security awareness with our interactive quiz.
//               </p>
//               <div className="flex justify-center gap-4 mt-8 mb-12">
//                 <Button
//                   size={'lg'}
//                   className="p-6 text-2xl w-full sm:w-fit border-t-2 rounded-xl bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                   onClick={() => setQuizStarted(true)}
//                 >
//                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                     Start Quiz
//                   </span>
//                 </Button>
//               </div>
//             </>
//           ) : (
//             <>
//               {isQuizFinished ? (
//                 <div className="text-center">
//                   <h1 className="text-3xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//                     Quiz Completed
//                   </h1>
//                   <p className="text-xl md:text-2xl text-center text-neutral-400 mt-4">
//                     Your score: {score} / {securityAwareness.length}
//                   </p>
//                 </div>
//               ) : (
//                 <div className={`flex ${currentQuestion.image ? 'flex-row' : 'flex-col items-center'} items-start justify-between w-full mt-8`}>
//                   <div className={`${currentQuestion.image ? 'w-3/5' : 'w-full text-center'} mb-4`}>
//                     {currentQuestion.image && (
//                       <Image
//                         src={currentQuestion.image}
//                         alt="Phishing Indicator"
//                         layout="responsive"
//                         width={3}
//                         height={2}
//                         className="mb-4"
//                       />
//                     )}
//                     {/* <p className="text-4xl md:text-4xl w-full bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold mb-4">
//                       {currentQuestion.question}
//                     </p> */}
//                   </div>
//                   <div className={`${currentQuestion.image ? 'w-2/5' : 'w-full flex flex-col items-center'} px-4`}>
//                   <p className="text-4xl text-center md:text-4xl w-full bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//                       {currentQuestion.question}
//                     </p>
//                     <h2 className="text-2xl md:text-3xl font-semibold mb-4">
//                       {currentQuestion.userStory}
//                     </h2>
//                     <p className="text-xl md:text-xl text-center text-neutral-400 mb-4">
//                       Question {currentQuestionIndex + 1} of {securityAwareness.length}
//                     </p>
//                     <div className="flex flex-col items-center">
//                       {shuffledOptions
//                         .filter(option => !isAllOfTheAbove(option))
//                         .map((option, index) => (
//                           <button
//                             key={index}
//                             className={`p-4 mb-4 text-lg w-full border-2 rounded-xl ${
//                               selectedOptions.includes(index)
//                                 ? 'border-green-500 bg-green-700'
//                                 : 'border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white'
//                             } group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-800 duration-500`}
//                             onClick={() => toggleOption(index)}
//                           >
//                             <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-200 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                               {option}
//                             </span>
//                           </button>
//                         ))}
//                       {shuffledOptions.some(isAllOfTheAbove) && (
//                         <button
//                           key={shuffledOptions.length}
//                           className={`w-full p-4 mb-2 text-lg rounded-lg ${
//                             selectedOptions.includes(shuffledOptions.length)
//                               ? 'bg-green-500 text-white'
//                               : 'bg-gray-200 hover:bg-gray-300'
//                           } transition`}
//                           onClick={() => toggleOption(shuffledOptions.length)}
//                         >
//                           All of the above
//                         </button>
//                       )}
//                       <button
//                         onClick={proceedToNextQuestion}
//                         disabled={selectedOptions.length === 0}
//                         className="p-4 mt-4 text-lg w-full border-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                       >
//                         <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                           Next Question →
//                         </span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SecurityAwareness;


'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/ui/button';
import { securityAwareness } from '@/app/(main)/(pages)/modules/training/training-data/securityAwareness'; 
import { ChevronLeft } from 'lucide-react';

const SecurityAwareness: React.FC = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentActivity = securityAwareness[currentActivityIndex];
  const currentQuestion = currentActivity?.scenarios?.[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestion && Array.isArray(currentQuestion.options)) {
      shuffleOptions();
    }
  }, [currentActivityIndex, currentQuestionIndex]);

  const shuffleOptions = () => {
    if (Array.isArray(currentQuestion?.options)) {
      const options = [...currentQuestion.options];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      setShuffledOptions(options);
    } else {
      console.error('Options is not an array or currentQuestion is undefined');
      setShuffledOptions([]);
    }
  };

  const toggleOption = (index: number) => {
    if (currentActivity.type === 'phishing') {
      setSelectedOptions([index]);
    } else if (currentActivity.type === 'escapeRoom') {
      setSelectedOptions(prev =>
        prev.includes(index)
          ? prev.filter(opt => opt !== index)
          : [...prev, index]
      );
    }
  };

  const proceedToNextActivity = () => {
    if (currentActivity.type === 'phishing' || currentActivity.type === 'escapeRoom') {
      if (selectedOptions[0] === currentActivity.scenarios[currentQuestionIndex].correctOption) {
        setScore(score + 1);
      }
      setSelectedOptions([]);
      setCurrentActivityIndex(currentActivityIndex + 1);
      if (currentActivityIndex + 1 >= securityAwareness.length) {
        setQuizCompleted(true);
      }
    }
  };

  const isQuizFinished = currentActivityIndex >= securityAwareness.length;

  const isAllOfTheAbove = (option: string) => option.toLowerCase() === 'all of the above';

  const renderActivityContent = () => {
    switch (currentActivity.type) {
      case 'phishing':
      case 'escapeRoom':
        return (
          <div className={`flex ${currentActivity.image ? 'flex-row' : 'flex-col items-center'} items-start justify-between w-full mt-8`}>
            <div className={`${currentActivity.image ? 'w-3/5' : 'w-full text-center'} mb-4`}>
              {currentActivity.image && (
                <Image
                  src={currentActivity.image}
                  alt="Security Indicator"
                  layout="responsive"
                  width={3}
                  height={2}
                  className="mb-4"
                />
              )}
            </div>
            <div className={`${currentActivity.image ? 'w-2/5' : 'w-full flex flex-col items-center'} px-4`}>
              <p className="text-4xl text-center md:text-4xl w-full bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                {currentActivity.title}
              </p>
              <p className="text-2xl md:text-3xl font-semibold mb-4">
                {currentActivity.description}
              </p>
              <p className="text-xl md:text-xl text-center text-neutral-400 mb-4">
                Question {currentActivityIndex + 1} of {securityAwareness.length}
              </p>
              <div className="flex flex-col items-center">
                {shuffledOptions
                  .filter(option => !isAllOfTheAbove(option))
                  .map((option, index) => (
                    <button
                      key={index}
                      className={`p-4 mb-4 text-lg w-full border-2 rounded-xl ${
                        selectedOptions.includes(index)
                          ? 'border-green-500 bg-green-700'
                          : 'border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white'
                      } group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-800 duration-500`}
                      onClick={() => toggleOption(index)}
                    >
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-200 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                        {option}
                      </span>
                    </button>
                  ))}
                {shuffledOptions.some(isAllOfTheAbove) && (
                  <button
                    key={shuffledOptions.length}
                    className={`w-full p-4 mb-2 text-lg rounded-lg ${
                      selectedOptions.includes(shuffledOptions.length)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    } transition`}
                    onClick={() => toggleOption(shuffledOptions.length)}
                  >
                    All of the above
                  </button>
                )}
                <button
                  onClick={proceedToNextActivity}
                  disabled={selectedOptions.length === 0}
                  className="p-4 mt-4 text-lg w-full border-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                    Next →
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      case 'rolePlaying':
        // Render role-playing scenario content
        break;
      case 'threatDetection':
        // Render threat detection simulation content
        break;
      case 'passwordStrength':
        // Render password strength tester content
        break;
      case 'socialEngineering':
        // Render social engineering simulation content
        break;
      case 'dataPrivacy':
        // Render data privacy challenge content
        break;
      case 'virtualWorkshop':
        // Render virtual workshop content
        break;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-gray-100">
      <main className="flex-1 p-6 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#212_100%)] text-black">
        <Link href="/modules" passHref>
          <button className="mb-4 p-2 rounded-lg bg-transparent flex items-center text-gray-400 hover:text-white transition">
            <ChevronLeft/> 
          Modules
        </button>
        </Link>
        <div className="flex flex-col items-center">
          {!quizStarted ? (
            <>
              <h1 className="text-6xl md:text-8xl pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                Security Awareness Quiz
              </h1>
              <p className="text-xl md:text-2xl text-center text-neutral-400 mt-4">
                Test your knowledge about security awareness with our interactive quiz.
              </p>
              <div className="flex justify-center gap-4 mt-8 mb-12">
                <Button
                  size={'lg'}
                  className="p-6 text-2xl w-full sm:w-fit border-t-2 rounded-xl bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
                  onClick={() => setQuizStarted(true)}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                    Start Quiz
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
                    Your score: {score} / {securityAwareness.length}
                  </p>
                </div>
              ) : (
                renderActivityContent()
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SecurityAwareness;
