/**
 * Vercel serverless proxy for Google Sheets (CSV + htmlview).
 * Mirrors the Vite dev proxy: /api/google-sheets/* → https://docs.google.com/*
 */
export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const parts = req.query.path
    const path = Array.isArray(parts) ? parts.join('/') : String(parts || '')
    if (!path || path.includes('..')) {
      return res.status(400).json({ error: 'Invalid path' })
    }

    const qs = new URLSearchParams()
    for (const [key, value] of Object.entries(req.query)) {
      if (key === 'path') continue
      if (Array.isArray(value)) {
        for (const item of value) qs.append(key, String(item))
      } else if (value != null) {
        qs.set(key, String(value))
      }
    }

    const query = qs.toString()
    const target = `https://docs.google.com/${path}${query ? `?${query}` : ''}`

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

    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=120')
    res.status(upstream.status).send(body)
  } catch (err) {
    res.status(502).json({
      error: 'Google Sheets proxy failed',
      detail: err?.message || String(err),
    })
  }
}
