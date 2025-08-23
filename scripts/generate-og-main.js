const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const OUTPUT_DIR = 'public/og-images';
const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 630;

// Main page configurations only
const MAIN_PAGES = [
  {
    name: 'main',
    title: 'Bru Mas Ribera',
    subtitle: 'Frontend & UX Engineer passionate about creating impactful digital experiences',
    imageUrl: '/backgrounds/mountain-background.jpg',
    type: 'main'
  },
  {
    name: 'openhuts',
    title: 'Open Huts Nature Network',
    subtitle: 'Connecting nature enthusiasts with sustainable mountain experiences worldwide',
    imageUrl: '/open-huts/Hut View.png',
    type: 'project'
  },
  {
    name: 'reserve',
    title: 'Reserve - Nature Conservation',
    subtitle: 'Protect and restore ecosystems through community-driven conservation projects',
    imageUrl: '/reserve/project-images/ar-wetlands.jpg',
    type: 'project'
  },
  {
    name: 'clathes',
    title: 'Clathes - Sustainable Fashion',
    subtitle: 'Eco-friendly clothing brand promoting sustainable fashion practices',
    imageUrl: '/clathes/vaquita-representation.png',
    type: 'project'
  },
  {
    name: 'pix4d',
    title: 'Pix4D - 3D Mapping Solutions',
    subtitle: 'Advanced photogrammetry software for professional 3D mapping and modeling',
    imageUrl: '/pix4d/matterhorn-cervin-pix4d-pix4dmapper-switzerland.jpg',
    type: 'project'
  },
  {
    name: 'wegaw',
    title: 'Wegaw - Weather Intelligence',
    subtitle: 'AI-powered weather forecasting for renewable energy optimization',
    imageUrl: '/wegaw/DeFROST_SpaceValueAdded_01.png',
    type: 'project'
  },
  {
    name: 'pomoca',
    title: 'Pomoca - Ski Equipment',
    subtitle: 'Innovative ski touring equipment for mountain adventures',
    imageUrl: '/pomoca/steps/gliding.png',
    type: 'project'
  },
  {
    name: 'moodlenet',
    title: 'MoodleNet - Open Education',
    subtitle: 'Decentralized social network for open education and lifelong learning',
    imageUrl: '/moodlenet/moodle1.png',
    type: 'project'
  }
];

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function generatePreviewImage(browser, pageConfig) {
  const page = await browser.newPage();
  
  try {
    await page.setViewport({ width: IMAGE_WIDTH, height: IMAGE_HEIGHT });
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${pageConfig.title}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { margin: 0; padding: 0; }
            .leaf-icon { width: 48px; height: 48px; }
          </style>
        </head>
        <body>
          <div class="relative w-[1200px] h-[630px] bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
              <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.1\\'%3E%3Ccircle cx=\\'30\\' cy=\\'30\\' r=\\'2\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
            </div>

            <!-- Background Image Overlay -->
            ${pageConfig.imageUrl ? `
            <div class="absolute inset-0">
              <img src="${pageConfig.imageUrl}" alt="" class="w-full h-full object-cover opacity-20">
              <div class="absolute inset-0 bg-gradient-to-r from-green-600/80 via-emerald-700/60 to-teal-800/80"></div>
            </div>
            ` : ''}

            <!-- Content Container -->
            <div class="relative z-10 flex items-center justify-between h-full p-16">
              <!-- Left Side - Text Content -->
              <div class="flex-1 max-w-2xl">
                <!-- Profile Image -->
                <div class="flex items-center gap-4 mb-8">
                  <div class="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                    <img src="/profile/profile-cropped.jpg" alt="Bru Mas Ribera" class="w-full h-full object-cover">
                  </div>
                  <div class="text-white/90">
                    <div class="text-lg font-medium">Bru Mas Ribera</div>
                    <div class="text-sm opacity-75">Frontend & UX Engineer</div>
                  </div>
                </div>

                <!-- Main Title -->
                <h1 class="text-6xl font-bold text-white mb-6 leading-tight">
                  ${pageConfig.title}
                </h1>

                <!-- Subtitle -->
                ${pageConfig.subtitle ? `
                <p class="text-2xl text-white/90 mb-8 leading-relaxed">
                  ${pageConfig.subtitle}
                </p>
                ` : ''}
              </div>

              <!-- Right Side - Visual Elements -->
              <div class="flex flex-col items-end justify-center space-y-6">
                <!-- Leaf Icon -->
                <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <svg class="leaf-icon text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17,8C8,10,5.9,16.17,3.82,21.34L5.71,22l1-2.3A4.49,4.49,0,0,0,8,20C19,20,22,3,22,3,21,5,10,5.25,9,5.25S2,11.5,2,13.5a6.23,6.23,0,0,0,1.75,3.75C4.5,17.5,2,19,2,19s3,1,5,1,8-1,10-2,2-2,2-2S17,8,17,8Z"/>
                  </svg>
                </div>

                <!-- Website URL -->
                <div class="text-right">
                  <div class="text-white/60 text-sm font-medium">Visit</div>
                  <div class="text-white text-lg font-semibold">bru.masribera.com</div>
                </div>
              </div>
            </div>

            <!-- Bottom Decorative Bar -->
            <div class="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600"></div>
          </div>
        </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.waitForTimeout(2000);
    
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false,
      omitBackground: false
    });
    
    const filename = `${pageConfig.name}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);
    await fs.writeFile(filepath, screenshot);
    
    console.log(`✅ Generated: ${filename}`);
    
  } catch (error) {
    console.error(`❌ Error generating ${pageConfig.name}:`, error.message);
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('🚀 Generating main page Open Graph images...');
  
  await ensureDirectoryExists(OUTPUT_DIR);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    for (const page of MAIN_PAGES) {
      await generatePreviewImage(browser, page);
    }
    
    console.log('\n🎉 Main page images generated successfully!');
    console.log(`📁 Images saved to: ${OUTPUT_DIR}`);
    
  } catch (error) {
    console.error('❌ Error during generation:', error);
  } finally {
    await browser.close();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { generatePreviewImage, MAIN_PAGES };
