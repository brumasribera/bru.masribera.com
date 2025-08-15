#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting deployment process...\n');

// Check if dist folder exists
if (!fs.existsSync('dist')) {
  console.log('❌ dist folder not found. Building project first...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully!\n');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Display build info
const distPath = path.join(process.cwd(), 'dist');
const files = fs.readdirSync(distPath);
let totalSize = 0;

for (const file of files) {
  const filePath = path.join(distPath, file);
  try {
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      totalSize += stats.size;
    }
  } catch (error) {
    // Skip files that can't be read
  }
}

console.log('📊 Build Information:');
console.log(`📁 Total files: ${files.length}`);
console.log(`💾 Total size: ${(totalSize / 1024).toFixed(2)} KB`);
console.log('');

// Check for common deployment platforms
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const hasVercel = fs.existsSync('.vercel');
const hasNetlify = fs.existsSync('netlify.toml');

console.log('🔍 Detected deployment platforms:');
if (hasVercel) console.log('✅ Vercel configuration found');
if (hasNetlify) console.log('✅ Netlify configuration found');
if (!hasVercel && !hasNetlify) console.log('ℹ️  No deployment config found - manual deployment required');

console.log('\n🚀 Deployment Options:');
console.log('');

if (hasVercel) {
  console.log('1️⃣  Vercel (Recommended):');
  console.log('   vercel --prod dist');
  console.log('');
}

if (hasNetlify) {
  console.log('2️⃣  Netlify:');
  console.log('   netlify deploy --prod --dir=dist');
  console.log('');
}

console.log('3️⃣  Manual Deployment:');
console.log('   Upload contents of dist/ folder to your hosting provider');
console.log('');

console.log('4️⃣  GitHub Pages:');
console.log('   npm install -g gh-pages');
console.log('   gh-pages -d dist');
console.log('');

console.log('📋 Next Steps:');
console.log('1. Choose your deployment method above');
console.log('2. Run the deployment command');
console.log('3. Test the deployed site');
console.log('4. Update DNS if using custom domain');
console.log('');

console.log('🎉 Your portfolio is ready for release!');
console.log(`📅 Version: ${packageJson.version}`);
console.log('🌟 Good luck with your deployment!');
