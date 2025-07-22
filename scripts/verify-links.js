#!/usr/bin/env node

/**
 * Link verification script for production deployment
 * Checks all external links and integrations for functionality
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  timeout: 10000, // 10 seconds
  userAgent: 'Indian-Forests-Encyclopedia-Link-Checker/1.0',
  maxRedirects: 5,
  checkImages: true,
  checkAPIs: true
};

// Results storage
let results = {
  total: 0,
  passed: 0,
  failed: 0,
  warnings: 0,
  links: [],
  apis: [],
  images: []
};

/**
 * Make HTTP request with timeout and redirect handling
 */
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;

    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'HEAD',
      headers: {
        'User-Agent': CONFIG.userAgent,
        ...options.headers
      },
      timeout: CONFIG.timeout
    };

    const req = client.request(requestOptions, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        if (options.redirectCount >= CONFIG.maxRedirects) {
          reject(new Error(`Too many redirects (${CONFIG.maxRedirects})`));
          return;
        }

        const redirectUrl = new URL(res.headers.location, url).href;
        makeRequest(redirectUrl, { 
          ...options, 
          redirectCount: (options.redirectCount || 0) + 1 
        })
          .then(resolve)
          .catch(reject);
        return;
      }

      resolve({
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        headers: res.headers,
        redirectCount: options.redirectCount || 0
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

/**
 * Check a single URL
 */
async function checkUrl(url, type = 'link') {
  console.log(`Checking ${type}: ${url}`);
  
  try {
    const response = await makeRequest(url);
    const isSuccess = response.statusCode >= 200 && response.statusCode < 400;
    
    const result = {
      url,
      type,
      status: isSuccess ? 'success' : 'failed',
      statusCode: response.statusCode,
      statusMessage: response.statusMessage,
      redirectCount: response.redirectCount,
      timestamp: new Date().toISOString()
    };

    if (isSuccess) {
      results.passed++;
      console.log(`✅ ${url} - ${response.statusCode}`);
    } else {
      results.failed++;
      console.log(`❌ ${url} - ${response.statusCode} ${response.statusMessage}`);
    }

    return result;

  } catch (error) {
    results.failed++;
    console.log(`❌ ${url} - ${error.message}`);
    
    return {
      url,
      type,
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Extract URLs from file content
 */
function extractUrls(content, baseUrl = '') {
  const urls = new Set();
  
  // Match various URL patterns
  const patterns = [
    /https?:\/\/[^\s"'<>]+/g,                    // Direct HTTP(S) URLs
    /href=["']([^"']+)["']/g,                    // HTML href attributes
    /src=["']([^"']+)["']/g,                     // HTML src attributes
    /url\(["']?([^"')]+)["']?\)/g,               // CSS url() functions
    /"url":\s*["']([^"']+)["']/g,                // JSON URL properties
    /donationUrl:\s*["']([^"']+)["']/g,          // Donation URLs in data
    /website:\s*["']([^"']+)["']/g,              // Website URLs in data
  ];

  patterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const url = match[1] || match[0];
      
      // Skip relative URLs, data URLs, and fragments
      if (url.startsWith('http://') || url.startsWith('https://')) {
        urls.add(url);
      } else if (baseUrl && url.startsWith('/')) {
        urls.add(baseUrl + url);
      }
    }
  });

  return Array.from(urls);
}

/**
 * Scan files for URLs
 */
async function scanFiles() {
  const filesToScan = [
    'src/data/donations/causes.json',
    'src/data/donations/organizations.json',
    'src/components/features/Donations',
    'src/pages/donate.js',
    'src/pages/organizations.js',
    'README.md'
  ];

  const urls = new Set();

  for (const filePath of filesToScan) {
    try {
      const fullPath = path.join(process.cwd(), filePath);
      
      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          // Scan directory
          const files = fs.readdirSync(fullPath);
          for (const file of files) {
            if (file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.md')) {
              const content = fs.readFileSync(path.join(fullPath, file), 'utf8');
              const fileUrls = extractUrls(content);
              fileUrls.forEach(url => urls.add(url));
            }
          }
        } else {
          // Scan single file
          const content = fs.readFileSync(fullPath, 'utf8');
          const fileUrls = extractUrls(content);
          fileUrls.forEach(url => urls.add(url));
        }
      }
    } catch (error) {
      console.warn(`Warning: Could not scan ${filePath}: ${error.message}`);
      results.warnings++;
    }
  }

  return Array.from(urls);
}

/**
 * Check API endpoints
 */
async function checkAPIs() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const apiEndpoints = [
    '/api/health',
    '/api/quiz/questions',
    '/api/quiz/categories',
    '/api/insights/stats',
    '/api/donations/causes',
    '/api/donations/organizations',
    '/api/contact',
    '/api/newsletter/subscribe',
    '/api/sitemap',
    '/api/robots'
  ];

  console.log('\n🔍 Checking API endpoints...');
  
  for (const endpoint of apiEndpoints) {
    const url = baseUrl + endpoint;
    const result = await checkUrl(url, 'api');
    results.apis.push(result);
    results.total++;
  }
}

/**
 * Check external links
 */
async function checkExternalLinks() {
  console.log('\n🔍 Scanning files for external links...');
  const urls = await scanFiles();
  
  console.log(`\n🔍 Found ${urls.length} external links to check...`);
  
  for (const url of urls) {
    const result = await checkUrl(url, 'external');
    results.links.push(result);
    results.total++;
  }
}

/**
 * Check critical external services
 */
async function checkCriticalServices() {
  const services = [];

  // Add Supabase if configured
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    services.push({
      name: 'Supabase',
      url: process.env.NEXT_PUBLIC_SUPABASE_URL + '/rest/v1/',
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    });
  }

  // Add GraphCMS if configured
  if (process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT) {
    services.push({
      name: 'GraphCMS',
      url: process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
    });
  }

  console.log('\n🔍 Checking critical external services...');
  
  for (const service of services) {
    try {
      const response = await makeRequest(service.url, {
        method: 'HEAD',
        headers: service.headers
      });
      
      console.log(`✅ ${service.name} - ${response.statusCode}`);
      results.passed++;
    } catch (error) {
      console.log(`❌ ${service.name} - ${error.message}`);
      results.failed++;
    }
    
    results.total++;
  }
}

/**
 * Generate report
 */
function generateReport() {
  const report = {
    summary: {
      total: results.total,
      passed: results.passed,
      failed: results.failed,
      warnings: results.warnings,
      successRate: results.total > 0 ? ((results.passed / results.total) * 100).toFixed(2) + '%' : '0%'
    },
    timestamp: new Date().toISOString(),
    details: {
      apis: results.apis,
      externalLinks: results.links,
      images: results.images
    }
  };

  // Write report to file
  const reportPath = path.join(process.cwd(), 'link-verification-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log('\n📊 Link Verification Report');
  console.log('============================');
  console.log(`Total checks: ${report.summary.total}`);
  console.log(`Passed: ${report.summary.passed}`);
  console.log(`Failed: ${report.summary.failed}`);
  console.log(`Warnings: ${report.summary.warnings}`);
  console.log(`Success rate: ${report.summary.successRate}`);
  console.log(`\nDetailed report saved to: ${reportPath}`);

  // Show failed links
  const failedLinks = [...results.apis, ...results.links, ...results.images]
    .filter(result => result.status === 'failed' || result.status === 'error');

  if (failedLinks.length > 0) {
    console.log('\n❌ Failed Links:');
    failedLinks.forEach(link => {
      console.log(`  - ${link.url}: ${link.error || link.statusMessage}`);
    });
  }

  return report.summary.failed === 0;
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting link verification...\n');

  try {
    // Load environment variables from .env.local if it exists
    try {
      const fs = require('fs');
      const path = require('path');
      const envPath = path.join(process.cwd(), '.env.local');
      
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
          const [key, value] = line.split('=');
          if (key && value) {
            process.env[key.trim()] = value.trim();
          }
        });
      }
    } catch (envError) {
      console.warn('Could not load .env.local file:', envError.message);
    }

    // Check APIs
    await checkAPIs();

    // Check external links
    await checkExternalLinks();

    // Check critical services
    await checkCriticalServices();

    // Generate report
    const success = generateReport();

    // Exit with appropriate code
    process.exit(success ? 0 : 1);

  } catch (error) {
    console.error('❌ Link verification failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { checkUrl, extractUrls, generateReport };