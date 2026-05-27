import { createRequire } from 'node:module'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, join } from 'path'
import { tmpdir } from 'os'

const require = createRequire(import.meta.url)

// Keep Vite cache outside OneDrive — avoids EPERM on node_modules/.vite/deps (Windows sync locks)
const cacheDir = join(tmpdir(), 'ifranchise-website-vite-cache')

function loadOptionalPlugins() {
  const optional = []
  try {
    const { ViteImageOptimizer } = require('vite-plugin-image-optimizer')
    optional.push(
      ViteImageOptimizer({
        png: { quality: 86 },
        jpeg: { quality: 86 },
        jpg: { quality: 86 },
        webp: { quality: 86 },
        avif: { quality: 62 },
      }),
    )
  } catch {
    /* pre-optimized WebP assets via npm run images:optimize */
  }
  try {
    const compression = require('vite-plugin-compression2').default
    optional.push(
      compression({
        algorithms: ['gzip', 'brotliCompress'],
        exclude: [/\.(br|gz)$/, /\.(png|jpe?g|webp|avif|gif|svg|ico)$/],
        threshold: 1024,
      }),
    )
  } catch {
    /* optional: npm i -D vite-plugin-compression2 */
  }
  return optional
}

export default defineConfig({
  envDir: resolve(__dirname),
  cacheDir,
  plugins: [
    react({
      fastRefresh: true,
    }),
    ...loadOptionalPlugins(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    modulePreload: {
      polyfill: true,
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-core'
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion'
          }
          if (id.includes('node_modules/react-icons')) {
            return 'icons'
          }
          if (id.includes('node_modules/@studio-freight/lenis')) {
            return 'lenis'
          }
          if (id.includes('/src/lib/forms/')) {
            return 'forms'
          }
          if (id.includes('/src/components/Hero')) {
            return 'page-home'
          }
          if (
            id.includes('/src/components/FranchiseOpportunitiesPage') ||
            id.includes('/src/components/FranchiseDetailsPage')
          ) {
            return 'page-franchise'
          }
          if (id.includes('/src/components/ForBrandOwnersPage')) {
            return 'page-brand-owners'
          }
          if (id.includes('/src/components/ExpansionAssistant')) {
            return 'expansion-assistant'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
    minify: 'esbuild',
    sourcemap: false,
    target: 'es2020',
    assetsInlineLimit: 2048,
    cssCodeSplit: true,
    cssMinify: true,
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['framer-motion', '@studio-freight/lenis'],
  },
  server: {
    fs: {
      strict: true,
      deny: ['.env', '.env.*'],
    },
  },
  publicDir: 'public',
  base: '/',
  assetsInclude: ['**/*.JPG', '**/*.JPEG', '**/*.jfif', '**/*.webp', '**/*.avif'],
})
