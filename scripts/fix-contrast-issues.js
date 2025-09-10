const fs = require('fs');
const path = require('path');

// Color replacement mappings for better contrast
const replacements = {
  // Fix light gray on white - change to dark gray
  'text-gray-200': 'text-gray-700',
  'text-gray-300': 'text-gray-700',
  'text-gray-400': 'text-gray-600',
  'text-gray-100': 'text-gray-700',
  
  // Fix light colors on white backgrounds
  'text-blue-200': 'text-blue-700',
  'text-blue-300': 'text-blue-700',
  'text-purple-200': 'text-purple-700',
  'text-purple-300': 'text-purple-700',
  'text-indigo-200': 'text-indigo-700',
  'text-indigo-300': 'text-indigo-700',
  'text-red-200': 'text-red-700',
  'text-red-300': 'text-red-700',
  'text-green-200': 'text-green-700',
  'text-green-300': 'text-green-700',
};

// Files/patterns to skip (they have dark backgrounds)
const skipPatterns = [
  'UltraModernFooter',
  'UltraModernHeader',
  'mobile/MobileNav',
  'mobile/EnhancedMobileNav',
];

function shouldSkipFile(filePath) {
  return skipPatterns.some(pattern => filePath.includes(pattern));
}

function fixContrastInFile(filePath) {
  if (shouldSkipFile(filePath)) {
    return 0;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changeCount = 0;
  
  // Apply replacements
  for (const [oldClass, newClass] of Object.entries(replacements)) {
    const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
    const matches = content.match(regex);
    
    if (matches) {
      const count = matches.length;
      content = content.replace(regex, newClass);
      changeCount += count;
    }
  }
  
  if (changeCount > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${changeCount} issues in ${path.basename(filePath)}`);
  }
  
  return changeCount;
}

// Priority files to fix first
const priorityFiles = [
  'app/page.tsx',
  'app/contact/page.tsx',
  'app/book-service/page.tsx',
  'app/about/page.tsx',
  'src/components/UltraModernServiceCards.tsx',
  'src/components/UltraModernHero.tsx',
];

console.log('🔧 Fixing contrast issues in priority files...\n');
let totalChanges = 0;

priorityFiles.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    const changes = fixContrastInFile(fullPath);
    totalChanges += changes;
  }
});

console.log(`\n✨ Fixed ${totalChanges} contrast issues in priority files!`);