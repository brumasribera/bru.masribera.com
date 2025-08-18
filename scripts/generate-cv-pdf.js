import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function prepareCvPage(page) {
  // Wait for the CV content to be fully rendered
  await page.waitForSelector('#a4-sheet', { timeout: 10000 });
  // Wait a bit more for any animations or dynamic content to settle
  await new Promise(resolve => setTimeout(resolve, 2000));
  // Get the CV content element and optimize it for PDF generation
  await page.evaluate(() => {
    // Hide the action buttons container
    const actionButtons = document.querySelector('.text-center.mt-6.space-x-4');
    if (actionButtons) {
      actionButtons.style.display = 'none';
    }
    
    // Optimize the CV container for perfect A4 fit
    const a4Sheet = document.getElementById('a4-sheet');
    if (a4Sheet) {
      // Remove all margins and padding
      a4Sheet.style.margin = '0';
      a4Sheet.style.padding = '0';
      a4Sheet.style.width = '210mm';
      a4Sheet.style.height = '297mm';
      a4Sheet.style.boxSizing = 'border-box';
      a4Sheet.style.position = 'relative';
      a4Sheet.style.left = '0';
      a4Sheet.style.top = '0';
      
      // Ensure the container takes full page width
      a4Sheet.style.maxWidth = 'none';
      a4Sheet.style.minWidth = '210mm';
      
      // Override any Tailwind classes that might add margins
      a4Sheet.classList.remove('mx-auto');
      a4Sheet.classList.remove('shadow-lg');
      
      // Remove the outer container padding that's causing the left margin
      const innerContent = a4Sheet.querySelector('.p-8');
      if (innerContent) {
        innerContent.style.padding = '12mm';
        innerContent.style.margin = '0';
      }
      
      // Force single page by ensuring content fits within A4 bounds
      const allContent = a4Sheet.querySelectorAll('*');
      allContent.forEach(element => {
        if (element.style) {
          // Reduce any excessive margins or padding that might cause overflow
          if (element.style.marginBottom && element.style.marginBottom.includes('px')) {
            const currentMargin = parseInt(element.style.marginBottom);
            if (currentMargin > 16) {
              element.style.marginBottom = '16px';
            }
          }
        }
      });
      
      // Strict single page enforcement - ensure content height never exceeds A4
      const totalHeight = a4Sheet.scrollHeight;
      if (totalHeight > 297) {
        // If content is too tall, reduce spacing further
        const sections = a4Sheet.querySelectorAll('div[class*="mb-"]');
        sections.forEach(section => {
          if (section.className.includes('mb-5')) {
            section.className = section.className.replace('mb-5', 'mb-4');
          }
          if (section.className.includes('mb-6')) {
            section.className = section.className.replace('mb-6', 'mb-4');
          }
        });
      }
    }
    
    // Also optimize the main container
    const mainContainer = document.querySelector('.container.mx-auto.px-4');
    if (mainContainer) {
      mainContainer.style.margin = '0';
      mainContainer.style.padding = '0';
      mainContainer.style.maxWidth = 'none';
    }
    
    // Remove any body margins and ensure full width
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';
    
    // Ensure the page takes full width
    const html = document.documentElement;
    html.style.margin = '0';
    html.style.padding = '0';
    html.style.width = '100%';
  });
}

async function generateCvForLanguage(browser, baseUrl, language) {
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123 });

  const pathSuffix = language === 'en' ? '/cv' : `/${language}/cv`;
  const url = `${baseUrl}${pathSuffix}`;
  console.log(`Generating CV for ${language}...`);
  console.log(`Navigating to ${url} ...`);
  
  try {
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    await prepareCvPage(page);

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: true,
      pageRanges: '1',
    });

    // Save the PDF to documents folder
    const publicDir = path.join(__dirname, '..', 'public');
    const documentsDir = path.join(publicDir, 'documents');
    if (!fs.existsSync(documentsDir)) fs.mkdirSync(documentsDir, { recursive: true });
    const filename = language === 'en' ? 'CV - Bru Mas Ribera.pdf' : `CV - Bru Mas Ribera (${language.toUpperCase()}).pdf`;
    const pdfPath = path.join(documentsDir, filename);
    fs.writeFileSync(pdfPath, pdf);
    await page.close();
    console.log(`✅ Generated ${filename} at ${pdfPath}`);
  } catch (error) {
    console.error(`❌ Error generating CV for ${language}:`, error.message);
    await page.close();
    throw error;
  }
}

async function generateAllCvs() {
  const baseUrl = process.env.CV_SERVER_URL || 'http://localhost:3000';
  const languages = ['en', 'de', 'fr', 'es', 'ca', 'it', 'pt', 'rm'];
  const browser = await puppeteer.launch();
  try {
    for (const lng of languages) {
      await generateCvForLanguage(browser, baseUrl, lng);
    }
  } finally {
    await browser.close();
  }
}

generateAllCvs().catch((err) => {
  console.error(err);
  process.exit(1);
});
