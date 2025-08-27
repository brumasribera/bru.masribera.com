#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🏷️ Creating missing git tags for existing releases...\n');

try {
  // Get all commits that look like version releases
  const commits = execSync('git log --oneline --grep="^v[0-9]"', { encoding: 'utf8' });
  
  if (!commits.trim()) {
    console.log('No version commits found to tag.');
    return;
  }
  
  console.log('Found version commits:');
  console.log(commits);
  console.log('\nCreating tags...\n');
  
  // Parse each commit and create tags
  const commitLines = commits.trim().split('\n');
  
  for (const line of commitLines) {
    const match = line.match(/^([a-f0-9]+) (v[0-9]+\.[0-9]+\.[0-9]+):/);
    if (match) {
      const [_, commitHash, version] = match;
      console.log(`Creating tag ${version} for commit ${commitHash}...`);
      
      try {
        execSync(`git tag -a ${version} ${commitHash} -m "Release ${version}"`, { stdio: 'inherit' });
        console.log(`✅ Tag ${version} created successfully`);
      } catch (tagError) {
        console.log(`⚠️ Tag ${version} already exists or failed to create`);
      }
    }
  }
  
  console.log('\n🏷️ All tags created!');
  console.log('\nTo push tags to remote:');
  console.log('git push --tags');
  
} catch (error) {
  console.error('❌ Failed to create tags:', error.message);
  process.exit(1);
}

