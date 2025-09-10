const { chromium } = require('playwright');

async function analyzeDom() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  
  const domAnalysis = await page.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    const elementCounts = {};
    
    allElements.forEach(el => {
      const tag = el.tagName.toLowerCase();
      elementCounts[tag] = (elementCounts[tag] || 0) + 1;
    });
    
    // Sort by count
    const sorted = Object.entries(elementCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15); // Top 15
    
    return {
      totalElements: allElements.length,
      breakdown: sorted
    };
  });
  
  console.log('🔍 DOM Element Analysis:');
  console.log('Total elements:', domAnalysis.totalElements);
  console.log('\nTop element types:');
  domAnalysis.breakdown.forEach(([tag, count]) => {
    console.log(`${tag}: ${count}`);
  });
  
  await browser.close();
}

analyzeDom().catch(console.error);