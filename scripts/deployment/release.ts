#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

interface VersionInfo {
  version: string;
  timestamp: string;
}

console.log('🚀 Starting automated release process...\n');

try {
  // Step 1: Update version
  console.log('📝 Step 1: Updating version...');
  execSync('npm run version:update', { stdio: 'inherit' });
  
  // Step 2: Read the new version for commit message
  const versionPath = path.join(__dirname, '..', 'VERSION.json');
  const versionInfo: VersionInfo = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
  
  console.log(`\n✅ Version updated to ${versionInfo.version}`);
  console.log(`📅 Release timestamp: ${versionInfo.timestamp}\n`);
  
  // Step 3: Build the project
  console.log('🔨 Step 2: Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Step 4: Add all changes
  console.log('\n📦 Step 3: Adding changes to git...');
  execSync('git add .', { stdio: 'inherit' });
  
  // Step 5: Commit with version
  console.log('\n💾 Step 4: Committing changes...');
  const commitMessage = `v${versionInfo.version}: ${versionInfo.timestamp} - Automated release`;
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  
  // Step 6: Push to remote
  console.log('\n🚀 Step 5: Pushing to remote repository...');
  execSync('git push', { stdio: 'inherit' });
  
  console.log('\n🎉 Release completed successfully!');
  console.log(`📋 Version: ${versionInfo.version}`);
  console.log(`⏰ Released: ${versionInfo.timestamp}`);
  console.log('\n💡 Next time you want to release, just run: npm run release');
  
} catch (error: any) {
  console.error('\n❌ Release failed:', error.message);
  process.exit(1);
}

