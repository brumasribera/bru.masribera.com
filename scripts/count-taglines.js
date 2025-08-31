const fs = require('fs');
const path = require('path');

const languages = ['en', 'es', 'fr', 'ca', 'de', 'it', 'pt', 'rm'];
const projects = ['clathes', 'moodlenet', 'openhuts', 'pix4d', 'pomoca', 'reserve', 'wegaw'];

const results = {};

// Count characters for each project and language
projects.forEach(project => {
  results[project] = {};
  
  languages.forEach(lang => {
    const filePath = path.join(__dirname, 'src', 'locales', lang, 'pages', `${project}.json`);
    
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        
        if (data.header && data.header.tagline) {
          const charCount = data.header.tagline.length;
          results[project][lang] = charCount;
        } else {
          results[project][lang] = 'No tagline found';
        }
      } else {
        results[project][lang] = 'File not found';
      }
    } catch (error) {
      results[project][lang] = `Error: ${error.message}`;
    }
  });
});

// Display character count of project page taglines across all languages
function displayCharacterCounts() {
  // Character count of project page taglines across all languages
  
  projects.forEach(project => {
    // Project name
    languages.forEach(lang => {
      const count = getTaglineLength(project, lang)
      if (count !== null) {
        // Language: count characters
      } else {
        // Language: count
      }
    })
    
    // Empty line
  })
  
  // SUMMARY BY LANGUAGE
  languages.forEach(lang => {
    const counts = projects.map(project => getTaglineLength(project, lang)).filter(count => count !== null)
    if (counts.length > 0) {
      const totalChars = counts.reduce((sum, count) => sum + count, 0)
      const avgChars = Math.round(totalChars / counts.length)
      const validCounts = counts.length
      // Language: Total X chars, Average Y chars (Z/X projects)
    }
  })
  
  // SUMMARY BY PROJECT
  projects.forEach(project => {
    const counts = languages.map(lang => getTaglineLength(project, lang)).filter(count => count !== null)
    if (counts.length > 0) {
      const totalChars = counts.reduce((sum, count) => sum + count, 0)
      const avgChars = Math.round(totalChars / counts.length)
      const validCounts = counts.length
      // Project: Total X chars, Average Y chars (Z/X languages)
    }
  })
}
