import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.webp', 'pwa-icons/icon-192x192.png', 'pwa-icons/icon-512x512.png', 'pwa-icons/favicon.ico'],
      manifest: {
        name: 'Wagyu Bites Premium',
        short_name: 'Wagyu',
        description: 'Templo de la proteína. Alta costura aplicada a la carnicería premium.',
        theme_color: '#080808',
        background_color: '#080808',
        display: 'standalone',
        icons: [
          { src: 'pwa-icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'pwa-icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
