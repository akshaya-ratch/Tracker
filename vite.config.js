import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Local /api/sheets proxy (mirrors Vercel api/sheets.js). */
function sheetsDevProxy() {
  return {
    name: 'sheets-dev-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const rawUrl = req.url || ''
        if (!rawUrl.startsWith('/api/sheets')) return next()

        try {
          const url = new URL(rawUrl, 'http://localhost')
          const id = String(url.searchParams.get('id') || '').trim()
          const gid = String(url.searchParams.get('gid') || '').trim()
          const mode = String(url.searchParams.get('mode') || 'csv').trim().toLowerCase()

          if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Invalid spreadsheet id' }))
            return
          }

          let target
          if (mode === 'html' || mode === 'htmlview') {
            target = `https://docs.google.com/spreadsheets/d/${id}/htmlview`
          } else {
            if (!/^-?\d+$/.test(gid)) {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: 'Invalid gid' }))
              return
            }
            target = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`
          }

          const upstream = await fetch(target, {
            method: 'GET',
            redirect: 'follow',
            headers: {
              Accept: 'text/csv,text/html,application/xhtml+xml,*/*',
              'User-Agent':
                'Mozilla/5.0 (compatible; RatchTracker/1.0; +https://github.com/akshaya-ratch/Tracker)',
            },
          })
          const contentType = upstream.headers.get('content-type') || 'text/plain; charset=utf-8'
          const body = await upstream.text()
          res.statusCode = upstream.status
          res.setHeader('Content-Type', contentType)
          res.end(body)
        } catch (err) {
          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: 'Google Sheets proxy failed',
              detail: err?.message || String(err),
            }),
          )
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), sheetsDevProxy()],
  server: {
    port: 5173,
  },
})
