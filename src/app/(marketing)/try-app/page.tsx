'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from "@/app/(marketing)/navigation/navbar";
import Footer from "@/app/(marketing)/navigation/footer";

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
    <main className="relative">
      <div className="absolute inset-0 min-h-screen w-full bg-[#0b0b0b] z-[-1]"></div>
      <div className="absolute inset-0 min-h-screen w-full [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)] z-[-1]"></div>
      {/* <Navbar /> */}
      
      <button 
        onClick={() => router.back()}
        className="absolute top-8 left-8 inline-flex items-center text-sm px-4 py-2 border border-gray-800/40 rounded-full text-neutral-400 hover:text-white hover:border-gray-700 transition z-10"
      >
        <ChevronLeft size={16} className="mr-1" /> Back
      </button>
      
      <section className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-3xl w-full mx-auto">
          <div className="w-full">
            {!quizStarted ? (
              <div className="text-center">
                <h1 className="text-5xl sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 font-normal mb-6">
                  Security Quiz
                </h1>
                <p className="text-lg text-neutral-400 max-w-xl mx-auto mb-12">
                  Test your cybersecurity awareness with our interactive quiz and discover how our solutions can help protect your organization.
                </p>
                <button
                  onClick={() => setQuizStarted(true)}
                  className="inline-flex items-center px-7 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors"
                >
                  Start Quiz <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            ) : (
              <>
                {isQuizFinished ? (
                  <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 font-normal mb-6">
                      Quiz Completed
                    </h1>
                    
                    <div className="relative w-full max-w-md mx-auto mb-12 py-8">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[180px] font-light text-white/5">{score}</span>
                      </div>
                      <div className="relative z-10 text-center">
                        <div className="text-4xl font-light text-white mb-2">{score}/{questions.length}</div>
                        <p className="text-neutral-400">
                          Your score demonstrates {score > 7 ? 'strong' : score > 5 ? 'good' : 'basic'} cybersecurity awareness.
                        </p>
                      </div>
                    </div>
                    
                    {!emailSubmitted ? (
                      <div className="border-t border-gray-800/40 pt-8 mt-8 max-w-md mx-auto">
                        <h2 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 font-normal mb-4">
                          Get Detailed Results
                        </h2>
                        <p className="text-neutral-400 mb-6">
                          Enter your email to receive a detailed analysis and security recommendations.
                        </p>
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                          <input
                            type="email"
                            className="w-full p-3 bg-transparent border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-white"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <button
                            type="submit"
                            className="w-full py-3 border border-gray-800 rounded-lg text-white hover:bg-white/5 transition"
                          >
                            Send Results
                          </button>
                        </form>
                      </div>
                    ) : (
                      <div className="border-t border-gray-800/40 pt-8 mt-8 max-w-md mx-auto">
                        <h2 className="text-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 font-normal mb-4">
                          Thank You
                        </h2>
                        <p className="text-neutral-400 mb-6">
                          We've sent your results to {email}. Check your inbox for personalized security recommendations.
                        </p>
                        <Link
                          href="/"
                          className="inline-flex items-center px-6 py-3 border border-gray-800 rounded-lg text-white hover:bg-white/5 transition"
                        >
                          Return to Home
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-8 text-sm text-neutral-500">
                      <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
                      <span>Score: {score}</span>
                    </div>
                    
                    <div className="mb-8">
                      <h2 className="text-2xl font-light text-white mb-2">
                        {currentQuestion.userStory}
                      </h2>
                      <p className="text-xl text-neutral-300">
                        {currentQuestion.question}
                      </p>
                    </div>
                    
                    <div className="space-y-3 mb-8">
                      {shuffledOptions.map((option, index) => (
                        <button
                          key={index}
                          className={`w-full p-4 text-left border rounded-lg transition-all ${
                            selectedOption === index
                            ? "border-purple-500/50 bg-purple-500/10 text-white"
                            : "border-gray-800 bg-black/20 text-neutral-300 hover:border-gray-700 hover:bg-black/40"
                          }`}
                          onClick={() => handleOptionClick(index)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={handleNextQuestion}
                      disabled={selectedOption === null}
                      className={`w-full py-3 rounded-lg flex items-center justify-center transition-all ${
                        selectedOption === null
                        ? "bg-neutral-800/50 text-neutral-600 cursor-not-allowed"
                        : "bg-white/70 text-black hover:bg-white/60"
                      }`}
                    >
                      {currentQuestionIndex === questions.length - 1 ? 'Complete Quiz' : 'Next Question'} 
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      
      {/* <Footer /> */}
    </main>
  );
};

export default TryApp;