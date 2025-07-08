import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /\.jsx?$/
  },
  // Add a new configuration option here
  // For example:
  build: {
    outDir: 'dist'
  }
});
