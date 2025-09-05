// Update version script

const fs = require('fs');
const path = require('path');

// Get current timestamp
const now = new Date();
const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');

// Read current version from package.json
const packagePath = path.join(__dirname, '..', '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const currentVersion = packageJson.version;

// Parse version components
const [major, minor, patch] = currentVersion.split('.').map(Number);

// Increment patch version for each release
const newPatch = patch + 1;
const newVersion = `${major}.${minor}.${newPatch}`;

console.log(`Updating version from ${currentVersion} to ${newVersion}`);
console.log(`Timestamp: ${timestamp}`);

// Update package.json
packageJson.version = newVersion;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

// Timer app is now external - no need to update timer files

// Update service worker version comment
const swPath = path.join(__dirname, '..', '..', 'public', 'sw.js');
let swContent = fs.readFileSync(swPath, 'utf8');

// Add or update version comment at the top
const versionComment = `// Timer Service Worker - Version ${newVersion} - Released ${timestamp}\n`;
if (swContent.includes('// Timer Service Worker - Version')) {
  swContent = swContent.replace(
    /\/\/ Timer Service Worker - Version [\d.]+ - Released [\d\-\s:]+/,
    `// Timer Service Worker - Version ${newVersion} - Released ${timestamp}`
  );
} else {
  swContent = versionComment + swContent;
}

fs.writeFileSync(swPath, swContent);

// Create version info file
const versionInfo = {
  version: newVersion,
  timestamp: timestamp,
  releaseDate: now.toISOString().split('T')[0],
  releaseTime: now.toTimeString().split(' ')[0]
};

const versionPath = path.join(__dirname, '..', '..', 'VERSION.json');
fs.writeFileSync(versionPath, JSON.stringify(versionInfo, null, 2) + '\n');

// Also update the public folder copy for deployment
const publicVersionPath = path.join(__dirname, '..', '..', 'public', 'VERSION.json');
fs.writeFileSync(publicVersionPath, JSON.stringify(versionInfo, null, 2) + '\n');

// Update README with current version
const readmePath = path.join(__dirname, '..', '..', 'README.md');
let readmeContent = fs.readFileSync(readmePath, 'utf8');

// Update version in README if it exists
if (readmeContent.includes('## Version')) {
  readmeContent = readmeContent.replace(
    /## Version\n\nCurrent: `[\d.]+`/,
    `## Version\n\nCurrent: \`${newVersion}\``
  );
} else {
  // Add version section if it doesn't exist
  const versionSection = `\n## Version\n\nCurrent: \`${newVersion}\`\nReleased: ${timestamp}\n\n`;
  readmeContent = readmeContent.replace(
    /## Features/,
    `${versionSection}## Features`
  );
}

fs.writeFileSync(readmePath, readmeContent);

console.log(`✅ Version updated to ${newVersion}`);
console.log(`✅ Timestamp updated to ${timestamp}`);
console.log(`✅ Files updated:`);
console.log(`   - package.json`);
console.log(`   - public/sw.js`);
console.log(`   - VERSION.json`);
console.log(`   - README.md`);

// Output the new version for use in commit messages
console.log(`\n📝 Use this version in your commit message:`);
console.log(`v${newVersion}: ${timestamp}`);
