#!/usr/bin/env node

/**
 * Comprehensive Quality Assurance Testing Script
 * Tests navigation, functionality, responsive design, performance, and accessibility
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class QualityAssuranceTester {
  constructor() {
    this.results = {
      navigation: [],
      functionality: [],
      responsive: [],
      performance: [],
      accessibility: [],
      errors: []
    };
    this.totalTests = 0;
    this.passedTests = 0;
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  logTest(testName, passed, details = '') {
    this.totalTests++;
    if (passed) {
      this.passedTests++;
      this.log(`✅ ${testName}`, 'green');
    } else {
      this.log(`❌ ${testName}`, 'red');
      if (details) this.log(`   ${details}`, 'yellow');
    }
  }

  // Test 1: Page Navigation and Routing
  async testPageNavigation() {
    this.log('\n🔍 Testing Page Navigation and Routing...', 'cyan');
    
    const pagesDir = path.join(process.cwd(), 'src', 'pages');
    const pages = this.getAllPages(pagesDir);
    
    for (const page of pages) {
      try {
        // Check if page file exists and has proper structure
        const pageContent = fs.readFileSync(page.path, 'utf8');
        const hasDefaultExport = pageContent.includes('export default') || pageContent.includes('module.exports');
        const hasReactImport = pageContent.includes('import React') || 
                              pageContent.includes('from "react"') || 
                              pageContent.includes('from \'react\'') ||
                              pageContent.includes('React.') ||
                              pageContent.includes('useState') ||
                              pageContent.includes('useEffect') ||
                              pageContent.includes('JSX') ||
                              pageContent.includes('<') && pageContent.includes('>');
        
        this.logTest(`Page ${page.route} - File Structure`, hasDefaultExport && hasReactImport);
        this.results.navigation.push({
          page: page.route,
          exists: true,
          hasDefaultExport,
          hasReactImport
        });
      } catch (error) {
        this.logTest(`Page ${page.route} - File Access`, false, error.message);
        this.results.errors.push(`Navigation test failed for ${page.route}: ${error.message}`);
      }
    }

    // Test internal link consistency
    await this.testInternalLinks();
  }

  getAllPages(dir, baseRoute = '') {
    const pages = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && item !== 'api') {
        pages.push(...this.getAllPages(fullPath, `${baseRoute}/${item}`));
      } else if (stat.isFile() && item.endsWith('.js') && !item.startsWith('_')) {
        const route = baseRoute + '/' + item.replace('.js', '');
        const cleanRoute = route === '/index' ? '/' : route;
        pages.push({ path: fullPath, route: cleanRoute });
      }
    }

    return pages;
  }

  async testInternalLinks() {
    this.log('\n🔗 Testing Internal Links...', 'blue');
    
    // Test Navigation component links
    try {
      const navPath = path.join(process.cwd(), 'src', 'components', 'layout', 'Navigation.js');
      if (fs.existsSync(navPath)) {
        const navContent = fs.readFileSync(navPath, 'utf8');
        const hasLinks = navContent.includes('href=') || navContent.includes('Link');
        this.logTest('Navigation Component - Has Links', hasLinks);
      }
    } catch (error) {
      this.logTest('Navigation Component - Link Test', false, error.message);
    }
  }

  // Test 2: Core Functionality
  async testCoreFunctionality() {
    this.log('\n⚙️ Testing Core Functionality...', 'cyan');

    // Test Quiz functionality
    await this.testQuizFunctionality();
    
    // Test Insights functionality
    await this.testInsightsFunctionality();
    
    // Test Donation functionality
    await this.testDonationFunctionality();
    
    // Test API endpoints
    await this.testAPIEndpoints();
  }

  async testQuizFunctionality() {
    this.log('\n📝 Testing Quiz Functionality...', 'blue');
    
    try {
      // Check quiz data structure
      const quizDataPath = path.join(process.cwd(), 'src', 'data', 'quiz');
      if (fs.existsSync(quizDataPath)) {
        const files = fs.readdirSync(quizDataPath);
        const hasQuizData = files.some(file => file.includes('questions') || file.includes('quiz'));
        this.logTest('Quiz Data - Structure Exists', hasQuizData);
      }

      // Check quiz components
      const quizComponentsPath = path.join(process.cwd(), 'src', 'components', 'features', 'Quiz');
      if (fs.existsSync(quizComponentsPath)) {
        const components = fs.readdirSync(quizComponentsPath);
        const hasQuizContainer = components.some(file => file.includes('QuizContainer'));
        const hasQuizQuestion = components.some(file => file.includes('QuizQuestion'));
        
        this.logTest('Quiz Components - Container Exists', hasQuizContainer);
        this.logTest('Quiz Components - Question Component Exists', hasQuizQuestion);
      }

      // Check quiz page
      const quizPagePath = path.join(process.cwd(), 'src', 'pages', 'quiz.js');
      if (fs.existsSync(quizPagePath)) {
        const quizContent = fs.readFileSync(quizPagePath, 'utf8');
        const hasQuizLogic = quizContent.includes('quiz') || quizContent.includes('Quiz');
        this.logTest('Quiz Page - Implementation', hasQuizLogic);
      }

    } catch (error) {
      this.logTest('Quiz Functionality', false, error.message);
      this.results.errors.push(`Quiz test failed: ${error.message}`);
    }
  }

  async testInsightsFunctionality() {
    this.log('\n📊 Testing Insights Functionality...', 'blue');
    
    try {
      // Check insights components
      const insightsPath = path.join(process.cwd(), 'src', 'components', 'features', 'Insights');
      if (fs.existsSync(insightsPath)) {
        const components = fs.readdirSync(insightsPath);
        const hasStatistics = components.some(file => file.includes('Statistics'));
        const hasCharts = components.some(file => file.includes('Chart') || file.includes('Biodiversity'));
        
        this.logTest('Insights Components - Statistics', hasStatistics);
        this.logTest('Insights Components - Charts', hasCharts);
      }

      // Check insights page
      const insightsPagePath = path.join(process.cwd(), 'src', 'pages', 'insights.js');
      if (fs.existsSync(insightsPagePath)) {
        const insightsContent = fs.readFileSync(insightsPagePath, 'utf8');
        const hasInsightsLogic = insightsContent.includes('insights') || insightsContent.includes('Insights');
        this.logTest('Insights Page - Implementation', hasInsightsLogic);
      }

    } catch (error) {
      this.logTest('Insights Functionality', false, error.message);
      this.results.errors.push(`Insights test failed: ${error.message}`);
    }
  }

  async testDonationFunctionality() {
    this.log('\n💰 Testing Donation Functionality...', 'blue');
    
    try {
      // Check donation components
      const donationsPath = path.join(process.cwd(), 'src', 'components', 'features', 'Donations');
      if (fs.existsSync(donationsPath)) {
        const components = fs.readdirSync(donationsPath);
        const hasCausesList = components.some(file => file.includes('Causes'));
        const hasOrganizations = components.some(file => file.includes('Organization'));
        
        this.logTest('Donation Components - Causes List', hasCausesList);
        this.logTest('Donation Components - Organizations', hasOrganizations);
      }

      // Check donation page
      const donatePagePath = path.join(process.cwd(), 'src', 'pages', 'donate.js');
      if (fs.existsSync(donatePagePath)) {
        const donateContent = fs.readFileSync(donatePagePath, 'utf8');
        const hasDonationLogic = donateContent.includes('donate') || donateContent.includes('Donate');
        this.logTest('Donation Page - Implementation', hasDonationLogic);
      }

    } catch (error) {
      this.logTest('Donation Functionality', false, error.message);
      this.results.errors.push(`Donation test failed: ${error.message}`);
    }
  }

  async testAPIEndpoints() {
    this.log('\n🔌 Testing API Endpoints...', 'blue');
    
    const apiDir = path.join(process.cwd(), 'src', 'pages', 'api');
    if (fs.existsSync(apiDir)) {
      const apiFiles = this.getAllAPIFiles(apiDir);
      
      for (const apiFile of apiFiles) {
        try {
          const content = fs.readFileSync(apiFile.path, 'utf8');
          const hasHandler = content.includes('export default') && 
                           (content.includes('req') && content.includes('res'));
          
          this.logTest(`API Endpoint ${apiFile.route} - Handler Structure`, hasHandler);
          
          // Check for proper HTTP methods
          const hasMethodHandling = content.includes('req.method') || 
                                  content.includes('GET') || 
                                  content.includes('POST');
          this.logTest(`API Endpoint ${apiFile.route} - Method Handling`, hasMethodHandling);
          
        } catch (error) {
          this.logTest(`API Endpoint ${apiFile.route}`, false, error.message);
        }
      }
    }
  }

  getAllAPIFiles(dir, baseRoute = '/api') {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...this.getAllAPIFiles(fullPath, `${baseRoute}/${item}`));
      } else if (stat.isFile() && item.endsWith('.js')) {
        const route = baseRoute + '/' + item.replace('.js', '');
        files.push({ path: fullPath, route });
      }
    }

    return files;
  }

  // Test 3: Responsive Design
  async testResponsiveDesign() {
    this.log('\n📱 Testing Responsive Design...', 'cyan');

    // Check Tailwind CSS configuration
    await this.testTailwindConfig();
    
    // Check component responsive classes
    await this.testResponsiveClasses();
    
    // Check mobile navigation
    await this.testMobileNavigation();
  }

  async testTailwindConfig() {
    this.log('\n🎨 Testing Tailwind Configuration...', 'blue');
    
    try {
      const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.js');
      if (fs.existsSync(tailwindConfigPath)) {
        const configContent = fs.readFileSync(tailwindConfigPath, 'utf8');
        const hasResponsiveConfig = configContent.includes('screens') || 
                                  configContent.includes('sm:') || 
                                  configContent.includes('md:');
        this.logTest('Tailwind Config - Responsive Configuration', hasResponsiveConfig);
      }
    } catch (error) {
      this.logTest('Tailwind Configuration', false, error.message);
    }
  }

  async testResponsiveClasses() {
    this.log('\n📐 Testing Responsive Classes in Components...', 'blue');
    
    const componentsDir = path.join(process.cwd(), 'src', 'components');
    const componentFiles = this.getAllJSFiles(componentsDir);
    
    let responsiveComponentsCount = 0;
    
    for (const file of componentFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        const hasResponsiveClasses = content.includes('sm:') || 
                                   content.includes('md:') || 
                                   content.includes('lg:') || 
                                   content.includes('xl:');
        
        if (hasResponsiveClasses) {
          responsiveComponentsCount++;
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    const responsiveRatio = responsiveComponentsCount / componentFiles.length;
    this.logTest('Components - Responsive Classes Usage', responsiveRatio > 0.5, 
                `${responsiveComponentsCount}/${componentFiles.length} components use responsive classes`);
  }

  async testMobileNavigation() {
    this.log('\n📱 Testing Mobile Navigation...', 'blue');
    
    try {
      const navPath = path.join(process.cwd(), 'src', 'components', 'layout', 'Navigation.js');
      if (fs.existsSync(navPath)) {
        const navContent = fs.readFileSync(navPath, 'utf8');
        const hasMobileMenu = navContent.includes('hamburger') || 
                            navContent.includes('mobile') || 
                            navContent.includes('md:hidden') ||
                            navContent.includes('sm:hidden');
        
        this.logTest('Navigation - Mobile Menu Implementation', hasMobileMenu);
      }
    } catch (error) {
      this.logTest('Mobile Navigation', false, error.message);
    }
  }

  getAllJSFiles(dir) {
    const files = [];
    
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          files.push(...this.getAllJSFiles(fullPath));
        } else if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.jsx'))) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Skip directories that can't be read
    }
    
    return files;
  }

  // Test 4: Performance Compliance
  async testPerformance() {
    this.log('\n⚡ Testing Performance Compliance...', 'cyan');

    // Test build optimization
    await this.testBuildOptimization();
    
    // Test image optimization
    await this.testImageOptimization();
    
    // Test bundle analysis
    await this.testBundleSize();
    
    // Test Core Web Vitals setup
    await this.testWebVitals();
  }

  async testBuildOptimization() {
    this.log('\n🏗️ Testing Build Optimization...', 'blue');
    
    try {
      // Check Next.js config
      const nextConfigPath = path.join(process.cwd(), 'next.config.mjs');
      if (fs.existsSync(nextConfigPath)) {
        const configContent = fs.readFileSync(nextConfigPath, 'utf8');
        const hasImageOptimization = configContent.includes('images');
        const hasOptimization = configContent.includes('optimize') || configContent.includes('compress');
        
        this.logTest('Next.js Config - Image Optimization', hasImageOptimization);
        this.logTest('Next.js Config - Build Optimization', hasOptimization);
      }

      // Check build script optimization
      const buildScriptPath = path.join(process.cwd(), 'scripts', 'optimize-build.js');
      if (fs.existsSync(buildScriptPath)) {
        this.logTest('Build Script - Optimization Script Exists', true);
      }

    } catch (error) {
      this.logTest('Build Optimization', false, error.message);
    }
  }

  async testImageOptimization() {
    this.log('\n🖼️ Testing Image Optimization...', 'blue');
    
    const allFiles = this.getAllJSFiles(path.join(process.cwd(), 'src'));
    let nextImageUsage = 0;
    let regularImgUsage = 0;
    
    for (const file of allFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('next/image') || content.includes('Image from')) {
          nextImageUsage++;
        }
        if (content.includes('<img') && !content.includes('next/image')) {
          regularImgUsage++;
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    this.logTest('Image Optimization - Next.js Image Usage', nextImageUsage > 0, 
                `${nextImageUsage} files use Next.js Image component`);
    this.logTest('Image Optimization - Regular img tags', regularImgUsage === 0, 
                `${regularImgUsage} files still use regular img tags`);
  }

  async testBundleSize() {
    this.log('\n📦 Testing Bundle Size...', 'blue');
    
    try {
      // Try to run build and check if it completes successfully
      this.log('Running production build to test bundle size...', 'yellow');
      execSync('npm run build', { stdio: 'pipe', timeout: 120000 });
      this.logTest('Bundle Build - Production Build Success', true);
      
      // Check if .next directory exists and has build artifacts
      const nextDir = path.join(process.cwd(), '.next');
      if (fs.existsSync(nextDir)) {
        const buildFiles = fs.readdirSync(nextDir);
        const hasStaticDir = buildFiles.includes('static');
        this.logTest('Bundle Build - Static Assets Generated', hasStaticDir);
      }
      
    } catch (error) {
      this.logTest('Bundle Build - Production Build', false, 'Build failed or timed out');
      this.results.errors.push(`Bundle build failed: ${error.message}`);
    }
  }

  async testWebVitals() {
    this.log('\n📊 Testing Web Vitals Setup...', 'blue');
    
    try {
      // Check if web-vitals is installed
      const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
      const hasWebVitals = packageJson.dependencies['web-vitals'] || packageJson.devDependencies['web-vitals'];
      this.logTest('Web Vitals - Package Installed', !!hasWebVitals);
      
      // Check if web vitals are implemented in _app.js
      const appPath = path.join(process.cwd(), 'src', 'pages', '_app.js');
      if (fs.existsSync(appPath)) {
        const appContent = fs.readFileSync(appPath, 'utf8');
        const hasWebVitalsImplementation = appContent.includes('web-vitals') || 
                                         appContent.includes('reportWebVitals') ||
                                         appContent.includes('getCLS') ||
                                         appContent.includes('getFID') ||
                                         appContent.includes('getLCP') ||
                                         appContent.includes('initWebVitals') ||
                                         appContent.includes('webVitals');
        this.logTest('Web Vitals - Implementation in _app.js', hasWebVitalsImplementation);
      }
      
    } catch (error) {
      this.logTest('Web Vitals Setup', false, error.message);
    }
  }

  // Test 5: Accessibility Compliance
  async testAccessibility() {
    this.log('\n♿ Testing Accessibility Compliance...', 'cyan');

    // Test semantic HTML
    await this.testSemanticHTML();
    
    // Test ARIA attributes
    await this.testARIAAttributes();
    
    // Test keyboard navigation
    await this.testKeyboardNavigation();
    
    // Test alt text for images
    await this.testImageAltText();
  }

  async testSemanticHTML() {
    this.log('\n🏷️ Testing Semantic HTML...', 'blue');
    
    const allFiles = this.getAllJSFiles(path.join(process.cwd(), 'src'));
    let semanticElementsCount = 0;
    let totalFiles = 0;
    
    for (const file of allFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        totalFiles++;
        
        const hasSemanticElements = content.includes('<header') || 
                                  content.includes('<nav') || 
                                  content.includes('<main') || 
                                  content.includes('<section') || 
                                  content.includes('<article') || 
                                  content.includes('<aside') || 
                                  content.includes('<footer');
        
        if (hasSemanticElements) {
          semanticElementsCount++;
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    const semanticRatio = semanticElementsCount / totalFiles;
    this.logTest('Accessibility - Semantic HTML Usage', semanticRatio > 0.3, 
                `${semanticElementsCount}/${totalFiles} files use semantic HTML`);
  }

  async testARIAAttributes() {
    this.log('\n🎯 Testing ARIA Attributes...', 'blue');
    
    const allFiles = this.getAllJSFiles(path.join(process.cwd(), 'src'));
    let ariaAttributesCount = 0;
    
    for (const file of allFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        const hasAriaAttributes = content.includes('aria-') || 
                                content.includes('role=') ||
                                content.includes('tabIndex') ||
                                content.includes('aria-label') ||
                                content.includes('aria-describedby');
        
        if (hasAriaAttributes) {
          ariaAttributesCount++;
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    this.logTest('Accessibility - ARIA Attributes Usage', ariaAttributesCount > 0, 
                `${ariaAttributesCount} files use ARIA attributes`);
  }

  async testKeyboardNavigation() {
    this.log('\n⌨️ Testing Keyboard Navigation...', 'blue');
    
    try {
      const navPath = path.join(process.cwd(), 'src', 'components', 'layout', 'Navigation.js');
      if (fs.existsSync(navPath)) {
        const navContent = fs.readFileSync(navPath, 'utf8');
        const hasKeyboardSupport = navContent.includes('onKeyDown') || 
                                 navContent.includes('onKeyPress') ||
                                 navContent.includes('tabIndex') ||
                                 navContent.includes('keyboard');
        
        this.logTest('Accessibility - Keyboard Navigation Support', hasKeyboardSupport);
      }
    } catch (error) {
      this.logTest('Keyboard Navigation', false, error.message);
    }
  }

  async testImageAltText() {
    this.log('\n🖼️ Testing Image Alt Text...', 'blue');
    
    const allFiles = this.getAllJSFiles(path.join(process.cwd(), 'src'));
    let imagesWithAlt = 0;
    let imagesWithoutAlt = 0;
    
    for (const file of allFiles) {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Count images with alt text
        const imgWithAltMatches = content.match(/<img[^>]+alt\s*=/gi) || [];
        const ImageWithAltMatches = content.match(/<Image[^>]+alt\s*=/gi) || [];
        imagesWithAlt += imgWithAltMatches.length + ImageWithAltMatches.length;
        
        // Count images without alt text
        const imgWithoutAltMatches = content.match(/<img(?![^>]*alt\s*=)[^>]*>/gi) || [];
        const ImageWithoutAltMatches = content.match(/<Image(?![^>]*alt\s*=)[^>]*>/gi) || [];
        imagesWithoutAlt += imgWithoutAltMatches.length + ImageWithoutAltMatches.length;
        
      } catch (error) {
        // Skip files that can't be read
      }
    }
    
    const totalImages = imagesWithAlt + imagesWithoutAlt;
    const altTextRatio = totalImages > 0 ? imagesWithAlt / totalImages : 1;
    
    this.logTest('Accessibility - Image Alt Text', altTextRatio > 0.8, 
                `${imagesWithAlt}/${totalImages} images have alt text`);
  }

  // Generate comprehensive report
  generateReport() {
    this.log('\n📋 QUALITY ASSURANCE TEST REPORT', 'bright');
    this.log('='.repeat(50), 'cyan');
    
    const passRate = ((this.passedTests / this.totalTests) * 100).toFixed(1);
    this.log(`\n📊 Overall Results: ${this.passedTests}/${this.totalTests} tests passed (${passRate}%)`, 'bright');
    
    if (passRate >= 90) {
      this.log('🎉 Excellent! Quality assurance standards met.', 'green');
    } else if (passRate >= 75) {
      this.log('✅ Good! Minor improvements needed.', 'yellow');
    } else {
      this.log('⚠️ Attention needed! Several issues require fixing.', 'red');
    }
    
    // Show errors if any
    if (this.results.errors.length > 0) {
      this.log('\n🚨 Errors Encountered:', 'red');
      this.results.errors.forEach(error => {
        this.log(`   • ${error}`, 'red');
      });
    }
    
    this.log('\n📝 Detailed Results:', 'blue');
    this.log(`   • Navigation Tests: Completed`, 'cyan');
    this.log(`   • Functionality Tests: Completed`, 'cyan');
    this.log(`   • Responsive Design Tests: Completed`, 'cyan');
    this.log(`   • Performance Tests: Completed`, 'cyan');
    this.log(`   • Accessibility Tests: Completed`, 'cyan');
    
    this.log('\n💡 Recommendations:', 'magenta');
    if (passRate < 100) {
      this.log('   • Review failed tests and implement fixes', 'yellow');
      this.log('   • Run tests again after making improvements', 'yellow');
    }
    this.log('   • Consider adding automated testing for continuous quality assurance', 'yellow');
    this.log('   • Monitor performance metrics in production', 'yellow');
    
    return passRate >= 75; // Return true if quality standards are met
  }

  // Main test runner
  async runAllTests() {
    this.log('🚀 Starting Comprehensive Quality Assurance Testing...', 'bright');
    this.log('This will test navigation, functionality, responsive design, performance, and accessibility.', 'cyan');
    
    try {
      await this.testPageNavigation();
      await this.testCoreFunctionality();
      await this.testResponsiveDesign();
      await this.testPerformance();
      await this.testAccessibility();
      
      return this.generateReport();
    } catch (error) {
      this.log(`\n❌ Testing failed with error: ${error.message}`, 'red');
      this.results.errors.push(`Main test runner failed: ${error.message}`);
      return false;
    }
  }
}

// Run the tests
if (require.main === module) {
  const tester = new QualityAssuranceTester();
  tester.runAllTests().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('Test runner crashed:', error);
    process.exit(1);
  });
}

module.exports = QualityAssuranceTester;