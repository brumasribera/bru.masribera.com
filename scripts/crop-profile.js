import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function cropProfilePicture() {
  try {
    const inputPath = path.join(__dirname, '..', 'public', 'profile', 'profile-optimized.jpg');
    const outputPath = path.join(__dirname, '..', 'public', 'profile', 'profile-cropped.jpg');
    
    // First, get the image metadata to understand dimensions
    const metadata = await sharp(inputPath).metadata();
    console.log(`Original image dimensions: ${metadata.width}x${metadata.height}`);
    
    // Calculate crop dimensions to focus more on the face
    // This will crop from the center, removing less of the landscape/background
    const cropWidth = Math.round(metadata.width * 0.75); // Keep 75% of width (less zoom)
    const cropHeight = Math.round(metadata.height * 0.75); // Keep 75% of height (less zoom)
    
    // Calculate crop position (center)
    const left = Math.round((metadata.width - cropWidth) / 2);
    const top = Math.round((metadata.height - cropHeight) / 2);
    
    console.log(`Cropping to: ${cropWidth}x${cropHeight} from position (${left}, ${top})`);
    
    // Crop the image to focus more on the face with much higher quality
    await sharp(inputPath)
      .extract({
        left: left,
        top: top,
        width: cropWidth,
        height: cropHeight
      })
      .resize(1200, 1200, { // Much higher resolution for better quality
        fit: 'cover',
        position: 'center',
        kernel: 'lanczos3' // High-quality resampling algorithm
      })
      .jpeg({ 
        quality: 100, // Maximum quality
        progressive: true, // Progressive JPEG for better quality
        mozjpeg: true // Use mozjpeg for better compression
      })
      .toFile(outputPath);
    
    console.log('✅ Profile picture cropped successfully with maximum quality!');
    console.log(`📁 Output: ${outputPath}`);
    console.log('🔄 You can now use this new high-quality image in your CV');
    
  } catch (error) {
    console.error('❌ Error cropping profile picture:', error);
  }
}

cropProfilePicture();
