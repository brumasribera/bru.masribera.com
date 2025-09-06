import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';

// Simple test configuration
const TEST_OUTPUT_DIR = 'public/og-images/test';
const TEST_IMAGE_WIDTH = 1200;
const TEST_IMAGE_HEIGHT = 630;

async function testOGGeneration(): Promise<void> {
  console.log('🧪 Testing Open Graph image generation...');
  
  try {
    // Ensure test directory exists
    await fs.mkdir(TEST_OUTPUT_DIR, { recursive: true });
    
    // Launch browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: TEST_IMAGE_WIDTH, height: TEST_IMAGE_HEIGHT });
    
    // Test HTML with Tailwind CSS
    const testHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Test OG Image</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 0; }
          </style>
        </head>
        <body>
          <div class="w-[1200px] h-[630px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div class="text-center text-white">
              <h1 class="text-6xl font-bold mb-4">Test OG Image</h1>
              <p class="text-2xl">This is a test image generation</p>
              <div class="mt-8 text-lg opacity-75">Generated at ${new Date().toLocaleString()}</div>
            </div>
          </div>
        </body>
      </html>
    `;
    
    await page.setContent(testHTML, { waitUntil: 'networkidle0' });
    
    // Wait a bit for any animations
    await page.waitForTimeout(1000);
    
    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false,
      omitBackground: false
    });
    
    // Save test image
    const testImagePath = path.join(TEST_OUTPUT_DIR, 'test-og-image.png');
    await fs.writeFile(testImagePath, screenshot);
    
    console.log('✅ Test image generated successfully!');
    console.log(`📁 Saved to: ${testImagePath}`);
    
    // Check file size
    const stats = await fs.stat(testImagePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`📊 File size: ${sizeKB} KB`);
    
    if (stats.size > 50000) { // 50KB
      console.log('✅ Image size looks good (>50KB)');
    } else {
      console.log('⚠️ Image size seems small (<50KB)');
    }
    
    await browser.close();
    
    console.log('\n🎉 Open Graph image generation test completed!');
    console.log('\n💡 Next steps:');
    console.log('1. Run: npm run generate-og-images');
    console.log('2. Check the generated images in public/og-images/');
    console.log('3. Verify images look correct for social media sharing');
    
  } catch (error: any) {
    console.error('❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the test
testOGGeneration();

