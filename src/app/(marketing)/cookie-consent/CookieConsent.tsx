import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentProps {
  delay?: number;
  reappearDelay?: number;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
  delay = 1500,
  reappearDelay = 24 * 60 * 60 * 1000,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showManager, setShowManager] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: true,
  });

  useEffect(() => {
    const checkConsent = () => {
      const hasConsent = localStorage.getItem('cookieConsent');
      const savedPreferences = localStorage.getItem('cookiePreferences');
      
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
      
      if (!hasConsent) {
        setIsVisible(true);
      }
    };

    const timer = setTimeout(checkConsent, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', 'custom');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setIsVisible(false);
    setShowManager(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsentDeclinedAt', Date.now().toString());
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {showManager ? (
            <motion.div 
              key="manager"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ 
                  duration: 0.2,
                  ease: "easeOut"
                }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-hidden"
              >
                {/* Glossy highlight effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
                
                <div className="p-6 relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-200">Cookie Preferences</h2>
                    <button
                      onClick={() => setShowManager(false)}
                      className="text-gray-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors absolute top-4 right-4"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-gray-200 font-medium">Necessary Cookies</h3>
                        <p className="text-gray-400 text-sm">Required for the website to function</p>
                      </div>
                      <div className="bg-white/5 px-3 py-1 rounded text-gray-300 text-sm border border-white/10">Required</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-gray-200 font-medium">Analytics Cookies</h3>
                        <p className="text-gray-400 text-sm">Help us improve our website</p>
                      </div>
                      <button
                        onClick={() => togglePreference('analytics')}
                        className={`w-11 h-6 rounded-full transition-colors ${
                          preferences.analytics ? 'bg-white/60' : 'bg-white/20'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-gray-200 font-medium">Marketing Cookies</h3>
                        <p className="text-gray-400 text-sm">Used for personalized advertisements</p>
                      </div>
                      <button
                        onClick={() => togglePreference('marketing')}
                        className={`w-11 h-6 rounded-full transition-colors ${
                          preferences.marketing ? 'bg-white/60' : 'bg-white/20'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                          preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleSavePreferences}
                      className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors border border-white/10 backdrop-blur-sm"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div 
              key="consent"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ 
                duration: 0.2,
                ease: "easeOut"
              }}
              className="fixed bottom-6 left-6 right-6 z-50"
            >
              <div className="max-w-7xl mx-auto">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative overflow-hidden">
                  {/* Glossy highlight effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/10 to-transparent pointer-events-none" />
                  
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors sm:hidden"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>

                  <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
                    <div className="flex-1">
                      <p className="text-gray-200 text-sm sm:text-base">
                        We use cookies to enhance your browsing experience and analyze our traffic. 
                        By continuing, you agree to our use of cookies. 
                        <button onClick={handleAccept} className="text-gray-300 hover:text-gray-200 underline ml-1 inline-flex">
                          Learn more
                        </button>
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setShowManager(true)}
                        className="text-gray-300 hover:text-gray-200 underline text-sm"
                      >
                        Manage cookies
                      </button>
                      <button
                        onClick={handleAccept}
                        className="bg-white/90 hover:bg-white/80 text-black px-6 py-2.5 rounded-xl text-sm font-medium transition-colors border border-white/10 backdrop-blur-sm whitespace-nowrap"
                      >
                        Accept all
                      </button>
                      <button
                        onClick={handleDecline}
                        className="bg-white/5 hover:bg-white/10 text-gray-200 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors border border-white/5 backdrop-blur-sm"
                      >
                        Decline
                      </button>
                      <button
                        onClick={handleClose}
                        className="hidden sm:block text-gray-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        aria-label="Close"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;