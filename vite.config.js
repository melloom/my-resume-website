import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  
  return {
    base: './', // Ensures assets are correctly referenced in any environment
    plugins: [
      react(),
      // Only enable PWA in production mode
      isProd && VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'icons/favicon.ico', 
          'icons/favicon-16x16.png', 
          'icons/favicon-32x32.png',
          'icons/apple-touch-icon.png', 
          'icons/safari-pinned-tab.svg',
          'icons/logo192.png',
          'icons/logo512.png',
          'icons/maskable_icon.png'
        ],
        manifest: {
          name: 'Melvin Peralta Portfolio',
          short_name: 'Melvin P.',
          description: 'Professional portfolio for Melvin Peralta',
          theme_color: '#6366f1',
          background_color: '#0f172a',
          display: 'standalone',
          start_url: '/',
          icons: [
            {
              src: 'icons/logo192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'icons/logo512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'icons/maskable_icon.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ]
        }
      })
    ].filter(Boolean),
    server: {
      port: 3000,
      open: true, // Automatically open browser on server start
      host: true, // Listen on all addresses including LAN
    },
    build: {
      sourcemap: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    resolve: {
      alias: {
        '@': '/src', // Enables using @ to refer to src directory
      }
    }
  }
});