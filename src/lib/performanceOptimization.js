/**
 * Performance optimization utilities
 * Provides tools for monitoring and improving app performance
 */

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  const criticalResources = [
    '/img/background.png',
    '/image/logo.png',
    '/image/image-1.jpg',
    '/image/image-3.jpg'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.includes('.png') || resource.includes('.jpg') ? 'image' : 'fetch';
    link.href = resource;
    document.head.appendChild(link);
  });
}

/**
 * Prefetch next page resources
 */
export function prefetchRoute(href) {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Optimize images with intersection observer
 */
export function createImageObserver(callback) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
        }
      });
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01
    }
  );
}

/**
 * Debounce function for performance optimization
 */
export function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Lazy load component with dynamic import
 */
export function lazyLoadComponent(importFunc, fallback = null) {
  return React.lazy(() => 
    importFunc().catch(() => ({
      default: () => fallback || React.createElement('div', null, 'Failed to load component')
    }))
  );
}

/**
 * Optimize scroll performance
 */
export function optimizeScroll(callback) {
  if (typeof window === 'undefined') return;

  let ticking = false;

  const optimizedCallback = () => {
    callback();
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(optimizedCallback);
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

/**
 * Resource hints for better loading performance
 */
export function addResourceHints() {
  if (typeof document === 'undefined') return;

  // DNS prefetch for external domains
  const dnsPrefetchDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'images.unsplash.com',
    'cdn.pixabay.com'
  ];

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });

  // Preconnect to critical domains
  const preconnectDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = `https://${domain}`;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Bundle size analyzer (development only)
 */
export function analyzeBundleSize() {
  if (process.env.NODE_ENV !== 'development') return;

  // This would integrate with webpack-bundle-analyzer in a real implementation
  console.log('Bundle analysis would run here in development mode');
}

/**
 * Critical CSS extraction utility
 */
export function extractCriticalCSS() {
  if (typeof document === 'undefined') return '';

  const criticalSelectors = [
    'body',
    'html',
    '.hero',
    '.navigation',
    '.footer',
    '.loading'
  ];

  // This is a simplified version - in production, you'd use a proper critical CSS tool
  const criticalRules = [];
  
  Array.from(document.styleSheets).forEach(sheet => {
    try {
      Array.from(sheet.cssRules || []).forEach(rule => {
        if (rule.type === CSSRule.STYLE_RULE) {
          const selector = rule.selectorText;
          if (criticalSelectors.some(critical => selector.includes(critical))) {
            criticalRules.push(rule.cssText);
          }
        }
      });
    } catch (e) {
      // Cross-origin stylesheets may throw errors
      console.warn('Could not access stylesheet:', e);
    }
  });

  return criticalRules.join('\n');
}

/**
 * Performance budget checker
 */
export function checkPerformanceBudget() {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  const budget = {
    maxLoadTime: 3000, // 3 seconds
    maxDOMNodes: 1500,
    maxImageSize: 500 * 1024, // 500KB
    maxJSSize: 1000 * 1024, // 1MB
    maxCSSSize: 100 * 1024 // 100KB
  };

  const navigation = performance.getEntriesByType('navigation')[0];
  const loadTime = navigation ? navigation.loadEventEnd - navigation.fetchStart : 0;

  const results = {
    loadTime: {
      value: loadTime,
      budget: budget.maxLoadTime,
      passed: loadTime <= budget.maxLoadTime
    },
    domNodes: {
      value: document.querySelectorAll('*').length,
      budget: budget.maxDOMNodes,
      passed: document.querySelectorAll('*').length <= budget.maxDOMNodes
    }
  };

  // Check resource sizes
  const resources = performance.getEntriesByType('resource');
  resources.forEach(resource => {
    if (resource.name.includes('.js')) {
      results.jsSize = {
        value: resource.transferSize,
        budget: budget.maxJSSize,
        passed: resource.transferSize <= budget.maxJSSize
      };
    }
    if (resource.name.includes('.css')) {
      results.cssSize = {
        value: resource.transferSize,
        budget: budget.maxCSSSize,
        passed: resource.transferSize <= budget.maxCSSSize
      };
    }
  });

  if (process.env.NODE_ENV === 'development') {
    console.table(results);
  }

  return results;
}

/**
 * Initialize all performance optimizations
 */
export function initPerformanceOptimizations() {
  if (typeof window === 'undefined') return;

  // Add resource hints
  addResourceHints();

  // Preload critical resources
  preloadCriticalResources();

  // Check performance budget in development
  if (process.env.NODE_ENV === 'development') {
    window.addEventListener('load', () => {
      setTimeout(checkPerformanceBudget, 1000);
    });
  }

  // Optimize scroll performance for parallax effects
  const parallaxElements = document.querySelectorAll('.parallax');
  if (parallaxElements.length > 0) {
    optimizeScroll(() => {
      // Parallax scroll optimization would go here
    });
  }
}

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
}