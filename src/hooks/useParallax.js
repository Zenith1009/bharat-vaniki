import { useEffect, useRef, useState } from 'react';
import { parallaxManager } from '@/lib/optimizedParallax';

export function useParallax(options = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const initRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization
    if (initRef.current) return;
    
    const initializeParallax = async () => {
      try {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
          await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve, { once: true });
          });
        }

        // Initialize parallax
        parallaxManager.init();
        initRef.current = true;
        setIsLoaded(true);
        setError(null);
      } catch (err) {
        console.error('Failed to initialize parallax:', err);
        setError(err);
        setIsLoaded(false);
      }
    };

    initializeParallax();

    // Cleanup function
    return () => {
      if (initRef.current) {
        try {
          parallaxManager.destroy();
          initRef.current = false;
          setIsLoaded(false);
        } catch (err) {
          console.error('Failed to destroy parallax:', err);
        }
      }
    };
  }, []);

  return {
    isLoaded,
    error,
    parallaxManager
  };
}

export default useParallax;