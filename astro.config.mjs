// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ['flagcdn.com', 'upload.wikimedia.org']
  },
  vite: {
    plugins: [tailwindcss()]
  }
})
