import sharp from 'sharp';
import fs from 'fs';

async function createFavicon() {
  try {
    const size = 32;
    
    // Create a simple circular favicon with a gradient
    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
          </radialGradient>
        </defs>
        <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="url(#grad)"/>
        <text x="${size/2}" y="${size/2 + 4}" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="white">B</text>
      </svg>
    `;

    // Convert SVG to PNG
    await sharp(Buffer.from(svg))
      .png()
      .toFile('public/favicon.png');

    // Also create favicon.ico
    await sharp(Buffer.from(svg))
      .png()
      .toFile('public/favicon.ico');
    
  } catch (error) {
    console.error('❌ Error creating favicon:', error);
  }
}

createFavicon();
