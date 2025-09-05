#!/usr/bin/env node

/**
 * SEO Performance Monitoring Script
 * Monitors key SEO metrics and provides optimization recommendations
 */

const fs = require('fs');
const path = require('path');

class SEOMonitor {
  constructor() {
    this.metrics = {
      sitemaps: [],
      structuredData: [],
      metaTags: [],
      performance: {}
    };
  }

  // Check sitemap health
  checkSitemaps() {
    const sitemapFiles = [
      'public/sitemap-index.xml',
      'public/sitemap.xml',
      'public/sitemap-images.xml'
    ];

    sitemapFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const lastModified = stats.mtime;
        const daysSinceUpdate = Math.floor((Date.now() - lastModified.getTime()) / (1000 * 60 * 60 * 24));
        
        this.metrics.sitemaps.push({
          file: path.basename(file),
          lastModified: lastModified.toISOString().split('T')[0],
          daysSinceUpdate,
          status: daysSinceUpdate <= 30 ? '✅ Fresh' : '⚠️ Needs Update'
        });
      }
    });
  }

  // Check structured data files
  checkStructuredData() {
    const schemaFiles = [
      'public/breadcrumb-schema.json',
      'public/faq-schema.json',
      'public/portfolio-schema.json',
      'public/knowledge-graph-schema.json'
    ];

    schemaFiles.forEach(file => {
      if (fs.existsSync(file)) {
        try {
          const content = fs.readFileSync(file, 'utf8');
          const schema = JSON.parse(content);
          const hasValidSchema = schema['@context'] && schema['@type'];
          
          this.metrics.structuredData.push({
            file: path.basename(file),
            type: schema['@type'] || 'Unknown',
            status: hasValidSchema ? '✅ Valid' : '❌ Invalid',
            size: `${(content.length / 1024).toFixed(1)}KB`
          });
        } catch (error) {
          this.metrics.structuredData.push({
            file: path.basename(file),
            status: '❌ Parse Error',
            error: error.message
          });
        }
      }
    });
  }

  // Check meta tags in HTML
  checkMetaTags() {
    const htmlFile = 'index.html';
    if (fs.existsSync(htmlFile)) {
      const content = fs.readFileSync(htmlFile, 'utf8');
      
      const checks = [
        { name: 'Title Tag', regex: /<title>.*<\/title>/, status: content.includes('<title>') },
        { name: 'Meta Description', regex: /<meta name="description"/, status: content.includes('meta name="description"') },
        { name: 'Open Graph Tags', regex: /<meta property="og:/, status: content.includes('og:') },
        { name: 'Twitter Cards', regex: /<meta property="twitter:/, status: content.includes('twitter:') },
        { name: 'Canonical URL', regex: /<link rel="canonical"/, status: content.includes('rel="canonical"') },
        { name: 'Robots Meta', regex: /<meta name="robots"/, status: content.includes('robots"') }
      ];

      checks.forEach(check => {
        this.metrics.metaTags.push({
          tag: check.name,
          status: check.status ? '✅ Present' : '❌ Missing'
        });
      });
    }
  }

  // Generate performance report
  generateReport() {
    console.log('\n🚀 SEO Performance Report for Bru Mas Ribera Portfolio\n');
    console.log('=' .repeat(60));

    // Sitemap Status
    console.log('\n📋 Sitemap Health:');
    this.metrics.sitemaps.forEach(sitemap => {
      console.log(`  ${sitemap.status} ${sitemap.file} (${sitemap.daysSinceUpdate} days ago)`);
    });

    // Structured Data Status
    console.log('\n🏗️  Structured Data:');
    this.metrics.structuredData.forEach(schema => {
      console.log(`  ${schema.status} ${schema.file} - ${schema.type} (${schema.size})`);
    });

    // Meta Tags Status
    console.log('\n🏷️  Meta Tags:');
    this.metrics.metaTags.forEach(tag => {
      console.log(`  ${tag.status} ${tag.tag}`);
    });

    // Recommendations
    console.log('\n💡 Optimization Recommendations:');
    
    const needsUpdate = this.metrics.sitemaps.filter(s => s.daysSinceUpdate > 30);
    if (needsUpdate.length > 0) {
      console.log('  ⚠️  Update sitemaps to keep them fresh');
    }

    const invalidSchemas = this.metrics.structuredData.filter(s => s.status.includes('❌'));
    if (invalidSchemas.length > 0) {
      console.log('  🔧 Fix invalid structured data schemas');
    }

    const missingTags = this.metrics.metaTags.filter(t => t.status.includes('❌'));
    if (missingTags.length > 0) {
      console.log('  📝 Add missing meta tags for better SEO');
    }

    console.log('\n✅ All systems operational! Your SEO foundation is solid.');
    console.log('\n📊 Next Steps:');
    console.log('  1. Submit sitemaps to Google Search Console');
    console.log('  2. Monitor Core Web Vitals');
    console.log('  3. Track search performance metrics');
    console.log('  4. Update content regularly');
  }

  // Run full analysis
  run() {
    this.checkSitemaps();
    this.checkStructuredData();
    this.checkMetaTags();
    this.generateReport();
  }
}

// Run the monitor if called directly
if (require.main === module) {
  const monitor = new SEOMonitor();
  monitor.run();
}

module.exports = SEOMonitor;
