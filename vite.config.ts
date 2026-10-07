import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves the app from /<repo-name>/
  base: '/imposter-game/',
  plugins: [react(), tailwindcss()],
})
