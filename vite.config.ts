/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // One entry per edition (ADR 0004). Each is a real document with its own
      // `lang`, its own static metadata and its own bundle, so `/es` is a page
      // a scraper can read rather than a mode the English page can be put into.
      // `es/index.html` builds to `dist/es/index.html`, which GitHub Pages
      // serves at `/es/` with no configuration.
      //
      // The paths are relative to the project root, which Vite resolves for us:
      // spelling them absolutely would mean `@types/node` for one call to
      // `resolve`.
      input: {
        en: 'index.html',
        es: 'es/index.html',
      },
    },
  },
  test: {
    environment: 'jsdom',
  },
});
