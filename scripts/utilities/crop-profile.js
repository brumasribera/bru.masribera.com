import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function cropProfilePicture() {
  try {
    const inputPath = path.join(__dirname, '..', 'public', 'profile', 'profile-optimized.jpg');
    const outputPath = path.join(__dirname, '..', 'public', 'profile', 'profile-cropped.jpg');
    
    // Get original image dimensions
    const metadata = await sharp(inputPath).metadata()
    // Original image dimensions: width x height
    
    // Calculate crop dimensions to maintain aspect ratio
    const aspectRatio = metadata.width / metadata.height
    let cropWidth, cropHeight, left, top
    
    if (aspectRatio > 1) {
      // Landscape image - crop width to match height
      cropHeight = metadata.height
      cropWidth = Math.round(cropHeight * targetAspectRatio)
      left = Math.round((metadata.width - cropWidth) / 2)
      top = 0
    } else {
      // Portrait image - crop height to match width
      cropWidth = metadata.width
      cropHeight = Math.round(cropWidth / targetAspectRatio)
      left = 0
      top = Math.round((metadata.height - cropHeight) / 2)
    }
    
    // Cropping to: cropWidth x cropHeight from position (left, top)
    
    // Crop the image
    await sharp(inputPath)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(targetWidth, targetHeight, { 
        kernel: sharp.kernel.lanczos3,
        fit: 'fill'
      })
      .jpeg({ 
        quality: 95,
        progressive: true,
        mozjpeg: true
      })
      .toFile(outputPath)
    
    // Profile picture cropped successfully with maximum quality!
    // Output: outputPath
    // You can now use this new high-quality image in your CV
    
  } catch (error) {
    console.error('❌ Error cropping profile picture:', error);
  }
}

cropProfilePicture();
