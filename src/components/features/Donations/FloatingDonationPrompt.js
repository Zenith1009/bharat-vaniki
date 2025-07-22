import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingDonationPrompt = ({ 
  showAfterScroll = 800, 
  hideAfterTime = 30000, // Hide after 30 seconds
  position = 'bottom-right' // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasScrolledEnough, setHasScrolledEnough] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > showAfterScroll && !isDismissed) {
        setHasScrolledEnough(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll, isDismissed]);

  useEffect(() => {
    if (hasScrolledEnough && !isDismissed) {
      // Show after a small delay when scroll threshold is reached
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      // Auto-hide after specified time
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, hideAfterTime);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [hasScrolledEnough, isDismissed, hideAfterTime]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'top-left':
        return 'top-6 left-6';
      case 'bottom-right':
      default:
        return 'bottom-6 right-6';
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed ${getPositionClasses()} z-50 max-w-sm`}
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-2xl p-6 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 text-white/70 hover:text-white transition-colors"
              aria-label="Close donation prompt"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <div className="bg-white/20 rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold">Help Save Forests</h3>
              </div>

              <p className="text-sm text-green-100 mb-4">
                Your donation can make a real difference in protecting India's forests and wildlife.
              </p>

              <div className="bg-white/10 rounded-lg p-3 mb-4">
                <div className="text-center">
                  <div className="text-xl font-bold mb-1">₹500</div>
                  <div className="text-xs text-green-100">Plants 50 tree saplings</div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <a
                  href="/donate"
                  className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold text-center hover:bg-green-50 transition-colors duration-300 text-sm"
                  onClick={() => {
                    // Track donation click
                    console.log('Floating donation prompt clicked');
                  }}
                >
                  🌱 Donate Now
                </a>
                <button
                  onClick={handleDismiss}
                  className="text-white/80 hover:text-white text-xs underline"
                >
                  Maybe later
                </button>
              </div>

              <div className="mt-3 text-xs text-green-100 text-center">
                ✓ Secure & verified organizations
              </div>
            </div>

            {/* Animated pulse effect */}
            <motion.div
              className="absolute inset-0 bg-white/5 rounded-lg"
              animate={{
                opacity: [0, 0.1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingDonationPrompt;