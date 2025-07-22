/**
 * Analytics and monitoring configuration for production deployment
 * Supports Google Analytics, Vercel Analytics, and custom event tracking
 */

// Analytics configuration
const ANALYTICS_CONFIG = {
  googleAnalytics: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
    enabled: process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  },
  vercelAnalytics: {
    enabled: process.env.NODE_ENV === 'production'
  },
  customEvents: {
    enabled: true
  }
};

/**
 * Initialize Google Analytics
 */
export function initGoogleAnalytics() {
  if (!ANALYTICS_CONFIG.googleAnalytics.enabled) {
    console.log('[Analytics] Google Analytics disabled or not configured');
    return;
  }

  const { measurementId } = ANALYTICS_CONFIG.googleAnalytics;

  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
    // Privacy-focused configuration
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  console.log('[Analytics] Google Analytics initialized');
}

/**
 * Initialize Vercel Analytics
 */
export function initVercelAnalytics() {
  if (!ANALYTICS_CONFIG.vercelAnalytics.enabled) {
    console.log('[Analytics] Vercel Analytics disabled');
    return;
  }

  // Vercel Analytics is automatically enabled in production
  // This function can be extended for custom Vercel Analytics configuration
  console.log('[Analytics] Vercel Analytics enabled');
}

/**
 * Track page view
 */
export function trackPageView(url, title) {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (window.gtag && ANALYTICS_CONFIG.googleAnalytics.enabled) {
    window.gtag('config', ANALYTICS_CONFIG.googleAnalytics.measurementId, {
      page_title: title,
      page_location: url
    });
  }

  // Custom event
  if (ANALYTICS_CONFIG.customEvents.enabled) {
    window.dispatchEvent(new CustomEvent('pageView', {
      detail: { url, title, timestamp: Date.now() }
    }));
  }
}

/**
 * Track custom events
 */
export function trackEvent(eventName, parameters = {}) {
  if (typeof window === 'undefined') return;

  // Google Analytics
  if (window.gtag && ANALYTICS_CONFIG.googleAnalytics.enabled) {
    window.gtag('event', eventName, {
      event_category: parameters.category || 'engagement',
      event_label: parameters.label,
      value: parameters.value,
      ...parameters
    });
  }

  // Custom event
  if (ANALYTICS_CONFIG.customEvents.enabled) {
    window.dispatchEvent(new CustomEvent('customEvent', {
      detail: { eventName, parameters, timestamp: Date.now() }
    }));
  }

  console.log(`[Analytics] Event tracked: ${eventName}`, parameters);
}

/**
 * Track quiz interactions
 */
export function trackQuizEvent(action, data = {}) {
  trackEvent('quiz_interaction', {
    category: 'quiz',
    label: action,
    quiz_category: data.category,
    question_id: data.questionId,
    score: data.score,
    completion_time: data.completionTime
  });
}

/**
 * Track donation interactions
 */
export function trackDonationEvent(action, data = {}) {
  trackEvent('donation_interaction', {
    category: 'donation',
    label: action,
    organization: data.organization,
    cause_id: data.causeId,
    amount: data.amount
  });
}

/**
 * Track insights interactions
 */
export function trackInsightsEvent(action, data = {}) {
  trackEvent('insights_interaction', {
    category: 'insights',
    label: action,
    chart_type: data.chartType,
    data_category: data.dataCategory
  });
}

/**
 * Track performance metrics
 */
export function trackPerformanceMetric(metric, value, rating) {
  trackEvent('performance_metric', {
    category: 'performance',
    label: metric,
    value: Math.round(value),
    rating: rating,
    non_interaction: true
  });
}

/**
 * Track errors
 */
export function trackError(error, context = {}) {
  trackEvent('error', {
    category: 'error',
    label: error.message || 'Unknown error',
    error_type: error.name || 'Error',
    page: context.page || window.location.pathname,
    user_agent: navigator.userAgent,
    fatal: context.fatal || false
  });

  console.error('[Analytics] Error tracked:', error, context);
}

/**
 * Track user engagement
 */
export function trackEngagement(action, data = {}) {
  trackEvent('user_engagement', {
    category: 'engagement',
    label: action,
    ...data
  });
}

/**
 * Initialize all analytics services
 */
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // Initialize services
  initGoogleAnalytics();
  initVercelAnalytics();

  // Track initial page view
  trackPageView(window.location.href, document.title);

  // Set up error tracking
  window.addEventListener('error', (event) => {
    trackError(event.error, {
      page: window.location.pathname,
      fatal: true
    });
  });

  // Set up unhandled promise rejection tracking
  window.addEventListener('unhandledrejection', (event) => {
    trackError(new Error(event.reason), {
      page: window.location.pathname,
      fatal: false
    });
  });

  console.log('[Analytics] All analytics services initialized');
}

/**
 * Get analytics configuration status
 */
export function getAnalyticsStatus() {
  return {
    googleAnalytics: {
      enabled: ANALYTICS_CONFIG.googleAnalytics.enabled,
      measurementId: ANALYTICS_CONFIG.googleAnalytics.measurementId
    },
    vercelAnalytics: {
      enabled: ANALYTICS_CONFIG.vercelAnalytics.enabled
    },
    customEvents: {
      enabled: ANALYTICS_CONFIG.customEvents.enabled
    }
  };
}

export default initAnalytics;