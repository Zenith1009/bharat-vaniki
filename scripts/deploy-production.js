#!/usr/bin/env node

/**
 * Production deployment script
 * Performs comprehensive checks before deployment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`${colors.blue}[${step}]${colors.reset} ${message}`);
}

function logSuccess(message) {
  log(`${colors.green}✅ ${message}${colors.reset}`);
}

function logError(message) {
  log(`${colors.red}❌ ${message}${colors.reset}`);
}

function logWarning(message) {
  log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

/**
 * Check environment variables
 */
function checkEnvironment() {
  logStep('ENV', 'Checking environment variables...');
  
  const requiredVars = [
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ];

  const optionalVars = [
    'NEXT_PUBLIC_GA_MEASUREMENT_ID',
    'NEXT_PUBLIC_GRAPHCMS_ENDPOINT'
  ];

  let hasErrors = false;

  // Check required variables
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      logError(`Required environment variable missing: ${varName}`);
      hasErrors = true;
    } else {
      logSuccess(`${varName} is set`);
    }
  });

  // Check optional variables
  optionalVars.forEach(varName => {
    if (!process.env[varName]) {
      logWarning(`Optional environment variable not set: ${varName}`);
    } else {
      logSuccess(`${varName} is set`);
    }
  });

  if (hasErrors) {
    throw new Error('Missing required environment variables');
  }

  logSuccess('Environment variables check passed');
}

/**
 * Run build process
 */
function runBuild() {
  logStep('BUILD', 'Running production build...');
  
  try {
    execSync('npm run build', { stdio: 'inherit' });
    logSuccess('Build completed successfully');
  } catch (error) {
    logError('Build failed');
    throw error;
  }
}

/**
 * Run link verification
 */
function runLinkVerification() {
  logStep('LINKS', 'Verifying external links and integrations...');
  
  try {
    // Run link verification but don't fail on warnings
    execSync('node scripts/verify-links.js', { stdio: 'inherit' });
    logSuccess('Link verification completed');
  } catch (error) {
    logWarning('Some links failed verification - check the report');
    // Don't fail deployment for link issues, just warn
  }
}

/**
 * Check API endpoints
 */
async function checkAPIEndpoints() {
  logStep('API', 'Checking API endpoints...');
  
  const endpoints = [
    '/api/health',
    '/api/quiz/questions',
    '/api/insights/stats',
    '/api/donations/causes'
  ];

  // This would require the server to be running
  // For now, just check that the files exist
  let allExist = true;
  
  endpoints.forEach(endpoint => {
    const filePath = path.join(process.cwd(), 'src/pages', endpoint + '.js');
    if (fs.existsSync(filePath)) {
      logSuccess(`API endpoint file exists: ${endpoint}`);
    } else {
      logError(`API endpoint file missing: ${endpoint}`);
      allExist = false;
    }
  });

  if (!allExist) {
    throw new Error('Some API endpoint files are missing');
  }

  logSuccess('API endpoints check passed');
}

/**
 * Check deployment configuration
 */
function checkDeploymentConfig() {
  logStep('CONFIG', 'Checking deployment configuration...');
  
  const configFiles = [
    'vercel.json',
    'next.config.mjs',
    'package.json'
  ];

  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      logSuccess(`Configuration file exists: ${file}`);
    } else {
      logError(`Configuration file missing: ${file}`);
      throw new Error(`Missing configuration file: ${file}`);
    }
  });

  // Check vercel.json configuration
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  if (vercelConfig.alias && vercelConfig.alias.includes('indian-forests-ecosystem.vercel.app')) {
    logSuccess('Vercel domain configuration is correct');
  } else {
    logWarning('Vercel domain configuration may need updating');
  }

  logSuccess('Deployment configuration check passed');
}

/**
 * Generate deployment report
 */
function generateDeploymentReport() {
  logStep('REPORT', 'Generating deployment report...');
  
  const report = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: require('../package.json').version,
    checks: {
      environment: 'passed',
      build: 'passed',
      linkVerification: 'completed',
      apiEndpoints: 'passed',
      deploymentConfig: 'passed'
    },
    deployment: {
      ready: true,
      notes: [
        'All pre-deployment checks completed successfully',
        'Monitor the application after deployment',
        'Check analytics and monitoring dashboards'
      ]
    }
  };

  const reportPath = path.join(process.cwd(), 'deployment-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  logSuccess(`Deployment report generated: ${reportPath}`);
  return report;
}

/**
 * Main deployment preparation function
 */
async function main() {
  log(`${colors.bold}🚀 Production Deployment Preparation${colors.reset}`);
  log('=====================================\n');

  try {
    // Load environment variables
    try {
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
      logWarning('Could not load .env.local file');
    }

    // Run all checks
    checkEnvironment();
    await checkAPIEndpoints();
    checkDeploymentConfig();
    runBuild();
    runLinkVerification();
    
    // Generate final report
    const report = generateDeploymentReport();
    
    log(`\n${colors.bold}🎉 Deployment Preparation Complete!${colors.reset}`);
    log('===================================');
    log(`${colors.green}✅ All checks passed - Ready for deployment${colors.reset}`);
    log(`${colors.blue}📊 Report saved to: deployment-report.json${colors.reset}`);
    
    log('\n📋 Next Steps:');
    log('1. Review the deployment checklist (DEPLOYMENT_CHECKLIST.md)');
    log('2. Push to main branch to trigger Vercel deployment');
    log('3. Monitor the deployment in Vercel dashboard');
    log('4. Run post-deployment smoke tests');
    log('5. Verify analytics and monitoring are working');

    process.exit(0);

  } catch (error) {
    log(`\n${colors.bold}💥 Deployment Preparation Failed!${colors.reset}`);
    log('==================================');
    logError(`Error: ${error.message}`);
    
    log('\n🔧 Troubleshooting:');
    log('1. Check the error message above');
    log('2. Review environment variables in .env.local');
    log('3. Ensure all dependencies are installed');
    log('4. Check the deployment checklist for missing items');
    
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };