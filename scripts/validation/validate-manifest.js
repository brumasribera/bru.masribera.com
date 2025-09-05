import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read and validate the timer manifest
function validateManifest() {
  try {
    const manifestPath = path.join(__dirname, '../public/tools/timer/manifest.webmanifest');
    const manifestContent = fs.readFileSync(manifestPath, 'utf8');
    const manifest = JSON.parse(manifestContent);
    
    console.log('✅ Manifest file loaded successfully');
    console.log('📋 Manifest content:');
    console.log(JSON.stringify(manifest, null, 2));
    
    // Check required fields
    const requiredFields = ['name', 'short_name', 'start_url', 'display'];
    const missingFields = requiredFields.filter(field => !manifest[field]);
    
    if (missingFields.length > 0) {
      console.log(`❌ Missing required fields: ${missingFields.join(', ')}`);
    } else {
      console.log('✅ All required fields present');
    }
    
    // Check start_url
    if (manifest.start_url === '/tools/timer') {
      console.log('✅ start_url correctly set to /tools/timer');
    } else {
      console.log(`❌ start_url is ${manifest.start_url}, should be /tools/timer`);
    }
    
    // Check scope
    if (manifest.scope === '/tools/timer') {
      console.log('✅ scope correctly set to /tools/timer');
    } else {
      console.log(`❌ scope is ${manifest.scope}, should be /tools/timer`);
    }
    
    // Check icons
    if (manifest.icons && manifest.icons.length > 0) {
      console.log(`✅ ${manifest.icons.length} icons defined`);
      
      // Check if icon files exist
      manifest.icons.forEach((icon, index) => {
        const iconPath = path.join(__dirname, '../public', icon.src);
        if (fs.existsSync(iconPath)) {
          console.log(`  ✅ Icon ${index + 1}: ${icon.src} exists`);
        } else {
          console.log(`  ❌ Icon ${index + 1}: ${icon.src} missing`);
        }
      });
    } else {
      console.log('❌ No icons defined');
    }
    
    console.log('\n🔍 Manifest validation complete!');
    
  } catch (error) {
    console.error('❌ Error validating manifest:', error.message);
  }
}

// Check if the manifest file exists
function checkManifestFile() {
  const manifestPath = path.join(__dirname, '../public/tools/timer/manifest.webmanifest');
  
  if (fs.existsSync(manifestPath)) {
    console.log('✅ Manifest file exists at:', manifestPath);
    validateManifest();
  } else {
    console.log('❌ Manifest file not found at:', manifestPath);
    
    // Check what's in the timer directory
    const timerDir = path.join(__dirname, '../public/tools/timer');
    if (fs.existsSync(timerDir)) {
      const files = fs.readdirSync(timerDir);
      console.log('📁 Files in timer directory:', files);
    } else {
      console.log('❌ Timer directory not found');
    }
  }
}

checkManifestFile();
