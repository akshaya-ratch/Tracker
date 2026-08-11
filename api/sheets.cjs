// .cjs — CommonJS so this works with package.json "type": "module"
module.exports = async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const id = String(req.query.id || '').trim()
    const gid = String(req.query.gid || '').trim()
    const mode = String(req.query.mode || 'csv').trim().toLowerCase()

    if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
      return res.status(400).json({ error: 'Invalid spreadsheet id' })
    }

    let target
    if (mode === 'html' || mode === 'htmlview') {
      target = `https://docs.google.com/spreadsheets/d/${id}/htmlview`
    } else {
      if (!/^-?\d+$/.test(gid)) {
        return res.status(400).json({ error: 'Invalid gid' })
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

    res.setHeader('Content-Type', contentType)
    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=120')
    return res.status(upstream.status).send(body)
  } catch (err) {
    return res.status(502).json({
      error: 'Google Sheets proxy failed',
      detail: err?.message || String(err),
    })
  }
}
