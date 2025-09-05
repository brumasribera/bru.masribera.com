const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const OUTPUT_DIR = 'public/og-images';
const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 630;

// Reserve projects only
const RESERVE_PROJECTS = [
  { id: 'mx-mangroves', name: 'Mexico Mangroves', country: 'Mexico', impact: { biodiversity: 92, carbon: 88, community: 74 } },
  { id: 'br-amazon', name: 'Brazil Amazon', country: 'Brazil', impact: { biodiversity: 98, carbon: 95, community: 80 } },
  { id: 'id-seagrass', name: 'Indonesia Seagrass', country: 'Indonesia', impact: { biodiversity: 85, carbon: 72, community: 77 } },
  { id: 'ke-savanna', name: 'Kenya Savanna', country: 'Kenya', impact: { biodiversity: 76, carbon: 61, community: 82 } },
  { id: 'us-cal-giants', name: 'California Giants', country: 'USA', impact: { biodiversity: 80, carbon: 90, community: 70 } },
  { id: 'ca-boreal', name: 'Canada Boreal', country: 'Canada', impact: { biodiversity: 73, carbon: 88, community: 65 } },
  { id: 'ar-wetlands', name: 'Argentina Wetlands', country: 'Argentina', impact: { biodiversity: 86, carbon: 70, community: 72 } },
  { id: 'pe-cloud', name: 'Peru Cloud Forest', country: 'Peru', impact: { biodiversity: 90, carbon: 84, community: 78 } },
  { id: 'ng-mangrove', name: 'Nigeria Mangrove', country: 'Nigeria', impact: { biodiversity: 75, carbon: 82, community: 79 } },
  { id: 'ma-atlas', name: 'Morocco Atlas', country: 'Morocco', impact: { biodiversity: 70, carbon: 55, community: 76 } },
  { id: 'es-donana', name: 'Spain Doñana', country: 'Spain', impact: { biodiversity: 78, carbon: 61, community: 74 } },
  { id: 'ro-delta', name: 'Romania Delta', country: 'Romania', impact: { biodiversity: 84, carbon: 66, community: 71 } },
  { id: 'ua-steppe', name: 'Ukraine Steppe', country: 'Ukraine', impact: { biodiversity: 60, carbon: 50, community: 68 } },
  { id: 'ru-taiga', name: 'Russia Taiga', country: 'Russia', impact: { biodiversity: 65, carbon: 92, community: 60 } },
  { id: 'in-sundarbans', name: 'India Sundarbans', country: 'India', impact: { biodiversity: 88, carbon: 76, community: 70 } },
  { id: 'np-terai', name: 'Nepal Terai', country: 'Nepal', impact: { biodiversity: 87, carbon: 69, community: 78 } },
  { id: 'th-coral', name: 'Thailand Coral', country: 'Thailand', impact: { biodiversity: 92, carbon: 60, community: 80 } },
  { id: 'au-reef', name: 'Australia Reef', country: 'Australia', impact: { biodiversity: 95, carbon: 50, community: 75 } },
  { id: 'pg-png', name: 'Papua New Guinea', country: 'Papua New Guinea', impact: { biodiversity: 94, carbon: 88, community: 72 } },
  { id: 'za-fynbos', name: 'South Africa Fynbos', country: 'South Africa', impact: { biodiversity: 93, carbon: 54, community: 76 } },
  { id: 'mg-madagascar', name: 'Madagascar', country: 'Madagascar', impact: { biodiversity: 97, carbon: 66, community: 68 } },
  { id: 'ma-seagrass', name: 'Morocco Seagrass', country: 'Morocco', impact: { biodiversity: 80, carbon: 70, community: 73 } },
  { id: 'no-bogs', name: 'Norway Bogs', country: 'Norway', impact: { biodiversity: 68, carbon: 83, community: 66 } },
  { id: 'uk-heath', name: 'UK Heath', country: 'UK', impact: { biodiversity: 72, carbon: 55, community: 70 } },
  { id: 'tr-anatolia', name: 'Türkiye Anatolia', country: 'Türkiye', impact: { biodiversity: 66, carbon: 48, community: 69 } },
  { id: 'ir-wetland', name: 'Iraq Wetland', country: 'Iraq', impact: { biodiversity: 78, carbon: 58, community: 74 } },
  { id: 'cn-giantpanda', name: 'China Giant Panda', country: 'China', impact: { biodiversity: 88, carbon: 63, community: 75 } },
  { id: 'jp-sea', name: 'Japan Sea', country: 'Japan', impact: { biodiversity: 82, carbon: 62, community: 79 } },
  { id: 'nz-kelp', name: 'New Zealand Kelp', country: 'New Zealand', impact: { biodiversity: 90, carbon: 65, community: 77 } },
  { id: 'is-highlands', name: 'Iceland Highlands', country: 'Iceland', impact: { biodiversity: 60, carbon: 72, community: 68 } },
  { id: 'maurit-corals', name: 'Mauritius Corals', country: 'Mauritius', impact: { biodiversity: 92, carbon: 55, community: 80 } },
  { id: 'eg-nile', name: 'Egypt Nile', country: 'Egypt', impact: { biodiversity: 70, carbon: 58, community: 76 } },
  { id: 'sa-mangrove', name: 'Saudi Arabia Mangrove', country: 'Saudi Arabia', impact: { biodiversity: 75, carbon: 62, community: 69 } }
];

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function generateReserveProjectImage(browser, project) {
  const page = await browser.newPage();
  
  try {
    await page.setViewport({ width: IMAGE_WIDTH, height: IMAGE_HEIGHT });
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${project.name}</title>
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
            <div class="absolute inset-0">
              <img src="/reserve/project-images/${project.id}.jpg" alt="" class="w-full h-full object-cover opacity-20">
              <div class="absolute inset-0 bg-gradient-to-r from-green-600/80 via-emerald-700/60 to-teal-800/80"></div>
            </div>

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
                  ${project.name}
                </h1>

                <!-- Subtitle -->
                <p class="text-2xl text-white/90 mb-8 leading-relaxed">
                  Conservation project in ${project.country}
                </p>

                <!-- Country -->
                <div class="flex items-center gap-3 text-white/80 mb-8">
                  <div class="w-3 h-3 bg-white/60 rounded-full"></div>
                  <span class="text-lg font-medium">${project.country}</span>
                </div>

                <!-- Impact Metrics -->
                <div class="flex gap-6">
                  <div class="text-center">
                    <div class="text-3xl font-bold text-white mb-1">${project.impact.biodiversity}%</div>
                    <div class="text-sm text-white/70">Biodiversity</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-white mb-1">${project.impact.carbon}%</div>
                    <div class="text-sm text-white/70">Carbon</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-white mb-1">${project.impact.community}%</div>
                    <div class="text-sm text-white/70">Community</div>
                  </div>
                </div>
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
    
    const filename = `reserve-${project.id}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);
    await fs.writeFile(filepath, screenshot);
    
    console.log(`✅ Generated: ${filename}`);
    
  } catch (error) {
    console.error(`❌ Error generating reserve-${project.id}:`, error.message);
  } finally {
    await page.close();
  }
}

async function main() {
  console.log('🌱 Generating Reserve project Open Graph images...');
  console.log(`📊 Total projects: ${RESERVE_PROJECTS.length}`);
  
  await ensureDirectoryExists(OUTPUT_DIR);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    for (let i = 0; i < RESERVE_PROJECTS.length; i++) {
      const project = RESERVE_PROJECTS[i];
      console.log(`\n🔄 Progress: ${i + 1}/${RESERVE_PROJECTS.length}`);
      await generateReserveProjectImage(browser, project);
    }
    
    console.log('\n🎉 All Reserve project images generated successfully!');
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

module.exports = { generateReserveProjectImage, RESERVE_PROJECTS };
