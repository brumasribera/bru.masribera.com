import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Timer favicon SVG content
const timerFaviconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <!-- Timer circle background -->
  <circle cx="16" cy="16" r="15" fill="#1f2937" stroke="#6b7280" stroke-width="2"/>
  
  <!-- Timer face -->
  <circle cx="16" cy="16" r="12" fill="#374151" stroke="#9ca3af" stroke-width="1"/>
  
  <!-- Hour markers -->
  <line x1="16" y1="4" x2="16" y2="6" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
  <line x1="16" y1="26" x2="16" y2="28" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
  <line x1="4" y1="16" x2="6" y2="16" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
  <line x1="26" y1="16" x2="28" y2="16" stroke="#e5e7eb" stroke-width="2" stroke-linecap="round"/>
  
  <!-- Minute markers -->
  <line x1="22" y1="10" x2="23" y2="11" stroke="#9ca3af" stroke-width="1" stroke-linecap="round"/>
  <line x1="21" y1="21" x2="22" y2="22" stroke="#9ca3af" stroke-width="1" stroke-linecap="round"/>
  <line x1="10" y1="22" x2="11" y2="21" stroke="#9ca3af" stroke-width="1" stroke-linecap="round"/>
  <line x1="9" y1="10" x2="10" y2="11" stroke="#9ca3af" stroke-width="1" stroke-linecap="round"/>
  
  <!-- Timer hands -->
  <!-- Hour hand -->
  <line x1="16" y1="16" x2="16" y2="8" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
  <!-- Minute hand -->
  <line x1="16" y1="16" x2="22" y2="16" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>
  <!-- Second hand -->
  <line x1="16" y1="16" x2="16" y2="6" stroke="#ef4444" stroke-width="1" stroke-linecap="round"/>
  
  <!-- Center dot -->
  <circle cx="16" cy="16" r="2" fill="#fbbf24"/>
</svg>`;

// Create timer favicon directory
const timerFaviconDir = path.join(__dirname, '../public/timer-favicon');
if (!fs.existsSync(timerFaviconDir)) {
  fs.mkdirSync(timerFaviconDir, { recursive: true });
}

// Write the SVG file
fs.writeFileSync(path.join(timerFaviconDir, 'favicon-timer.svg'), timerFaviconSVG);

// Create a simple HTML file to test the favicon
const testHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timer Favicon Test</title>
    <link rel="icon" type="image/svg+xml" href="favicon-timer.svg">
    <link rel="icon" type="image/x-icon" href="favicon-timer.ico">
    <link rel="apple-touch-icon" href="apple-touch-icon-timer.png">
</head>
<body>
    <h1>Timer Favicon Test</h1>
    <p>Check your browser tab to see the timer favicon!</p>
</body>
</html>`;

fs.writeFileSync(path.join(timerFaviconDir, 'test.html'), testHTML);

console.log('✅ Timer favicon files created successfully!');
console.log('📁 Location: public/timer-favicon/');
console.log('🔗 Test file: public/timer-favicon/test.html');
console.log('');
console.log('📝 Note: You can now use these favicon files in your timer page:');
console.log('   - favicon-timer.svg (SVG version)');
console.log('   - test.html (to preview the favicon)');
console.log('');
console.log('💡 To use in your timer page, add this to the head:');
console.log('   <link rel="icon" type="image/svg+xml" href="/timer-favicon/favicon-timer.svg">');
