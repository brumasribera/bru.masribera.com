const fs = require('fs');
const path = require('path');

// Get environment from command line or default to development
const env = process.argv[2] || 'development';

const publicDir = path.join(__dirname, '..', 'public');

if (env === 'production') {
  // Copy production favicon
  fs.copyFileSync(
    path.join(publicDir, 'favicon-prod.svg'),
    path.join(publicDir, 'favicon.svg')
  );
  console.log('✅ Switched to PRODUCTION favicon (green gradient)');
} else {
  // Copy development favicon
  fs.copyFileSync(
    path.join(publicDir, 'favicon-dev.svg'),
    path.join(publicDir, 'favicon.svg')
  );
  console.log('🔵 Switched to DEVELOPMENT favicon (blue/purple gradient)');
}
