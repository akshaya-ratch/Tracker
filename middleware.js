/**
 * Edge middleware proxy for Google Sheets.
 * Vite static deploys on Vercel often skip /api serverless files;
 * middleware always runs and can return the proxied response.
 */
export const config = {
  matcher: '/api/sheets',
}

export default async function middleware(request) {
  try {
    const url = new URL(request.url)
    const id = String(url.searchParams.get('id') || '').trim()
    const gid = String(url.searchParams.get('gid') || '').trim()
    const mode = String(url.searchParams.get('mode') || 'csv').trim().toLowerCase()

    if (!/^[a-zA-Z0-9_-]+$/.test(id)) {
      return Response.json({ error: 'Invalid spreadsheet id' }, { status: 400 })
    }

    let target
    if (mode === 'html' || mode === 'htmlview') {
      target = `https://docs.google.com/spreadsheets/d/${id}/htmlview`
    } else {
      if (!/^-?\d+$/.test(gid)) {
        return Response.json({ error: 'Invalid gid' }, { status: 400 })
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

    return new Response(body, {
      status: upstream.status,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
      },
    })
  } catch (err) {
    return Response.json(
      {
        error: 'Google Sheets proxy failed',
        detail: err?.message || String(err),
      },
      { status: 502 },
    )
  }
}
