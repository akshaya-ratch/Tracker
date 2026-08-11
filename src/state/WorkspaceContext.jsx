import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { decorate, getDatasetMeta, getFilterOptions, primaryCity } from '../data/repository'
import { createCompany } from '../data/createCompany'
import { PRIORITY_RANK } from '../utils/priority'

const STORAGE_KEY = 'ratch.companies.v1'

/**
 * Owns the company records and workspace query state.
 * Persists to localStorage as the local "db".
 */

const WorkspaceContext = createContext(null)

export const DEFAULT_FILTERS = {
  gate0: 'all',
  gate1: 'all',
  location: 'all',
  funding: 'all',
  priority: 'all',
  hiringOnly: false,
  conflictsOnly: false,
}

function loadStoredCompanies() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map((c) => decorate(c))
  } catch {
    return []
  }
}

function stripDerivedList(list) {
  return list.map(({ derived, ...rest }) => rest)
}

function founderHaystack(founders = []) {
  return founders.flatMap((f) => {
    if (typeof f === 'string') return [f]
    return [f?.name, f?.designation, f?.linkedin].filter(Boolean)
  })
}

function matchesQuery(company, q) {
  if (!q) return true
  const needle = q.toLowerCase()
  const haystack = [
    company.name,
    company.location,
    company.linkedin,
    company.website,
    company.funding?.type,
    company.funding?.amount,
    ...founderHaystack(company.founders),
    ...(company.funding?.investors ?? []).map((inv) =>
      typeof inv === 'string' ? inv : inv?.name,
    ),
    ...(company.team ?? []).map((t) => t.function),
    ...(company.hiring?.jobs ?? []).flatMap((g) => [g.title, g.roles, g.source, g.sourceName]),
  ]
  return haystack.some((v) => v && String(v).toLowerCase().includes(needle))
}

function matchesFilters(company, filters) {
  if (filters.gate0 !== 'all' && company.gates.gate0.result !== filters.gate0) return false
  if (filters.gate1 !== 'all' && company.gates.gate1.result !== filters.gate1) return false
  if (filters.location !== 'all' && primaryCity(company.location) !== filters.location) return false
  if (filters.funding !== 'all' && company.funding.type !== filters.funding) return false
  if (filters.priority !== 'all' && company.derived.priority.level !== filters.priority) return false
  if (filters.hiringOnly && (company.openRoles?.atLeast ?? 0) === 0) return false
  if (filters.conflictsOnly && company.derived.audit.conflicts.length === 0) return false
  return true
}

const SORTERS = {
  name: (c) => c.name.toLowerCase(),
  foundedYear: (c) => c.foundedYear,
  createdAt: (c) => (c.createdAt ? Date.parse(c.createdAt) : null),
  location: (c) => primaryCity(c.location)?.toLowerCase(),
  funding: (c) => c.funding?.type?.toLowerCase(),
  employees: (c) => c.derived.headcount,
  openRoles: (c) => c.openRoles?.atLeast ?? null,
  priority: (c) => PRIORITY_RANK[c.derived.priority.level] * 1000 + c.derived.priority.score,
  gate0: (c) => c.gates.gate0.result,
  gate1: (c) => c.gates.gate1.result,
}

export function sortCompanies(list, key, direction) {
  const get = SORTERS[key] ?? SORTERS.createdAt
  const dir = direction === 'asc' ? 1 : -1
  return [...list].sort((a, b) => {
    const av = get(a)
    const bv = get(b)
    if (av == null && bv == null) return 0
    if (av == null) return 1
    if (bv == null) return -1
    if (av === bv) return a.name.localeCompare(b.name)
    return av > bv ? dir : -dir
  })
}

function sameCompany(a, b) {
  if (a.id && b.id && a.id === b.id) return true
  return a.name.trim().toLowerCase() === b.name.trim().toLowerCase()
}

/** Stable fingerprint of research fields — ignores ids, derived, timestamps. */
function sheetFingerprint(company) {
  const founders = (company.founders || [])
    .map((f) => (typeof f === 'string' ? f : f?.name || ''))
    .map((s) => s.trim())
    .filter(Boolean)
    .sort()
  const investors = (company.funding?.investors || [])
    .map((i) => (typeof i === 'string' ? i : i?.name || ''))
    .map((s) => s.trim())
    .filter(Boolean)
    .sort()
  const gates = {}
  for (const key of ['gate0', 'gate1', 'gate2', 'gate3', 'gate4', 'gate5']) {
    const g = company.gates?.[key] || {}
    gates[key] = {
      result: g.result || 'not_evaluated',
      reason: g.reason || null,
      raw: g.raw || null,
      notes: g.notes || null,
    }
  }
  return JSON.stringify({
    name: (company.name || '').trim().toLowerCase(),
    foundedYear: company.foundedYear ?? null,
    linkedin: company.linkedin || null,
    website: company.website || null,
    location: company.location || null,
    founders,
    funding: {
      type: company.funding?.type || null,
      amount: company.funding?.amount || null,
      date: company.funding?.date || null,
      agenda: company.funding?.agenda || null,
      remarks: company.funding?.remarks || null,
      investors,
    },
    employees: company.employees?.reported ?? null,
    employeeGrowth: company.employeeGrowth || null,
    team: (company.team || []).map((t) => ({
      function: t.function || null,
      count: t.count ?? null,
    })),
    gates,
    openRoles: company.openRoles?.atLeast ?? 0,
    hiring: {
      urgencySignal: company.hiring?.urgencySignal || company.hiring?.urgency || null,
      jdDuplication: company.hiring?.jdDuplication || null,
    },
  })
}

function mergeSheetCompanies(existing, incoming) {
  const decoratedIncoming = incoming.map((c) => decorate(c))
  let added = 0
  let updated = 0
  const next = [...existing]
  for (const row of decoratedIncoming) {
    const idx = next.findIndex((c) => sameCompany(c, row))
    if (idx >= 0) {
      const prev = next[idx]
      const merged = decorate({
        ...prev,
        ...row,
        id: prev.id,
        createdAt: prev.createdAt ?? row.createdAt,
        gates: { ...prev.gates, ...row.gates },
        funding: { ...prev.funding, ...row.funding },
        hiring: { ...prev.hiring, ...row.hiring },
      })
      // Only count as updated when research data actually changed
      if (sheetFingerprint(prev) !== sheetFingerprint(merged)) {
        next[idx] = merged
        updated += 1
      }
    } else {
      next.unshift(row)
      added += 1
    }
  }
  return { list: next, added, updated, total: decoratedIncoming.length }
}

export function WorkspaceProvider({ children }) {
  const [companies, setCompanies] = useState(() => loadStoredCompanies())
  const [editedIds, setEditedIds] = useState(() => new Set())
  const [lastSheetSync, setLastSheetSync] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stripDerivedList(companies)))
    } catch {
      // ignore quota / private mode
    }
  }, [companies])

  const meta = useMemo(
    () => ({
      ...getDatasetMeta(),
      companyCount: companies.length,
      note: lastSheetSync
        ? `Last sheet sync ${new Date(lastSheetSync).toLocaleString()}`
        : 'Local db (localStorage). Add companies or Fetch from Spreadsheet.',
    }),
    [companies.length, lastSheetSync],
  )
  const options = useMemo(() => getFilterOptions(companies), [companies])

  const addCompany = useCallback((input) => {
    const decorated = decorate(createCompany(input))
    setCompanies((list) => [decorated, ...list])
    return decorated
  }, [])

  const saveCompany = useCallback((next) => {
    const decorated = decorate(next)
    setCompanies((list) => list.map((c) => (c.id === next.id ? decorated : c)))
    setEditedIds((ids) => new Set(ids).add(next.id))
    return decorated
  }, [])

  /**
   * Autofill / upsert companies from a spreadsheet import.
   * Matching is by id (sheet-*) or company name — existing gate field names stay intact.
   */
  const importCompaniesFromSheet = useCallback((incoming) => {
    let result = { list: [], added: 0, updated: 0, total: 0 }
    setCompanies((list) => {
      result = mergeSheetCompanies(list, incoming)
      if (result.added === 0 && result.updated === 0) return list
      return result.list
    })
    if (result.added > 0 || result.updated > 0) {
      setLastSheetSync(new Date().toISOString())
    }
    return {
      added: result.added,
      updated: result.updated,
      total: result.total,
      companies: result.list,
    }
  }, [])

  /** Replace the whole local db (used by backup restore). */
  const replaceAllCompanies = useCallback((list) => {
    const decorated = (list || []).map((c) => decorate(c))
    setCompanies(decorated)
    setLastSheetSync(new Date().toISOString())
    return decorated.length
  }, [])

  const resetCompanyToSource = useCallback(() => null, [])

  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [sort, setSort] = useState({ key: 'createdAt', direction: 'desc' })

  const setFilter = useCallback((key, value) => {
    setFilters((f) => ({ ...f, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setSearch('')
  }, [])

  const toggleSort = useCallback((key) => {
    setSort((s) =>
      s.key === key
        ? { key, direction: s.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: key === 'name' || key === 'location' ? 'asc' : 'desc' },
    )
  }, [])

  const activeFilterCount = useMemo(
    () => Object.entries(filters).filter(([k, v]) => v !== DEFAULT_FILTERS[k]).length,
    [filters],
  )

  const filtered = useMemo(
    () => companies.filter((c) => matchesQuery(c, search) && matchesFilters(c, filters)),
    [companies, search, filters],
  )

  const visible = useMemo(
    () => sortCompanies(filtered, sort.key, sort.direction),
    [filtered, sort],
  )

  const quickSearch = useCallback(
    (q) => (q.trim() ? companies.filter((c) => matchesQuery(c, q.trim())).slice(0, 8) : []),
    [companies],
  )

  const getCompany = useCallback(
    (id) => companies.find((c) => c.id === id) ?? null,
    [companies],
  )

  const value = {
    companies,
    getCompany,
    addCompany,
    saveCompany,
    importCompaniesFromSheet,
    replaceAllCompanies,
    resetCompanyToSource,
    editedIds,
    meta,
    options,
    lastSheetSync,
    search,
    setSearch,
    filters,
    setFilter,
    setFilters,
    resetFilters,
    activeFilterCount,
    sort,
    toggleSort,
    filtered,
    visible,
    quickSearch,
  }

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext)
  if (!ctx) throw new Error('useWorkspace must be used inside a WorkspaceProvider')
  return ctx
}
