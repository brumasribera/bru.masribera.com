/**
 * Download Project Images Script
 * 
 * This script downloads and manages project images for the Reserve app.
 * It uses Unsplash and other image services to generate unique, professional
 * images for each conservation project.
 * 
 * Usage: node scripts/download-project-images.js
 * 
 * Features:
 * - Downloads images with updated keywords for better quality
 * - Ensures no duplicate images by content hash
 * - Validates downloaded images for proper size
 * - Supports force re-download of specific projects
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 33 seed images (will be used only as initial seeds; duplicates will be auto-fixed below)
const projectImages = [
  { id: "mx-mangroves", url: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop", category: "mangroves" },
  { id: "br-amazon", url: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop", category: "rainforest" },
  { id: "id-seagrass", url: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?q=80&w=1200&auto=format&fit=crop", category: "marine" },
  { id: "ke-savanna", url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1200&auto=format&fit=crop", category: "savanna" },
  { id: "us-cal-giants", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop", category: "forest" },
  { id: "ca-boreal", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop", category: "boreal" },
  { id: "ar-wetlands", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop", category: "wetlands" },
  { id: "pe-cloud", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop", category: "cloud-forest" },
  { id: "ng-mangrove", url: "https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop", category: "mangroves" },
  { id: "ma-atlas", url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop", category: "mountains" },
  { id: "es-donana", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop", category: "wetlands" },
  { id: "ro-delta", url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop", category: "delta" },
  { id: "ua-steppe", url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1200&auto=format&fit=crop", category: "steppe" },
  { id: "ru-taiga", url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop", category: "taiga" },
  { id: "in-sundarbans", url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1200&auto=format&fit=crop", category: "mangroves" },
  { id: "np-terai", url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop", category: "grassland" },
  { id: "th-coral", url: "https://images.unsplash.com/photo-1618477247222-42c5b6b9ffef?q=80&w=1200&auto=format&fit=crop", category: "coral-reef" },
  { id: "au-reef", url: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=1200&auto=format&fit=crop", category: "coral-reef" },
  { id: "pg-png", url: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?q=80&w=1200&auto=format&fit=crop", category: "rainforest" },
  { id: "za-fynbos", url: "https://images.unsplash.com/photo-1551632811-561cf42a8-a8f?q=80&w=1200&auto=format&fit=crop", category: "fynbos" },
  { id: "mg-madagascar", url: "https://images.unsplash.com/photo-1542401886-065d845f8e85?q=80&w=1200&auto=format&fit=crop", category: "rainforest" },
  { id: "ma-seagrass", url: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=1200&auto=format&fit=crop", category: "marine" },
  { id: "no-bogs", url: "https://images.unsplash.com/photo-1506905668806-df950d6aa2e8?q=80&w=1200&auto=format&fit=crop", category: "bogs" },
  { id: "uk-heath", url: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?q=80&w=1200&auto=format&fit=crop", category: "heathland" },
  { id: "tr-anatolia", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop", category: "mountains" },
  { id: "ir-wetland", url: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?q=80&w=1200&auto=format&fit=crop", category: "wetlands" },
  { id: "cn-giantpanda", url: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?q=80&w=1200&auto=format&fit=crop", category: "bamboo-forest" },
  { id: "jp-sea", url: "https://images.unsplash.com/photo-1563713427-2aca7b27eca8?q=80&w=1200&auto=format&fit=crop", category: "marine" },
  { id: "nz-kelp", url: "https://images.unsplash.com/photo-1542197250-7b0c2f2e5b22?q=80&w=1200&auto=format&fit=crop", category: "kelp-forest" },
  { id: "is-highlands", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop", category: "highlands" },
  { id: "maurit-corals", url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop", category: "coral-reef" },
  { id: "eg-nile", url: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?q=80&w=1200&auto=format&fit=crop", category: "river" },
  { id: "sa-mangrove", url: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?q=80&w=1200&auto=format&fit=crop", category: "mangroves" }
];

// Location/ecosystem-specific keywords to request diversified images per project
const keywordsById = {
  "mx-mangroves": "mangrove roots yucatan mexico lagoon",
  "br-amazon": "amazon rainforest canopy brazil jungle",
  "id-seagrass": "seagrass meadow indonesia coral triangle underwater",
  "ke-savanna": "laikipia savanna kenya acacia trees wildlife elephants lions zebras",
  "us-cal-giants": "redwood forest california mist tall trees",
  "ca-boreal": "boreal forest canada conifer lake",
  "ar-wetlands": "ibera wetlands argentina marsh birds",
  "pe-cloud": "andean cloud forest peru mist",
  "ng-mangrove": "mangrove niger delta nigeria roots",
  "ma-atlas": "atlas mountains morocco ridge snow",
  "es-donana": "donana wetlands spain marsh flamingos",
  "ro-delta": "danube delta romania wetlands reeds water birds pelicans herons",
  "ua-steppe": "ukraine steppe grassland horizon",
  "ru-taiga": "siberian taiga russia boreal forest conifers snow wilderness",
  "in-sundarbans": "sundarbans mangrove india delta",
  "np-terai": "terai arc nepal grassland wildlife rhinos tigers elephants",
  "th-coral": "andaman sea coral reef thailand",
  "au-reef": "great barrier reef australia coral",
  "pg-png": "papua new guinea rainforest tropical birds paradise birds of paradise",
  "za-fynbos": "fynbos cape floristic south africa protea",
  "mg-madagascar": "madagascar forests baobab trees lemurs endemic wildlife",
  "ma-seagrass": "mediterranean seagrass morocco posidonia oceanica underwater meadows",
  "no-bogs": "nordic peat bogs norway tundra moss lichens arctic wilderness",
  "uk-heath": "heathland uk moorland gorse",
  "tr-anatolia": "anatolian plateau turkey steppe",
  "ir-wetland": "mesopotamian marsh iraq wetland reeds",
  "cn-giantpanda": "bamboo forest sichuan china mist",
  "jp-sea": "japan coast rocky sea",
  "nz-kelp": "kelp forest new zealand underwater",
  "is-highlands": "iceland highlands volcanic moss",
  "maurit-corals": "mascarene corals mauritius coral reef tropical fish marine biodiversity",
  "eg-nile": "nile river egypt reeds",
  "sa-mangrove": "red sea mangrove saudi arabia"
};

// Use the organized folder structure
const imagesDir = path.join(__dirname, '..', 'public', 'reserve', 'project-images');

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

// Generate image using keywords (for force re-download projects)
async function generateImageWithKeywords(projectId, filename) {
  try {
    const keywords = keywordsById[projectId];
    if (!keywords) {
      throw new Error(`No keywords found for project ${projectId}`);
    }
    
    // Use LoremFlickr as primary source (more reliable)
    const wordsPlus = keywords.trim().replace(/\s+/g, '+');
    const seed = uniqueSeedFromId(projectId);
    
    const candidates = [
      `https://loremflickr.com/1200/800/${keywords}?lock=${seed}`,
      `https://loremflickr.com/1200/800/${wordsPlus}?lock=${seed + 1}`,
      `https://picsum.photos/seed/${seed}/1200/800`,
      `https://picsum.photos/seed/${seed + 100}/1200/800`
    ];
    
    for (const url of candidates) {
      try {
        console.log(`🔄 Trying: ${url}`);
        const response = await fetch(url, { redirect: 'follow' });
        if (!response.ok) {
          console.log(`❌ HTTP ${response.status} for ${url}`);
          continue;
        }
        
        const buffer = await response.arrayBuffer();
        await fs.writeFile(filename, Buffer.from(buffer));
        
        // Validate the downloaded image
        const stats = fs.statSync(filename);
        if (stats.size > 10240) {
          console.log(`✅ Generated new image: ${projectId}.jpg (${url})`);
          return { success: true, downloaded: true };
        } else {
          console.log(`❌ Image too small: ${stats.size} bytes`);
        }
      } catch (e) {
        console.log(`❌ Error with ${url}: ${e.message}`);
        continue;
      }
    }
    
    throw new Error('Failed to generate image from any source');
  } catch (err) {
    console.log(`❌ Failed to generate image for ${projectId}: ${err.message}`);
    return { success: false, error: err.message };
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

// Projects that need to be re-downloaded with new keywords
const forceRedownload = [
  'ke-savanna', 'ro-delta', 'ru-taiga', 'np-terai', 'pg-png', 
  'mg-madagascar', 'no-bogs', 'ma-seagrass', 'maurit-corals'
];

// Download images in batches for better performance
async function downloadAllImages() {
  console.log('🚀 Starting download of all project images...')
  console.log(`📁 Images will be saved to: ${imagesDir}`)
  console.log(`🔄 Force re-downloading: ${forceRedownload.join(', ')}`)
  
  let completed = 0
  let failed = 0
  let skipped = 0
  
  for (const project of projectImages) {
    const filename = path.join(imagesDir, `${project.id}.jpg`)
    
    // Force re-download for specific projects
    if (forceRedownload.includes(project.id) && fs.existsSync(filename)) {
      console.log(`🗑️  Removing old image: ${project.id}.jpg`)
      fs.unlinkSync(filename)
    }
    
    // Use keyword-based generation for force re-download projects
    let result;
    if (forceRedownload.includes(project.id)) {
      console.log(`🎯 Generating new image for ${project.id} with updated keywords...`)
      result = await generateImageWithKeywords(project.id, filename)
    } else {
      result = await downloadImage(project.url, filename)
    }
    
    if (result.success) {
      if (result.skipped) {
        console.log(`⏭️  Skipped: ${project.id}.jpg (already exists)`)
        skipped++
      } else {
        console.log(`✅ Downloaded: ${project.id}.jpg`)
        completed++
      }
    } else {
      console.log(`❌ Failed: ${project.id}.jpg - ${result.error}`)
      failed++
    }
    
    const totalImages = projectImages.length
    const percentage = Math.round(((completed + failed + skipped) / totalImages) * 100)
    console.log(`📊 Progress: ${completed + failed + skipped}/${totalImages} (${percentage}%)`)
    
    // Add delay between downloads to be respectful
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('⏳ Waiting 1 second before next download...')
  }
  
  console.log('\n🎉 Download completed!')
  console.log(`✅ Successfully downloaded: ${completed} images`)
  console.log(`⏭️  Skipped (already existed): ${skipped} images`)
  console.log(`❌ Failed downloads: ${failed} images`)
  
  // Validate all downloaded images
  const files = fs.readdirSync(imagesDir)
  console.log(`📁 Total files in reserve/project-images directory: ${files.length}`)
  
  // Image validation results
  let validImages = 0
  let invalidImages = 0
  
  for (const file of files) {
    try {
      const filePath = path.join(imagesDir, file)
      const stats = fs.statSync(filePath)
      
      if (stats.size > 1000) {
        console.log(`✅ Valid: ${file}`)
        validImages++
      } else {
        console.log(`❌ Invalid/Corrupted: ${file}`)
        invalidImages++
      }
    } catch (err) {
      console.log(`❌ Invalid/Corrupted: ${file}`)
      invalidImages++
    }
  }
  
  console.log('\n📊 Final Summary:')
  console.log(`✅ Valid images: ${validImages}`)
  console.log(`❌ Invalid images: ${invalidImages}`)
  console.log(`📁 Total files: ${files.length}`)
}

function computeFileHash(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(buf).digest('hex');
  } catch {
    return null;
  }
}

function uniqueSeedFromId(id) {
  return parseInt(crypto.createHash('md5').update(id).digest('hex').slice(0, 8), 16);
}

function buildCandidates(id, attempt) {
  const keywords = (keywordsById[id] || id).trim().replace(/\s+/g, ',');
  const wordsPlus = (keywordsById[id] || id).trim().replace(/\s+/g, '+');
  const sig = attempt + 1;
  const seed = uniqueSeedFromId(id) + attempt;
  return [
    // Unsplash Source API with different signatures to force different images
    `https://source.unsplash.com/1200x800/?${encodeURIComponent(wordsPlus)}&sig=${sig}`,
    `https://source.unsplash.com/1200x800/?nature,${encodeURIComponent(wordsPlus)}&sig=${sig + 17}`,
    `https://source.unsplash.com/1200x800/?landscape,${encodeURIComponent(wordsPlus)}&sig=${sig + 31}`,
    // LoremFlickr fallback with deterministic lock seed to ensure variety
    `https://loremflickr.com/1200/800/${keywords}?lock=${seed}`,
    // Picsum unique seed-based images (guaranteed uniqueness by seed)
    `https://picsum.photos/seed/${seed}/1200/800`
  ];
}

async function fetchToTemp(url) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const tmp = path.join(imagesDir, `.__tmp_${Date.now()}_${Math.random().toString(16).slice(2)}.img`);
  fs.writeFileSync(tmp, buf);
  return tmp;
}

async function replaceWithUnique(projectId, seenHashes, maxAttempts = 20) {
  const targetPath = path.join(imagesDir, `${projectId}.jpg`);
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidates = buildCandidates(projectId, attempt);
    for (const url of candidates) {
      try {
        const tmp = await fetchToTemp(url);
        const stats = fs.statSync(tmp);
        if (stats.size < 10240) { fs.unlinkSync(tmp); continue; }
        const h = computeFileHash(tmp);
        if (h && !seenHashes.has(h)) {
          fs.renameSync(tmp, targetPath);
          seenHashes.add(h);
          console.log(`🔄 Replaced with unique image: ${projectId}.jpg (${url})`);
          return true;
        }
        fs.unlinkSync(tmp);
      } catch (e) {
        // try next candidate
      }
    }
  }
  console.log(`⚠️  Could not find unique image for ${projectId} after ${maxAttempts} attempts.`);
  return false;
}

async function ensureUniqueImages() {
  console.log('\n🧪 Checking for duplicate images by content hash...');
  const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.jpg'));
  const hashToIds = new Map();
  const seenHashes = new Set();
  const idToHash = new Map();

  for (const f of files) {
    const p = path.join(imagesDir, f);
    const h = computeFileHash(p);
    if (!h) continue;
    const id = path.basename(f, '.jpg');
    idToHash.set(id, h);
    if (!hashToIds.has(h)) hashToIds.set(h, []);
    hashToIds.get(h).push(id);
  }

  let duplicates = [];
  for (const [h, ids] of hashToIds.entries()) {
    if (ids.length > 1) {
      // keep first, fix the rest
      duplicates.push(...ids.slice(1));
    }
    seenHashes.add(h);
  }

  if (duplicates.length === 0) {
    console.log('✅ No duplicate images detected.');
    return;
  }

  console.log(`♻️  Found ${duplicates.length} duplicate images. Replacing with unique images...`);
  for (const id of duplicates) {
    await replaceWithUnique(id, seenHashes);
  }
}

// Handle directory read error
if (!fs.existsSync(imagesDir)) {
  // Could not read reserve/project-images directory
  process.exit(1)
}

// Run the download
downloadAllImages()
  .then(() => ensureUniqueImages())
  .catch(error => {
  console.error('❌ Fatal error:', error.message);
  process.exit(1);
});