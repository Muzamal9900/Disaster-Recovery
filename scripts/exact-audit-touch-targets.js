const { chromium } = require('playwright');

async function exactAuditTouchTargets() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Set mobile viewport exactly like the audit
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Wait a moment for layout
    await page.waitForTimeout(1000);
    
    const touchTargetAnalysis = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button, a');
      const smallTargets = [];
      let tooSmall = 0;
      
      buttons.forEach((btn, index) => {
        const rect = btn.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 44) {
          tooSmall++;
          // Only collect first 20 for detailed analysis
          if (smallTargets.length < 20) {
            smallTargets.push({
              index,
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              tag: btn.tagName.toLowerCase(),
              classes: btn.className,
              id: btn.id || 'no-id',
              text: btn.textContent?.trim()?.substring(0, 50) || 'no-text',
              href: btn.href || 'no-href',
              parent: btn.parentElement?.tagName || 'unknown',
              visible: rect.width > 0 && rect.height > 0
            });
          }
        }
      });
      
      return {
        totalCount: buttons.length,
        tooSmall,
        smallTargets
      };
    });
    
    console.log('🎯 EXACT Audit Touch Target Analysis:');
    console.log(`Total buttons/links: ${touchTargetAnalysis.totalCount}`);
    console.log(`Too small (<44px): ${touchTargetAnalysis.tooSmall}`);
    console.log('');
    
    if (touchTargetAnalysis.smallTargets.length > 0) {
      console.log('🔍 Small targets details:');
      touchTargetAnalysis.smallTargets.forEach((target, i) => {
        console.log(`${i + 1}. ${target.tag} (${target.width}x${target.height}px) - Visible: ${target.visible}`);
        console.log(`   Classes: ${target.classes.substring(0, 100)}...`);
        console.log(`   Text: "${target.text}"`);
        console.log(`   ID: ${target.id}`);
        if (target.href !== 'no-href') console.log(`   Href: ${target.href}`);
        console.log('');
      });
    }
    
  } finally {
    await browser.close();
  }
}

exactAuditTouchTargets().catch(console.error);