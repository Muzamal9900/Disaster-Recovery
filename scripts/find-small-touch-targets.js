const { chromium } = require('playwright');

async function findSmallTouchTargets() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Set mobile viewport to test touch targets
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    const touchTargetAnalysis = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button, a, input[type="button"], input[type="submit"], [role="button"], [onclick]');
      const smallTargets = [];
      const allTargets = [];
      
      buttons.forEach((btn, index) => {
        const rect = btn.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0;
        
        if (isVisible) {
          const targetInfo = {
            index,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            tag: btn.tagName.toLowerCase(),
            classes: btn.className,
            id: btn.id || 'no-id',
            text: btn.textContent?.trim()?.substring(0, 50) || 'no-text',
            parent: btn.parentElement?.tagName || 'unknown',
            position: {
              top: Math.round(rect.top),
              left: Math.round(rect.left)
            }
          };
          
          allTargets.push(targetInfo);
          
          if (rect.width < 44 || rect.height < 44) {
            smallTargets.push(targetInfo);
          }
        }
      });
      
      return {
        totalTargets: allTargets.length,
        smallTargets: smallTargets.length,
        smallTargetsList: smallTargets.slice(0, 20), // First 20 for analysis
        allTargetsSample: allTargets.slice(0, 10) // Sample of all targets
      };
    });
    
    console.log('🎯 Touch Target Analysis:');
    console.log(`Total touch targets: ${touchTargetAnalysis.totalTargets}`);
    console.log(`Small targets (<44px): ${touchTargetAnalysis.smallTargets}`);
    console.log('');
    
    console.log('🔍 First 20 small targets:');
    touchTargetAnalysis.smallTargetsList.forEach((target, i) => {
      console.log(`${i + 1}. ${target.tag} (${target.width}x${target.height}px)`);
      console.log(`   Classes: ${target.classes}`);
      console.log(`   Text: ${target.text}`);
      console.log(`   Parent: ${target.parent}`);
      console.log('');
    });
    
    console.log('📊 Sample of all targets:');
    touchTargetAnalysis.allTargetsSample.forEach((target, i) => {
      console.log(`${i + 1}. ${target.tag} (${target.width}x${target.height}px) - ${target.text}`);
    });
    
  } finally {
    await browser.close();
  }
}

findSmallTouchTargets().catch(console.error);