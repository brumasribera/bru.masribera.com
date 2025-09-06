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

