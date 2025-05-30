import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build'
  },
  server: {
    port: 3000,
    host: true
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: ['www.ryanmdewey.com']
  }
});
