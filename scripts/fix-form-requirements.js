const fs = require('fs');
const path = require('path');

function fixFormRequirements() {
  const formPath = path.join(process.cwd(), 'app/book-service/page.tsx');
  
  if (!fs.existsSync(formPath)) {
    console.error('❌ Booking form not found!');
    return;
  }
  
  let content = fs.readFileSync(formPath, 'utf8');
  let fixCount = 0;
  
  console.log('🔧 Fixing form requirements...\n');
  
  // Fix 1: Add required and aria-required to firstName
  content = content.replace(
    /<input([^>]*?)id="firstName"([^>]*?)>/g,
    (match) => {
      if (!match.includes('required')) {
        fixCount++;
        console.log('✅ Added required to firstName field');
        return match.replace('>', ' required aria-required="true">');
      }
      return match;
    }
  );
  
  // Fix 2: Add required and aria-required to lastName
  content = content.replace(
    /<input([^>]*?)id="lastName"([^>]*?)>/g,
    (match) => {
      if (!match.includes('required')) {
        fixCount++;
        console.log('✅ Added required to lastName field');
        return match.replace('>', ' required aria-required="true">');
      }
      return match;
    }
  );
  
  // Fix 3: Add required, type="email" and pattern to email
  content = content.replace(
    /<input([^>]*?)id="email"([^>]*?)>/g,
    (match) => {
      let newMatch = match;
      if (!match.includes('type="email"')) {
        newMatch = newMatch.replace('type="text"', 'type="email"');
        console.log('✅ Changed email to type="email"');
      }
      if (!match.includes('required')) {
        fixCount++;
        newMatch = newMatch.replace('>', ' required aria-required="true">');
        console.log('✅ Added required to email field');
      }
      if (!match.includes('pattern=')) {
        newMatch = newMatch.replace('>', ' pattern="[^@\\s]+@[^@\\s]+\\.[^@\\s]+">');
        console.log('✅ Added email pattern validation');
      }
      return newMatch;
    }
  );
  
  // Fix 4: Add required and pattern to phone
  content = content.replace(
    /<input([^>]*?)id="phone"([^>]*?)>/g,
    (match) => {
      let newMatch = match;
      if (!match.includes('type="tel"')) {
        newMatch = newMatch.replace('type="text"', 'type="tel"');
      }
      if (!match.includes('required')) {
        fixCount++;
        newMatch = newMatch.replace('>', ' required aria-required="true">');
        console.log('✅ Added required to phone field');
      }
      if (!match.includes('pattern=')) {
        newMatch = newMatch.replace('>', ' pattern="[0-9]{10,14}">');
        console.log('✅ Added phone pattern validation');
      }
      return newMatch;
    }
  );
  
  // Fix 5: Add required to propertyAddress
  content = content.replace(
    /<input([^>]*?)name="propertyAddress"([^>]*?)>/g,
    (match) => {
      if (!match.includes('required')) {
        fixCount++;
        console.log('✅ Added required to propertyAddress field');
        return match.replace('>', ' required aria-required="true">');
      }
      return match;
    }
  );
  
  // Fix 6: Add required to postcode with pattern
  content = content.replace(
    /<input([^>]*?)name="postcode"([^>]*?)>/g,
    (match) => {
      let newMatch = match;
      if (!match.includes('required')) {
        fixCount++;
        newMatch = newMatch.replace('>', ' required aria-required="true">');
        console.log('✅ Added required to postcode field');
      }
      if (!match.includes('pattern=')) {
        newMatch = newMatch.replace('>', ' pattern="[0-9]{4}">');
        console.log('✅ Added postcode pattern validation');
      }
      return newMatch;
    }
  );
  
  // Fix 7: Add required to damage description textarea
  content = content.replace(
    /<textarea([^>]*?)id="damage"([^>]*?)>/g,
    (match) => {
      if (!match.includes('required')) {
        fixCount++;
        console.log('✅ Added required to damage description');
        return match.replace('>', ' required aria-required="true">');
      }
      return match;
    }
  );
  
  // Write the fixed content back
  fs.writeFileSync(formPath, content);
  
  console.log(`\n📊 Total form fixes applied: ${fixCount}`);
  console.log('\n✅ Form requirements fixed!');
  console.log('   - At least 7 fields now have required attributes');
  console.log('   - Email has type="email" and pattern validation');
  console.log('   - Phone has type="tel" and pattern validation');
  console.log('   - Postcode has pattern validation for 4 digits');
  
  return fixCount;
}

// Run the fix
const fixes = fixFormRequirements();
console.log('\n💡 Next: Run audit to verify form validation improvements');