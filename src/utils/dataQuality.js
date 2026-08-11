/**
 * Data-quality detection.
 *
 * A Market Intelligence tool has to surface its own weak spots, so every check
 * here produces a visible flag rather than a silent correction.
 *
 * severity: 'conflict' (two sources disagree) | 'warning' (suspect / ambiguous)
 *           | 'missing' (not researched yet)
 */

import { engineeringDensity, teamTotal } from './calculations'

export const SEVERITY = {
  conflict: { label: 'Source conflict', color: 'red' },
  warning: { label: 'Needs verification', color: 'orange' },
  missing: { label: 'Not available', color: 'gray' },
}

export function auditCompany(company) {
  const issues = []
  const add = (severity, field, title, detail) =>
    issues.push({ severity, field, title, detail })

  const reported = company.employees?.reported ?? null
  const range = company.employees?.range ?? null
  const team = teamTotal(company)

  // --- headcount -----------------------------------------------------------
  if (reported != null && range) {
    if (reported < range.min || reported > range.max) {
      add(
        'conflict',
        'employees',
        'Headcount outside stated range',
        `Sheet records ${reported} employees but the range is "${range.label}".`,
      )
    }
  }

  if (reported != null && team != null && Math.abs(reported - team) > 2) {
    add(
      'conflict',
      'employees',
      'Reported headcount differs from team breakdown',
      `Reported ${reported} vs. ${team} across the recorded team functions ` +
        `(difference of ${Math.abs(reported - team)}).`,
    )
  }

  if (reported == null && team == null) {
    add('missing', 'employees', 'No headcount recorded', 'Neither a reported total nor a team breakdown is present.')
  } else if (reported == null) {
    add(
      'warning',
      'employees',
      'Headcount inferred from team breakdown',
      `No reported total; the team functions sum to ${team}.`,
    )
  }

  // --- engineering density -------------------------------------------------
  const density = engineeringDensity(company)
  if (density.conflict) {
    add(
      'conflict',
      'engDensity',
      'Engineering density does not reconcile',
      `Source value ${(density.source * 100).toFixed(1)}% vs. calculated ` +
        `${(density.calculated * 100).toFixed(1)}% on ${density.basis}.`,
    )
  }
  if (density.source == null) {
    add('missing', 'engDensity', 'Engineering density not recorded', 'No value in the sheet.')
  } else if (company.engDensity.unitAmbiguous) {
    add(
      'warning',
      'engDensity',
      'Density stored as a percentage string',
      `Recorded as "${company.engDensity.raw}" while other rows store a decimal fraction.`,
    )
  }
  if (density.source != null && density.engineeringHeadcount == null) {
    add(
      'warning',
      'engDensity',
      'Density recorded without a team breakdown',
      `Recorded as ${(density.source * 100).toFixed(1)}% but no engineering ` +
        'headcount exists to reproduce it.',
    )
  }

  // --- TA percentage -------------------------------------------------------
  if (company.taPercent?.raw && company.taPercent.unitAmbiguous) {
    add(
      'warning',
      'taPercent',
      'TA % unit is ambiguous',
      `Recorded as "${company.taPercent.raw}"; other rows store a decimal fraction.`,
    )
  }

  // --- HR / TA -------------------------------------------------------------
  const { hr, ta } = company
  const namedPeople = new Set(
    [...hr.people, ...ta.people].map((p) => p.name?.trim().toLowerCase()).filter(Boolean),
  )
  if (hr.count != null && namedPeople.size > 0) {
    const stated = (hr.count ?? 0) + (ta.count ?? 0)
    if (stated > 0 && namedPeople.size !== stated) {
      add(
        'conflict',
        'hrTa',
        'HR / TA count differs from the people named',
        `Recorded as ${stated} but ${namedPeople.size} ${
          namedPeople.size === 1 ? 'person is' : 'people are'
        } named.`,
      )
    }
  }
  if (!hr.sourceNote && hr.count == null && ta.count == null && namedPeople.size === 0) {
    add('missing', 'hrTa', 'HR / TA coverage not researched', 'No HR or TA information recorded.')
  }

  // --- hiring column alignment --------------------------------------------
  const counts = company.hiring.columnCounts ?? {}
  if (counts.roles > 0) {
    const misaligned = ['sources', 'recency', 'applicants', 'status'].filter(
      (k) => counts[k] > 0 && counts[k] !== counts.roles,
    )
    if (misaligned.length) {
      add(
        'warning',
        'hiring',
        'Hiring columns are unevenly filled',
        `${counts.roles} role entries but ${misaligned
          .map((k) => `${counts[k]} ${k}`)
          .join(', ')} - some rows below are matched by position only.`,
      )
    }
  }

  // --- gates ---------------------------------------------------------------
  if (company.gates.gate0.reason) {
    add(
      'warning',
      'gate0',
      'Gate 0 recorded with a caveat',
      `"${company.gates.gate0.raw}"`,
    )
  }
  if (company.gates.gate1.result === 'unknown') {
    add('warning', 'gate1', 'Gate 1 outcome is unclear', `Recorded as "${company.gates.gate1.raw}".`)
  }

  for (const key of ['gate0', 'gate1', 'gate2', 'gate3', 'gate4']) {
    if (company.gates[key].result === 'review') {
      add(
        'warning',
        'gates',
        `Gate ${key.slice(-1)} is in review`,
        company.gates[key].reason ??
          'A decision is still pending — it counts as evaluated but not as passed.',
      )
    }
  }

  const unevaluated = ['gate2', 'gate3', 'gate4'].filter(
    (g) => company.gates[g].result === 'not_evaluated',
  )
  if (unevaluated.length) {
    add(
      'missing',
      'gates',
      `${unevaluated.length} gate${unevaluated.length === 1 ? '' : 's'} not yet evaluated`,
      `${unevaluated.map((g) => `Gate ${g.slice(-1)}`).join(', ')} carry no research yet.`,
    )
  }

  // --- other unpopulated Gate 1 inputs ------------------------------------
  if (!company.hiring.urgency) {
    add('missing', 'hiring', 'Hiring urgency not assessed', 'Gate 1 urgency column is empty for every company in this sheet.')
  }
  if (!company.employeeGrowth) {
    add('missing', 'employeeGrowth', 'Employee growth not recorded', 'The growth column is empty for every company in this sheet.')
  }

  return {
    issues,
    conflicts: issues.filter((i) => i.severity === 'conflict'),
    warnings: issues.filter((i) => i.severity === 'warning'),
    missing: issues.filter((i) => i.severity === 'missing'),
    /** Blocking problems a researcher should resolve before trusting the row. */
    blockingCount: issues.filter((i) => i.severity === 'conflict').length,
  }
}

/** Field-level lookup so a single cell can show its own warning. */
export function issuesForField(audit, field) {
  return audit.issues.filter((i) => i.field === field)
}
