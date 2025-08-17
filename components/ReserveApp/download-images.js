import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Project images data with updated URLs and better organization
const projectImages = [
  { id: "mx-mangroves", url: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop", category: "mangroves" },
  { id: "br-amazon", url: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop", category: "rainforest" },
  { id: "id-seagrass", url: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1200&auto=format&fit=crop", category: "marine" },
  { id: "ke-savanna", url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200&auto=format&fit=crop", category: "savanna" },
  { id: "us-cal-giants", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop", category: "forest" },
  { id: "ca-boreal", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop", category: "boreal" },
  { id: "ar-wetlands", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop", category: "wetlands" },
  { id: "pe-cloud", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop", category: "cloud-forest" },
  { id: "ng-mangrove", url: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop", category: "mangroves" },
  { id: "ma-atlas", url: "https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop", category: "mountains" },
  { id: "es-donana", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop", category: "wetlands" },
  { id: "ro-delta", url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", category: "delta" },
  { id: "ua-steppe", url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200&auto=format&fit=crop", category: "steppe" },
  { id: "ru-taiga", url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", category: "taiga" },
  { id: "in-sundarbans", url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", category: "mangroves" },
  { id: "np-terai", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop", category: "grassland" },
  { id: "th-coral", url: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1200&auto=format&fit=crop", category: "coral-reef" },
  { id: "au-reef", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop", category: "coral-reef" },
  { id: "pg-png", url: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop", category: "rainforest" },
  { id: "za-fynbos", url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200&auto=format&fit=crop", category: "fynbos" },
  { id: "mg-madagascar", url: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop", category: "rainforest" },
  { id: "ma-seagrass", url: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1200&auto=format&fit=crop", category: "marine" },
  { id: "no-bogs", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop", category: "bogs" },
  { id: "uk-heath", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop", category: "heathland" },
  { id: "tr-anatolia", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop", category: "mountains" },
  { id: "ir-wetland", url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", category: "wetlands" },
  { id: "cn-giantpanda", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop", category: "bamboo-forest" },
  { id: "jp-sea", url: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1200&auto=format&fit=crop", category: "marine" },
  { id: "nz-kelp", url: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1200&auto=format&fit=crop", category: "kelp-forest" },
  { id: "is-highlands", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop", category: "highlands" },
  { id: "maurit-corals", url: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1200&auto=format&fit=crop", category: "coral-reef" },
  { id: "eg-nile", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop", category: "river" },
  { id: "sa-mangrove", url: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1200&auto=format&fit=crop", category: "mangroves" }
];

// Use the new organized folder structure
const imagesDir = path.join(__dirname, '..', '..', 'public', 'reserve', 'project-images');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Function to validate downloaded image
function validateImage(filepath) {
  try {
    const stats = fs.statSync(filepath);
    // Check if file exists and has reasonable size (at least 10KB)
    return stats.size > 10240;
  } catch (error) {
    return false;
  }
}

// Optimized download function with better error handling and progress tracking
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(imagesDir, filename);
    
    // Check if file already exists and is valid
    if (fs.existsSync(filepath) && validateImage(filepath)) {
      console.log(`✅ ${filename} already exists and is valid, skipping...`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filepath);
    
    // Add timeout to prevent hanging requests
    const timeout = setTimeout(() => {
      file.destroy();
      fs.unlink(filepath, () => {});
      reject(new Error('Download timeout'));
    }, 30000); // 30 second timeout
    
    const request = https.get(url, (response) => {
      clearTimeout(timeout);
      
      if (response.statusCode === 200) {
        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          // Validate the downloaded image
          if (validateImage(filepath)) {
            console.log(`✅ Downloaded: ${filename}`);
            resolve();
          } else {
            fs.unlink(filepath, () => {});
            reject(new Error('Downloaded file is invalid or too small'));
          }
        });
        
        file.on('error', (err) => {
          fs.unlink(filepath, () => {});
          console.log(`❌ File write error for ${filename}: ${err.message}`);
          reject(err);
        });
      } else {
        clearTimeout(timeout);
        file.destroy();
        fs.unlink(filepath, () => {});
        console.log(`❌ Failed to download ${filename}: HTTP ${response.statusCode}`);
        reject(new Error(`HTTP ${response.statusCode}`));
      }
    });
    
    request.on('error', (err) => {
      clearTimeout(timeout);
      file.destroy();
      fs.unlink(filepath, () => {});
      console.log(`❌ Network error downloading ${filename}: ${err.message}`);
      reject(err);
    });
    
    request.setTimeout(30000, () => {
      clearTimeout(timeout);
      request.destroy();
      file.destroy();
      fs.unlink(filepath, () => {});
      reject(new Error('Request timeout'));
    });
  });
}

// Download images in batches for better performance
async function downloadAllImages() {
  console.log('🚀 Starting download of all project images...\n');
  console.log(`📁 Images will be saved to: ${imagesDir}\n`);
  
  const batchSize = 5; // Download 5 images concurrently
  const totalImages = projectImages.length;
  let completed = 0;
  let failed = 0;
  let skipped = 0;
  
  // Process images in batches
  for (let i = 0; i < totalImages; i += batchSize) {
    const batch = projectImages.slice(i, i + batchSize);
    const promises = batch.map(project => {
      const filename = `${project.id}.jpg`;
      return downloadImage(project.url, filename)
        .then(() => {
          completed++;
          console.log(`📊 Progress: ${completed}/${totalImages} (${Math.round(completed/totalImages*100)}%)`);
        })
        .catch((error) => {
          if (error.message.includes('already exists')) {
            skipped++;
          } else {
            failed++;
            console.log(`❌ ${filename}: ${error.message}`);
          }
          console.log(`📊 Progress: ${completed}/${totalImages} (${Math.round(completed/totalImages*100)}%) - ${failed} failed, ${skipped} skipped`);
        });
    });
    
    // Wait for current batch to complete before starting next batch
    await Promise.allSettled(promises);
    
    // Small delay between batches to be respectful to the server
    if (i + batchSize < totalImages) {
      console.log('⏳ Waiting 1 second before next batch...\n');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  console.log('\n🎉 Download completed!');
  console.log(`✅ Successfully downloaded: ${completed} images`);
  console.log(`⏭️  Skipped (already existed): ${skipped} images`);
  if (failed > 0) {
    console.log(`❌ Failed downloads: ${failed} images`);
  }
  
  // List and validate all files
  try {
    const files = fs.readdirSync(imagesDir);
    console.log(`\n📁 Total files in reserve/project-images directory: ${files.length}`);
    
    if (files.length > 0) {
      console.log('📋 Image validation results:');
      let validImages = 0;
      let invalidImages = 0;
      
      files.forEach(file => {
        const filepath = path.join(imagesDir, file);
        if (validateImage(filepath)) {
          console.log(`   ✅ ${file} - Valid`);
          validImages++;
        } else {
          console.log(`   ❌ ${file} - Invalid/Corrupted`);
          invalidImages++;
        }
      });
      
      console.log(`\n📊 Final Summary:`);
      console.log(`   ✅ Valid images: ${validImages}`);
      console.log(`   ❌ Invalid images: ${invalidImages}`);
      console.log(`   📁 Total files: ${files.length}`);
    }
  } catch (error) {
    console.log('❌ Could not read reserve/project-images directory');
  }
}

// Run the download
downloadAllImages().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});