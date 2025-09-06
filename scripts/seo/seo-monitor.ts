#!/usr/bin/env node

/**
 * SEO Performance Monitoring Script
 * Monitors key SEO metrics and provides optimization recommendations
 */

import fs from 'fs';
import path from 'path';

interface SEOMetrics {
  sitemaps: string[];
  structuredData: string[];
  metaTags: string[];
  performance: Record<string, any>;
}

class SEOMonitor {
  private metrics: SEOMetrics;

  constructor() {
    this.metrics = {
      sitemaps: [],
      structuredData: [],
      metaTags: [],
      performance: {}
    };
  }

  // Check sitemap health
  checkSitemaps(): void {
    const sitemapFiles = [
      'public/sitemap-index.xml',
      'public/sitemap.xml',
      'public/sitemap-images.xml'
    ];

    sitemapFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const sizeKB = (stats.size / 1024).toFixed(2);
        this.metrics.sitemaps.push(`✅ ${file} (${sizeKB} KB)`);
      } else {
        this.metrics.sitemaps.push(`❌ ${file} - Missing`);
      }
    });
  }

  // Check structured data
  checkStructuredData(): void {
    const structuredDataFiles = [
      'public/breadcrumb-schema.json',
      'public/faq-schema.json',
      'public/knowledge-graph-schema.json',
      'public/portfolio-schema.json'
    ];

    structuredDataFiles.forEach(file => {
      if (fs.existsSync(file)) {
        try {
          const content = JSON.parse(fs.readFileSync(file, 'utf8'));
          const isValid = content['@context'] && content['@type'];
          this.metrics.structuredData.push(
            isValid ? `✅ ${file} - Valid JSON-LD` : `⚠️ ${file} - Invalid structure`
          );
        } catch (error) {
          this.metrics.structuredData.push(`❌ ${file} - Invalid JSON`);
        }
      } else {
        this.metrics.structuredData.push(`❌ ${file} - Missing`);
      }
    });
  }

  // Check meta tags in HTML files
  checkMetaTags(): void {
    const htmlFiles = ['index.html'];
    
    htmlFiles.forEach(file => {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const hasTitle = content.includes('<title>');
        const hasDescription = content.includes('name="description"');
        const hasOGTags = content.includes('property="og:');
        const hasTwitterTags = content.includes('name="twitter:');
        
        const checks = [
          hasTitle ? '✅' : '❌',
          hasDescription ? '✅' : '❌',
          hasOGTags ? '✅' : '❌',
          hasTwitterTags ? '✅' : '❌'
        ];
        
        this.metrics.metaTags.push(`${file}: Title(${checks[0]}) Description(${checks[1]}) OG(${checks[2]}) Twitter(${checks[3]})`);
      }
    });
  }

  // Check performance metrics
  checkPerformance(): void {
    // Check if build files exist
    const distExists = fs.existsSync('dist');
    const hasIndex = distExists && fs.existsSync('dist/index.html');
    const hasAssets = distExists && fs.existsSync('dist/assets');
    
    this.metrics.performance = {
      buildExists: distExists,
      hasIndex: hasIndex,
      hasAssets: hasAssets,
      buildSize: distExists ? this.getDirectorySize('dist') : 0
    };
  }

  // Get directory size in MB
  private getDirectorySize(dirPath: string): number {
    let totalSize = 0;
    
    const getSize = (itemPath: string): void => {
      const stats = fs.statSync(itemPath);
      if (stats.isDirectory()) {
        const files = fs.readdirSync(itemPath);
        files.forEach(file => getSize(path.join(itemPath, file)));
      } else {
        totalSize += stats.size;
      }
    };
    
    try {
      getSize(dirPath);
    } catch (error) {
      // Directory might not exist
    }
    
    return Math.round(totalSize / (1024 * 1024) * 100) / 100;
  }

  // Generate report
  generateReport(): void {
    console.log('🔍 SEO Performance Report');
    console.log('========================\n');

    // Sitemaps
    console.log('📋 Sitemaps:');
    this.metrics.sitemaps.forEach(item => console.log(`  ${item}`));
    console.log('');

    // Structured Data
    console.log('🏗️ Structured Data:');
    this.metrics.structuredData.forEach(item => console.log(`  ${item}`));
    console.log('');

    // Meta Tags
    console.log('🏷️ Meta Tags:');
    this.metrics.metaTags.forEach(item => console.log(`  ${item}`));
    console.log('');

    // Performance
    console.log('⚡ Performance:');
    console.log(`  Build exists: ${this.metrics.performance.buildExists ? '✅' : '❌'}`);
    console.log(`  Index file: ${this.metrics.performance.hasIndex ? '✅' : '❌'}`);
    console.log(`  Assets folder: ${this.metrics.performance.hasAssets ? '✅' : '❌'}`);
    console.log(`  Build size: ${this.metrics.performance.buildSize} MB`);
    console.log('');

    // Recommendations
    console.log('💡 Recommendations:');
    this.generateRecommendations();
  }

  // Generate optimization recommendations
  private generateRecommendations(): void {
    const recommendations: string[] = [];

    // Check sitemap issues
    const missingSitemaps = this.metrics.sitemaps.filter(item => item.includes('❌')).length;
    if (missingSitemaps > 0) {
      recommendations.push(`- Fix ${missingSitemaps} missing sitemap files`);
    }

    // Check structured data issues
    const invalidStructuredData = this.metrics.structuredData.filter(item => item.includes('❌') || item.includes('⚠️')).length;
    if (invalidStructuredData > 0) {
      recommendations.push(`- Fix ${invalidStructuredData} structured data issues`);
    }

    // Check meta tag issues
    const metaIssues = this.metrics.metaTags.filter(item => item.includes('❌')).length;
    if (metaIssues > 0) {
      recommendations.push(`- Add missing meta tags (${metaIssues} issues found)`);
    }

    // Check build issues
    if (!this.metrics.performance.buildExists) {
      recommendations.push('- Run `npm run build` to create production build');
    }

    if (recommendations.length === 0) {
      console.log('  🎉 All SEO metrics look good!');
    } else {
      recommendations.forEach(rec => console.log(`  ${rec}`));
    }
  }

  // Run all checks
  run(): void {
    console.log('🚀 Starting SEO monitoring...\n');
    
    this.checkSitemaps();
    this.checkStructuredData();
    this.checkMetaTags();
    this.checkPerformance();
    
    this.generateReport();
  }
}

// Run the monitor
const monitor = new SEOMonitor();
monitor.run();

