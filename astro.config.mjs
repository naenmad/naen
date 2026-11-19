import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://naen.me',
  integrations: [
    sitemap({
      filter: (page) => !page.replace(/\/$/, '').endsWith('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
