import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// DMulti Services — static output, CMS maison actif via CF Pages Functions
// (le dashboard /admin est une page statique qui charge CmsApp en client:only).
// Le dossier functions/api/cms/* est servi directement par Cloudflare Pages.

export default defineConfig({
  site: 'https://dmultiservices.fr',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/api/') &&
        !page.includes('/merci') &&
        !page.includes('/admin') &&
        !page.includes('/aide'),
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR' } },
    }),
    react(),
  ],
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    build: { cssMinify: true },
  },
});
