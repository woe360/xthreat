//adding types ontop of supabase
// 'use client'
// import { useState, FormEvent } from 'react';
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
//   const [password, setPassword] = useState('');
//   const [copied, setCopied] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  
//   const router = useRouter();
//   const supabase = createClientComponentClient();

//   const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });

//       if (error) throw error;

//       router.push('/dashboard');
//       router.refresh();
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     try {
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//           redirectTo: `${window.location.origin}/auth/callback`
//         }
//       });

//       if (error) throw error;
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'An error occurred');
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText('support@xthreat.eu').then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r bg-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
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
//             <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm">
//               {error}
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSignIn}>
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-900/30 focus:outline-none focus:ring-[#b87121] focus:border-[#b87121] focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <BottomGradient />
//             </div>

//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 placeholder="Password"
//                 required
//                 className="appearance-none block w-full px-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 bg-gray-900/30 focus:outline-none focus:ring-[#b87121] focus:border-[#b87121] sm:text-sm"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <BottomGradient />
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? 'Signing in...' : 'Continue'}
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

//changing it to OTP.

// 'use client'
// import { useState, FormEvent } from 'react';
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
//   const [otp, setOtp] = useState('');
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [copied, setCopied] = useState(false);
  
//   const router = useRouter();
//   const supabase = createClientComponentClient();

//   const handleRequestOTP = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const { error } = await supabase.auth.signInWithOtp({
//         email,
//         options: {
//           emailRedirectTo: `${window.location.origin}/auth/callback`,
//         }
//       });

//       if (error) throw error;

//       setShowOtpInput(true);
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const { error } = await supabase.auth.verifyOtp({
//         email,
//         token: otp,
//         type: 'email'
//       });

//       if (error) throw error;

//       router.push('/dashboard');
//       router.refresh();
//     } catch (error) {
//       setError(error instanceof Error ? error.message : 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText('support@xthreat.eu').then(() => {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r bg-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
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
//             <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm">
//               {error}
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={showOtpInput ? handleVerifyOTP : handleRequestOTP}>
//             <div>
//               <label htmlFor="email" className="sr-only">
//                 Email address
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-700 placeholder-gray-500 text-white bg-gray-900/30 focus:outline-none focus:ring-[#b87121] focus:border-[#b87121] focus:z-10 sm:text-sm"
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={showOtpInput}
//               />
//               <BottomGradient />
//             </div>

//             {showOtpInput && (
//               <div>
//                 <label htmlFor="otp" className="sr-only">
//                   Verification Code
//                 </label>
//                 <input
//                   id="otp"
//                   name="otp"
//                   type="text"
//                   required
//                   maxLength={6}
//                   pattern="[0-9]{6}"
//                   className="appearance-none block w-full px-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 bg-gray-900/30 focus:outline-none focus:ring-[#b87121] focus:border-[#b87121] sm:text-sm"
//                   placeholder="Enter 6-digit code"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
//                 />
//                 <BottomGradient />
//               </div>
//             )}

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading 
//                   ? (showOtpInput ? 'Verifying...' : 'Sending code...') 
//                   : (showOtpInput ? 'Verify Code' : 'Send Code')}
//               </button>
//             </div>
//           </form>

//           {/* Keep your support email section as is */}
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
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleRequestOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) throw error;

      setShowOtpInput(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp.join(''),
        type: 'email'
      });

      if (error) throw error;

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
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

    // Move to next input if current field is filled
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current field is empty
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('support@xthreat.eu').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r bg-black flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="mt-8 bg-gray-900/30 [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] border border-gray-800 py-8 px-4 shadow rounded-xl sm:px-10">
          <div className="bg-transparent py-4 mb-4 px-4 shadow rounded-xl sm:px-10">
            <Link href="/">
              <Image
                src={XLogo}
                alt="X Logo"
                width={16}
                height={16}
                className="w-8 h-8 mx-auto md:w-[30px] md:h-[30px]"
              />
            </Link>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={showOtpInput ? handleVerifyOTP : handleRequestOTP}>
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
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center border border-gray-700 rounded-md text-white bg-gray-900/30 focus:outline-none focus:ring-[#d1d0d0] focus:border-[#d1d0d0] text-xl"
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading || (showOtpInput && otp.join('').length !== 6)}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading 
                  ? (showOtpInput ? 'Verifying...' : 'Sending code...') 
                  : (showOtpInput ? 'Verify Code' : 'Send Code')}
              </button>
            </div>
          </form>

          {/* Support email section */}
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

