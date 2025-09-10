const fs = require('fs');
const path = require('path');

// Function to fix touch targets in TSX/JSX files
function fixTouchTargets() {
  const fixes = {
    // Button fixes - ensure minimum size
    'className="([^"]*?)(?<!min-h-\[44px\])(?<!p-3)"': (match, classes) => {
      if (match.includes('<button') || match.includes('Button')) {
        // Check if it already has sufficient padding/size
        if (!classes.includes('min-h-') && !classes.includes('py-3') && !classes.includes('p-3')) {
          return `className="${classes} min-h-[44px] min-w-[44px] p-3"`;
        }
      }
      return match;
    },
    
    // Link fixes for touch targets
    '<Link([^>]+)className="([^"]*)"': (match, attrs, classes) => {
      if (!classes.includes('min-h-') && !classes.includes('py-3') && !classes.includes('p-3')) {
        // Add touch-friendly classes to links that look like buttons
        if (classes.includes('btn') || classes.includes('button') || classes.includes('rounded')) {
          return `<Link${attrs}className="${classes} min-h-[44px] inline-flex items-center justify-center px-4 py-3"`;
        }
      }
      return match;
    },
    
    // Icon button fixes
    'className="([^"]*icon[^"]*)"': (match, classes) => {
      if (match.includes('<button') && !classes.includes('min-h-')) {
        return `className="${classes} min-h-[44px] min-w-[44px]"`;
      }
      return match;
    }
  };

  // Files to check and fix
  const filesToFix = [
    'app/page.tsx',
    'app/book-service/page.tsx',
    'src/components/UltraModernHeader.tsx',
    'src/components/UltraModernFooter.tsx',
    'src/components/mobile/MobileNav.tsx',
    'src/components/mobile/EnhancedMobileNav.tsx'
  ];

  let totalFixes = 0;

  filesToFix.forEach(filePath => {
    const fullPath = path.join(process.cwd(), filePath);
    
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      // Apply button fixes
      content = content.replace(
        /<button([^>]+)className="([^"]*)"([^>]*)>/g,
        (match, before, classes, after) => {
          if (!classes.includes('min-h-[44px]') && !classes.includes('p-3') && !classes.includes('py-3')) {
            totalFixes++;
            modified = true;
            return `<button${before}className="${classes} min-h-[44px] min-w-[44px] p-3"${after}>`;
          }
          return match;
        }
      );
      
      // Apply Link fixes
      content = content.replace(
        /<Link([^>]+)className="([^"]*)"([^>]*)>/g,
        (match, before, classes, after) => {
          // Check if it's a button-like link
          if ((classes.includes('btn') || classes.includes('button') || classes.includes('rounded')) &&
              !classes.includes('min-h-[44px]') && !classes.includes('py-3')) {
            totalFixes++;
            modified = true;
            return `<Link${before}className="${classes} min-h-[44px] inline-flex items-center justify-center px-4 py-3"${after}>`;
          }
          return match;
        }
      );
      
      // Fix icon buttons
      content = content.replace(
        /<button([^>]+)className="([^"]*(?:icon|Icon)[^"]*)"([^>]*)>/g,
        (match, before, classes, after) => {
          if (!classes.includes('min-h-[44px]') && !classes.includes('min-w-[44px]')) {
            totalFixes++;
            modified = true;
            return `<button${before}className="${classes} min-h-[44px] min-w-[44px] flex items-center justify-center"${after}>`;
          }
          return match;
        }
      );
      
      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`✅ Fixed touch targets in ${filePath}`);
      }
    } else {
      console.log(`⚠️ File not found: ${filePath}`);
    }
  });
  
  console.log(`\n📊 Total touch target fixes applied: ${totalFixes}`);
  return totalFixes;
}

// Run the fix
console.log('🔧 Fixing touch targets for mobile accessibility...\n');
const fixCount = fixTouchTargets();

if (fixCount > 0) {
  console.log('\n✅ Touch targets fixed! All interactive elements should now be at least 44x44px');
  console.log('📱 This improves mobile usability significantly');
} else {
  console.log('\n✅ No touch target fixes needed - all elements already meet minimum size');
}

console.log('\n💡 Next step: Run the audit to verify the fixes worked');
console.log('   node scripts/comprehensive-ui-ux-audit.js');