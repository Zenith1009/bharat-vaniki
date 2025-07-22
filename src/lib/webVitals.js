/**
 * Core Web Vitals monitoring utility
 * Tracks and reports performance metrics for optimization
 */

// Core Web Vitals thresholds (in milliseconds)
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 },   // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }  // Time to First Byte
};

// Performance metrics storage
let performanceMetrics = {
  LCP: null,
  FID: null,
  CLS: null,
  FCP: null,
  TTFB: null,
  navigationTiming: null
};

/**
 * Get performance rating based on thresholds
 */
function getPerformanceRating(metric, value) {
  const threshold = THRESHOLDS[metric];
  if (!threshold) return 'unknown';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Report metric to analytics or console
 */
function reportMetric(name, value, rating, delta) {
  const metric = {
    name,
    value,
    rating,
    delta,
    timestamp: Date.now(),
    url: window.location.href,
    userAgent: navigator.userAgent
  };

  // Store metric
  performanceMetrics[name] = metric;

  // Report to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}:`, {
      value: `${value}${name === 'CLS' ? '' : 'ms'}`,
      rating,
      delta: delta ? `${delta}${name === 'CLS' ? '' : 'ms'}` : undefined
    });
  }

  // Report to analytics service (implement based on your analytics provider)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: rating,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true
    });
  }

  // Custom event for other analytics
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('webVital', {
      detail: metric
    }));
  }
}

/**
 * Initialize Core Web Vitals monitoring
 */
export function initWebVitals() {
  if (typeof window === 'undefined') return;

  // Dynamic import to avoid SSR issues
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    // Largest Contentful Paint
    getLCP((metric) => {
      const rating = getPerformanceRating('LCP', metric.value);
      reportMetric('LCP', metric.value, rating, metric.delta);
    });

    // First Input Delay
    getFID((metric) => {
      const rating = getPerformanceRating('FID', metric.value);
      reportMetric('FID', metric.value, rating, metric.delta);
    });

    // Cumulative Layout Shift
    getCLS((metric) => {
      const rating = getPerformanceRating('CLS', metric.value);
      reportMetric('CLS', metric.value, rating, metric.delta);
    });

    // First Contentful Paint
    getFCP((metric) => {
      const rating = getPerformanceRating('FCP', metric.value);
      reportMetric('FCP', metric.value, rating, metric.delta);
    });

    // Time to First Byte
    getTTFB((metric) => {
      const rating = getPerformanceRating('TTFB', metric.value);
      reportMetric('TTFB', metric.value, rating, metric.delta);
    });
  }).catch((error) => {
    console.warn('Failed to load web-vitals library:', error);
  });

  // Navigation Timing API for additional metrics
  if ('performance' in window && 'getEntriesByType' in performance) {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        performanceMetrics.navigationTiming = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          domInteractive: navigation.domInteractive - navigation.fetchStart,
          totalLoadTime: navigation.loadEventEnd - navigation.fetchStart
        };

        if (process.env.NODE_ENV === 'development') {
          console.log('[Navigation Timing]:', performanceMetrics.navigationTiming);
        }
      }
    });
  }
}

/**
 * Get current performance metrics
 */
export function getPerformanceMetrics() {
  return { ...performanceMetrics };
}

/**
 * Performance observer for monitoring resource loading
 */
export function initResourceMonitoring() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  try {
    // Monitor resource loading performance
    const resourceObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.duration > 1000) { // Resources taking more than 1 second
          console.warn(`[Slow Resource] ${entry.name}: ${Math.round(entry.duration)}ms`);
        }
      });
    });

    resourceObserver.observe({ entryTypes: ['resource'] });

    // Monitor long tasks (blocking main thread)
    const longTaskObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.warn(`[Long Task] Duration: ${Math.round(entry.duration)}ms, Start: ${Math.round(entry.startTime)}ms`);
      });
    });

    longTaskObserver.observe({ entryTypes: ['longtask'] });

  } catch (error) {
    console.warn('Performance monitoring not supported:', error);
  }
}

/**
 * Memory usage monitoring
 */
export function getMemoryUsage() {
  if (typeof window === 'undefined' || !('performance' in window) || !('memory' in performance)) {
    return null;
  }

  const memory = performance.memory;
  return {
    usedJSHeapSize: Math.round(memory.usedJSHeapSize / 1048576), // MB
    totalJSHeapSize: Math.round(memory.totalJSHeapSize / 1048576), // MB
    jsHeapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
  };
}

/**
 * Performance summary for debugging
 */
export function getPerformanceSummary() {
  const metrics = getPerformanceMetrics();
  const memory = getMemoryUsage();
  
  return {
    coreWebVitals: {
      LCP: metrics.LCP,
      FID: metrics.FID,
      CLS: metrics.CLS,
      FCP: metrics.FCP,
      TTFB: metrics.TTFB
    },
    navigationTiming: metrics.navigationTiming,
    memoryUsage: memory,
    timestamp: Date.now(),
    url: typeof window !== 'undefined' ? window.location.href : null
  };
}

// Export for use in _app.js
export default initWebVitals;