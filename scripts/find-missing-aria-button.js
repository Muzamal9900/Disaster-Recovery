const { chromium } = require('playwright');

async function findMissingAriaButton() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Find buttons without text content and without aria-label
    const problematicButtons = await page.evaluate(() => {
      const buttons = document.querySelectorAll('button');
      const results = [];
      
      buttons.forEach((btn, index) => {
        if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
          const rect = btn.getBoundingClientRect();
          const classes = btn.className;
          const parent = btn.parentElement?.tagName;
          const parentClasses = btn.parentElement?.className;
          
          results.push({
            index,
            classes,
            parent,
            parentClasses,
            hasChildren: btn.children.length > 0,
            childrenHtml: btn.innerHTML,
            position: {
              top: Math.round(rect.top),
              left: Math.round(rect.left),
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            }
          });
        }
      });
      
      return results;
    });
    
    console.log('🔍 Buttons missing aria-label:');
    console.log(JSON.stringify(problematicButtons, null, 2));
    
  } finally {
    await browser.close();
  }
}

findMissingAriaButton().catch(console.error);