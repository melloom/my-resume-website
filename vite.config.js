import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
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
  ],
});
