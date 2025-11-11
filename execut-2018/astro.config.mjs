import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'

export default defineConfig({
  build: { format: "file" },
  integrations: [sitemap()],
  site: 'https://2018.execut.nl/',
})
