import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  preview: {
    host: true,
    port: 8080,
    allowedHosts: ['airpolmap-abc123.ondigitalocean.app']
  },
})
