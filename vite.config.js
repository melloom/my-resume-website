import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    strictPort: true,
    host: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    }
  },
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': './src',
    }
  }
});