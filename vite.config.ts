import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    svgr()
  ],
  preview: {
    host: true,
    port: 8080,
    allowedHosts: true
  },
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
    hmr: command === 'serve' ? { host: 'localhost' } : false,
  }
}))
