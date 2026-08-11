/**
 * Map spreadsheet columns → our existing company schema.
 * Does NOT rename app fields / gate keys — only reads flexible sheet headers.
 */

import { createCompany, newEntityId } from './createCompany'

function norm(header) {
  return String(header || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

/** Pick first matching header value from a row. */
function pick(row, aliases) {
  const entries = Object.entries(row)
  for (const alias of aliases) {
    const want = norm(alias)
    for (const [key, value] of entries) {
      if (norm(key) === want && value != null && String(value).trim() !== '') {
        return String(value).trim()
      }
    }
  }
  // Loose contains match (e.g. "Company Name *" → company name)
  for (const alias of aliases) {
    const want = norm(alias)
    for (const [key, value] of entries) {
      const k = norm(key)
      if ((k === want || k.includes(want) || want.includes(k)) && value != null && String(value).trim() !== '') {
        return String(value).trim()
      }
    }
  }
  return null
}

function splitList(value) {
  if (!value) return []
  return String(value)
    .split(/[\n;|]+/)
    .map((s) => s.replace(/^[\s\d.]+/, '').trim())
    .filter(Boolean)
}

function parseGateResult(raw) {
  if (raw == null || String(raw).trim() === '') {
    return { result: 'not_evaluated', reason: null, raw: null }
  }
  const text = String(raw).trim()
  const lower = text.toLowerCase()
  let result = 'not_evaluated'
  if (/^pass\b/.test(lower) || lower === 'yes') result = 'pass'
  else if (/^fail\b/.test(lower) || lower === 'no') result = 'fail'
  else if (/review|unknown|maybe/.test(lower)) result = 'review'

  const reasonMatch = text.match(/,\s*(.+)$/)
  return {
    raw: text,
    result,
    reason: reasonMatch ? reasonMatch[1].trim() : null,
    notes: null,
    evidence: null,
  }
}

function parseYear(value) {
  if (value == null || value === '') return null
  const n = Number(String(value).replace(/[^\d]/g, '').slice(0, 4))
  return Number.isFinite(n) && n > 1800 ? n : null
}

function parseEmployees(value) {
  if (value == null || value === '') return null
  const n = Number(String(value).replace(/[^\d.]/g, ''))
  return Number.isFinite(n) ? Math.round(n) : null
}

/**
 * Convert one spreadsheet row into a full company record (our schema).
 * Unknown / unmapped columns are ignored — gates & field names stay unchanged.
 */
export function mapSheetRowToCompany(row, index = 0) {
  const name = pick(row, ['company name', 'company', 'name', 'startup', 'org'])
  if (!name) return null

  const foundedYear = parseYear(
    pick(row, ['founded year', 'founded', 'year founded', 'year']),
  )
  const linkedin = pick(row, ['company linkedin', 'linkedin', 'linkedin url', 'li'])
  const website = pick(row, ['company website', 'website', 'url', 'site', 'web'])
  const location = pick(row, ['location', 'city', 'hq', 'headquarters'])

  const founderRaw = pick(row, ['founders', 'founder', 'founder names'])
  const founders = splitList(founderRaw).map((n) => ({
    id: newEntityId('founder'),
    name: n,
    designation: null,
    linkedin: null,
  }))

  const base = createCompany({
    name,
    foundedYear,
    linkedin,
    website,
    location,
    founders,
  })

  // Stable-ish id from name so re-fetch upserts cleanly
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
  base.id = `sheet-${slug || index}`
  base.slNo = index + 1
  base.sourceSheetRow = index + 1

  const fundingType = pick(row, ['funding type', 'funding stage', 'stage', 'round'])
  const fundingAmount = pick(row, ['funding amount', 'amount raised', 'amount', 'raised'])
  const fundingDate = pick(row, ['funding date', 'date raised', 'round date'])
  const fundingAgenda = pick(row, ['funding agenda', 'agenda', 'use of funds'])
  const investorsRaw = pick(row, ['investors', 'investor', 'investor names'])
  const fundingRemarks = pick(row, ['funding remarks', 'funding notes', 'remarks'])

  base.funding = {
    ...base.funding,
    type: fundingType,
    amount: fundingAmount,
    date: fundingDate,
    agenda: fundingAgenda,
    amountRaw: fundingAmount,
    investors: splitList(investorsRaw).map((n) => ({ id: newEntityId('investor'), name: n })),
    remarks: fundingRemarks,
  }

  const employees = parseEmployees(
    pick(row, ['employees', 'employee count', 'headcount', 'employee']),
  )
  if (employees != null) {
    base.employees = { ...base.employees, reported: employees, raw: String(employees) }
  }

  base.employeeGrowth = pick(row, ['employee growth', 'growth', 'headcount growth'])

  const teamRaw = pick(row, ['team composition', 'team', 'team breakdown'])
  if (teamRaw) {
    // "Engineering 24, Sales 6" or "Engineering: 24"
    const parts = String(teamRaw).split(/[,;\n]+/).map((s) => s.trim()).filter(Boolean)
    base.team = parts
      .map((part) => {
        const m = part.match(/^(.+?)\s*[:=-]?\s*(\d+)\s*$/)
        if (!m) return null
        return {
          id: newEntityId('team'),
          function: m[1].trim(),
          count: Number(m[2]),
        }
      })
      .filter(Boolean)
  }

  const openRolesHint = pick(row, ['open roles', 'roles', 'jobs', 'openings'])
  if (openRolesHint) {
    const n = parseEmployees(openRolesHint)
    if (n != null) base.openRoles = { atLeast: n, exact: false }
  }

  const gate0 = parseGateResult(pick(row, ['gate 0', 'gate0', 'gate 0 status', 'g0']))
  const gate1 = parseGateResult(pick(row, ['gate 1', 'gate1', 'gate 1 status', 'g1']))
  const gate2 = parseGateResult(pick(row, ['gate 2', 'gate2', 'gate 2 status', 'g2']))
  const gate3 = parseGateResult(pick(row, ['gate 3', 'gate3', 'gate 3 status', 'g3']))
  const gate4 = parseGateResult(pick(row, ['gate 4', 'gate4', 'gate 4 status', 'g4']))
  const gate5 = parseGateResult(pick(row, ['gate 5', 'gate5', 'gate 5 status', 'g5', 'outreach']))

  base.gates = { gate0, gate1, gate2, gate3, gate4, gate5 }

  const urgency = pick(row, ['hiring urgency', 'urgency', 'hiring urgency signal'])
  if (urgency) {
    base.hiring.urgencySignal = urgency
    base.hiring.urgency = urgency
  }

  const jdDup = pick(row, ['jd duplication', 'jd dup'])
  if (jdDup) {
    const l = jdDup.toLowerCase()
    base.hiring.jdDuplication = /^y|yes|true|1/.test(l) ? 'yes' : /^n|no|false|0/.test(l) ? 'no' : null
  }

  return base
}

/** Map all sheet rows; drop blanks without a company name. */
export function mapSheetToCompanies(rows) {
  const companies = []
  const skipped = []
  rows.forEach((row, index) => {
    const company = mapSheetRowToCompany(row, index)
    if (company) companies.push(company)
    else skipped.push(index + 1)
  })
  return { companies, skipped }
}
