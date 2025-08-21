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
async function downloadImage(url, filename) {
  try {
    // Check if file already exists and is valid
    if (fs.existsSync(filename)) {
      try {
        const stats = fs.statSync(filename)
        if (stats.size > 1000) {
          // File already exists and is valid, skipping...
          return { success: true, skipped: true }
        }
      } catch (err) {
        // File exists but can't be read, will re-download
      }
    }
    
    // Download the image
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const buffer = await response.arrayBuffer()
    await fs.writeFile(filename, Buffer.from(buffer))
    
    // Downloaded: filename
    return { success: true, downloaded: true }
  } catch (err) {
    if (err.code === 'ENOENT') {
      // File write error for filename: err.message
      return { success: false, error: err.message }
    }
    
    if (err.message.includes('HTTP')) {
      // Failed to download filename: HTTP status
      return { success: false, error: err.message }
    }
    
    // Network error downloading filename: err.message
    return { success: false, error: err.message }
  }
}

// Download images in batches for better performance
async function downloadAllImages() {
  // Starting download of all project images...
  // Images will be saved to: imagesDir
  
  let completed = 0
  let failed = 0
  let skipped = 0
  
  for (const imageUrl of imageUrls) {
    const filename = path.join(imagesDir, path.basename(imageUrl))
    const result = await downloadImage(imageUrl, filename)
    
    if (result.success) {
      if (result.skipped) {
        skipped++
      } else {
        completed++
      }
    } else {
      failed++
      // filename: result.error.message
    }
    
    // Progress: completed/totalImages (percentage%)
    if (failed > 0 || skipped > 0) {
      // Progress: completed/totalImages (percentage%) - failed failed, skipped skipped
    }
    
    // Add delay between downloads to be respectful
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Waiting 1 second before next batch...
  }
  
  // Download completed!
  // Successfully downloaded: completed images
  // Skipped (already existed): skipped images
  // Failed downloads: failed images
  
  // Validate all downloaded images
  const files = fs.readdirSync(imagesDir)
  // Total files in reserve/project-images directory: files.length
  
  // Image validation results
  let validImages = 0
  let invalidImages = 0
  
  for (const file of files) {
    try {
      const filePath = path.join(imagesDir, file)
      const stats = fs.statSync(filePath)
      
      if (stats.size > 1000) {
        // Valid
        validImages++
      } else {
        // Invalid/Corrupted
        invalidImages++
      }
    } catch (err) {
      // Invalid/Corrupted
      invalidImages++
    }
  }
  
  // Final Summary:
  // Valid images: validImages
  // Invalid images: invalidImages
  // Total files: files.length
}

// Handle directory read error
if (!fs.existsSync(imagesDir)) {
  // Could not read reserve/project-images directory
  process.exit(1)
}

// Run the download
downloadAllImages().catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});