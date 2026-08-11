/**
 * Minimal CSV parser (handles quoted fields and newlines inside quotes / Alt+Enter).
 */

export function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let i = 0
  let inQuotes = false

  const pushCell = () => {
    row.push(cell)
    cell = ''
  }
  const pushRow = () => {
    if (row.length === 1 && row[0] === '' && rows.length > 0) {
      row = []
      return
    }
    rows.push(row)
    row = []
  }

  while (i < text.length) {
    const ch = text[i]
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"'
          i += 2
          continue
        }
        inQuotes = false
        i += 1
        continue
      }
      cell += ch
      i += 1
      continue
    }

    if (ch === '"') {
      inQuotes = true
      i += 1
      continue
    }
    if (ch === ',') {
      pushCell()
      i += 1
      continue
    }
    if (ch === '\r') {
      i += 1
      continue
    }
    if (ch === '\n') {
      pushCell()
      pushRow()
      i += 1
      continue
    }
    cell += ch
    i += 1
  }

  if (cell.length || row.length) {
    pushCell()
    pushRow()
  }

  return rows
}

/**
 * Google Sheets puts a merged header label only in the first cell and leaves
 * the rest blank. Carry the label across, then uniquify so object keys don't collide.
 */
export function resolveMergedHeaders(rawHeaders) {
  let last = ''
  const seen = new Map()
  return rawHeaders.map((raw, idx) => {
    const trimmed = String(raw ?? '').trim()
    let label = trimmed
    if (!label) {
      label = last || `Column ${idx + 1}`
    } else {
      last = label
    }
    const count = (seen.get(label) || 0) + 1
    seen.set(label, count)
    return count === 1 ? label : `${label} (${count})`
  })
}

/** Trim only outer whitespace; keep Alt+Enter newlines inside the cell. */
export function normalizeCellText(value) {
  if (value == null) return ''
  return String(value).replace(/^\s+|\s+$/g, '')
}

/**
 * Vertical merges export as value + blank rows beneath.
 * Only fill blanks when the row looks like a continuation (empty first column,
 * usually Sl. no) so we don't copy Gate values onto the next company.
 */
export function forwardFillMergedCells(headers, rows) {
  if (!headers.length) return rows
  const idCol = headers[0]
  const last = Object.fromEntries(headers.map((h) => [h, '']))

  return rows.map((row) => {
    const next = { ...row }
    const isContinuation = normalizeCellText(next[idCol]) === ''

    for (const h of headers) {
      const v = normalizeCellText(next[h])
      if (v === '') {
        if (isContinuation && last[h]) next[h] = last[h]
      } else {
        next[h] = v
      }
    }

    if (isContinuation) {
      for (const h of headers) {
        const v = normalizeCellText(next[h])
        if (v) last[h] = v
      }
    } else {
      for (const h of headers) {
        last[h] = normalizeCellText(next[h])
      }
    }

    return next
  })
}

/** First non-empty row = headers; remaining rows → objects. */
export function csvToObjects(text, { fillMerged = true } = {}) {
  const matrix = parseCsv(text)
  if (!matrix.length) return { headers: [], rows: [], rawHeaders: [] }

  let headerIndex = 0
  while (headerIndex < matrix.length && matrix[headerIndex].every((c) => !String(c).trim())) {
    headerIndex += 1
  }
  if (headerIndex >= matrix.length) return { headers: [], rows: [], rawHeaders: [] }

  const rawHeaders = matrix[headerIndex].map((h) => String(h ?? ''))
  const headers = resolveMergedHeaders(rawHeaders)
  const data = []

  for (let r = headerIndex + 1; r < matrix.length; r++) {
    const cells = matrix[r]
    if (!cells || cells.every((c) => !normalizeCellText(c))) continue
    const obj = {}
    headers.forEach((h, idx) => {
      obj[h] = normalizeCellText(cells[idx])
    })
    data.push(obj)
  }

  return {
    rawHeaders,
    headers,
    rows: fillMerged ? forwardFillMergedCells(headers, data) : data,
  }
}
