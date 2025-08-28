// Release script

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting release process...\n');

// Get commit message from command line arguments
const commitMessage = process.argv[2];

if (!commitMessage) {
  console.error('❌ Error: Commit message is required');
  console.log('Usage: npm run release "your commit message here"');
  process.exit(1);
}

try {
  // Step 1: Update version
  console.log('📝 Step 1: Updating version...');
  execSync('npm run version:update', { stdio: 'inherit' });
  
  // Step 2: Read the new version for reference
  const versionPath = path.join(__dirname, '..', 'VERSION.json');
  const versionInfo = JSON.parse(fs.readFileSync(versionPath, 'utf8'));
  
  console.log(`\n✅ Version updated to ${versionInfo.version}`);
  console.log(`📅 Release timestamp: ${versionInfo.timestamp}\n`);
  
  // Step 3: Build the project
  console.log('🔨 Step 2: Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Step 4: Add all changes
  console.log('\n📦 Step 3: Adding changes to git...');
  execSync('git add .', { stdio: 'inherit' });
  
  // Step 5: Commit with user's message
  console.log('\n💾 Step 4: Committing changes...');
  const formattedCommitMessage = `v${versionInfo.version}: ${commitMessage}`;
  execSync(`git commit -m "${formattedCommitMessage}"`, { stdio: 'inherit' });
  
  // Step 6: Create git tag
  console.log('\n🏷️ Step 5: Creating git tag...');
  execSync(`git tag -a v${versionInfo.version} -m "Release v${versionInfo.version}"`, { stdio: 'inherit' });
  
  // Step 7: Push to remote (including tags)
  console.log('\n🚀 Step 6: Pushing to remote repository...');
  execSync('git push --follow-tags', { stdio: 'inherit' });
  
  console.log('\n🎉 Release completed successfully!');
  console.log(`📋 Version: ${versionInfo.version}`);
  console.log(`⏰ Released: ${versionInfo.timestamp}`);
  console.log(`🏷️ Git tag: v${versionInfo.version}`);
  console.log(`💬 Commit: ${commitMessage}`);
  console.log('\n💡 Next time you want to release, just run: npm run release "your message"');
  
} catch (error) {
  console.error('\n❌ Release failed:', error.message);
  process.exit(1);
}
