import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all addresses
    port: process.env.PORT || 3000, // Use the PORT environment variable or fallback to 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
