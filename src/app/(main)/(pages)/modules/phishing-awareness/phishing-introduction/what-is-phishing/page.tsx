// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { phishingQuestions } from '@/data/phishing'; 
// import { ChevronLeft } from 'lucide-react';

// const PhishingSimulationTraining: React.FC = () => {
//     const [quizStarted, setQuizStarted] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
//     const [score, setScore] = useState(0);
//     const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
//     const [quizCompleted, setQuizCompleted] = useState(false);
  
//     const currentQuestion = phishingQuestions[currentQuestionIndex];
  
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
//     if (currentQuestionIndex + 1 >= phishingQuestions.length) {
//       setQuizCompleted(true);
//     }
//   };

//   const isQuizFinished = currentQuestionIndex >= phishingQuestions.length;

//   // Handle "All of the above" option
//   const isAllOfTheAbove = (option: string) => option.toLowerCase() === 'all of the above';

//   return (
//     <div className="flex flex-col min-h-full bg-gray-100">
//       <main className="flex-1 p-6 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#212_100%)] text-black">
//         <Link href="/modules/phishing-awareness" passHref>
//           <button className="mb-4 p-2 rounded-lg bg-transparent flex items-center text-gray-400 hover:text-white transition">
//             <ChevronLeft/> 
//           Back
//         </button>
//         </Link>
//         <div className="flex flex-col items-center">
//           {!quizStarted ? (
//             <>
//               <h1 className="text-6xl md:text-8xl pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//                 Phishing Quiz
//               </h1>
//               <p className="text-xl md:text-2xl text-center text-neutral-400 mt-4">
//                 Test your knowledge about phishing with our interactive quiz.
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
//                     Your score: {score} / {phishingQuestions.length}
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
//                       Question {currentQuestionIndex + 1} of {phishingQuestions.length}
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

// export default PhishingSimulationTraining;


'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { Button } from '@/components/ui/button';
import { phishingQuestions } from '@/app/(main)/(pages)/modules/training/training-data/phishing'; 
import { ChevronLeft, GripVertical } from 'lucide-react';
import { Button } from '@/components/global/ui/button';

const PhishingSimulationTraining: React.FC = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [markers, setMarkers] = useState<{x: number, y: number}[]>([]);
    const [rankingOrder, setRankingOrder] = useState<number[]>([]);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const dragItem = useRef<any>(null);
    const dragOverItem = useRef<any>(null);
  
    const currentQuestion = phishingQuestions[currentQuestionIndex];
  
    useEffect(() => {
      if (currentQuestion && Array.isArray(currentQuestion.options)) {
        shuffleOptions();
        if (currentQuestion.type === 'ranking') {
          setRankingOrder(currentQuestion.options.map((_, index) => index));
        }
      }
      setMarkers([]);
      setSelectedOptions([]);
    }, [currentQuestionIndex]);
  
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
      if (currentQuestion.type === 'multiple') {
        setSelectedOptions(prev =>
          prev.includes(index)
            ? prev.filter(opt => opt !== index)
            : [...prev, index]
        );
      } else {
        setSelectedOptions([index]);
      }
    };

    const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (currentQuestion.type === 'image') {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setMarkers([...markers, { x, y }]);
      }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
      dragItem.current = index;
      setDraggedItem(index);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', index.toString());
      e.currentTarget.style.opacity = '0.5';
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, index: number) => {
      dragOverItem.current = index;
      e.currentTarget.style.transform = 'translateY(5px)';
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.currentTarget.style.transform = 'translateY(0)';
    };

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
      e.currentTarget.style.opacity = '1';
      e.currentTarget.style.transform = 'translateY(0)';
      setDraggedItem(null);
      const newRankingOrder = [...rankingOrder];
      const draggedItemContent = newRankingOrder[dragItem.current];
      newRankingOrder.splice(dragItem.current, 1);
      newRankingOrder.splice(dragOverItem.current, 0, draggedItemContent);
      setRankingOrder(newRankingOrder);
      dragItem.current = null;
      dragOverItem.current = null;
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const proceedToNextQuestion = () => {
      if (currentQuestion.type === 'multiple') {
        const correctAnswers = currentQuestion.multipleAnswers || [];
        if (
          correctAnswers.length === selectedOptions.length &&
          correctAnswers.every(opt => selectedOptions.includes(opt))
        ) {
          setScore(score + 1);
        }
      } else if (currentQuestion.type === 'image') {
        // Implement image question validation logic here
      } else if (currentQuestion.type === 'ranking') {
        if (JSON.stringify(rankingOrder) === JSON.stringify(currentQuestion.answer)) {
          setScore(score + 1);
        }
      } else {
        if (selectedOptions[0] === currentQuestion.answer) {
          setScore(score + 1);
        }
      }
      setSelectedOptions([]);
      setMarkers([]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (currentQuestionIndex + 1 >= phishingQuestions.length) {
        setQuizCompleted(true);
      }
    };

    const isQuizFinished = currentQuestionIndex >= phishingQuestions.length;
    const isAllOfTheAbove = (option: string) => option.toLowerCase() === 'all of the above';

    return (
      <div className="flex flex-col min-h-full bg-gray-100">
        <main className="flex-1 p-6 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#212_100%)] text-black">
          <Link href="/modules/phishing-awareness" passHref>
            <button className="mb-4 p-2 rounded-lg bg-transparent flex items-center text-gray-400 hover:text-white transition">
              <ChevronLeft/> 
              Back
            </button>
          </Link>
          <div className="flex flex-col items-center">
            {!quizStarted ? (
              <>
                <h1 className="text-6xl md:text-8xl pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Phishing Quiz
                </h1>
                <p className="text-xl md:text-2xl text-center text-neutral-400 mt-4">
                  Test your knowledge about phishing with our interactive quiz.
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
                      Your score: {score} / {phishingQuestions.length}
                    </p>
                  </div>
                ) : (
                  <div className={`flex ${currentQuestion.image ? 'flex-row' : 'flex-col items-center'} items-start justify-between w-full mt-8`}>
                    <div className={`${currentQuestion.image ? 'w-3/5' : 'w-full text-center'} mb-4`}>
                      {currentQuestion.image && (
                        <div 
                          className="relative cursor-pointer group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                          onClick={handleImageClick}
                        >
                          <Image
                            src={currentQuestion.image}
                            alt="Phishing Indicator"
                            width={600}
                            height={400}
                            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <span className="text-white text-lg font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-full">
                              Click to mark suspicious areas
                            </span>
                          </div>
                          {markers.map((marker, index) => (
                            <div
                              key={index}
                              className="absolute w-6 h-6 bg-red-500 rounded-full opacity-75 animate-pulse"
                              style={{ left: marker.x - 12, top: marker.y - 12 }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className={`${currentQuestion.image ? 'w-2/5' : 'w-full flex flex-col items-center'} px-4`}>
                      <p className="text-4xl text-center md:text-4xl w-full bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                        {currentQuestion.question}
                      </p>
                      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                        {currentQuestion.userStory}
                      </h2>
                      <p className="text-xl md:text-xl text-center text-neutral-400 mb-4">
                        Question {currentQuestionIndex + 1} of {phishingQuestions.length}
                      </p>
                      <div className="flex flex-col items-center w-full max-w-md mx-auto">
                        {currentQuestion.type === 'ranking' ? (
                          rankingOrder.map((optionIndex, index) => (
                            <div
                              key={optionIndex}
                              draggable
                              onDragStart={(e) => handleDragStart(e, index)}
                              onDragEnter={(e) => handleDragEnter(e, index)}
                              onDragLeave={handleDragLeave}
                              onDragEnd={handleDragEnd}
                              onDragOver={handleDragOver}
                              className="p-4 mb-4 text-lg w-full border-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-[#2F2F2F] cursor-move transition-all flex items-center justify-between gap-4 hover:scale-105 active:scale-95"
                            >
                              <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-200 md:text-center font-sans">
                                {currentQuestion.options[optionIndex]}
                              </span>
                              <GripVertical className="text-gray-500" />
                            </div>
                          ))
                        ) : (
                          currentQuestion.type !== 'image' && shuffledOptions
                            .filter(option => !isAllOfTheAbove(option))
                            .map((option, index) => (
                              <button
                                key={index}
                                className={`p-4 mb-4 text-lg w-full border-2 rounded-xl ${
                                  selectedOptions.includes(index)
                                    ? 'border-green-500 bg-green-700'
                                    : 'border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white'
                                } group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-800 duration-500 hover:scale-105 active:scale-95`}
                                onClick={() => toggleOption(index)}
                              >
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-200 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                                  {option}
                                </span>
                              </button>
                            ))
                        )}
                        {currentQuestion.type !== 'image' && currentQuestion.type !== 'ranking' && shuffledOptions.some(isAllOfTheAbove) && (
                          <button
                            key={shuffledOptions.length}
                            className={`w-full p-4 mb-2 text-lg rounded-lg ${
                              selectedOptions.includes(shuffledOptions.length)
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                            } transition hover:scale-105 active:scale-95`}
                            onClick={() => toggleOption(shuffledOptions.length)}
                          >
                            All of the above
                          </button>
                        )}
                        <button
                          onClick={proceedToNextQuestion}
                          disabled={
                            (currentQuestion.type === 'image' && markers.length === 0) ||
                            (currentQuestion.type !== 'image' && currentQuestion.type !== 'ranking' && selectedOptions.length === 0)
                          }
                          className="p-4 mt-4 text-lg w-full max-w-md border-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500 hover:scale-105 active:scale-95"
                          >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
                              Next Question →
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </main>
        </div>
      );
  };
  
  export default PhishingSimulationTraining;


//rodo graziai nuotraukas, galima clickint
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { phishingQuestions } from '@/data/phishing'; 
// import { ChevronLeft } from 'lucide-react';

// const PhishingSimulationTraining: React.FC = () => {
//     const [quizStarted, setQuizStarted] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
//     const [score, setScore] = useState(0);
//     const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
//     const [quizCompleted, setQuizCompleted] = useState(false);
//     const [markers, setMarkers] = useState<{x: number, y: number}[]>([]);
  
//     const currentQuestion = phishingQuestions[currentQuestionIndex];
  
//     useEffect(() => {
//       if (currentQuestion && Array.isArray(currentQuestion.options)) {
//         shuffleOptions();
//       }
//       setMarkers([]);
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

//     const toggleOption = (index: number) => {
//       if (currentQuestion.type === 'multiple') {
//         setSelectedOptions(prev =>
//           prev.includes(index)
//             ? prev.filter(opt => opt !== index)
//             : [...prev, index]
//         );
//       } else {
//         setSelectedOptions([index]);
//       }
//     };

//     const handleImageClick = (event: React.MouseEvent<HTMLDivElement>) => {
//       if (currentQuestion.type === 'image') {
//         const rect = event.currentTarget.getBoundingClientRect();
//         const x = event.clientX - rect.left;
//         const y = event.clientY - rect.top;
//         setMarkers([...markers, { x, y }]);
//       }
//     };

//     const proceedToNextQuestion = () => {
//       if (currentQuestion.type === 'multiple') {
//         const correctAnswers = currentQuestion.multipleAnswers || [];
//         if (
//           correctAnswers.length === selectedOptions.length &&
//           correctAnswers.every(opt => selectedOptions.includes(opt))
//         ) {
//           setScore(score + 1);
//         }
//       } else if (currentQuestion.type === 'image') {
//         // Implement image question validation logic here
//         // For example, check if markers are within correct areas
//       } else {
//         if (selectedOptions[0] === currentQuestion.answer) {
//           setScore(score + 1);
//         }
//       }
//       setSelectedOptions([]);
//       setMarkers([]);
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//       if (currentQuestionIndex + 1 >= phishingQuestions.length) {
//         setQuizCompleted(true);
//       }
//     };

//     const isQuizFinished = currentQuestionIndex >= phishingQuestions.length;
//     const isAllOfTheAbove = (option: string) => option.toLowerCase() === 'all of the above';

//     return (
//       <div className="flex flex-col min-h-full bg-gray-100">
//         <main className="flex-1 p-6 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#212_100%)] text-black">
//           <Link href="/modules/phishing-awareness" passHref>
//             <button className="mb-4 p-2 rounded-lg bg-transparent flex items-center text-gray-400 hover:text-white transition">
//               <ChevronLeft/> 
//               Back
//             </button>
//           </Link>
//           <div className="flex flex-col items-center">
//             {!quizStarted ? (
//               <>
//                 <h1 className="text-6xl md:text-8xl pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//                   Phishing Quiz
//                 </h1>
//                 <p className="text-xl md:text-2xl text-center text-neutral-400 mt-4">
//                   Test your knowledge about phishing with our interactive quiz.
//                 </p>
//                 <div className="flex justify-center gap-4 mt-8 mb-12">
//                   <Button
//                     size={'lg'}
//                     className="p-6 text-2xl w-full sm:w-fit border-t-2 rounded-xl bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                     onClick={() => setQuizStarted(true)}
//                   >
//                     <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                       Start Quiz
//                     </span>
//                   </Button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 {isQuizFinished ? (
//                   <div className="text-center">
//                     <h1 className="text-3xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//                       Quiz Completed
//                     </h1>
//                     <p className="text-xl md:text-2xl text-center text-neutral-400 mt-4">
//                       Your score: {score} / {phishingQuestions.length}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className={`flex ${currentQuestion.image ? 'flex-row' : 'flex-col items-center'} items-start justify-between w-full mt-8`}>
//                     <div className={`${currentQuestion.image ? 'w-3/5' : 'w-full text-center'} mb-4`}>
//                       {currentQuestion.image && (
//                         <div 
//                           className="relative cursor-pointer group overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
//                           onClick={handleImageClick}
//                         >
//                           <Image
//                             src={currentQuestion.image}
//                             alt="Phishing Indicator"
//                             width={600}
//                             height={400}
//                             className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
//                           />
//                           <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
//                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
//                             <span className="text-white text-lg font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-full">
//                               Click to mark suspicious areas
//                             </span>
//                           </div>
//                           {markers.map((marker, index) => (
//                             <div
//                               key={index}
//                               className="absolute w-6 h-6 bg-red-500 rounded-full opacity-75 animate-pulse"
//                               style={{ left: marker.x - 12, top: marker.y - 12 }}
//                             />
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                     <div className={`${currentQuestion.image ? 'w-2/5' : 'w-full flex flex-col items-center'} px-4`}>
//                       <p className="text-4xl text-center md:text-4xl w-full bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//                         {currentQuestion.question}
//                       </p>
//                       <h2 className="text-2xl md:text-3xl font-semibold mb-4">
//                         {currentQuestion.userStory}
//                       </h2>
//                       <p className="text-xl md:text-xl text-center text-neutral-400 mb-4">
//                         Question {currentQuestionIndex + 1} of {phishingQuestions.length}
//                       </p>
//                       <div className="flex flex-col items-center">
//                         {currentQuestion.type !== 'image' && shuffledOptions
//                           .filter(option => !isAllOfTheAbove(option))
//                           .map((option, index) => (
//                             <button
//                               key={index}
//                               className={`p-4 mb-4 text-lg w-full border-2 rounded-xl ${
//                                 selectedOptions.includes(index)
//                                   ? 'border-green-500 bg-green-700'
//                                   : 'border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white'
//                               } group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-800 duration-500`}
//                               onClick={() => toggleOption(index)}
//                             >
//                               <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-200 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                                 {option}
//                               </span>
//                             </button>
//                           ))}
//                         {currentQuestion.type !== 'image' && shuffledOptions.some(isAllOfTheAbove) && (
//                           <button
//                             key={shuffledOptions.length}
//                             className={`w-full p-4 mb-2 text-lg rounded-lg ${
//                               selectedOptions.includes(shuffledOptions.length)
//                                 ? 'bg-green-500 text-white'
//                                 : 'bg-gray-200 hover:bg-gray-300'
//                             } transition`}
//                             onClick={() => toggleOption(shuffledOptions.length)}
//                           >
//                             All of the above
//                           </button>
//                         )}
//                         <button
//                           onClick={proceedToNextQuestion}
//                           disabled={currentQuestion.type !== 'image' ? selectedOptions.length === 0 : markers.length === 0}
//                           className="p-4 mt-4 text-lg w-full border-2 rounded-xl border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center gap-4 hover:shadow-xl hover:shadow-neutral-500 duration-500"
//                         >
//                           <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500 md:text-center font-sans group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-black">
//                             Next Question →
//                           </span>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </main>
//       </div>
//     );
// };

// export default PhishingSimulationTraining;


// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { phishingQuestions } from '@/data/phishing'; 
// import { ChevronLeft } from 'lucide-react';

// const PhishingSimulationTraining: React.FC = () => {
//     const [quizStarted, setQuizStarted] = useState(false);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
//     const [score, setScore] = useState(0);
//     const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
//     const [quizCompleted, setQuizCompleted] = useState(false);
//     const [markers, setMarkers] = useState<{x: number, y: number}[]>([]);
  
//     const currentQuestion = phishingQuestions[currentQuestionIndex];
  
//     useEffect(() => {
//       if (currentQuestion && Array.isArray(currentQuestion.options)) {
//         shuffleOptions();
//       }
//       setMarkers([]);
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
//       setSelectedOptions(prev =>
//         prev.includes(index)
//           ? prev.filter(opt => opt !== index)
//           : [...prev, index]
//       );
//     } else {
//       setSelectedOptions([index]);
//     }
//   };

//   const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
//     if (currentQuestion.type === 'image') {
//       const rect = event.currentTarget.getBoundingClientRect();
//       const x = event.clientX - rect.left;
//       const y = event.clientY - rect.top;
//       setMarkers([...markers, { x, y }]);
//     }
//   };

//   const proceedToNextQuestion = () => {
//     if (currentQuestion.type === 'multiple') {
//       const correctAnswers = currentQuestion.multipleAnswers || [];
//       if (
//         correctAnswers.length === selectedOptions.length &&
//         correctAnswers.every(opt => selectedOptions.includes(opt))
//       ) {
//         setScore(score + 1);
//       }
//     } else if (currentQuestion.type === 'image') {
//       // Implement image question validation logic here
//       // For example, check if markers are within correct areas
//     } else {
//       if (selectedOptions[0] === currentQuestion.answer) {
//         setScore(score + 1);
//       }
//     }
//     setSelectedOptions([]);
//     setMarkers([]);
//     setCurrentQuestionIndex(currentQuestionIndex + 1);
//     if (currentQuestionIndex + 1 >= phishingQuestions.length) {
//       setQuizCompleted(true);
//     }
//   };

//   const isQuizFinished = currentQuestionIndex >= phishingQuestions.length;
//   const isAllOfTheAbove = (option: string) => option.toLowerCase() === 'all of the above';

//   return (
//     <div className="flex flex-col min-h-full bg-gray-100">
//       <main className="flex-1 p-6 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#212_100%)] text-black">
//         <Link href="/modules/phishing-awareness" passHref>
//           <button className="mb-4 p-2 rounded-lg bg-transparent flex items-center text-gray-400 hover:text-white transition">
//             <ChevronLeft/> 
//             Back
//           </button>
//         </Link>
//         <div className="flex flex-col items-center">
//           {!quizStarted ? (
//             <>
//               <h1 className="text-6xl md:text-8xl pb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//                 Phishing Quiz
//               </h1>
//               <p className="text-xl md:text-2xl text-center text-neutral-400 mt-4">
//                 Test your knowledge about phishing with our interactive quiz.
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
//                     Your score: {score} / {phishingQuestions.length}
//                   </p>
//                 </div>
//               ) : (
//                 <div className={`flex ${currentQuestion.image ? 'flex-row' : 'flex-col items-center'} items-start justify-between w-full mt-8`}>
//                   <div className={`${currentQuestion.image ? 'w-3/5' : 'w-full text-center'} mb-4`}>
//                     {currentQuestion.image && (
//                       <div className="relative">
//                         <Image
//                           src={currentQuestion.image}
//                           alt="Phishing Indicator"
//                           width={600}
//                           height={400}
//                           className="mb-4 cursor-pointer"
//                           onClick={handleImageClick}
//                         />
//                         {markers.map((marker, index) => (
//                           <div
//                             key={index}
//                             className="absolute w-6 h-6 bg-red-500 rounded-full opacity-50"
//                             style={{ left: marker.x - 12, top: marker.y - 12 }}
//                           />
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                   <div className={`${currentQuestion.image ? 'w-2/5' : 'w-full flex flex-col items-center'} px-4`}>
//                     <p className="text-4xl text-center md:text-4xl w-full bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
//                       {currentQuestion.question}
//                     </p>
//                     <h2 className="text-2xl md:text-3xl font-semibold mb-4">
//                       {currentQuestion.userStory}
//                     </h2>
//                     <p className="text-xl md:text-xl text-center text-neutral-400 mb-4">
//                       Question {currentQuestionIndex + 1} of {phishingQuestions.length}
//                     </p>
//                     <div className="flex flex-col items-center">
//                       {currentQuestion.type !== 'image' && shuffledOptions
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
//                       {currentQuestion.type !== 'image' && shuffledOptions.some(isAllOfTheAbove) && (
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
//                         disabled={currentQuestion.type !== 'image' ? selectedOptions.length === 0 : markers.length === 0}
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

// export default PhishingSimulationTraining;