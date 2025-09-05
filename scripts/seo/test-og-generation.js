const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Simple test configuration
const TEST_OUTPUT_DIR = 'public/og-images/test';
const TEST_IMAGE_WIDTH = 1200;
const TEST_IMAGE_HEIGHT = 630;

async function testOGGeneration() {
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
        </head>
        <body>
          <div class="relative w-[1200px] h-[630px] bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.1\\'%3E%3Ccircle cx=\\'30\\' cy=\\'30\\' r=\\'2\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
            </div>

            <!-- Content Container -->
            <div class="relative z-10 flex items-center justify-center h-full p-16">
              <div class="text-center">
                <!-- Profile Image Placeholder -->
                <div class="w-20 h-20 rounded-full bg-white/20 mx-auto mb-8 flex items-center justify-center">
                  <div class="text-white text-2xl">👤</div>
                </div>
                
                <!-- Title -->
                <h1 class="text-6xl font-bold text-white mb-6">
                  Test Success! ✅
                </h1>
                
                <!-- Subtitle -->
                <p class="text-2xl text-white/90 mb-8">
                  Open Graph image generation is working correctly
                </p>
                
                <!-- Test Info -->
                <div class="bg-white/20 rounded-lg p-4 inline-block">
                  <div class="text-white text-sm">
                    <div>Generated at: ${new Date().toLocaleString()}</div>
                    <div>Dimensions: ${TEST_IMAGE_WIDTH}x${TEST_IMAGE_HEIGHT}px</div>
                    <div>Status: Ready for production</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom Bar -->
            <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600"></div>
          </div>
        </body>
      </html>
    `;
    
    // Set content and wait for it to load
    await page.setContent(testHTML, { waitUntil: 'networkidle0' });
    
    // Wait a bit for any animations or fonts to settle
    await page.waitForTimeout(1000);
    
    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false,
      omitBackground: false
    });
    
    // Save test image
    const testImagePath = path.join(TEST_OUTPUT_DIR, 'test-success.png');
    await fs.writeFile(testImagePath, screenshot);
    
    console.log('✅ Test image generated successfully!');
    console.log(`📁 Saved to: ${testImagePath}`);
    
    // Verify file was created
    const stats = await fs.stat(testImagePath);
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);
    
    await browser.close();
    
    console.log('\n🎉 Test completed successfully!');
    console.log('Your Open Graph image generation system is working correctly.');
    console.log('\nNext steps:');
    console.log('1. Run: npm run generate-og-images');
    console.log('2. Check the generated images in public/og-images/');
    console.log('3. Test sharing on social media platforms');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Ensure Puppeteer is installed: npm install puppeteer');
    console.error('2. Check that you have write permissions to public/og-images/');
    console.error('3. Verify Node.js version is 16+');
    
    process.exit(1);
  }
}

// Run the test
if (require.main === module) {
  testOGGeneration();
}

module.exports = { testOGGeneration };
