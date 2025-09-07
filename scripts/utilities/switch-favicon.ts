import { copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get environment from command line or default to development
const env: string = process.argv[2] || 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', '..', 'public');

if (env === 'production') {
  // Copy production favicon
  copyFileSync(
    join(publicDir, 'icons/favicons', 'favicon-production.svg'),
    join(publicDir, 'icons/favicons/favicon.svg')
  );
} else {
  // Copy development favicon
  copyFileSync(
    join(publicDir, 'icons/favicons', 'favicon-development.svg'),
    join(publicDir, 'icons/favicons/favicon.svg')
  );
}

// Copy manifest file to root for both environments
const distDir = join(__dirname, '..', '..', 'dist');
const publicConfigDir = join(__dirname, '..', '..', 'public', 'config');
const manifestSource = join(publicConfigDir, 'site.webmanifest');
const manifestDest = join(distDir, 'site.webmanifest');

try {
  copyFileSync(manifestSource, manifestDest);
  console.log('✅ Manifest file copied to dist root');
} catch (error) {
  console.log('⚠️  Manifest file not found in public/config directory, skipping copy');
}

