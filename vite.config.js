import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Basic Vite configuration for a React SPA.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
