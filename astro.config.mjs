// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sagesai.github.io',
  base: '/',
  outDir: './dist',
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: ['rehype-slug', 'rehype-autolink-headings'],
    syntaxHighlight: 'prism',
    remarkPlugins: [],
    gfm: true,
    smartypants: true,
  },
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
