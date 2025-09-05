import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the data.ts file to get all project image paths
const dataPath = path.join(__dirname, '../components/ReserveApp/utils/data.ts');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Extract image paths using regex
const imageRegex = /image: "([^"]+)"/g;
const imagePaths = [];
let match;

while ((match = imageRegex.exec(dataContent)) !== null) {
  imagePaths.push(match[1]);
}

console.log('Expected project images:');
imagePaths.forEach((path, index) => {
  console.log(`${index + 1}. ${path}`);
});

console.log('\nChecking for missing images...');
const publicDir = path.join(__dirname, '../public');
const missingImages = [];

imagePaths.forEach(imagePath => {
  const fullPath = path.join(publicDir, imagePath);
  if (!fs.existsSync(fullPath)) {
    missingImages.push(imagePath);
    console.log(`❌ Missing: ${imagePath}`);
  } else {
    console.log(`✅ Found: ${imagePath}`);
  }
});

if (missingImages.length > 0) {
  console.log(`\n❌ Total missing images: ${missingImages.length}`);
} else {
  console.log('\n✅ All project images are present!');
}

// Check for duplicate file sizes in the project-images directory
console.log('\nChecking for potential duplicate images...');
const projectImagesDir = path.join(publicDir, 'reserve/project-images');
const imageFiles = fs.readdirSync(projectImagesDir).filter(file => file.endsWith('.jpg'));

const fileSizes = {};
const duplicates = [];

imageFiles.forEach(file => {
  const filePath = path.join(projectImagesDir, file);
  const stats = fs.statSync(filePath);
  const size = stats.size;
  
  if (fileSizes[size]) {
    duplicates.push({
      size,
      files: [fileSizes[size], file]
    });
  } else {
    fileSizes[size] = file;
  }
});

if (duplicates.length > 0) {
  console.log('\n⚠️  Potential duplicate images (same file size):');
  duplicates.forEach(dup => {
    console.log(`Size: ${dup.size} bytes`);
    dup.files.forEach(file => console.log(`  - ${file}`));
  });
} else {
  console.log('\n✅ No duplicate file sizes found');
}

console.log('\nSummary:');
console.log(`Total projects: ${imagePaths.length}`);
console.log(`Total images in directory: ${imageFiles.length}`);
console.log(`Missing images: ${missingImages.length}`);
console.log(`Potential duplicates: ${duplicates.length}`);
