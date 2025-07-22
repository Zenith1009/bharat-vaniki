/**
 * Health check API endpoint for production monitoring
 * Provides system status and performance metrics
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for health checks
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  : null;

/**
 * Check database connectivity
 */
async function checkDatabase() {
  if (!supabase) {
    return { status: 'not_configured', message: 'Database not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('quiz_scores')
      .select('count')
      .limit(1);

    if (error) {
      return { status: 'error', message: error.message };
    }

    return { status: 'healthy', message: 'Database connection successful' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}

/**
 * Check external API dependencies
 */
async function checkExternalAPIs() {
  const checks = {};

  // Check GraphCMS if configured
  if (process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT) {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: '{ __typename }'
        }),
        timeout: 5000
      });

      checks.graphcms = {
        status: response.ok ? 'healthy' : 'unhealthy',
        statusCode: response.status,
        responseTime: response.headers.get('x-response-time') || 'unknown'
      };
    } catch (error) {
      checks.graphcms = {
        status: 'error',
        message: error.message
      };
    }
  }

  return checks;
}

/**
 * Get system information
 */
function getSystemInfo() {
  return {
    nodeVersion: process.version,
    platform: process.platform,
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  };
}

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const startTime = Date.now();

    // Perform health checks
    const [databaseCheck, externalAPIs] = await Promise.all([
      checkDatabase(),
      checkExternalAPIs()
    ]);

    const responseTime = Date.now() - startTime;
    const systemInfo = getSystemInfo();

    // Determine overall health status
    const isHealthy = databaseCheck.status === 'healthy' || databaseCheck.status === 'not_configured';
    const externalAPIsHealthy = Object.values(externalAPIs).every(
      api => api.status === 'healthy'
    );

    const overallStatus = isHealthy && externalAPIsHealthy ? 'healthy' : 'degraded';

    const healthData = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      responseTime: `${responseTime}ms`,
      checks: {
        database: databaseCheck,
        externalAPIs,
        system: systemInfo
      },
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'
    };

    // Set appropriate status code
    const statusCode = overallStatus === 'healthy' ? 200 : 503;

    // Add cache headers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    return res.status(statusCode).json(healthData);

  } catch (error) {
    console.error('[Health Check] Error:', error);

    return res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message,
      checks: {
        system: getSystemInfo()
      }
    });
  }
}