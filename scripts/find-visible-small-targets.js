const { chromium } = require('playwright');

async function findVisibleSmallTargets() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Set mobile viewport like the audit
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    const smallTargets = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button, a');
      const results = [];
      
      buttons.forEach((btn, index) => {
        const rect = btn.getBoundingClientRect();
        const isVisible = rect.width > 0 && rect.height > 0;
        
        if (isVisible && (rect.width < 44 || rect.height < 44)) {
          results.push({
            index,
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            tag: btn.tagName.toLowerCase(),
            classes: btn.className.substring(0, 100),
            text: btn.textContent?.trim()?.substring(0, 50) || 'no-text',
            id: btn.id || 'no-id'
          });
        }
      });
      
      return results;
    });
    
    console.log(`🎯 Found ${smallTargets.length} visible small touch targets:`);
    console.log('');
    
    smallTargets.forEach((target, i) => {
      console.log(`${i + 1}. ${target.tag} (${target.width}x${target.height}px)`);
      console.log(`   Text: "${target.text}"`);
      console.log(`   Classes: ${target.classes}...`);
      console.log(`   ID: ${target.id}`);
      console.log('');
    });
    
  } finally {
    await browser.close();
  }
}

findVisibleSmallTargets().catch(console.error);