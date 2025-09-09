const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('🔍 Checking DOM complexity...\n');
  
  const pagesToCheck = [
    { url: 'http://localhost:3000/', name: 'Homepage' },
    { url: 'http://localhost:3000/book-service', name: 'Booking Form' },
    { url: 'http://localhost:3000/services/water-damage', name: 'Service Page' },
    { url: 'http://localhost:3000/client-portal', name: 'Client Portal' }
  ];
  
  for (const pageInfo of pagesToCheck) {
    try {
      await page.goto(pageInfo.url, { waitUntil: 'networkidle' });
      
      const domInfo = await page.evaluate(() => {
        const allElements = document.querySelectorAll('*');
        const divs = document.querySelectorAll('div');
        const spans = document.querySelectorAll('span');
        const buttons = document.querySelectorAll('button');
        const links = document.querySelectorAll('a');
        
        // Find deeply nested elements
        let maxDepth = 0;
        let deepestElement = null;
        
        function getDepth(element) {
          let depth = 0;
          let current = element;
          while (current.parentElement) {
            depth++;
            current = current.parentElement;
          }
          return depth;
        }
        
        allElements.forEach(el => {
          const depth = getDepth(el);
          if (depth > maxDepth) {
            maxDepth = depth;
            deepestElement = el;
          }
        });
        
        // Find unnecessary wrapper divs
        const emptyDivs = Array.from(divs).filter(div => {
          return div.children.length === 1 && 
                 div.children[0].tagName === 'DIV' &&
                 !div.className && !div.id;
        });
        
        return {
          totalElements: allElements.length,
          divCount: divs.length,
          spanCount: spans.length,
          buttonCount: buttons.length,
          linkCount: links.length,
          maxDepth,
          deepestPath: deepestElement ? deepestElement.tagName : 'N/A',
          emptyWrappers: emptyDivs.length
        };
      });
      
      console.log(`📄 ${pageInfo.name}:`);
      console.log(`   Total Elements: ${domInfo.totalElements} ${domInfo.totalElements > 1000 ? '⚠️' : '✅'}`);
      console.log(`   DIVs: ${domInfo.divCount}`);
      console.log(`   SPANs: ${domInfo.spanCount}`);
      console.log(`   Buttons: ${domInfo.buttonCount}`);
      console.log(`   Links: ${domInfo.linkCount}`);
      console.log(`   Max Nesting Depth: ${domInfo.maxDepth} levels`);
      console.log(`   Empty Wrapper DIVs: ${domInfo.emptyWrappers}`);
      console.log('');
      
    } catch (error) {
      console.error(`   ❌ Error checking ${pageInfo.name}: ${error.message}\n`);
    }
  }
  
  await browser.close();
  console.log('✅ DOM complexity check complete!');
})();