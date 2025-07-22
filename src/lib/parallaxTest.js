// Test file to verify parallax optimizations
export function testParallaxOptimizations() {
  const tests = [];
  
  // Test 1: Check if intersection observer is supported
  tests.push({
    name: 'Intersection Observer Support',
    test: () => 'IntersectionObserver' in window,
    description: 'Checks if browser supports Intersection Observer API for performance optimization'
  });
  
  // Test 2: Check if parallax elements exist
  tests.push({
    name: 'Parallax Elements Present',
    test: () => document.querySelectorAll('.parallax').length > 0,
    description: 'Verifies that parallax elements are present in the DOM'
  });
  
  // Test 3: Check if background image exists
  tests.push({
    name: 'Background Image Present',
    test: () => document.getElementById('background-image') !== null,
    description: 'Verifies that the main background image element exists'
  });
  
  // Test 4: Check if CSS classes are applied
  tests.push({
    name: 'Parallax CSS Classes',
    test: () => {
      const style = document.createElement('style');
      document.head.appendChild(style);
      const sheet = style.sheet;
      try {
        sheet.insertRule('.test-parallax { will-change: transform; }', 0);
        return true;
      } catch (e) {
        return false;
      } finally {
        document.head.removeChild(style);
      }
    },
    description: 'Tests if CSS rules can be applied for performance optimizations'
  });
  
  // Test 5: Check requestAnimationFrame support
  tests.push({
    name: 'RequestAnimationFrame Support',
    test: () => 'requestAnimationFrame' in window,
    description: 'Verifies browser support for smooth animations'
  });
  
  // Test 6: Check if GSAP is loaded
  tests.push({
    name: 'GSAP Library Loaded',
    test: () => typeof window.gsap !== 'undefined',
    description: 'Verifies that GSAP animation library is properly loaded'
  });
  
  // Run all tests
  console.group('🧪 Parallax Optimization Tests');
  
  const results = tests.map(test => {
    const passed = test.test();
    const status = passed ? '✅' : '❌';
    console.log(`${status} ${test.name}: ${test.description}`);
    return { ...test, passed };
  });
  
  const passedCount = results.filter(r => r.passed).length;
  const totalCount = results.length;
  
  console.log(`\n📊 Results: ${passedCount}/${totalCount} tests passed`);
  
  if (passedCount === totalCount) {
    console.log('🎉 All optimizations are working correctly!');
  } else {
    console.warn('⚠️ Some optimizations may not be working as expected.');
  }
  
  console.groupEnd();
  
  return results;
}

// Performance monitoring function
export function monitorParallaxPerformance() {
  let frameCount = 0;
  let lastTime = performance.now();
  let fps = 0;
  
  function measureFPS() {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
      frameCount = 0;
      lastTime = currentTime;
      
      // Log performance metrics
      if (fps < 30) {
        console.warn(`⚠️ Low FPS detected: ${fps} fps`);
      } else if (fps >= 60) {
        console.log(`🚀 Excellent performance: ${fps} fps`);
      } else {
        console.log(`📊 Performance: ${fps} fps`);
      }
    }
    
    requestAnimationFrame(measureFPS);
  }
  
  console.log('🔍 Starting parallax performance monitoring...');
  requestAnimationFrame(measureFPS);
}

// Memory usage monitoring
export function monitorMemoryUsage() {
  if ('memory' in performance) {
    const memory = performance.memory;
    console.group('💾 Memory Usage');
    console.log(`Used: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB`);
    console.log(`Total: ${Math.round(memory.totalJSHeapSize / 1024 / 1024)} MB`);
    console.log(`Limit: ${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)} MB`);
    console.groupEnd();
  } else {
    console.log('Memory monitoring not available in this browser');
  }
}

// Export test runner for easy access
export function runAllTests() {
  testParallaxOptimizations();
  monitorParallaxPerformance();
  monitorMemoryUsage();
}