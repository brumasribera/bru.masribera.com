import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000, // Increase warning limit to 2MB
    target: 'es2015' // Target modern browsers for better tree-shaking
  }
})
