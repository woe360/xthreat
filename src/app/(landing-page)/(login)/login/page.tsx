// 'use client'
// import { useState, FormEvent, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import XLogo from '../../assets/XThreat_icon_primary_white_to_gradient.svg'
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

//   // Add effect to handle global keydown when OTP inputs are shown
//   useEffect(() => {
//     if (!showOtpInput) return;

//     const handleGlobalKeyDown = (e: KeyboardEvent) => {
//       if (!showOtpInput) return;
      
//       // Handle Enter key for form submission
//       if (e.key === 'Enter') {
//         e.preventDefault();
//         const filledDigits = otp.filter(digit => digit !== '').length;
//         if (filledDigits === 6 && !loading) {
//           formRef.current?.requestSubmit();
//         }
//         return;
//       }
      
//       // Only handle numeric keys
//       if (!/^\d$/.test(e.key)) return;
      
//       // Find the first empty position or the last position if all are filled
//       const currentFilledCount = otp.filter(digit => digit !== '').length;
//       if (currentFilledCount < 6) {
//         const newOtp = [...otp];
//         newOtp[currentFilledCount] = e.key;
//         setOtp(newOtp);
//         inputRefs.current[Math.min(currentFilledCount + 1, 5)]?.focus();
//       }
//     };

//     // Add global event listener
//     document.addEventListener('keydown', handleGlobalKeyDown);

//     // Focus the container to enable immediate typing
//     containerRef.current?.focus();

//     return () => {
//       document.removeEventListener('keydown', handleGlobalKeyDown);
//     };
//   }, [showOtpInput, otp, loading]);

//   const checkUserExists = async (email: string) => {
//     try {
//       const { data, error } = await supabase
//         .from('allowed_users')
//         .select('email')
//         .eq('email', email.toLowerCase())
//         .single();
      
//       if (error) throw error;
//       return { exists: !!data, error: null };
//     } catch (error) {
//       return { exists: false, error };
//     }
//   };

//   const handleRequestOTP = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
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
//         setTimeout(() => {
//           setError('If this email is registered, you will receive a login code shortly.');
//         }, 1000);
//         return;
//       }

//       const { error: otpError } = await supabase.auth.signInWithOtp({
//         email: email.toLowerCase(),
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           shouldCreateUser: false,
//         }
//       });

//       if (otpError) {
//         throw new Error('Unable to process request. Please try again later.');
//       }

//       setTimeout(() => {
//         setShowOtpInput(true);
//       }, 1500);

//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       if (otp.join('').length !== 6) {
//         throw new Error('Please enter a valid verification code');
//       }

//       const { error } = await supabase.auth.verifyOtp({
//         email: email.toLowerCase(),
//         token: otp.join(''),
//         type: 'email'
//       });

//       if (error) {
//         throw new Error('Invalid verification code. Please try again.');
//       }

//       router.push('/dashboard');
//       router.refresh();
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Verification failed. Please try again.');
//     } finally {
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
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       const newOtp = [...otp];
//       newOtp[index - 1] = '';
//       setOtp(newOtp);
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText('support@xthreat.eu').then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
//     inputRefs.current[index] = el;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r font-sans bg-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="mt-8 bg-gray-900/30 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border border-gray-800 py-8 px-4 shadow rounded-xl sm:px-10">
//           <div className="bg-transparent py-4 mb-4 px-4 shadow rounded-xl sm:px-10">
//             <Link href="/">
//               <Image
//                 src={XLogo}
//                 alt="X Logo"
//                 width={16}
//                 height={16}
//                 className="w-8 h-8 mx-auto md:w-[30px] md:h-[30px]"
//               />
//             </Link>
//           </div>

//           {error && (
//             <div className="p-3 bg-red-500/10 border mb-5 border-red-500/50 rounded-md">
//               <p className="text-red-500 text-sm text-center font-medium">
//                 {error}
//               </p>
//             </div>
//           )}

//           <form ref={formRef} className="space-y-6" onSubmit={showOtpInput ? handleVerifyOTP : handleRequestOTP}>
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
//                       ref={setInputRef(index)}
//                       type="text"
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

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading || (showOtpInput && otp.join('').length !== 6)}
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading 
//                   ? (showOtpInput ? 'Verifying...' : 'Sending code...') 
//                   : (showOtpInput ? 'Verify Code' : 'Continue')}
//               </button>
//             </div>
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
// import XLogo from '../../assets/XThreat_icon_primary_white_to_gradient.svg'
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

//   const resetOtp = () => {
//     setOtp(['', '', '', '', '', '']);
//     // Focus the first input after reset
//     setTimeout(() => {
//       inputRefs.current[0]?.focus();
//     }, 0);
//   };

//   // Add effect to handle global keydown when OTP inputs are shown
//   useEffect(() => {
//     if (!showOtpInput) return;

//     const handleGlobalKeyDown = (e: KeyboardEvent) => {
//       if (!showOtpInput) return;
      
//       // Handle Enter key for form submission
//       if (e.key === 'Enter') {
//         e.preventDefault();
//         const filledDigits = otp.filter(digit => digit !== '').length;
//         if (filledDigits === 6 && !loading) {
//           formRef.current?.requestSubmit();
//         }
//         return;
//       }
      
//       // Only handle numeric keys
//       if (!/^\d$/.test(e.key)) return;
      
//       // Find the first empty position or the last position if all are filled
//       const currentFilledCount = otp.filter(digit => digit !== '').length;
//       if (currentFilledCount < 6) {
//         const newOtp = [...otp];
//         newOtp[currentFilledCount] = e.key;
//         setOtp(newOtp);
//         inputRefs.current[Math.min(currentFilledCount + 1, 5)]?.focus();
//       }
//     };

//     // Add global event listener
//     document.addEventListener('keydown', handleGlobalKeyDown);

//     // Focus the container to enable immediate typing
//     containerRef.current?.focus();

//     return () => {
//       document.removeEventListener('keydown', handleGlobalKeyDown);
//     };
//   }, [showOtpInput, otp, loading]);

//   const checkUserExists = async (email: string) => {
//     try {
//       const { data, error } = await supabase
//         .from('allowed_users')
//         .select('email')
//         .eq('email', email.toLowerCase())
//         .single();
      
//       if (error) throw error;
//       return { exists: !!data, error: null };
//     } catch (error) {
//       return { exists: false, error };
//     }
//   };

//   const handleRequestOTP = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
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
//         setTimeout(() => {
//           setError('If this email is registered, you will receive a login code shortly.');
//         }, 1000);
//         return;
//       }

//       const { error: otpError } = await supabase.auth.signInWithOtp({
//         email: email.toLowerCase(),
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           shouldCreateUser: false,
//         }
//       });

//       if (otpError) {
//         throw new Error('Unable to process request. Please try again later.');
//       }

//       setTimeout(() => {
//         setShowOtpInput(true);
//       }, 1500);

//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       if (otp.join('').length !== 6) {
//         throw new Error('Please enter a valid verification code');
//       }

//       const { error } = await supabase.auth.verifyOtp({
//         email: email.toLowerCase(),
//         token: otp.join(''),
//         type: 'email'
//       });

//       if (error) {
//         throw new Error('Invalid verification code. Please try again.');
//       }

//       router.push('/dashboard');
//       router.refresh();
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Verification failed. Please try again.');
//       resetOtp(); // Reset OTP inputs when verification fails
//     } finally {
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
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       const newOtp = [...otp];
//       newOtp[index - 1] = '';
//       setOtp(newOtp);
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText('support@xthreat.eu').then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
//     inputRefs.current[index] = el;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r font-sans bg-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="mt-8 bg-gray-900/30 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border border-gray-800 py-8 px-4 shadow rounded-xl sm:px-10">
//           <div className="bg-transparent py-4 mb-4 px-4 shadow rounded-xl sm:px-10">
//             <Link href="/">
//               <Image
//                 src={XLogo}
//                 alt="X Logo"
//                 width={16}
//                 height={16}
//                 className="w-8 h-8 mx-auto md:w-[30px] md:h-[30px]"
//               />
//             </Link>
//           </div>

//           {error && (
//             <div className="p-3 bg-red-500/10 border mb-5 border-red-500/50 rounded-md">
//               <p className="text-red-500 text-sm text-center font-medium">
//                 {error}
//               </p>
//             </div>
//           )}

//           <form ref={formRef} className="space-y-6" onSubmit={showOtpInput ? handleVerifyOTP : handleRequestOTP}>
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
//                       ref={setInputRef(index)}
//                       type="text"
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

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading || (showOtpInput && otp.join('').length !== 6)}
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading 
//                   ? (showOtpInput ? 'Verifying...' : 'Sending code...') 
//                   : (showOtpInput ? 'Verify Code' : 'Continue')}
//               </button>
//             </div>
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
// import XLogo from '../../assets/XThreat_icon_primary_white_to_gradient.svg'
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

//   const resetOtp = () => {
//     setOtp(['', '', '', '', '', '']);
//     setTimeout(() => {
//       inputRefs.current[0]?.focus();
//     }, 0);
//   };

//   // Add effect to handle global keydown when OTP inputs are shown
//   useEffect(() => {
//     if (!showOtpInput) return;

//     const handleGlobalKeyDown = (e: KeyboardEvent) => {
//       if (!showOtpInput) return;
      
//       // Handle Enter key for form submission
//       if (e.key === 'Enter') {
//         e.preventDefault();
//         const filledDigits = otp.filter(digit => digit !== '').length;
//         if (filledDigits === 6 && !loading) {
//           formRef.current?.requestSubmit();
//         }
//         return;
//       }

//       // Handle Backspace and Delete keys
//       if (e.key === 'Backspace' || e.key === 'Delete') {
//         e.preventDefault();
//         const lastFilledIndex = otp.map(digit => digit !== '').lastIndexOf(true);
//         if (lastFilledIndex !== -1) {
//           const newOtp = [...otp];
//           newOtp[lastFilledIndex] = '';
//           setOtp(newOtp);
//           inputRefs.current[lastFilledIndex]?.focus();
//         }
//         return;
//       }
      
//       // Only handle numeric keys
//       if (!/^\d$/.test(e.key)) return;
      
//       // Find the first empty position or the last position if all are filled
//       const currentFilledCount = otp.filter(digit => digit !== '').length;
//       if (currentFilledCount < 6) {
//         const newOtp = [...otp];
//         newOtp[currentFilledCount] = e.key;
//         setOtp(newOtp);
//         inputRefs.current[Math.min(currentFilledCount + 1, 5)]?.focus();
//       }
//     };

//     // Add global event listener
//     document.addEventListener('keydown', handleGlobalKeyDown);

//     // Focus the container to enable immediate typing
//     containerRef.current?.focus();

//     return () => {
//       document.removeEventListener('keydown', handleGlobalKeyDown);
//     };
//   }, [showOtpInput, otp, loading]);

//   const checkUserExists = async (email: string) => {
//     try {
//       const { data, error } = await supabase
//         .from('allowed_users')
//         .select('email')
//         .eq('email', email.toLowerCase())
//         .single();
      
//       if (error) throw error;
//       return { exists: !!data, error: null };
//     } catch (error) {
//       return { exists: false, error };
//     }
//   };

//   const handleRequestOTP = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
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
//         setTimeout(() => {
//           setError('If this email is registered, you will receive a login code shortly.');
//         }, 1000);
//         return;
//       }

//       const { error: otpError } = await supabase.auth.signInWithOtp({
//         email: email.toLowerCase(),
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//           shouldCreateUser: false,
//         }
//       });

//       if (otpError) {
//         throw new Error('Unable to process request. Please try again later.');
//       }

//       setTimeout(() => {
//         setShowOtpInput(true);
//       }, 1500);

//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       if (otp.join('').length !== 6) {
//         throw new Error('Please enter a valid verification code');
//       }

//       const { error } = await supabase.auth.verifyOtp({
//         email: email.toLowerCase(),
//         token: otp.join(''),
//         type: 'email'
//       });

//       if (error) {
//         throw new Error('Invalid verification code. Please try again.');
//       }

//       router.push('/dashboard');
//       router.refresh();
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'Verification failed. Please try again.');
//       resetOtp();
//     } finally {
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
//       if (otp[index] !== '') {
//         // If current input has a value, clear it
//         newOtp[index] = '';
//         setOtp(newOtp);
//       } else if (index > 0) {
//         // If current input is empty and not first input, clear previous input
//         newOtp[index - 1] = '';
//         setOtp(newOtp);
//         inputRefs.current[index - 1]?.focus();
//       }
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText('support@xthreat.eu').then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
//     inputRefs.current[index] = el;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r font-sans bg-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="mt-8 bg-gray-900/30 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border border-gray-800 py-8 px-4 shadow rounded-xl sm:px-10">
//           <div className="bg-transparent py-4 mb-4 px-4 shadow rounded-xl sm:px-10">
//             <Link href="/">
//               <Image
//                 src={XLogo}
//                 alt="X Logo"
//                 width={16}
//                 height={16}
//                 className="w-8 h-8 mx-auto md:w-[30px] md:h-[30px]"
//               />
//             </Link>
//           </div>

//           {error && (
//             <div className="p-3 bg-red-500/10 border mb-5 border-red-500/50 rounded-md">
//               <p className="text-red-500 text-sm text-center font-medium">
//                 {error}
//               </p>
//             </div>
//           )}

//           <form ref={formRef} className="space-y-6" onSubmit={showOtpInput ? handleVerifyOTP : handleRequestOTP}>
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
//                       ref={setInputRef(index)}
//                       type="text"
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

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading || (showOtpInput && otp.join('').length !== 6)}
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading 
//                   ? (showOtpInput ? 'Verifying...' : 'Sending code...') 
//                   : (showOtpInput ? 'Verify Code' : 'Continue')}
//               </button>
//             </div>
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
import XLogo from '../../assets/XThreat_icon_primary_white_to_gradient.svg'
import Link from 'next/link';
import { Copy } from 'lucide-react';
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
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const resetOtp = () => {
    setOtp(['', '', '', '', '', '']);
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 0);
  };

  // Effect to auto-submit when OTP is complete
  useEffect(() => {
    if (showOtpInput && otp.every(digit => digit !== '') && !loading) {
      formRef.current?.requestSubmit();
    }
  }, [otp, showOtpInput, loading]);

  // Add effect to handle global keydown when OTP inputs are shown
  useEffect(() => {
    if (!showOtpInput) return;

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (!showOtpInput) return;

      // Handle Backspace and Delete keys
      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        const lastFilledIndex = otp.map(digit => digit !== '').lastIndexOf(true);
        if (lastFilledIndex !== -1) {
          const newOtp = [...otp];
          newOtp[lastFilledIndex] = '';
          setOtp(newOtp);
          inputRefs.current[lastFilledIndex]?.focus();
        }
        return;
      }
      
      // Only handle numeric keys
      if (!/^\d$/.test(e.key)) return;
      
      // Find the first empty position or the last position if all are filled
      const currentFilledCount = otp.filter(digit => digit !== '').length;
      if (currentFilledCount < 6) {
        const newOtp = [...otp];
        newOtp[currentFilledCount] = e.key;
        setOtp(newOtp);
        inputRefs.current[Math.min(currentFilledCount + 1, 5)]?.focus();
      }
    };

    // Add global event listener
    document.addEventListener('keydown', handleGlobalKeyDown);

    // Focus the container to enable immediate typing
    containerRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [showOtpInput, otp, loading]);

  const checkUserExists = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('allowed_users')
        .select('email')
        .eq('email', email.toLowerCase())
        .single();
      
      if (error) throw error;
      return { exists: !!data, error: null };
    } catch (error) {
      return { exists: false, error };
    }
  };

  const handleRequestOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (attemptCount >= 5) {
        throw new Error('Too many attempts. Please try again later.');
      }

      if (!email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      const { exists, error: checkError } = await checkUserExists(email);
      
      if (checkError || !exists) {
        setAttemptCount(prev => prev + 1);
        setTimeout(() => {
          setError('If this email is registered, you will receive a login code shortly.');
        }, 1000);
        return;
      }

      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: email.toLowerCase(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: false,
        }
      });

      if (otpError) {
        throw new Error('Unable to process request. Please try again later.');
      }

      setTimeout(() => {
        setShowOtpInput(true);
      }, 1500);

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      if (otp.join('').length !== 6) {
        throw new Error('Please enter a valid verification code');
      }

      const { error } = await supabase.auth.verifyOtp({
        email: email.toLowerCase(),
        token: otp.join(''),
        type: 'email'
      });

      if (error) {
        throw new Error('Invalid verification code. Please try again.');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Verification failed. Please try again.');
      resetOtp();
    } finally {
      setLoading(false);
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
      if (otp[index] !== '') {
        // If current input has a value, clear it
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // If current input is empty and not first input, clear previous input
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('support@xthreat.eu').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
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
                />
              </Link>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border mb-5 border-red-500/50 rounded-md">
              <p className="text-red-500 text-sm text-center font-medium">
                {error}
              </p>
            </div>
          )}

          <form ref={formRef} className="space-y-6" onSubmit={showOtpInput ? handleVerifyOTP : handleRequestOTP}>
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
                      ref={setInputRef(index)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center border border-gray-700 rounded-md text-white bg-gray-900/30 focus:outline-none focus:ring-[#d1d0d0] focus:border-[#d1d0d0] text-xl"
                    />
                  ))}
                </div>
                {loading && (
                  <div className="text-sm text-gray-400 text-center mt-4">
                    Verifying...
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
                  {loading ? 'Sending code...' : 'Continue'}
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