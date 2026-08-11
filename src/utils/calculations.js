/**
 * Derived metrics computed from the normalized company record.
 *
 * Everything here is a pure function of `company` so it can move server-side
 * (or into a Supabase view) without touching a component.
 */

export const MISSING = 'Not available'
export const NEEDS_VERIFICATION = 'Needs verification'
export const NOT_RESEARCHED = 'Not yet researched'

/** Sum of the LinkedIn-style team breakdown, or null when none was captured. */
export function teamTotal(company) {
  if (!company.team?.length) return null
  return company.team.reduce((sum, t) => sum + t.count, 0)
}

/**
 * Engineers on the team. A recorded breakdown with no engineering function is a
 * genuine zero; no breakdown at all is unknown (null), not zero.
 */
export function engineeringHeadcount(company) {
  if (!company.team?.length) return null
  const eng = company.team.find((t) => /engineer/i.test(t.function))
  return eng ? eng.count : 0
}

/** Headcount we trust most: the reported number, else the team breakdown total. */
export function effectiveHeadcount(company) {
  return company.employees?.reported ?? teamTotal(company)
}

/**
 * Engineering density, computed two ways because the sheet is ambiguous about
 * which denominator was used. Both are returned so the UI can show the conflict
 * rather than silently picking a winner.
 */
export function engineeringDensity(company) {
  const eng = engineeringHeadcount(company)
  const team = teamTotal(company)
  const reported = company.employees?.reported ?? null

  const onTeam = eng != null && team ? eng / team : null
  const onReported = eng != null && reported ? eng / reported : null
  const source = company.engDensity?.value ?? null

  // The sheet value is compared against the reported-headcount basis, which is
  // the definition Ratch's Gate 1 note describes.
  const calculated = onReported ?? onTeam
  const basis = onReported != null ? 'reported headcount' : 'team breakdown total'

  const conflict =
    source != null && calculated != null && Math.abs(source - calculated) > 0.02

  return {
    source,
    sourceRaw: company.engDensity?.raw ?? null,
    calculated,
    calculatedOnTeam: onTeam,
    calculatedOnReported: onReported,
    basis,
    conflict,
    engineeringHeadcount: eng,
    teamTotal: team,
    reported,
  }
}

/** Count of hiring signals actually observed in the sheet. */
export function hiringSignalCount(company) {
  return company.hiring?.groups?.length ?? 0
}

/** Distinct job boards / sources the roles were seen on. */
export function hiringSources(company) {
  const seen = new Map()
  for (const g of company.hiring?.groups ?? []) {
    if (!g.source) continue
    const key = g.source.toLowerCase().replace(/\s+/g, '')
    if (!seen.has(key)) seen.set(key, g.source)
  }
  return [...seen.values()]
}

/**
 * Freshness of the most recent listing, parsed from free text like
 * "1 week ago" / "2 mo ago". Returns days, or null when unparseable.
 */
export function freshnessInDays(text) {
  if (!text) return null
  const t = text.toLowerCase()
  if (/\btdy\b|today/.test(t)) return 0
  const matches = [...t.matchAll(/(\d+)\s*\+?\s*(d|day|days|w|week|weeks|m|mo|month|months|y|year|years)\b/g)]
  if (!matches.length) return null
  const days = matches.map(([, n, unit]) => {
    const v = Number(n)
    if (/^d/.test(unit)) return v
    if (/^w/.test(unit)) return v * 7
    if (/^y/.test(unit)) return v * 365
    return v * 30 // m / mo / month
  })
  return Math.min(...days)
}

/** Freshest listing across every hiring group. */
export function freshestListingDays(company) {
  const values = (company.hiring?.groups ?? [])
    .map((g) => freshnessInDays(g.recency))
    .filter((v) => v != null)
  return values.length ? Math.min(...values) : null
}

export function hasApplicantSignal(company) {
  return (company.hiring?.groups ?? []).some((g) => g.applicants)
}

export function hasActiveListing(company) {
  return (company.hiring?.groups ?? []).some((g) => /accept/i.test(g.status ?? ''))
}

export function hasHiringBadge(company) {
  const raw = company.hiring?.hiringBadge?.raw
  return raw ? /^\s*yes/i.test(raw) : null
}

/**
 * Research completion: which of the six gates carry a recorded outcome.
 * Gates 3–5 are unpopulated for every company in the 108 sheet.
 */
export function gateCompletion(company) {
  const gates = ['gate0', 'gate1', 'gate2', 'gate3', 'gate4', 'gate5']
  const evaluated = gates.filter(
    (g) => company.gates?.[g]?.result && company.gates[g].result !== 'not_evaluated',
  )
  return {
    evaluated: evaluated.length,
    total: gates.length,
    percent: Math.round((evaluated.length / gates.length) * 100),
    lastEvaluated: evaluated[evaluated.length - 1] ?? null,
  }
}

/**
 * Which gate the company is currently undergoing (or where it stopped).
 * Walks Gate 0 → 5 and stops at the first non-pass outcome.
 */
export function currentStage(company) {
  const order = [
    { key: 'gate0', index: 0, name: 'Gate 0' },
    { key: 'gate1', index: 1, name: 'Gate 1' },
    { key: 'gate2', index: 2, name: 'Gate 2' },
    { key: 'gate3', index: 3, name: 'Gate 3' },
    { key: 'gate4', index: 4, name: 'Gate 4' },
    { key: 'gate5', index: 5, name: 'Gate 5' },
  ]

  for (const g of order) {
    const result = company.gates?.[g.key]?.result ?? 'not_evaluated'
    if (result === 'fail') {
      return { ...g, result, label: `Stopped at ${g.name}`, undergoing: false }
    }
    if (result === 'review' || result === 'unknown') {
      return { ...g, result, label: `${g.name} · in review`, undergoing: true }
    }
    if (result === 'not_evaluated') {
      return { ...g, result, label: `${g.name} · in progress`, undergoing: true }
    }
  }

  return {
    key: 'gate5',
    index: 5,
    name: 'Gate 5',
    result: 'pass',
    label: 'Passed all gates',
    undergoing: false,
  }
}

/** Whether the company has cleared Gate 5 (outreach). */
export function isOutreachPassed(company) {
  if (company.gates?.gate5?.result === 'pass') return true
  const status = company.outreach?.status
  if (!status) return false
  return /pass|ready|sent|cleared|yes/i.test(String(status))
}

/**
 * TA headcount as a percent of reported employees (0–100), or null when unknown.
 * Prefers ta.people.length when the people array has items; otherwise ta.count.
 */
export function calcTaPercent(company) {
  const employees = company.employees?.reported
  const n = company.ta?.people?.length
    ? company.ta.people.length
    : (company.ta?.count ?? null)
  if (employees == null || employees === 0 || n == null) return null
  return (n / employees) * 100
}

/**
 * Engineering density as a fraction 0–1: eng headcount / reported employees
 * (or team total when reported is missing). Null when the inputs are unknown.
 */
export function calcEngDensity(company) {
  const eng = engineeringHeadcount(company)
  if (eng == null) return null
  const denom = company.employees?.reported ?? teamTotal(company)
  if (denom == null || denom === 0) return null
  return eng / denom
}

export function formatPercent(value, digits = 1) {
  if (value == null || Number.isNaN(value)) return null
  return `${(value * 100).toFixed(digits)}%`
}

export function formatRelativeDays(days) {
  if (days == null) return null
  if (days === 0) return 'Today'
  if (days < 7) return `${days}d ago`
  if (days < 30) return `${Math.round(days / 7)}w ago`
  if (days < 365) return `${Math.round(days / 30)}mo ago`
  return `${(days / 365).toFixed(1)}y ago`
}
