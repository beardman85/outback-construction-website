// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// NOTE: Spec (CLAUDE.md) named `@astrojs/tailwind`, which is incompatible with
// Astro 7 (latest). Using the current official path: Tailwind v4 via the
// `@tailwindcss/vite` plugin. Same intent, supported tooling.
//
// TODO[MATT]: confirm production domain. Inferred `outbackconstruction.net`
// from the business email (hello@outbackconstruction.net). Canonical URLs +
// sitemap depend on this being correct.
export default defineConfig({
  site: 'https://outbackconstruction.net',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
