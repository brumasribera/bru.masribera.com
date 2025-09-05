import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "tslib": path.resolve(__dirname, "node_modules/tslib/tslib.es6.js")
    },
  },
  build: {
    chunkSizeWarningLimit: 2000, // Increase warning limit to 2MB
    target: 'es2015' // Target modern browsers for better tree-shaking
  },
  server: {
    // Remove proxy - let React Router handle /tools/timer
  }
})
