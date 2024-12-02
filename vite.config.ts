import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    commonjsOptions: {
      include: []
    }
  },
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch'
    }
  }
});