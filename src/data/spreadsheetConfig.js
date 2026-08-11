/** Hard-coded Google workbook used by the Spreadsheet page. */
export const SPREADSHEET = {
  id: '1yKxImTrrBPkcfxp8IEm5ZJ79yURBjTn8i_0seps6Das',
  /** Default tab (7/8) — user can switch in the UI. */
  gid: '105472673',
  editUrl:
    'https://docs.google.com/spreadsheets/d/1yKxImTrrBPkcfxp8IEm5ZJ79yURBjTn8i_0seps6Das/edit?gid=105472673#gid=105472673',
  title: 'Market Intelligence',
}

/** Same-origin proxy → Google CSV (works in Vite dev + Vercel). */
export function sheetCsvUrl({ id = SPREADSHEET.id, gid = SPREADSHEET.gid } = {}) {
  const q = new URLSearchParams({ id, gid, mode: 'csv' })
  return `/api/sheets?${q}`
}

export function sheetHtmlViewUrl({ id = SPREADSHEET.id } = {}) {
  const q = new URLSearchParams({ id, mode: 'htmlview' })
  return `/api/sheets?${q}`
}

export function sheetEditUrl({ id = SPREADSHEET.id, gid = SPREADSHEET.gid } = {}) {
  return `https://docs.google.com/spreadsheets/d/${id}/edit?gid=${gid}#gid=${gid}`
}
