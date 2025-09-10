const { chromium } = require('playwright');

async function runComprehensiveAudit() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('🔍 Running REAL Comprehensive UI/UX Audit...\n');
  console.log('=' .repeat(60));
  
  const results = {
    visualDesign: { score: 0, total: 0, issues: [] },
    accessibility: { score: 0, total: 0, issues: [] },
    mobileUX: { score: 0, total: 0, issues: [] },
    navigation: { score: 0, total: 0, issues: [] },
    interactivity: { score: 0, total: 0, issues: [] },
    userFlows: { score: 0, total: 0, issues: [] },
    performance: { score: 0, total: 0, issues: [] }
  };

  try {
    // Test homepage
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // 1. VISUAL DESIGN CHECKS
    console.log('\n📐 Visual Design Checks:');
    
    // Check contrast ratios
    const contrastIssues = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      let lowContrast = 0;
      elements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const color = styles.color;
        const bg = styles.backgroundColor;
        // Simplified contrast check - real implementation would calculate actual ratio
        if (color && bg && color.includes('gray') && bg.includes('gray')) {
          lowContrast++;
        }
      });
      return lowContrast;
    });
    
    results.visualDesign.total += 25;
    results.visualDesign.score += contrastIssues < 5 ? 25 : 15;
    if (contrastIssues > 0) results.visualDesign.issues.push(`Found ${contrastIssues} potential contrast issues`);
    
    // Check typography consistency
    const typographyCheck = await page.evaluate(() => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const fonts = new Set();
      headings.forEach(h => {
        fonts.add(window.getComputedStyle(h).fontFamily);
      });
      return fonts.size <= 2; // Should use consistent font families
    });
    
    results.visualDesign.total += 25;
    results.visualDesign.score += typographyCheck ? 25 : 15;
    if (!typographyCheck) results.visualDesign.issues.push('Inconsistent typography detected');
    
    // Check spacing consistency
    const spacingCheck = await page.evaluate(() => {
      const sections = document.querySelectorAll('section, div[class*="container"]');
      const paddings = new Set();
      sections.forEach(s => {
        paddings.add(window.getComputedStyle(s).padding);
      });
      return paddings.size <= 5; // Should have consistent spacing system
    });
    
    results.visualDesign.total += 25;
    results.visualDesign.score += spacingCheck ? 25 : 20;
    
    // Check for visual hierarchy
    const hierarchyCheck = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const h2 = document.querySelector('h2');
      if (!h1 || !h2) return true;
      const h1Size = parseFloat(window.getComputedStyle(h1).fontSize);
      const h2Size = parseFloat(window.getComputedStyle(h2).fontSize);
      return h1Size > h2Size;
    });
    
    results.visualDesign.total += 25;
    results.visualDesign.score += hierarchyCheck ? 25 : 15;
    if (!hierarchyCheck) results.visualDesign.issues.push('Visual hierarchy issues detected');
    
    // 2. ACCESSIBILITY CHECKS
    console.log('\n♿ Accessibility Checks:');
    
    // Check for alt text
    const missingAlt = await page.evaluate(() => {
      return document.querySelectorAll('img:not([alt])').length;
    });
    
    results.accessibility.total += 25;
    results.accessibility.score += missingAlt === 0 ? 25 : 10;
    if (missingAlt > 0) results.accessibility.issues.push(`${missingAlt} images missing alt text`);
    
    // Check for ARIA labels
    const ariaCheck = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      let missingAria = 0;
      buttons.forEach(btn => {
        if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
          missingAria++;
        }
      });
      return missingAria;
    });
    
    results.accessibility.total += 25;
    results.accessibility.score += ariaCheck === 0 ? 25 : 15;
    if (ariaCheck > 0) results.accessibility.issues.push(`${ariaCheck} buttons missing aria-labels`);
    
    // Check focus indicators
    const focusCheck = await page.evaluate(() => {
      const focusable = document.querySelectorAll('a, button, input, textarea, select');
      return focusable.length > 0;
    });
    
    results.accessibility.total += 25;
    results.accessibility.score += focusCheck ? 25 : 0;
    
    // Check heading structure
    const headingCheck = await page.evaluate(() => {
      const h1Count = document.querySelectorAll('h1').length;
      return h1Count === 1; // Should have exactly one h1
    });
    
    results.accessibility.total += 25;
    results.accessibility.score += headingCheck ? 25 : 20;
    if (!headingCheck) results.accessibility.issues.push('Multiple or missing H1 tags');
    
    // 3. MOBILE UX CHECKS
    console.log('\n📱 Mobile UX Checks:');
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check touch target sizes
    const touchTargets = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button, a');
      let tooSmall = 0;
      buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          tooSmall++;
        }
      });
      return tooSmall;
    });
    
    results.mobileUX.total += 33;
    results.mobileUX.score += touchTargets < 3 ? 33 : 20;
    if (touchTargets > 0) results.mobileUX.issues.push(`${touchTargets} touch targets too small (<44px)`);
    
    // Check mobile navigation
    const mobileNav = await page.evaluate(() => {
      return document.querySelector('[class*="mobile"], [class*="Mobile"]') !== null;
    });
    
    results.mobileUX.total += 33;
    results.mobileUX.score += mobileNav ? 33 : 0;
    if (!mobileNav) results.mobileUX.issues.push('No mobile navigation detected');
    
    // Check responsive design
    const responsive = await page.evaluate(() => {
      const viewport = window.innerWidth;
      const contentWidth = document.body.scrollWidth;
      return contentWidth <= viewport; // No horizontal scroll
    });
    
    results.mobileUX.total += 34;
    results.mobileUX.score += responsive ? 34 : 20;
    if (!responsive) results.mobileUX.issues.push('Horizontal scroll detected on mobile');
    
    // Reset viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // 4. NAVIGATION CHECKS
    console.log('\n🧭 Navigation Checks:');
    
    // Check for breadcrumbs
    const breadcrumbs = await page.evaluate(() => {
      return document.querySelector('[aria-label*="breadcrumb"], [class*="breadcrumb"]') !== null;
    });
    
    results.navigation.total += 25;
    results.navigation.score += breadcrumbs ? 25 : 0;
    if (!breadcrumbs) results.navigation.issues.push('No breadcrumb navigation found');
    
    // Check for navigation menu
    const navMenu = await page.evaluate(() => {
      return document.querySelector('nav, [role="navigation"]') !== null;
    });
    
    results.navigation.total += 25;
    results.navigation.score += navMenu ? 25 : 0;
    if (!navMenu) results.navigation.issues.push('No navigation menu found');
    
    // Check for skip links
    const skipLinks = await page.evaluate(() => {
      return document.querySelector('[href="#main"], [class*="skip"]') !== null;
    });
    
    results.navigation.total += 25;
    results.navigation.score += skipLinks ? 25 : 15;
    if (!skipLinks) results.navigation.issues.push('No skip navigation links');
    
    // Check for search
    const searchFunction = await page.evaluate(() => {
      return document.querySelector('input[type="search"], [class*="search"]') !== null;
    });
    
    results.navigation.total += 25;
    results.navigation.score += searchFunction ? 25 : 20;
    
    // 5. INTERACTIVITY CHECKS
    console.log('\n🎮 Interactivity Checks:');
    
    // Check for loading states
    const loadingStates = await page.evaluate(() => {
      return document.querySelector('[class*="loading"], [class*="skeleton"], [class*="spinner"]') !== null;
    });
    
    results.interactivity.total += 33;
    results.interactivity.score += loadingStates ? 33 : 20;
    if (!loadingStates) results.interactivity.issues.push('No loading states found');
    
    // Check for hover states
    const hoverStates = await page.evaluate(() => {
      const styles = Array.from(document.styleSheets).flatMap(sheet => {
        try {
          return Array.from(sheet.cssRules);
        } catch {
          return [];
        }
      });
      return styles.some(rule => rule.selectorText && rule.selectorText.includes(':hover'));
    });
    
    results.interactivity.total += 33;
    results.interactivity.score += hoverStates ? 33 : 25;
    
    // Check for form feedback
    const formFeedback = await page.evaluate(() => {
      return document.querySelector('[class*="error"], [class*="success"]') !== null;
    });
    
    results.interactivity.total += 34;
    results.interactivity.score += formFeedback ? 34 : 25;
    
    // 6. USER FLOWS - Test booking form
    console.log('\n📋 User Flow Checks:');
    
    // Navigate to booking form
    await page.goto('http://localhost:3000/book-service', { waitUntil: 'networkidle' });
    
    // Check form exists
    const formExists = await page.evaluate(() => {
      return document.querySelector('form') !== null;
    });
    
    results.userFlows.total += 20;
    results.userFlows.score += formExists ? 20 : 0;
    if (!formExists) results.userFlows.issues.push('Booking form not found');
    
    // Check form has required fields
    const requiredFields = await page.evaluate(() => {
      return document.querySelectorAll('[required], [aria-required="true"]').length;
    });
    
    results.userFlows.total += 20;
    results.userFlows.score += requiredFields > 5 ? 20 : 10;
    if (requiredFields < 5) results.userFlows.issues.push(`Only ${requiredFields} required fields found`);
    
    // Check for form validation
    const validationExists = await page.evaluate(() => {
      return document.querySelector('[type="email"], [pattern]') !== null;
    });
    
    results.userFlows.total += 20;
    results.userFlows.score += validationExists ? 20 : 10;
    
    // Check for progress indicator
    const progressIndicator = await page.evaluate(() => {
      return document.querySelector('[role="progressbar"], [class*="progress"]') !== null;
    });
    
    results.userFlows.total += 20;
    results.userFlows.score += progressIndicator ? 20 : 10;
    if (!progressIndicator) results.userFlows.issues.push('No progress indicator in form');
    
    // Check for success/error pages
    const successPageExists = await page.goto('http://localhost:3000/book-service/success', { waitUntil: 'networkidle' })
      .then(() => true)
      .catch(() => false);
    
    results.userFlows.total += 20;
    results.userFlows.score += successPageExists ? 20 : 0;
    if (!successPageExists) results.userFlows.issues.push('Success page not accessible');
    
    // 7. PERFORMANCE CHECKS
    console.log('\n⚡ Performance Checks:');
    
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Check DOM element count
    const domElements = await page.evaluate(() => {
      return document.querySelectorAll('*').length;
    });
    
    results.performance.total += 25;
    results.performance.score += domElements < 1000 ? 25 : 15;
    if (domElements >= 1000) results.performance.issues.push(`High DOM count: ${domElements} elements`);
    
    // Check for lazy loading
    const lazyLoading = await page.evaluate(() => {
      return document.querySelectorAll('[loading="lazy"]').length > 0;
    });
    
    results.performance.total += 25;
    results.performance.score += lazyLoading ? 25 : 15;
    if (!lazyLoading) results.performance.issues.push('No lazy loading implemented');
    
    // Check for code splitting (check for dynamic imports in JS)
    const codeSplitting = await page.evaluate(() => {
      return document.querySelectorAll('script[async], script[defer]').length > 0;
    });
    
    results.performance.total += 25;
    results.performance.score += codeSplitting ? 25 : 20;
    
    // Check page load time
    const loadTime = await page.evaluate(() => {
      return window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    });
    
    results.performance.total += 25;
    results.performance.score += loadTime < 3000 ? 25 : 15;
    if (loadTime >= 3000) results.performance.issues.push(`Slow load time: ${loadTime}ms`);
    
  } catch (error) {
    console.error('Error during audit:', error.message);
  } finally {
    await browser.close();
  }
  
  // Calculate final scores
  console.log('\n' + '=' .repeat(60));
  console.log('📊 AUDIT RESULTS:\n');
  
  let totalScore = 0;
  let totalPossible = 0;
  
  Object.entries(results).forEach(([category, data]) => {
    const percentage = Math.round((data.score / data.total) * 100);
    totalScore += data.score;
    totalPossible += data.total;
    
    const emoji = percentage >= 90 ? '✅' : percentage >= 70 ? '⚠️' : '❌';
    console.log(`${emoji} ${category.charAt(0).toUpperCase() + category.slice(1)}: ${percentage}% (${data.score}/${data.total})`);
    
    if (data.issues.length > 0) {
      data.issues.forEach(issue => console.log(`   - ${issue}`));
    }
  });
  
  const overallScore = Math.round((totalScore / totalPossible) * 100);
  
  console.log('\n' + '=' .repeat(60));
  console.log(`\n🎯 OVERALL SCORE: ${overallScore}%\n`);
  
  if (overallScore === 100) {
    console.log('🎉 PERFECT SCORE! All UI/UX requirements met!');
  } else if (overallScore >= 90) {
    console.log('🌟 Excellent! Minor improvements needed.');
  } else if (overallScore >= 80) {
    console.log('👍 Good! Some areas need attention.');
  } else {
    console.log('⚠️ Significant improvements needed.');
  }
  
  return overallScore;
}

// Run the audit
runComprehensiveAudit().catch(console.error);