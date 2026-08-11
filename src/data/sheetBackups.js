/**
 * Local backup / history for spreadsheet syncs.
 * Only meaningful change events are stored (not before/after pairs).
 */

const BACKUP_KEY = 'ratch.sheet.backups.v1'
const MAX_BACKUPS = 25

function stripDerived(list) {
  return (list || []).map(({ derived, ...rest }) => rest)
}

export function loadBackups() {
  try {
    const raw = localStorage.getItem(BACKUP_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveBackups(list) {
  try {
    localStorage.setItem(BACKUP_KEY, JSON.stringify(list.slice(0, MAX_BACKUPS)))
  } catch {
    try {
      localStorage.setItem(BACKUP_KEY, JSON.stringify(list.slice(0, 8)))
    } catch {
      /* ignore */
    }
  }
}

function isNoiseEntry(b) {
  const note = String(b.note || b.title || '').toLowerCase()
  if (/^before fetch$/.test(note.trim())) return true
  if (/^after fetch/.test(note.trim()) && b.kind !== 'sync') return true
  // Old dual-snapshots with no change metadata
  if (!b.added && !b.updated && /before fetch|no changes recorded/i.test(note)) return true
  return false
}

/** History list for the UI — only real change events (+ safety copies). */
export function listHistoryEntries() {
  return loadBackups().filter((b) => {
    if (isNoiseEntry(b)) return false
    if (b.kind === 'safety') return true
    if (b.kind === 'sync') return (b.added ?? 0) > 0 || (b.updated ?? 0) > 0
    // Legacy: keep if it recorded adds/updates
    return (b.added ?? 0) > 0 || (b.updated ?? 0) > 0
  })
}

function buildSyncCopy({ tabName, added, updated, beforeCount, afterCount }) {
  const sheet = tabName ? `“${tabName}”` : 'Excel'
  const changeBits = []
  if (added > 0) changeBits.push(`+${added} new`)
  if (updated > 0) {
    changeBits.push(
      `${updated} compan${updated === 1 ? 'y' : 'ies'} had field changes`,
    )
  }

  let summary
  if (added > 0 && updated > 0) {
    summary = changeBits.join(' · ')
  } else if (added > 0) {
    summary = `${added} new compan${added === 1 ? 'y' : 'ies'} inserted from Excel`
  } else {
    summary = `${updated} existing compan${updated === 1 ? 'y' : 'ies'} had Excel field changes (same total count is normal)`
  }

  return {
    title:
      added > 0 && updated > 0
        ? `Excel sync · ${sheet}`
        : added > 0
          ? `New companies · ${sheet}`
          : `Field changes · ${sheet}`,
    summary,
    hint:
      beforeCount === afterCount && updated > 0
        ? `Still ${afterCount} companies · fields changed on ${updated}. Undo restores previous values.`
        : `Before: ${beforeCount} → After: ${afterCount}. Undo restores the before state.`,
  }
}

/**
 * Save ONE history entry when Excel actually changed something.
 * `companies` snapshot = previous state (what Undo restores).
 * Returns null if nothing changed (no history row).
 */
export function createSyncBackup({
  companiesBefore,
  tabName,
  gid,
  rowCount,
  added = 0,
  updated = 0,
  companyCountAfter = 0,
}) {
  if (added <= 0 && updated <= 0) return null

  const beforeCount = companiesBefore?.length ?? 0
  const copy = buildSyncCopy({
    tabName,
    added,
    updated,
    beforeCount,
    afterCount: companyCountAfter,
  })

  const entry = {
    id: `bak-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
    kind: 'sync',
    tabName: tabName ?? null,
    gid: gid ?? null,
    companyCount: beforeCount,
    companyCountAfter,
    rowCount: rowCount ?? null,
    added,
    updated,
    title: copy.title,
    summary: copy.summary,
    hint: copy.hint,
    note: copy.title,
    companies: stripDerived(companiesBefore),
  }

  // Drop legacy noise while saving
  const cleaned = [entry, ...loadBackups().filter((b) => !isNoiseEntry(b))].slice(
    0,
    MAX_BACKUPS,
  )
  saveBackups(cleaned)
  return entry
}

export function createRestorePointBackup({ companies, label }) {
  const entry = {
    id: `bak-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
    kind: 'safety',
    tabName: null,
    gid: null,
    companyCount: companies?.length ?? 0,
    companyCountAfter: companies?.length ?? 0,
    rowCount: null,
    added: 0,
    updated: 0,
    title: 'Saved before undo',
    summary: label ? `Checkpoint before undoing “${label}”` : 'Checkpoint before undo',
    hint: `Had ${companies?.length ?? 0} companies. Undo this card to go back here.`,
    note: 'Saved before undo',
    companies: stripDerived(companies),
  }
  const cleaned = [entry, ...loadBackups().filter((b) => !isNoiseEntry(b))].slice(
    0,
    MAX_BACKUPS,
  )
  saveBackups(cleaned)
  return entry
}

export function createBackup({ companies, meta = {} }) {
  return createSyncBackup({
    companiesBefore: companies,
    tabName: meta.tabName,
    gid: meta.gid,
    rowCount: meta.rowCount,
    added: meta.added ?? 0,
    updated: meta.updated ?? 0,
    companyCountAfter: companies?.length ?? 0,
  })
}

export function deleteBackup(id) {
  const next = loadBackups().filter((b) => b.id !== id)
  saveBackups(next)
  return listHistoryEntries()
}

export function getBackup(id) {
  return loadBackups().find((b) => b.id === id) ?? null
}
