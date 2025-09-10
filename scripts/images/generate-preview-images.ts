import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OUTPUT_DIR = 'public/og-images';
const BASE_URL = 'http://localhost:3000'; // Updated to match your dev server port
const IMAGE_WIDTH = 1200;
const IMAGE_HEIGHT = 630;

interface PageConfig {
  name: string;
  path: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  type: 'main' | 'project';
  country?: string;
  impact?: {
    biodiversity: number;
    carbon: number;
    community: number;
  };
}

interface ReserveProject {
  id: string;
  name: string;
  country: string;
  impact: {
    biodiversity: number;
    carbon: number;
    community: number;
  };
}

// Page configurations
const PAGES: PageConfig[] = [
  {
    name: 'main',
    path: '/',
    title: 'Bru Mas Ribera',
    subtitle: 'Frontend & UX Engineer passionate about creating impactful digital experiences',
    imageUrl: '/backgrounds/mountain-background.jpg',
    type: 'main'
  },
  {
    name: 'openhuts',
    path: '/openhuts',
    title: 'Open Huts Nature Network',
    subtitle: 'Connecting nature enthusiasts with sustainable mountain experiences worldwide',
    imageUrl: '/open-huts/hut-view.png',
    type: 'project'
  },
  {
    name: 'reserve',
    path: '/reserve',
    title: 'Reserve - Nature Conservation',
    subtitle: 'Protect and restore ecosystems through community-driven conservation projects',
    imageUrl: '/reserve/project-images/ar-wetlands.jpg',
    type: 'project'
  },
  {
    name: 'clathes',
    path: '/clathes',
    title: 'Clathes - Sustainable Fashion',
    subtitle: 'Eco-friendly clothing brand promoting sustainable fashion practices',
    imageUrl: '/clathes/vaquita-representation.png',
    type: 'project'
  },
  {
    name: 'pix4d',
    path: '/pix4d',
    title: 'Pix4D - 3D Mapping Solutions',
    subtitle: 'Advanced photogrammetry software for professional 3D mapping and modeling',
    imageUrl: '/pix4d/matterhorn-cervin-pix4d-pix4dmapper-switzerland.jpg',
    type: 'project'
  },
  {
    name: 'wegaw',
    path: '/wegaw',
    title: 'Wegaw - Weather Intelligence',
    subtitle: 'AI-powered weather forecasting for renewable energy optimization',
    imageUrl: '/wegaw/defrost-space-value-added-01.png',
    type: 'project'
  },
  {
    name: 'pomoca',
    path: '/pomoca',
    title: 'Pomoca - Ski Equipment',
    subtitle: 'Innovative ski touring equipment for mountain adventures',
    imageUrl: '/pomoca/steps/gliding.png',
    type: 'project'
  },
  {
    name: 'moodlenet',
    path: '/moodlenet',
    title: 'MoodleNet - Open Education',
    subtitle: 'Decentralized social network for open education and lifelong learning',
    imageUrl: '/assets/images/moodlenet/moodle-screenshot-1.png',
    type: 'project'
  }
];

// Reserve projects - just one main image, not individual project images
const RESERVE_PROJECTS: ReserveProject[] = [];

async function ensureDirectoryExists(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function generatePreviewImage(browser: puppeteer.Browser, pageConfig: PageConfig): Promise<void> {
  const page = await browser.newPage();
  
  try {
    // Set viewport for the image dimensions
    await page.setViewport({ width: IMAGE_WIDTH, height: IMAGE_HEIGHT });
    
    // Create the appropriate background and layout based on page type
    const getBackgroundStyle = (): string => {
      if (pageConfig.type === 'main') {
        return `
          background-image: url('${BASE_URL}/backgrounds/mountain-background.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        `;
      } else {
        // Project-specific gradients matching the actual project pages
        const gradients: Record<string, string> = {
          'openhuts': 'linear-gradient(45deg, #059669, #10b981, #14b8a6, #0d9488, #0891b2, #06b6d4)',
          'clathes': 'linear-gradient(45deg, #1e3a8a, #1e40af, #0f766e, #0891b2, #06b6d4, #0891b2)',
          'reserve': 'linear-gradient(45deg, #059669, #10b981, #14b8a6, #0d9488, #0891b2, #06b6d4)',
          'pix4d': 'linear-gradient(45deg, #7c3aed, #8b5cf6, #a855f7, #c084fc, #d8b4fe, #e9d5ff)',
          'wegaw': 'linear-gradient(45deg, #dc2626, #ef4444, #f97316, #f59e0b, #eab308, #facc15)',
          'pomoca': 'linear-gradient(45deg, #1f2937, #374151, #4b5563, #6b7280, #9ca3af, #d1d5db)',
          'moodlenet': 'linear-gradient(45deg, #7c3aed, #8b5cf6, #a855f7, #c084fc, #d8b4fe, #e9d5ff)'
        };
        return `background: ${gradients[pageConfig.name] || gradients['reserve']};`;
      }
    };

    const getOverlayStyle = (): string => {
      if (pageConfig.type === 'main') {
        return 'bg-gradient-to-b from-white/90 via-white/85 to-white/80';
      } else {
        return 'bg-black/20';
      }
    };

    // Create a simple HTML page with the OpenGraphImage component
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
            .animated-gradient {
              background-size: 200% 200%;
              animation: diagonal-gradient 12s ease-in-out infinite;
            }
            @keyframes diagonal-gradient {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
          </style>
        </head>
        <body>
          <div class="relative w-[1200px] h-[630px] overflow-hidden" style="${getBackgroundStyle()}">
            <!-- Background Overlay -->
            <div class="absolute inset-0 ${getOverlayStyle()}"></div>

                         ${pageConfig.type === 'main' ? `
             <!-- Main Page Layout - Large Profile Picture -->
             <div class="relative z-10 flex items-center justify-center h-full p-16">
               <div class="text-center">
                 <!-- Large Profile Picture -->
                 <div class="flex justify-center mb-8">
                   <div class="w-80 h-80 rounded-full overflow-hidden border-4 border-gray-200 shadow-2xl">
                     <img src="${BASE_URL}/profile/profile-original.png" alt="Bru Mas Ribera" class="w-full h-full object-cover">
                   </div>
                 </div>
                 
                 <!-- Name and Title -->
                 <h1 class="text-6xl font-bold text-gray-800 mb-4 leading-tight">
                   ${pageConfig.title}
                 </h1>
                 <p class="text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
                   ${pageConfig.subtitle}
                 </p>
                 
                 <!-- Website URL -->
                 <div class="text-center">
                   <div class="text-gray-500 text-sm font-medium">Visit</div>
                   <div class="text-gray-700 text-lg font-semibold">bru.masribera.com</div>
                 </div>
               </div>
             </div>
            ` : `
            <!-- Project Page Layout -->
            <div class="relative z-10 flex items-center justify-between h-full p-16">
              <!-- Left Side - Text Content -->
              <div class="flex-1 max-w-2xl">
                <!-- Small Profile Image -->
                <div class="flex items-center gap-4 mb-8">
                  <div class="w-28 h-28 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                    <img src="${BASE_URL}/profile/profile-cropped.jpg" alt="Bru Mas Ribera" class="w-full h-full object-cover">
                  </div>
                  <div class="text-white/90">
                    <div class="text-xl font-medium">Bru Mas Ribera</div>
                    <div class="text-base opacity-75">Frontend & UX Engineer</div>
                  </div>
                </div>

                <!-- Main Title -->
                <h1 class="text-6xl font-bold text-white mb-6 leading-tight">
                  ${pageConfig.title}
                </h1>

                <!-- Subtitle -->
                <p class="text-2xl text-white/90 mb-8 leading-relaxed">
                  ${pageConfig.subtitle}
                </p>
              </div>

              <!-- Right Side - Project Logo -->
              <div class="flex flex-col items-end justify-center space-y-6">
                <!-- Project Logo Container (like project pages) -->
                <div class="bg-white p-6 rounded-3xl shadow-xl">
                  <img src="${BASE_URL}/${pageConfig.name === 'openhuts' ? 'icons/logos/openhuts-platform-logo.jpeg' : 
                    pageConfig.name === 'reserve' ? 'icons/logos/reserve-conservation-logo.png' : 
                    pageConfig.name === 'clathes' ? 'icons/logos/projects/clathes-vaquita-logo.png' : 
                    pageConfig.name === 'pix4d' ? 'icons/logos/pix4d-software-logo.jpeg' : 
                    pageConfig.name === 'wegaw' ? 'icons/logos/wegaw-weather-logo.jpeg' : 
                    pageConfig.name === 'pomoca' ? 'icons/logos/oberalp-salewa-group-logo.jpeg' : 
                    pageConfig.name === 'moodlenet' ? 'icons/logos/moodlenet-network-logo.png' : 'icons/logos/default-logo.png'}" 
                    alt="Project Logo" class="h-32 w-32 object-contain rounded-2xl">
                </div>

                <!-- Website URL -->
                <div class="text-right">
                  <div class="text-white/60 text-sm font-medium">Visit</div>
                  <div class="text-white text-lg font-semibold">bru.masribera.com</div>
                </div>
              </div>
            </div>
            `}
          </div>
        </body>
      </html>
    `;

    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    // Wait for images to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate the image
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false,
      omitBackground: false
    });
    
    // Save the image
    const filename = `${pageConfig.name}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);
    await fs.writeFile(filepath, screenshot);
    
    console.log(`✅ Generated: ${filename}`);
    
  } catch (error: any) {
    console.error(`❌ Error generating ${pageConfig.name}:`, error.message);
  } finally {
    await page.close();
  }
}

async function generateReserveProjectImages(browser: puppeteer.Browser): Promise<void> {
  console.log('\n🌱 Generating Reserve project images...');
  
  for (const project of RESERVE_PROJECTS) {
    const pageConfig: PageConfig = {
      name: `reserve-${project.id}`,
      title: project.name,
      subtitle: `Conservation project in ${project.country}`,
      imageUrl: `/reserve/project-images/${project.id}.jpg`,
      type: 'project',
      country: project.country,
      impact: project.impact
    };
    
    await generatePreviewImage(browser, pageConfig);
  }
}

async function main(): Promise<void> {
  console.log('🚀 Starting preview image generation...');
  console.log(`📁 Output directory: ${OUTPUT_DIR}`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
  
  // Ensure output directory exists
  await ensureDirectoryExists(OUTPUT_DIR);
  console.log('✅ Directory check complete');
  
  // Launch browser
  console.log('🌐 Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    timeout: 30000
  });
  console.log('✅ Browser launched successfully');
  
  try {
    // Generate main page images
    console.log('\n📄 Generating main page images...');
    for (const page of PAGES) {
      await generatePreviewImage(browser, page);
    }
    
    console.log('\n🎉 All preview images generated successfully!');
    console.log(`📁 Images saved to: ${OUTPUT_DIR}`);
    
  } catch (error) {
    console.error('❌ Error during generation:', error);
  } finally {
    await browser.close();
  }
}

// Run the script
const targetPage: string | undefined = process.argv[2]; // Allow specifying a single page
if (targetPage) {
  console.log(`🎯 Generating single image for: ${targetPage}`);
  const page = PAGES.find(p => p.name === targetPage);
  if (page) {
    (async () => {
      console.log('🚀 Starting single image generation...');
      await ensureDirectoryExists(OUTPUT_DIR);
      
      const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        timeout: 30000
      });
      
      await generatePreviewImage(browser, page);
      await browser.close();
      console.log('🎉 Single image generated successfully!');
    })().catch(console.error);
  } else {
    console.error(`❌ Page "${targetPage}" not found`);
  }
} else {
  main().catch(console.error);
}

export { generatePreviewImage, PAGES, RESERVE_PROJECTS };
