import { resolve } from 'node:path'
import { defineConfig, type Plugin, type PreviewServer, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Client routes served by index.html — same app entry as the landing page. */
const SPA_ROUTES = ['/gallery', '/gallery.html']

function attachSpaFallback(server: ViteDevServer | PreviewServer) {
  server.middlewares.use((req, _res, next) => {
    const path = req.url?.split('?')[0] ?? ''
    if (SPA_ROUTES.some((route) => path === route || path === `${route}/`)) {
      req.url = '/index.html'
    }
    next()
  })
}

function spaFallback(): Plugin {
  return {
    name: 'spa-fallback',
    configureServer: attachSpaFallback,
    configurePreviewServer: attachSpaFallback,
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback()],
  build: {
    // Terms stays a separate document so a legal page never boots the hero rig.
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        terms: resolve(__dirname, 'terms.html'),
      },
    },
  },
})
