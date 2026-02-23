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
    'Photorealistic product photography on a dark charcoal studio backdrop with soft gradient lighting.',
    '',
    'A professional flat-lay arrangement of disaster recovery industry partnership materials:',
    '',
    'Centre composition showing:',
    '- A brushed titanium presentation folder embossed with "NRPG" in silver foil, partially open revealing professional documentation',
    '- Several high-quality certification badges and medallions laid artistically: an industry certification badge in blue and gold tones, association membership plaques in polished metal',
    '- A polished chrome pen resting across a formal partnership agreement document',
    '- Corporate business cards in premium matte black with silver embossing arranged in a fan pattern',
    '- A small engraved crystal award trophy representing industry excellence',
    '- A premium leather-bound portfolio with gold corner accents',
    '',
    'Style: Ultra-clean commercial product photography, studio lighting with subtle rim highlights on metallic surfaces. Dark sophisticated mood matching a premium corporate brand. Shot from 45-degree overhead angle.',
    '',
    'Technical: 16:9 aspect ratio, 2K resolution, photographic quality with shallow depth of field on background elements. Cinematic colour grading with cool blue-silver tones and warm amber accent highlights on metallic surfaces.',
  ].join('\n');

  console.log('Generating image...');
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
  const outPath = 'public/images/antigravity/gear-industryPartners.webp';
  fs.writeFileSync(outPath, buffer);
  const stats = fs.statSync(outPath);
  console.log('Saved:', outPath, '(' + Math.round(stats.size / 1024) + ' KB)');
}

generate().catch(e => console.error('Error:', e.message));
