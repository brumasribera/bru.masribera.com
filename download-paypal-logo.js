import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const paypalLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/PayPal_Logo_Icon_2014.svg/730px-PayPal_Logo_Icon_2014.svg.png?20230314143227';
const outputPath = path.join(__dirname, 'public', 'logos', 'paypal-logo.png');

// Ensure the logos directory exists
const logosDir = path.dirname(outputPath);
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

console.log('Downloading PayPal logo...');
console.log('URL:', paypalLogoUrl);
console.log('Output path:', outputPath);

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

https.get(paypalLogoUrl, options, (response) => {
  if (response.statusCode === 200) {
    const fileStream = fs.createWriteStream(outputPath);
    response.pipe(fileStream);
    
    fileStream.on('finish', () => {
      fileStream.close();
      console.log('✅ PayPal logo downloaded successfully!');
      console.log('Saved to:', outputPath);
    });
    
    fileStream.on('error', (err) => {
      fs.unlink(outputPath, () => {}); // Delete the file if there was an error
      console.error('❌ Error writing file:', err.message);
    });
  } else {
    console.error('❌ Failed to download. Status code:', response.statusCode);
  }
}).on('error', (err) => {
  console.error('❌ Error downloading file:', err.message);
});
