import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Navigation from './Navigation';
import Footer from './Footer';
import PerformanceDashboard from '@/components/debug/PerformanceDashboard';
import { usePerformanceDashboard } from '@/hooks/usePerformanceDashboard';

// Global state context for theme and navigation
const LayoutContext = createContext();

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: -20,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4,
};

const Layout = ({ children, pageKey }) => {
  const router = useRouter();
  const [theme, setTheme] = useState('light');
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isVisible: isDashboardVisible, hide: hideDashboard } = usePerformanceDashboard();

  // Handle route changes for loading states
  useEffect(() => {
    const handleRouteChangeStart = () => setIsLoading(true);
    const handleRouteChangeComplete = () => setIsLoading(false);
    const handleRouteChangeError = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  // Close mobile navigation on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsNavigationOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const contextValue = {
    theme,
    setTheme,
    isNavigationOpen,
    setIsNavigationOpen,
    isLoading,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content with Page Transitions */}
        <main className="flex-grow">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pageKey || router.asPath}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
              className="w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer />

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-4 h-4 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Performance Dashboard (Development only) */}
        <PerformanceDashboard 
          isVisible={isDashboardVisible} 
          onClose={hideDashboard} 
        />
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;