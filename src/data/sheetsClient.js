import { csvToObjects } from '../utils/csv'
import { sheetCsvUrl, sheetHtmlViewUrl, SPREADSHEET } from './spreadsheetConfig'

function looksLikeLoginHtml(text) {
  const t = text.slice(0, 400).toLowerCase()
  return (
    t.includes('accounts.google.com') ||
    t.includes('service=wise') ||
    (t.includes('<!doctype html') && t.includes('sign in'))
  )
}

/**
 * Parse tab list from Google Sheets htmlview bootstrap script:
 * items.push({name: "7\/8", ..., gid: "105472673", ...})
 */
export function parseSheetTabsFromHtml(html) {
  const tabs = []
  const seen = new Set()
  const re = /items\.push\(\{name:\s*"((?:\\.|[^"\\])*)"[^}]*?\bgid:\s*"(-?\d+)"/g
  let match
  while ((match = re.exec(html)) != null) {
    const name = match[1].replace(/\\u([0-9a-fA-F]{4})/g, (_, h) =>
      String.fromCharCode(parseInt(h, 16)),
    ).replace(/\\(.)/g, '$1')
    const gid = match[2]
    if (seen.has(gid)) continue
    seen.add(gid)
    tabs.push({ name, gid })
  }
  return tabs
}

/** List worksheet tabs in the workbook. */
export async function fetchSheetTabs({ id = SPREADSHEET.id } = {}) {
  const url = sheetHtmlViewUrl({ id })
  const res = await fetch(url, { credentials: 'omit' })
  if (!res.ok) {
    throw new Error(`Could not load sheet tabs (${res.status}).`)
  }
  const text = await res.text()
  if (!text.trim() || looksLikeLoginHtml(text)) {
    throw new Error('Could not read sheet tabs from Google Sheets.')
  }
  const tabs = parseSheetTabsFromHtml(text)
  if (!tabs.length) {
    throw new Error('No worksheet tabs were found in this spreadsheet.')
  }
  return tabs
}

/**
 * Fetch one worksheet tab as CSV via the Vite proxy.
 */
export async function fetchSpreadsheetCsv(options = {}) {
  const gid = options.gid ?? SPREADSHEET.gid
  const id = options.id ?? SPREADSHEET.id
  const url = sheetCsvUrl({ id, gid })
  const res = await fetch(url, { credentials: 'omit' })

  if (!res.ok) {
    throw new Error(`Sheet fetch failed (${res.status}).`)
  }

  const text = await res.text()
  if (!text.trim() || looksLikeLoginHtml(text)) {
    throw new Error('Could not download sheet data from Google Sheets.')
  }

  const parsed = csvToObjects(text)
  if (!parsed.headers.length) {
    throw new Error('Sheet downloaded but no header row was found.')
  }

  return {
    ...parsed,
    fetchedAt: new Date().toISOString(),
    source: { ...SPREADSHEET, id, gid },
  }
}
