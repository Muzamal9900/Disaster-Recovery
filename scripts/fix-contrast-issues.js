const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Function to fix contrast issues in a file
function fixContrastIssues(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  const originalContent = content;

  // Fix gray-700 on dark backgrounds (common in dark mode sections)
  const replacements = [
    // Light grays that need better contrast
    { from: /text-gray-700/g, to: 'text-gray-300', context: 'dark backgrounds' },
    { from: /text-gray-600/g, to: 'text-gray-400', context: 'dark backgrounds' },
    { from: /text-gray-500/g, to: 'text-gray-400', context: 'dark backgrounds' },
    
    // For white/light backgrounds, ensure dark enough text
    { from: /bg-white.*text-gray-500/g, to: (match) => match.replace('text-gray-500', 'text-gray-700'), context: 'white backgrounds' },
    { from: /bg-gray-50.*text-gray-500/g, to: (match) => match.replace('text-gray-500', 'text-gray-700'), context: 'light backgrounds' },
    
    // Fix light gradient backgrounds with poor contrast
    { from: /from-gray-50.*text-gray-(500|600)/g, to: (match) => match.replace(/text-gray-(500|600)/, 'text-gray-800'), context: 'light gradients' },
    { from: /from-slate-50.*text-gray-(500|600)/g, to: (match) => match.replace(/text-gray-(500|600)/, 'text-gray-800'), context: 'light gradients' },
  ];

  // Check if file has dark background patterns
  const hasDarkBackground = /bg-(gray|slate|zinc|neutral)-(900|950)|bg-black|from-(gray|slate)-(900|950)|via-(gray|slate)-(900|950)/.test(content);
  const hasGradientBackground = /bg-gradient-to/.test(content);

  if (hasDarkBackground || hasGradientBackground) {
    // Apply dark background fixes
    replacements.forEach(({ from, to }) => {
      if (typeof to === 'string' && from.test(content)) {
        content = content.replace(from, to);
        modified = true;
      }
    });
  }

  // Special handling for specific component patterns
  if (filePath.includes('app/about/page.tsx')) {
    // Already fixed
  } else if (filePath.includes('services') || filePath.includes('locations')) {
    // Service and location pages often have gradient backgrounds
    content = content.replace(/text-gray-700/g, 'text-gray-300');
    content = content.replace(/text-gray-600/g, 'text-gray-400');
    content = content.replace(/text-gray-500/g, 'text-gray-400');
    modified = content !== originalContent;
  }

  if (modified) {
    console.log(`Fixed contrast issues in: ${filePath}`);
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

// Main execution
async function main() {
  console.log('Searching for files with potential contrast issues...\n');
  
  const patterns = [
    'app/**/*.tsx',
    'src/components/**/*.tsx',
    'components/**/*.tsx'
  ];

  let totalFixed = 0;
  
  for (const pattern of patterns) {
    const files = glob.sync(pattern, { 
      cwd: process.cwd(),
      ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**']
    });

    for (const file of files) {
      const filePath = path.join(process.cwd(), file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Only process files with potential contrast issues
      if (/text-gray-(500|600|700)/.test(content)) {
        if (fixContrastIssues(filePath)) {
          totalFixed++;
        }
      }
    }
  }

  console.log(`\n✅ Fixed contrast issues in ${totalFixed} files`);
}

// Run the script
main().catch(console.error);