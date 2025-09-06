#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main(): Promise<void> {
  // Check if commit message was provided
  const commitMessage: string | undefined = process.argv[2];
  if (!commitMessage) {
    console.error('❌ Error: Commit message is required!');
    console.log('\n📝 Usage:');
    console.log('  npm run deploy "Your commit message here"');
    console.log('  npm run release "Your commit message here"');
    console.log('\n💡 Examples:');
    console.log('  npm run deploy "Add new Open Graph images for social sharing"');
    console.log('  npm run deploy "Fix responsive layout on mobile devices"');
    console.log('  npm run deploy "Update project descriptions and add new skills"');
    process.exit(1);
  }

  console.log('🚀 Starting deployment process...\n');
  console.log(`💬 Commit message: "${commitMessage}"\n`);
  
  try {
    // Step 1: Build the project
    console.log('📦 Building project...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully!\n');
    
    // Step 2: Add all changes to git
    console.log('📁 Adding changes to git...');
    execSync('git add .', { stdio: 'inherit' });
    console.log('✅ Changes added to git!\n');
    
    // Step 3: Commit changes with custom message
    console.log('💾 Committing changes...');
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
    console.log('✅ Changes committed!\n');
    
    // Step 4: Push to remote repository
    console.log('🌐 Pushing to remote repository...');
    execSync('git push', { stdio: 'inherit' });
    console.log('✅ Successfully pushed to remote!\n');
    
    console.log('🎉 Deployment completed successfully!');
    console.log('🌍 Your site should be updated shortly.');
    
  } catch (error: any) {
    if (error.message.includes('nothing to commit')) {
      console.log('ℹ️  No changes to deploy. Everything is up to date.');
    } else {
      console.error('❌ Deployment failed:', error.message);
      process.exit(1);
    }
  }
}

main();

