// 'use client'
// import { useState, FormEvent, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import XLogo from '../../../(landing-page)/assets/XThreat_icon_primary_white_to_gradient.svg'
// import Link from 'next/link';
// import { Copy } from 'lucide-react';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { useRouter } from 'next/navigation';

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

// export default function SignIn() {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [copied, setCopied] = useState(false);
//   const [attemptCount, setAttemptCount] = useState(0);
  
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const formRef = useRef<HTMLFormElement>(null);
//   const router = useRouter();
//   const supabase = createClientComponentClient();

//   // Memoize the client to prevent unnecessary re-creation
//   const supabaseClient = useRef(supabase);

//   const resetOtp = () => {
//     setOtp(['', '', '', '', '', '']);
//     inputRefs.current[0]?.focus();
//   };

//   // Optimized paste handler
//   const handlePaste = (e: ClipboardEvent) => {
//     e.preventDefault();
//     if (!showOtpInput) return;

//     const pastedData = e.clipboardData?.getData('text');
//     if (!pastedData) return;

//     const numbers = pastedData.replace(/\D/g, '').slice(0, 6).split('');
//     setOtp(numbers.concat(Array(6 - numbers.length).fill('')));
//   };

//   // Debounced auto-submit
//   useEffect(() => {
//     if (!showOtpInput || loading) return;
    
//     const isComplete = otp.every(digit => digit !== '');
//     if (!isComplete) return;

//     const timeoutId = setTimeout(() => {
//       formRef.current?.requestSubmit();
//     }, 100);

//     return () => clearTimeout(timeoutId);
//   }, [otp, showOtpInput, loading]);

//   // Optimized keydown handler
//   useEffect(() => {
//     if (!showOtpInput) return;

//     const handleGlobalKeyDown = (e: KeyboardEvent) => {
//       if (!showOtpInput) return;

//       if (e.key === 'Backspace' || e.key === 'Delete') {
//         e.preventDefault();
//         const lastFilledIndex = otp.findLastIndex(digit => digit !== '');
//         if (lastFilledIndex !== -1) {
//           const newOtp = [...otp];
//           newOtp[lastFilledIndex] = '';
//           setOtp(newOtp);
//           inputRefs.current[lastFilledIndex]?.focus();
//         }
//         return;
//       }
      
//       if (!/^\d$/.test(e.key)) return;
      
//       const emptyIndex = otp.findIndex(digit => digit === '');
//       if (emptyIndex !== -1) {
//         const newOtp = [...otp];
//         newOtp[emptyIndex] = e.key;
//         setOtp(newOtp);
//         if (emptyIndex < 5) inputRefs.current[emptyIndex + 1]?.focus();
//       }
//     };

//     document.addEventListener('keydown', handleGlobalKeyDown);
//     document.addEventListener('paste', handlePaste);
    
//     return () => {
//       document.removeEventListener('keydown', handleGlobalKeyDown);
//       document.removeEventListener('paste', handlePaste);
//     };
//   }, [showOtpInput, otp]);

//   // Cached user existence check
//   const checkUserExists = async (email: string) => {
//     const normalizedEmail = email.toLowerCase();
    
//     try {
//       const { data, error } = await supabaseClient.current
//         .from('allowed_users')
//         .select('email')
//         .eq('email', normalizedEmail)
//         .single();
      
//       return { exists: !!data, error: null };
//     } catch (error) {
//       return { exists: false, error };
//     }
//   };

//   const handleRequestOTP = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (loading) return;
//     setLoading(true);
//     setError(null);

//     try {
//       if (attemptCount >= 5) {
//         throw new Error('Too many attempts. Please try again later.');
//       }

//       if (!email.includes('@')) {
//         throw new Error('Please enter a valid email address');
//       }

//       const { exists, error: checkError } = await checkUserExists(email);
      
//       if (checkError || !exists) {
//         setAttemptCount(prev => prev + 1);
//         setError('If this email is registered, you will receive a login code shortly.');
//         return;
//       }

//       await supabaseClient.current.auth.signInWithOtp({
//         email: email.toLowerCase(),
//         options: {
//           emailRedirectTo: `${window.location.origin}/login/callback`,
//           shouldCreateUser: false,
//         }
//       });

//       setShowOtpInput(true);

//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (loading) return;
    
//     const otpString = otp.join('');
//     if (otpString.length !== 6) {
//       setError('Please enter a valid verification code');
//       resetOtp();
//       return;
//     }

//     setLoading(true);
//     try {
//       const { error } = await supabaseClient.current.auth.verifyOtp({
//         email: email.toLowerCase(),
//         token: otpString,
//         type: 'email'
//       });

//       if (error) {
//         setError('Invalid verification code. Please try again.');
//         resetOtp();
//         return;
//       }

//       // Immediate redirect on success
//       router.push('/dashboard');
//       router.refresh();
      
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Verification failed. Please try again.');
//       resetOtp();
//       setLoading(false);
//     }
//   };

//   const handleOtpChange = (index: number, value: string) => {
//     if (value.length > 1) value = value[0];
//     if (!/^\d*$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Backspace' || e.key === 'Delete') {
//       e.preventDefault();
//       const newOtp = [...otp];
//       if (otp[index]) {
//         newOtp[index] = '';
//       } else if (index > 0) {
//         newOtp[index - 1] = '';
//         inputRefs.current[index - 1]?.focus();
//       }
//       setOtp(newOtp);
//     }
//   };

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText('support@xthreat.eu');
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1000);
//     } catch (error) {
//       console.error('Failed to copy:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r font-sans bg-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="mt-8 bg-gray-900/30 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border border-gray-800 py-8 px-4 shadow rounded-xl sm:px-10">
//           <div className="bg-transparent mb-6">
//             <div className="flex justify-center">
//               <Link href="/" className="inline-flex">
//                 <Image
//                   src={XLogo}
//                   alt="X Logo"
//                   width={16}
//                   height={16}
//                   className="w-8 h-8 md:w-[30px] md:h-[30px]"
//                   priority
//                 />
//               </Link>
//             </div>
//           </div>

//           {error && !loading && (
//             <div className="p-3 bg-red-500/10 border mb-5 border-red-500/50 rounded-md">
//               <p className="text-red-500 text-sm text-center font-medium">
//                 {error}
//               </p>
//             </div>
//           )}

//           <form ref={formRef} onSubmit={showOtpInput ? handleVerifyOTP : handleRequestOTP} className="space-y-6">
//             {!showOtpInput ? (
//               <div>
//                 <label htmlFor="email" className="sr-only">
//                   Email address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="appearance-none rounded-md text-center relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-900/30 focus:outline-none focus:ring-[#d1d0d0] focus:border-[#d1d0d0] focus:z-10 sm:text-sm"
//                   placeholder="Email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <BottomGradient />
//               </div>
//             ) : (
//               <div>
//                 <div className="text-sm text-gray-400 text-center mb-4">
//                   Enter the code sent to {email}
//                 </div>
//                 <div 
//                   ref={containerRef}
//                   tabIndex={-1}
//                   className="flex gap-2 justify-center focus:outline-none"
//                 >
//                   {otp.map((digit, index) => (
//                     <input
//                       key={index}
//                       ref={(el) => inputRefs.current[index] = el}
//                       type="text"
//                       inputMode="numeric"
//                       pattern="\d*"
//                       maxLength={1}
//                       value={digit}
//                       onChange={(e) => handleOtpChange(index, e.target.value)}
//                       onKeyDown={(e) => handleKeyDown(index, e)}
//                       className="w-12 h-12 text-center border border-gray-700 rounded-md text-white bg-gray-900/30 focus:outline-none focus:ring-[#d1d0d0] focus:border-[#d1d0d0] text-xl"
//                     />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {!showOtpInput && (
//               <div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? 'Sending code...' : 'Continue'}
//                 </button>
//               </div>
//             )}
//           </form>

//           <div className="relative">
//             <div className="relative flex flex-col items-center justify-center text-sm mt-6 h-[28px]">
//               <div className="flex flex-row items-center">
//                 <span className="text-gray-400">support@xthreat.eu</span>
//                 <button
//                   onClick={copyToClipboard}
//                   className="ml-2 mt-[2px] text-gray-400 hover:text-gray-300 focus:outline-none"
//                   aria-label="Copy email"
//                 >
//                   <Copy size={14} />
//                 </button>
//               </div>
//               <div className="h-2">
//                 {copied && (
//                   <span className="text-green-500 text-xs">Copied!</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



// 'use client'
// import { useState, FormEvent, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import XLogo from '../../../(marketing)/assets/XThreat_icon_primary_white_to_gradient.svg'
// import Link from 'next/link';
// import { ChevronLeft, Copy, Loader2 } from 'lucide-react';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// import { useRouter } from 'next/navigation';

// const BottomGradient = () => {
//   return (
//     <>
//       <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
//       <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
//     </>
//   );
// };

// export default function SignIn() {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [verifying, setVerifying] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [copied, setCopied] = useState(false);
//   const [attemptCount, setAttemptCount] = useState(0);
  
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const formRef = useRef<HTMLFormElement>(null);
//   const router = useRouter();
//   const supabase = createClientComponentClient();

//   // Memoize the client to prevent unnecessary re-creation
//   const supabaseClient = useRef(supabase);

//   const resetOtp = () => {
//     setOtp(['', '', '', '', '', '']);
//     inputRefs.current[0]?.focus();
//   };

//   // Optimized paste handler
//   const handlePaste = (e: ClipboardEvent) => {
//     e.preventDefault();
//     if (!showOtpInput) return;

//     const pastedData = e.clipboardData?.getData('text');
//     if (!pastedData) return;

//     const numbers = pastedData.replace(/\D/g, '').slice(0, 6).split('');
//     setOtp(numbers.concat(Array(6 - numbers.length).fill('')));
//   };

//   // Debounced auto-submit
//   useEffect(() => {
//     if (!showOtpInput || loading) return;
    
//     const isComplete = otp.every(digit => digit !== '');
//     if (!isComplete) return;

//     const timeoutId = setTimeout(() => {
//       formRef.current?.requestSubmit();
//     }, 100);

//     return () => clearTimeout(timeoutId);
//   }, [otp, showOtpInput, loading]);

//   // Optimized keydown handler
//   useEffect(() => {
//     if (!showOtpInput) return;

//     const handleGlobalKeyDown = (e: KeyboardEvent) => {
//       if (!showOtpInput) return;

//       if (e.key === 'Backspace' || e.key === 'Delete') {
//         e.preventDefault();
//         const lastFilledIndex = otp.findLastIndex(digit => digit !== '');
//         if (lastFilledIndex !== -1) {
//           const newOtp = [...otp];
//           newOtp[lastFilledIndex] = '';
//           setOtp(newOtp);
//           inputRefs.current[lastFilledIndex]?.focus();
//         }
//         return;
//       }
      
//       if (!/^\d$/.test(e.key)) return;
      
//       const emptyIndex = otp.findIndex(digit => digit === '');
//       if (emptyIndex !== -1) {
//         const newOtp = [...otp];
//         newOtp[emptyIndex] = e.key;
//         setOtp(newOtp);
//         if (emptyIndex < 5) inputRefs.current[emptyIndex + 1]?.focus();
//       }
//     };

//     document.addEventListener('keydown', handleGlobalKeyDown);
//     document.addEventListener('paste', handlePaste);
    
//     return () => {
//       document.removeEventListener('keydown', handleGlobalKeyDown);
//       document.removeEventListener('paste', handlePaste);
//     };
//   }, [showOtpInput, otp]);

//   const handleRequestOTP = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (loading) return;
//     setLoading(true);
//     setError(null);

//     const normalizedEmail = email.toLowerCase().trim();
//     console.log('Attempting login with email:', normalizedEmail);

//     try {
//       if (attemptCount >= 5) {
//         throw new Error('Too many attempts. Please try again later.');
//       }

//       if (!email.includes('@')) {
//         throw new Error('Please enter a valid email address');
//       }

//       // Check if user exists in the database
//       const { data, error: userError } = await supabaseClient.current
//         .from('users')
//         .select('email')
//         .eq('email', normalizedEmail)
//         .maybeSingle();

//       console.log('Database query result:', { data, error: userError });

//       if (userError) {
//         console.error('Database error:', userError);
//         throw new Error('Failed to check user. Please try again.');
//       }

//       // If user doesn't exist
//       if (!data) {
//         console.log('No user found in database');
//         setAttemptCount(prev => prev + 1);
//         setError('Email not found. Please check your email or contact support.');
//         setLoading(false);
//         return;
//       }

//       console.log('User found, sending OTP');
//       // User exists, send OTP
//       const { error } = await supabaseClient.current.auth.signInWithOtp({
//         email: normalizedEmail,
//         options: {
//           emailRedirectTo: `${window.location.origin}/login/callback`,
//           shouldCreateUser: false,
//         }
//       });

//       if (error) {
//         console.error('OTP error:', error);
//         throw error;
//       }

//       setShowOtpInput(true);
//       setError(null);

//     } catch (error) {
//       console.error('Error sending OTP:', error);
//       setError(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
//       setAttemptCount(prev => prev + 1);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (loading || verifying) return;
    
//     const otpString = otp.join('');
//     if (otpString.length !== 6) {
//       setError('Please enter a valid verification code');
//       resetOtp();
//       return;
//     }

//     setVerifying(true);
//     try {
//       const { data, error } = await supabaseClient.current.auth.verifyOtp({
//         email: email.toLowerCase(),
//         token: otpString,
//         type: 'email'
//       });

//       if (error) {
//         setError('Invalid verification code. Please try again.');
//         resetOtp();
//         return;
//       }

//       if (data?.user) {
//         // Redirect to dashboard - middleware will handle role-specific routing
//         window.location.href = '/dashboard';
//       } else {
//         throw new Error('Authentication failed');
//       }
      
//     } catch (error) {
//       console.error('Full error object:', error);
//       setError(error instanceof Error ? error.message : 'Verification failed. Please try again.');
//       resetOtp();
//     } finally {
//       setVerifying(false);
//     }
//   };

//   const handleOtpChange = (index: number, value: string) => {
//     if (value.length > 1) value = value[0];
//     if (!/^\d*$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Backspace' || e.key === 'Delete') {
//       e.preventDefault();
//       const newOtp = [...otp];
//       if (otp[index]) {
//         newOtp[index] = '';
//       } else if (index > 0) {
//         newOtp[index - 1] = '';
//         inputRefs.current[index - 1]?.focus();
//       }
//       setOtp(newOtp);
//     }
//   };

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText('support@xthreat.eu');
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1000);
//     } catch (error) {
//       console.error('Failed to copy:', error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r font-sans bg-black flex flex-col justify-center items-center py-12 px-6 sm:px-6 lg:px-8">
//       <button 
//         onClick={() => router.back()} 
//         className="absolute flex text-sm top-10 left-4 sm:left-10 p-2 rounded-lg bg-[#1F1F1F] text-white hover:bg-neutral-800 transition"
//       >
//         <ChevronLeft className="mr-1 mt-[3px]" size={14} color="white"/>
//         Back
//       </button>

//       <div className="max-w-md w-full space-y-8">
//         <div className="mt-8 bg-gray-900/30 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border border-gray-800 py-8 px-4 shadow rounded-xl sm:px-10">
//           <div className="bg-transparent mb-6">
//             <div className="flex justify-center">
//               <Link href="/" className="inline-flex">
//                 <Image
//                   src={XLogo}
//                   alt="X Logo"
//                   width={16}
//                   height={16}
//                   className="w-8 h-8 md:w-[30px] md:h-[30px]"
//                   priority
//                 />
//               </Link>
//             </div>
//           </div>

//           {error && !loading && (
//             <div className="p-3 bg-red-500/10 border mb-5 border-red-500/50 rounded-md">
//               <p className="text-red-500 text-sm text-center font-medium">
//                 {error}
//               </p>
//             </div>
//           )}

//           <form ref={formRef} onSubmit={showOtpInput ? handleVerifyOTP : handleRequestOTP} className="space-y-6">
//             {!showOtpInput ? (
//               <div>
//                 <label htmlFor="email" className="sr-only">
//                   Email address
//                 </label>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="appearance-none rounded-md text-center relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-900/30 focus:outline-none focus:ring-[#d1d0d0] focus:border-[#d1d0d0] focus:z-10 sm:text-sm"
//                   placeholder="Email address"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <BottomGradient />
//               </div>
//             ) : (
//               <div>
//                 <div className="text-sm text-gray-400 text-center mb-4">
//                   Enter the code sent to {email}
//                 </div>
//                 <div 
//                   ref={containerRef}
//                   tabIndex={-1}
//                   className="flex gap-2 justify-center focus:outline-none"
//                 >
//                   {otp.map((digit, index) => (
//                     <input
//                       key={index}
//                       ref={(el) => {
//                         if (inputRefs.current) {
//                           inputRefs.current[index] = el;
//                         }
//                       }}
//                       type="text"
//                       inputMode="numeric"
//                       pattern="\d*"
//                       maxLength={1}
//                       value={digit}
//                       onChange={(e) => handleOtpChange(index, e.target.value)}
//                       onKeyDown={(e) => handleKeyDown(index, e)}
//                       className="w-12 h-12 text-center border border-gray-700 rounded-md text-white bg-gray-900/30 focus:outline-none focus:ring-[#d1d0d0] focus:border-[#d1d0d0] text-xl"
//                     />
//                   ))}
//                 </div>
//                 {verifying && (
//                   <div className="flex justify-center mt-4">
//                     <Loader2 className="w-6 h-6 text-white animate-spin" />
//                   </div>
//                 )}
//               </div>
//             )}

//             {!showOtpInput && (
//               <div>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {loading ? (
//                     <div className="flex items-center">
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Sending code...
//                     </div>
//                   ) : (
//                     'Continue'
//                   )}
//                 </button>
//               </div>
//             )}
//           </form>

//           <div className="relative">
//             <div className="relative flex flex-col items-center justify-center text-sm mt-6 h-[28px]">
//               <div className="flex flex-row items-center">
//                 <span className="text-gray-400">support@xthreat.eu</span>
//                 <button
//                   onClick={copyToClipboard}
//                   className="ml-2 mt-[2px] text-gray-400 hover:text-gray-300 focus:outline-none"
//                   aria-label="Copy email"
//                 >
//                   <Copy size={14} />
//                 </button>
//               </div>
//               <div className="h-2">
//                 {copied && (
//                   <span className="text-green-500 text-xs">Copied!</span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client'
import { useState, FormEvent, useRef, useEffect } from 'react';
import Image from 'next/image';
import XLogo from '../../../(marketing)/assets/XThreat_icon_primary_white_to_gradient.svg'
import Link from 'next/link';
import { Copy, Loader2 } from 'lucide-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Memoize the client to prevent unnecessary re-creation
  const supabaseClient = useRef(supabase);

  const resetOtp = () => {
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  // Optimized paste handler
  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    if (!showOtpInput) return;

    const pastedData = e.clipboardData?.getData('text');
    if (!pastedData) return;

    const numbers = pastedData.replace(/\D/g, '').slice(0, 6).split('');
    setOtp(numbers.concat(Array(6 - numbers.length).fill('')));
  };

  // Debounced auto-submit
  useEffect(() => {
    if (!showOtpInput || loading) return;
    
    const isComplete = otp.every(digit => digit !== '');
    if (!isComplete) return;

    const timeoutId = setTimeout(() => {
      formRef.current?.requestSubmit();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [otp, showOtpInput, loading]);

  // Optimized keydown handler
  useEffect(() => {
    if (!showOtpInput) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!showOtpInput) return;

      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        const lastFilledIndex = otp.findLastIndex(digit => digit !== '');
        if (lastFilledIndex !== -1) {
          const newOtp = [...otp];
          newOtp[lastFilledIndex] = '';
          setOtp(newOtp);
          inputRefs.current[lastFilledIndex]?.focus();
        }
        return;
      }
      
      if (!/^\d$/.test(e.key)) return;
      
      const emptyIndex = otp.findIndex(digit => digit === '');
      if (emptyIndex !== -1) {
        const newOtp = [...otp];
        newOtp[emptyIndex] = e.key;
        setOtp(newOtp);
        if (emptyIndex < 5) inputRefs.current[emptyIndex + 1]?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    document.addEventListener('paste', handlePaste);
    
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
      document.removeEventListener('paste', handlePaste);
    };
  }, [showOtpInput, otp]);

  // Cached user existence check
  const checkUserExists = async (email: string) => {
    const normalizedEmail = email.toLowerCase();
    
    try {
      const { data, error } = await supabaseClient.current
        .from('users')
        .select('email')
        .ilike('email', normalizedEmail)
        .single();
      
      return { exists: !!data, error: null };
    } catch (error) {
      return { exists: false, error };
    }
  };

  const handleRequestOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      if (attemptCount >= 5) {
        throw new Error('Too many attempts. Please try again later.');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      const normalizedEmail = email.toLowerCase().trim();
      
      // Send OTP first
      const { error: otpError } = await supabaseClient.current.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          emailRedirectTo: `${window.location.origin}/login/callback`,
          shouldCreateUser: false,
        }
      });

      if (otpError) throw otpError;

      // If OTP sent successfully, show input
      setShowOtpInput(true);
      setError(null);

    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
      setAttemptCount(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || verifying) return;
    
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a valid verification code');
      resetOtp();
      return;
    }

    setVerifying(true);
    try {
      // Verify OTP
      const { data, error } = await supabaseClient.current.auth.verifyOtp({
        email: email.toLowerCase(),
        token: otpString,
        type: 'email'
      });

      if (error) {
        console.error('OTP verification error:', error);
        setError('Invalid verification code. Please try again.');
        resetOtp();
        return;
      }

      if (!data?.user) {
        console.error('No user data after verification');
        setError('Verification failed. Please try again.');
        return;
      }

      // Create or update user record in users table
      const { error: upsertError } = await supabaseClient.current
        .from('users')
        .upsert({
          id: data.user.id,
          email: data.user.email,
          role: 'user', // default role
          is_active: true
        }, {
          onConflict: 'id'
        });

      if (upsertError) {
        console.error('Failed to create user record:', upsertError);
        setError('Failed to complete signup. Please try again.');
        return;
      }

      // Get session to confirm everything is set
      const { data: { session }, error: sessionError } = 
        await supabaseClient.current.auth.getSession();
      
      if (sessionError || !session) {
        console.error('Session error:', sessionError);
        setError('Failed to establish session. Please try again.');
        return;
      }

      console.log('Successfully logged in and created user record:', data.user);
      
      // Use window.location for a full page reload
      window.location.href = '/dashboard';
      
    } catch (error) {
      console.error('Verification error:', error);
      setError(error instanceof Error ? error.message : 'Verification failed. Please try again.');
      resetOtp();
    } finally {
      setVerifying(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = '';
      } else if (index > 0) {
        newOtp[index - 1] = '';
        inputRefs.current[index - 1]?.focus();
      }
      setOtp(newOtp);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('support@xthreat.eu');
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r font-sans bg-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="mt-8 bg-gray-900/30 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border border-gray-800 py-8 px-4 shadow rounded-xl sm:px-10">
          <div className="bg-transparent mb-6">
            <div className="flex justify-center">
              <Link href="/" className="inline-flex">
                <Image
                  src={XLogo}
                  alt="X Logo"
                  width={16}
                  height={16}
                  className="w-8 h-8 md:w-[30px] md:h-[30px]"
                  priority
                />
              </Link>
            </div>
          </div>

          {error && !loading && (
            <div className="p-3 bg-red-500/10 border mb-5 border-red-500/50 rounded-md">
              <p className="text-red-500 text-sm text-center font-medium">
                {error}
              </p>
            </div>
          )}

          <form ref={formRef} onSubmit={showOtpInput ? handleVerifyOTP : handleRequestOTP} className="space-y-6">
            {!showOtpInput ? (
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md text-center relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-900/30 focus:outline-none focus:ring-[#d1d0d0] focus:border-[#d1d0d0] focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <BottomGradient />
              </div>
            ) : (
              <div>
                <div className="text-sm text-gray-400 text-center mb-4">
                  Enter the code sent to {email}
                </div>
                <div 
                  ref={containerRef}
                  tabIndex={-1}
                  className="flex gap-2 justify-center focus:outline-none"
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => inputRefs.current[index] = el}
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center border border-gray-700 rounded-md text-white bg-gray-900/30 focus:outline-none focus:ring-[#d1d0d0] focus:border-[#d1d0d0] text-xl"
                    />
                  ))}
                </div>
                {verifying && (
                  <div className="flex justify-center mt-4">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
              </div>
            )}

            {!showOtpInput && (
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending code...
                    </div>
                  ) : (
                    'Continue'
                  )}
                </button>
              </div>
            )}
          </form>

          <div className="relative">
            <div className="relative flex flex-col items-center justify-center text-sm mt-6 h-[28px]">
              <div className="flex flex-row items-center">
                <span className="text-gray-400">support@xthreat.eu</span>
                <button
                  onClick={copyToClipboard}
                  className="ml-2 mt-[2px] text-gray-400 hover:text-gray-300 focus:outline-none"
                  aria-label="Copy email"
                >
                  <Copy size={14} />
                </button>
              </div>
              <div className="h-2">
                {copied && (
                  <span className="text-green-500 text-xs">Copied!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
