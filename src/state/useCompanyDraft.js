import { useCallback, useMemo, useRef, useState } from 'react'
import { useWorkspace } from './WorkspaceContext'

/**
 * Edit buffer for one company.
 *
 * The draft is a deep copy of the saved record, so nothing the researcher types
 * reaches the rest of the app until Save. Cancel throws the buffer away; Reset
 * restores the original sheet 108 values.
 *
 * `update(path, value)` writes with a dotted path, e.g.
 *   update('funding.type', 'Seed')
 *   update('team.2.count', 12)
 */

let seq = 0
/** Stable id for rows the researcher adds in this session. */
export function newId(prefix) {
  seq += 1
  return `${prefix}-new-${seq}`
}

function stripDerived(company) {
  const { derived, ...rest } = company
  return structuredClone(rest)
}

function setPath(object, path, value) {
  const keys = String(path).split('.')
  const clone = Array.isArray(object) ? [...object] : { ...object }
  let cursor = clone
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const next = cursor[key]
    cursor[key] = Array.isArray(next) ? [...next] : { ...next }
    cursor = cursor[key]
  }
  cursor[keys[keys.length - 1]] = value
  return clone
}

export function getPath(object, path) {
  return String(path)
    .split('.')
    .reduce((acc, key) => (acc == null ? acc : acc[key]), object)
}

export function useCompanyDraft(company, startInEditMode = false) {
  const { saveCompany, resetCompanyToSource } = useWorkspace()

  const [draft, setDraft] = useState(() => stripDerived(company))
  const [isEditing, setIsEditing] = useState(startInEditMode)
  const baseline = useRef(JSON.stringify(stripDerived(company)))

  // A saved record replaces the baseline; a company switch reloads the buffer.
  const syncTo = useCallback((next) => {
    const plain = stripDerived(next)
    setDraft(plain)
    baseline.current = JSON.stringify(plain)
  }, [])

  const update = useCallback((path, value) => {
    setDraft((d) => setPath(d, path, value))
  }, [])

  /** Append an item to a repeatable list and return the updated draft. */
  const addItem = useCallback((path, item) => {
    setDraft((d) => setPath(d, path, [...(getPath(d, path) ?? []), item]))
  }, [])

  const removeItem = useCallback((path, index) => {
    setDraft((d) =>
      setPath(
        d,
        path,
        (getPath(d, path) ?? []).filter((_, i) => i !== index),
      ),
    )
  }, [])

  const isDirty = useMemo(
    () => JSON.stringify(draft) !== baseline.current,
    [draft],
  )

  const startEditing = useCallback(() => setIsEditing(true), [])

  const save = useCallback(
    (override) => {
      const payload = override ?? draft
      const saved = saveCompany(payload)
      const plain = stripDerived(saved)
      setDraft(plain)
      baseline.current = JSON.stringify(plain)
      setIsEditing(false)
      return saved
    },
    [draft, saveCompany],
  )

  /** Cancel: drop the buffer, keep whatever was last saved. */
  const cancel = useCallback(() => {
    setDraft(JSON.parse(baseline.current))
    setIsEditing(false)
  }, [])

  /** Reset: discard saved edits too and go back to the source sheet values. */
  const resetToSource = useCallback(() => {
    const seed = resetCompanyToSource(draft.id)
    if (seed) syncTo(seed)
    return seed
  }, [draft.id, resetCompanyToSource, syncTo])

  return {
    draft,
    setDraft,
    update,
    addItem,
    removeItem,
    isDirty,
    isEditing,
    startEditing,
    save,
    cancel,
    resetToSource,
    syncTo,
  }
}
