/**
 * Production monitoring and health check utilities
 * Monitors application health, performance, and external dependencies
 */

import { getPerformanceMetrics, getMemoryUsage } from './webVitals';
import { trackError, trackPerformanceMetric } from './analytics';

// Monitoring configuration
const MONITORING_CONFIG = {
  healthCheck: {
    interval: 60000, // 1 minute
    enabled: process.env.NODE_ENV === 'production'
  },
  errorTracking: {
    enabled: true,
    maxErrors: 100
  },
  performanceTracking: {
    enabled: true,
    thresholds: {
      apiResponse: 5000, // 5 seconds
      pageLoad: 3000,    // 3 seconds
      memoryUsage: 100   // 100MB
    }
  }
};

// Error storage for monitoring
let errorLog = [];
let healthStatus = {
  status: 'healthy',
  lastCheck: null,
  checks: {}
};

/**
 * Check API endpoints health
 */
async function checkAPIHealth() {
  const endpoints = [
    '/api/quiz/questions',
    '/api/insights/stats',
    '/api/donations/causes',
    '/api/contact'
  ];

  const results = {};

  for (const endpoint of endpoints) {
    try {
      const startTime = Date.now();
      const response = await fetch(endpoint, { method: 'HEAD' });
      const responseTime = Date.now() - startTime;

      results[endpoint] = {
        status: response.ok ? 'healthy' : 'unhealthy',
        responseTime,
        statusCode: response.status
      };

      // Track slow API responses
      if (responseTime > MONITORING_CONFIG.performanceTracking.thresholds.apiResponse) {
        trackPerformanceMetric('slow_api_response', responseTime, 'poor');
      }

    } catch (error) {
      results[endpoint] = {
        status: 'error',
        error: error.message,
        responseTime: null
      };

      trackError(error, {
        context: 'api_health_check',
        endpoint
      });
    }
  }

  return results;
}

/**
 * Check external dependencies
 */
async function checkExternalDependencies() {
  const dependencies = [];

  // Check Supabase connection
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
        method: 'HEAD',
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
      });

      dependencies.push({
        name: 'Supabase',
        status: response.ok ? 'healthy' : 'unhealthy',
        statusCode: response.status
      });
    } catch (error) {
      dependencies.push({
        name: 'Supabase',
        status: 'error',
        error: error.message
      });
    }
  }

  // Check GraphCMS connection
  if (process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT) {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: '{ __typename }'
        })
      });

      dependencies.push({
        name: 'GraphCMS',
        status: response.ok ? 'healthy' : 'unhealthy',
        statusCode: response.status
      });
    } catch (error) {
      dependencies.push({
        name: 'GraphCMS',
        status: 'error',
        error: error.message
      });
    }
  }

  return dependencies;
}

/**
 * Check application performance
 */
function checkPerformance() {
  const metrics = getPerformanceMetrics();
  const memory = getMemoryUsage();

  const performance = {
    webVitals: metrics,
    memory: memory,
    timestamp: Date.now()
  };

  // Check memory usage
  if (memory && memory.usedJSHeapSize > MONITORING_CONFIG.performanceTracking.thresholds.memoryUsage) {
    trackPerformanceMetric('high_memory_usage', memory.usedJSHeapSize, 'poor');
  }

  return performance;
}

/**
 * Perform comprehensive health check
 */
export async function performHealthCheck() {
  if (!MONITORING_CONFIG.healthCheck.enabled) return null;

  try {
    const [apiHealth, dependencies, performance] = await Promise.all([
      checkAPIHealth(),
      checkExternalDependencies(),
      Promise.resolve(checkPerformance())
    ]);

    // Determine overall health status
    const apiHealthy = Object.values(apiHealth).every(check => check.status === 'healthy');
    const dependenciesHealthy = dependencies.every(dep => dep.status === 'healthy');

    const overallStatus = apiHealthy && dependenciesHealthy ? 'healthy' : 'degraded';

    healthStatus = {
      status: overallStatus,
      lastCheck: new Date().toISOString(),
      checks: {
        api: apiHealth,
        dependencies,
        performance
      }
    };

    // Log health check results
    console.log(`[Monitoring] Health check completed: ${overallStatus}`);

    return healthStatus;

  } catch (error) {
    trackError(error, { context: 'health_check' });
    
    healthStatus = {
      status: 'error',
      lastCheck: new Date().toISOString(),
      error: error.message
    };

    return healthStatus;
  }
}

/**
 * Start monitoring services
 */
export function startMonitoring() {
  if (typeof window === 'undefined' || !MONITORING_CONFIG.healthCheck.enabled) return;

  console.log('[Monitoring] Starting monitoring services...');

  // Initial health check
  performHealthCheck();

  // Set up periodic health checks
  const healthCheckInterval = setInterval(performHealthCheck, MONITORING_CONFIG.healthCheck.interval);

  // Monitor page visibility for performance tracking
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // Page became visible, check performance
      const performance = checkPerformance();
      console.log('[Monitoring] Page visibility changed, performance check:', performance);
    }
  });

  // Return cleanup function
  return () => {
    clearInterval(healthCheckInterval);
    console.log('[Monitoring] Monitoring services stopped');
  };
}

/**
 * Get current health status
 */
export function getHealthStatus() {
  return { ...healthStatus };
}

/**
 * Log error for monitoring
 */
export function logError(error, context = {}) {
  if (!MONITORING_CONFIG.errorTracking.enabled) return;

  const errorEntry = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : null,
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : null,
    context
  };

  errorLog.push(errorEntry);

  // Keep only recent errors
  if (errorLog.length > MONITORING_CONFIG.errorTracking.maxErrors) {
    errorLog = errorLog.slice(-MONITORING_CONFIG.errorTracking.maxErrors);
  }

  // Track in analytics
  trackError(error, context);

  console.error('[Monitoring] Error logged:', errorEntry);
}

/**
 * Get error log
 */
export function getErrorLog() {
  return [...errorLog];
}

/**
 * Clear error log
 */
export function clearErrorLog() {
  errorLog = [];
  console.log('[Monitoring] Error log cleared');
}

/**
 * Create monitoring report
 */
export function createMonitoringReport() {
  const health = getHealthStatus();
  const errors = getErrorLog();
  const performance = checkPerformance();

  return {
    timestamp: new Date().toISOString(),
    health,
    errors: errors.slice(-10), // Last 10 errors
    performance,
    config: MONITORING_CONFIG
  };
}

/**
 * Export monitoring data for external services
 */
export function exportMonitoringData() {
  const report = createMonitoringReport();
  
  // Convert to JSON for export
  const data = JSON.stringify(report, null, 2);
  
  // Create downloadable file
  if (typeof window !== 'undefined') {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `monitoring-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return data;
}

export default startMonitoring;