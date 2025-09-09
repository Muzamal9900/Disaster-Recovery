#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Color mapping for better contrast
const colorMapping = {
  // On dark backgrounds (most of the site uses dark gradients)
  'text-gray-700': 'text-gray-200',  // Very poor contrast -> Much better
  'text-gray-600': 'text-gray-200',  // Poor contrast -> Much better  
  'text-gray-500': 'text-gray-300',  // Medium contrast -> Better
  'text-gray-400': 'text-gray-200',  // Already okay but could be better
  
  // For hover states
  'hover:text-gray-700': 'hover:text-gray-200',
  'hover:text-gray-600': 'hover:text-gray-200',
  'hover:text-gray-500': 'hover:text-gray-300',
  'hover:text-gray-400': 'hover:text-gray-200',
  
  // For focus states
  'focus:text-gray-700': 'focus:text-gray-200',
  'focus:text-gray-600': 'focus:text-gray-200',
  'focus:text-gray-500': 'focus:text-gray-300',
  'focus:text-gray-400': 'focus:text-gray-200',
};

// Additional button contrast fixes
const buttonColorMapping = {
  'bg-gray-600': 'bg-gray-800',
  'bg-gray-500': 'bg-gray-700',
  'hover:bg-gray-700': 'hover:bg-gray-900',
  'hover:bg-gray-600': 'hover:bg-gray-800',
  'hover:bg-gray-500': 'hover:bg-gray-700',
};

let totalFixed = 0;
let filesFixed = 0;

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  let fixCount = 0;
  
  // Check if this is a dark background page/component
  const hasDarkBackground = /bg-(gray|slate|zinc|neutral)-(800|900|950)|bg-black|from-(gray|slate|zinc)-(800|900|950)|bg-gradient-to/.test(content);
  
  // Fix text colors
  Object.entries(colorMapping).forEach(([oldColor, newColor]) => {
    const regex = new RegExp(`\\b${oldColor}\\b`, 'g');
    const matches = content.match(regex);
    if (matches) {
      content = content.replace(regex, newColor);
      fixCount += matches.length;
    }
  });
  
  // Fix button colors if needed
  if (hasDarkBackground) {
    Object.entries(buttonColorMapping).forEach(([oldColor, newColor]) => {
      const regex = new RegExp(`\\b${oldColor}\\b`, 'g');
      const matches = content.match(regex);
      if (matches) {
        content = content.replace(regex, newColor);
        fixCount += matches.length;
      }
    });
  }
  
  // Special case: placeholder text
  content = content.replace(/placeholder:text-gray-500/g, 'placeholder:text-gray-400');
  content = content.replace(/placeholder-gray-500/g, 'placeholder-gray-400');
  
  // Special case: disabled states (these can stay lighter)
  content = content.replace(/disabled:text-gray-200/g, 'disabled:text-gray-500');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed ${fixCount} contrast issues in: ${path.relative(process.cwd(), filePath)}`);
    totalFixed += fixCount;
    filesFixed++;
    return true;
  }
  
  return false;
}

console.log('🔍 Searching for contrast issues in all TSX/JSX files...\n');

// Find all relevant files
const patterns = [
  'app/**/*.tsx',
  'app/**/*.jsx',
  'src/**/*.tsx',
  'src/**/*.jsx',
  'components/**/*.tsx',
  'components/**/*.jsx'
];

const allFiles = [];
patterns.forEach(pattern => {
  const files = glob.sync(pattern, { 
    cwd: process.cwd(),
    ignore: ['**/node_modules/**', '**/.next/**', '**/dist/**']
  });
  allFiles.push(...files);
});

console.log(`Found ${allFiles.length} files to check...\n`);

// Process each file
allFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  fixFile(filePath);
});

console.log('\n' + '='.repeat(50));
console.log(`✨ COMPLETE! Fixed ${totalFixed} contrast issues across ${filesFixed} files`);
console.log('='.repeat(50));

// Create a report
const report = `
# Contrast Fix Report
Date: ${new Date().toISOString()}
Files Checked: ${allFiles.length}
Files Fixed: ${filesFixed}
Total Issues Fixed: ${totalFixed}

## Changes Made:
- text-gray-700 → text-gray-200
- text-gray-600 → text-gray-200
- text-gray-500 → text-gray-300
- text-gray-400 → text-gray-200

## Next Steps:
1. Review the changes
2. Test on live site
3. Run accessibility checker
`;

fs.writeFileSync('contrast-fix-report.md', report, 'utf8');
console.log('\n📄 Report saved to contrast-fix-report.md');