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

// Display results
console.log('Character count of project page taglines across all languages:\n');

projects.forEach(project => {
  console.log(`${project.toUpperCase()}:`);
  languages.forEach(lang => {
    const count = results[project][lang];
    if (typeof count === 'number') {
      console.log(`  ${lang}: ${count} characters`);
    } else {
      console.log(`  ${lang}: ${count}`);
    }
  });
  console.log('');
});

// Summary by language
console.log('SUMMARY BY LANGUAGE:');
languages.forEach(lang => {
  const totalChars = projects.reduce((sum, project) => {
    const count = results[project][lang];
    return sum + (typeof count === 'number' ? count : 0);
  }, 0);
  
  const validCounts = projects.filter(project => typeof results[project][lang] === 'number').length;
  const avgChars = validCounts > 0 ? Math.round(totalChars / validCounts) : 0;
  
  console.log(`${lang}: Total ${totalChars} chars, Average ${avgChars} chars (${validCounts}/${projects.length} projects)`);
});

// Summary by project
console.log('\nSUMMARY BY PROJECT:');
projects.forEach(project => {
  const totalChars = languages.reduce((sum, lang) => {
    const count = results[project][lang];
    return sum + (typeof count === 'number' ? count : 0);
  }, 0);
  
  const validCounts = languages.filter(lang => typeof results[project][lang] === 'number').length;
  const avgChars = validCounts > 0 ? Math.round(totalChars / validCounts) : 0;
  
  console.log(`${project}: Total ${totalChars} chars, Average ${avgChars} chars (${validCounts}/${languages.length} languages)`);
});
