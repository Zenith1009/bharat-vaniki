import { useState, useEffect } from 'react';

/**
 * Hook for managing performance dashboard visibility
 * Provides keyboard shortcut (Ctrl+Shift+P) to toggle dashboard
 */
export function usePerformanceDashboard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Toggle dashboard with Ctrl+Shift+P
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        setIsVisible(prev => !prev);
      }

      // Close dashboard with Escape
      if (event.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  // Only show in development or when explicitly enabled
  const shouldShow = process.env.NODE_ENV === 'development' || 
                    (typeof window !== 'undefined' && window.localStorage.getItem('enablePerformanceDashboard') === 'true');

  return {
    isVisible: isVisible && shouldShow,
    toggle: () => setIsVisible(prev => !prev),
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false)
  };
}