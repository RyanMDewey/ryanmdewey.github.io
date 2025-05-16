import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.tsx'), // <== FIX: Vite knows your real entry point
    }
  },
  server: {
    port: 3000
  }
});