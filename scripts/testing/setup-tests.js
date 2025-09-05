/**
 * Setup Testing Framework
 * 
 * This script installs and configures a comprehensive testing framework
 * for the website including unit tests, integration tests, and e2e tests.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Setting up comprehensive testing framework...\n');

// Install testing dependencies
console.log('📦 Installing testing dependencies...');

const testingDependencies = [
  // Core testing framework
  'vitest',
  '@vitest/ui',
  'jsdom',
  
  // React testing utilities
  '@testing-library/react',
  '@testing-library/jest-dom',
  '@testing-library/user-event',
  
  // End-to-end testing
  '@playwright/test',
  
  // Mocking and utilities
  'msw',
  '@types/jest',
  
  // Pre-commit hooks
  'husky',
  'lint-staged'
];

try {
  console.log('Installing:', testingDependencies.join(', '));
  execSync(`npm install --save-dev ${testingDependencies.join(' ')}`, { stdio: 'inherit' });
  console.log('✅ Testing dependencies installed successfully\n');
} catch (error) {
  console.error('❌ Failed to install testing dependencies:', error.message);
  process.exit(1);
}

// Create test configuration files
console.log('📝 Creating test configuration files...');

// Vitest config
const vitestConfig = `/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', 'build', 'coverage'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.{js,ts}',
        '**/index.{js,ts}',
      ],
    },
  },
});`;

fs.writeFileSync('vitest.config.ts', vitestConfig);
console.log('✅ Created vitest.config.ts');

// Playwright config
const playwrightConfig = `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});`;

fs.writeFileSync('playwright.config.ts', playwrightConfig);
console.log('✅ Created playwright.config.ts');

console.log('\n🎉 Testing framework setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Run test setup script: node scripts/testing/setup-tests.js');
console.log('2. Create test files: npm run test:create');
console.log('3. Run tests: npm run test');
console.log('4. Run e2e tests: npm run test:e2e');

