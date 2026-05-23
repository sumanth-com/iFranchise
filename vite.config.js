import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, join } from 'path'
import { tmpdir } from 'os'

// Keep Vite cache outside OneDrive — avoids EPERM on node_modules/.vite/deps (Windows sync locks)
const cacheDir = join(tmpdir(), 'ifranchise-website-vite-cache')

export default defineConfig({
  // Vite loads .env only from project root (same folder as package.json)
  envDir: resolve(__dirname),
  cacheDir,
  plugins: [
    react({
      fastRefresh: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-core';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          if (id.includes('node_modules/react-icons')) {
            return 'icons';
          }
          if (id.includes('node_modules/@studio-freight/lenis')) {
            return 'lenis';
          }
          if (id.includes('/src/lib/forms/')) {
            return 'forms';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
    minify: 'esbuild',
    sourcemap: false,
    target: 'es2020',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    cssMinify: true,
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', '@studio-freight/lenis'],
  },
  server: {
    fs: {
      strict: true,
      // Block dev server from serving env files if requested by URL
      deny: ['.env', '.env.*'],
    },
  },
  publicDir: 'public',
  base: '/',
  assetsInclude: ['**/*.JPG', '**/*.JPEG', '**/*.jfif'],
})
