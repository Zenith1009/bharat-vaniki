import { useState, useEffect, useCallback } from 'react';
import { getPerformanceMetrics, getMemoryUsage, getPerformanceSummary } from '@/lib/webVitals';

/**
 * Custom hook for performance monitoring and optimization
 */
export function usePerformance() {
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [memoryUsage, setMemoryUsage] = useState(null);

  // Update metrics periodically
  const updateMetrics = useCallback(() => {
    const currentMetrics = getPerformanceMetrics();
    const currentMemory = getMemoryUsage();
    
    setMetrics(currentMetrics);
    setMemoryUsage(currentMemory);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Initial load
    updateMetrics();

    // Listen for web vital events
    const handleWebVital = (event) => {
      updateMetrics();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('webVital', handleWebVital);
    }

    // Update metrics every 5 seconds
    const interval = setInterval(updateMetrics, 5000);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('webVital', handleWebVital);
      }
      clearInterval(interval);
    };
  }, [updateMetrics]);

  // Get performance summary
  const getSummary = useCallback(() => {
    return getPerformanceSummary();
  }, []);

  // Check if performance is good
  const isPerformanceGood = useCallback(() => {
    if (!metrics) return null;

    const checks = {
      LCP: metrics.LCP?.rating === 'good',
      FID: metrics.FID?.rating === 'good',
      CLS: metrics.CLS?.rating === 'good',
      FCP: metrics.FCP?.rating === 'good',
      TTFB: metrics.TTFB?.rating === 'good'
    };

    const goodCount = Object.values(checks).filter(Boolean).length;
    const totalCount = Object.values(checks).filter(v => v !== null).length;

    return {
      isGood: goodCount >= totalCount * 0.8, // 80% of metrics should be good
      score: totalCount > 0 ? (goodCount / totalCount) * 100 : 0,
      details: checks
    };
  }, [metrics]);

  return {
    metrics,
    memoryUsage,
    isLoading,
    getSummary,
    isPerformanceGood: isPerformanceGood(),
    refresh: updateMetrics
  };
}

/**
 * Hook for monitoring component render performance
 */
export function useRenderPerformance(componentName) {
  const [renderTimes, setRenderTimes] = useState([]);
  const [averageRenderTime, setAverageRenderTime] = useState(0);

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      setRenderTimes(prev => {
        const newTimes = [...prev, renderTime].slice(-10); // Keep last 10 renders
        const average = newTimes.reduce((sum, time) => sum + time, 0) / newTimes.length;
        setAverageRenderTime(average);
        return newTimes;
      });

      // Log slow renders in development
      if (process.env.NODE_ENV === 'development' && renderTime > 16) {
        console.warn(`[Slow Render] ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    };
  });

  return {
    renderTimes,
    averageRenderTime,
    lastRenderTime: renderTimes[renderTimes.length - 1] || 0
  };
}

/**
 * Hook for lazy loading with intersection observer
 */
export function useLazyLoad(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const ref = useCallback((node) => {
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsIntersecting(true);
          setHasLoaded(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasLoaded, options]);

  return [ref, isIntersecting, hasLoaded];
}

/**
 * Hook for preloading resources
 */
export function usePreload() {
  const preloadImage = useCallback((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const preloadImages = useCallback(async (srcs) => {
    try {
      const promises = srcs.map(src => preloadImage(src));
      await Promise.all(promises);
      return true;
    } catch (error) {
      console.warn('Failed to preload images:', error);
      return false;
    }
  }, [preloadImage]);

  const preloadRoute = useCallback((href) => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
      });
    }
  }, []);

  return {
    preloadImage,
    preloadImages,
    preloadRoute
  };
}