'use client'
import { useState, FormEvent, useRef, useEffect } from 'react';
import Image from 'next/image';
import XLogo from '../../../(marketing)/assets/XThreat_icon_primary_white_to_gradient.svg'
import Link from 'next/link';
import { Copy, Loader2, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setAuthToken } from '@/lib/utils/jwt';
import { getClientIP, getDeviceInfo } from '@/lib/utils/session';
import { getTabSpecificSupabaseClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // Use Supabase client
  const supabaseClient = useRef(getTabSpecificSupabaseClient());

  // Check for existing session only once on mount
  useEffect(() => {
    if (isInitialized) return;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabaseClient.current.auth.getSession();
        if (session) {
          router.replace('/dashboard');
          return;
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    checkSession();
  }, [router, isInitialized]);

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
      // Disable global keydown handler if the target is an input
      if (e.target instanceof HTMLInputElement) return;
      
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
      
      // First check if user exists in database
      const { data: userData, error: checkError } = await supabaseClient.current
        .from('users')
        .select('id, email')
        .eq('email', normalizedEmail)
        .single();
      
      if (checkError || !userData) {
        // Track failed login attempt
        await supabaseClient.current
          .from('user_sessions')
          .insert([
            { 
              user_id: null,
              event_type: 'login_failed',
              timestamp: new Date().toISOString(),
              ip_address: window.location.hostname,
              user_agent: navigator.userAgent,
              error_message: 'Email not found'
            }
          ]);

        setAttemptCount(prev => prev + 1);
        throw new Error('Email not found. Please contact support to create an account.');
      }

      // Only send OTP if user exists
      const { error: otpError } = await supabaseClient.current.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          shouldCreateUser: false,
          emailRedirectTo: `${window.location.origin}/login/callback`,
        }
      });

      if (otpError) throw otpError;

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
      const { data, error } = await supabaseClient.current.auth.verifyOtp({
        email: email.toLowerCase(),
        token: otpString,
        type: 'email'
      });

      if (error) {
        // Track OTP verification failure
        await supabaseClient.current
          .from('user_sessions')
          .insert([
            { 
              user_id: null,
              event_type: 'login_failed',
              timestamp: new Date().toISOString(),
              ip_address: window.location.hostname,
              user_agent: navigator.userAgent,
              error_message: 'Invalid OTP'
            }
          ]);

        console.error('OTP verification error:', error);
        setError('Invalid verification code. Please try again.');
        resetOtp();
        return;
      }

      if (data?.user) {
        console.log(`Login successful for user: ${data.user.email}`);
        
        // Session will be automatically stored in sessionStorage by the client's
        // onAuthStateChange handler, so we don't need to store it manually.
        // Just trigger a navigation to dashboard
        
        // Track successful login
        const sessionId = Math.random().toString(36).substring(2);
        await supabaseClient.current
          .from('user_sessions')
          .insert([
            { 
              user_id: data.user.id,
              event_type: 'login',
              timestamp: new Date().toISOString(),
              ip_address: await getClientIP(),
              user_agent: navigator.userAgent,
              device_info: getDeviceInfo(),
              session_id: sessionId,
              session_status: 'active',
              last_active_at: new Date().toISOString()
            }
          ]);

        // Redirect to dashboard - using router.push instead of location.href
        // to prevent a full page reload
        console.log('OTP verified, redirecting to dashboard...');
        window.location.href = '/dashboard';
      } else {
        throw new Error('Authentication failed');
      }
      
    } catch (error) {
      console.error('Full error object:', error);
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
    <div className="min-h-screen font-sans bg-[#0b0b0b] [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <Link href="/" className="inline-flex">
            <Image
              src={XLogo}
              alt="X Logo"
              width={24}
              height={24}
              className="w-8 h-8"
              priority
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-normal mb-6">
            {showOtpInput ? 'Verification' : ''}
          </h1>
          <p className="text-lg text-neutral-400">
            {showOtpInput 
              ? `Enter the code sent to ${email}`
              : ''}
          </p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-8 text-red-400 text-center"
          >
            {error}
          </motion.div>
        )}

        {showOtpInput && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => setShowOtpInput(false)}
            className="flex text-sm items-center mb-10 text-neutral-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="mr-1" size={16}/> Back to login
          </motion.button>
        )}

        <motion.form
          ref={formRef}
          onSubmit={showOtpInput ? handleVerifyOTP : handleRequestOTP}
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {!showOtpInput ? (
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="bg-black border-b border-white/20 rounded-none px-0 py-3 h-auto text-lg font-normal focus:outline-none w-full text-center placeholder:text-neutral-400"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <div 
                ref={containerRef}
                tabIndex={-1}
                className="flex justify-between focus:outline-none"
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-11 h-16 text-center border-b border-white/20 bg-black text-xl font-normal focus:outline-none focus:border-white/50"
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || verifying}
              className="rounded-full border border-white/40 py-3 px-8 w-full hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading || verifying ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {loading ? 'Sending code...' : 'Verifying...'}
                </div>
              ) : (
                <>{showOtpInput ? 'Verify' : 'Continue'}</>
              )}
            </button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center mt-12"
        >
          <div className="flex items-center">
            <span className="text-neutral-400">Need help? </span>
            <span className="text-white ml-1">support@xthreat.eu</span>
            <button
              onClick={copyToClipboard}
              className="ml-2 text-neutral-400 hover:text-white"
              aria-label="Copy email"
            >
              <Copy size={14} />
            </button>
          </div>
          {copied && (
            <div className="text-green-400 text-sm mt-1">
              Copied to clipboard
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
