import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

export default defineConfig({
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
    hmr: {
      host: "localhost",
      port: 5173,
      protocol: "ws",
    },
    allowedHosts: true,
  }
})
