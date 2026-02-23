const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx);
  let val = trimmed.slice(eqIdx + 1);
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    val = val.slice(1, -1);
  }
  process.env[key] = val;
}

async function generate() {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('No API key found');
  const client = new GoogleGenAI({ apiKey });

  const prompt = [
    'Photorealistic 3D render of a bold "DR" logo on a dark charcoal studio backdrop.',
    '',
    'The letter "D" is rendered in a rich BROWN / AMBER metallic finish (like oxidised copper or dark amber resin),',
    'with a heartbeat / ECG pulse-line extending from the left side into the "D" letter.',
    'The pulse-line matches the brown/amber colour of the D.',
    'The letter "R" is rendered in brushed stainless steel / silver metal.',
    '',
    'Both letters are thick, solid 3D extruded forms with bevelled edges, floating slightly above a dark reflective surface.',
    'Dramatic rim lighting from above-right. Subtle reflections on the dark floor beneath.',
    '',
    'Style: Identical to a series of existing 3D DR logo renders where the D is coloured (cyan for water, red for fire,',
    'green for mould, gunmetal for storm, gold for trauma) and the R is always brushed silver.',
    'This one uses BROWN/AMBER for the D to represent sewage/contamination services.',
    '',
    'Technical: Square 1:1 aspect ratio, photorealistic Octane-quality render, ray-traced metallic reflections,',
    'volumetric ambient lighting, sharp detail, dark neutral background with subtle gradient.',
    'No text other than the letters D and R. No watermarks.',
  ].join('\n');

  console.log('Generating sewage icon (brown/amber DR logo)...');
  const response = await client.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config: { responseModalities: ['IMAGE', 'TEXT'] },
  });

  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) throw new Error('No response parts');
  const imagePart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));
  if (!imagePart?.inlineData) throw new Error('No image data returned');

  const buffer = Buffer.from(imagePart.inlineData.data, 'base64');
  const outPath = path.join(__dirname, '..', 'public/images/antigravity/logo_3d_sewage.webp');
  fs.writeFileSync(outPath, buffer);
  const stats = fs.statSync(outPath);
  console.log('Saved:', outPath, '(' + Math.round(stats.size / 1024) + ' KB)');
}

generate().catch(e => console.error('Error:', e.message));
