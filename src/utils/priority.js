/**
 * PROTOTYPE PRIORITY
 * ------------------
 * A transparent, frontend-only heuristic so the researcher can order the queue.
 * This is NOT Ratch's scoring algorithm - it exists to make the table sortable
 * against something defensible, and every contribution is shown in the UI.
 *
 * To replace it later: swap `scoreCompany` for a server-computed field. Nothing
 * else in the app reads these weights.
 */

import {
  engineeringDensity,
  freshestListingDays,
  hasActiveListing,
  hasApplicantSignal,
  hasHiringBadge,
} from './calculations'

export const PRIORITY_LEVELS = {
  high: { label: 'High', color: 'green' },
  medium: { label: 'Medium', color: 'orange' },
  low: { label: 'Low', color: 'gray' },
  needs_research: { label: 'Needs Research', color: 'purple' },
}

/** Ordering used by the table sorter. */
export const PRIORITY_RANK = { high: 4, medium: 3, needs_research: 2, low: 1 }

const WEIGHTS = {
  gate0Pass: 10,
  gate1Pass: 25,
  openRoles: 20, // scaled by role count, capped
  freshListing: 15,
  applicantSignal: 10,
  engDensity: 15, // scaled by density
  hiringBadge: 8,
  taGap: 7, // hiring, but no talent-acquisition function = likely pain
}

export function scoreCompany(company) {
  const contributions = []
  const add = (label, points, detail) => {
    if (points > 0) contributions.push({ label, points: Math.round(points), detail })
  }

  const { gate0, gate1 } = company.gates

  if (gate0.result === 'pass') add('Gate 0 passed', WEIGHTS.gate0Pass, 'Qualified company')
  if (gate1.result === 'pass') {
    add('Gate 1 passed', WEIGHTS.gate1Pass, 'Growth + hiring cleared')
  }

  const roles = company.openRoles?.atLeast ?? 0
  if (roles > 0) {
    add(
      'Open roles',
      Math.min(roles / 8, 1) * WEIGHTS.openRoles,
      `At least ${roles} role${roles === 1 ? '' : 's'} observed`,
    )
  }

  const fresh = freshestListingDays(company)
  if (fresh != null && fresh <= 30) {
    add(
      'Recent listing activity',
      (1 - fresh / 30) * WEIGHTS.freshListing,
      `Freshest listing ~${fresh} day${fresh === 1 ? '' : 's'} old`,
    )
  }

  if (hasApplicantSignal(company)) {
    add('Applicant volume observed', WEIGHTS.applicantSignal, 'Applicant counts recorded')
  }
  if (hasActiveListing(company)) {
    add('Listings still accepting', 4, 'At least one listing is open')
  }

  const density = engineeringDensity(company)
  const d = density.calculated ?? density.source
  if (d != null && d > 0) {
    add(
      'Engineering density',
      Math.min(d / 0.4, 1) * WEIGHTS.engDensity,
      `${(d * 100).toFixed(1)}% engineering`,
    )
  }

  if (hasHiringBadge(company)) {
    add('LinkedIn hiring badge', WEIGHTS.hiringBadge, 'Active recruiter signal')
  }

  const { count: hrCount } = company.hr
  const { count: taCount } = company.ta
  if (roles > 0 && taCount === 0) {
    add(
      'Hiring without a TA function',
      WEIGHTS.taGap,
      hrCount ? `${hrCount} HR, no dedicated TA` : 'No dedicated talent acquisition',
    )
  }

  const total = contributions.reduce((sum, c) => sum + c.points, 0)

  // Coverage: do we know enough about this company to trust the score at all?
  const knownSignals = [
    company.employees?.reported != null || company.team.length > 0,
    company.team.length > 0,
    company.hiring.jobs.length > 0 || company.hiring.notes.length > 0,
    company.hr.sourceNote != null,
    company.engDensity.value != null,
  ]
  const coverage = knownSignals.filter(Boolean).length / knownSignals.length

  return { total, contributions, coverage }
}

export function priorityFor(company) {
  const { total, contributions, coverage } = scoreCompany(company)
  const { gate0, gate1 } = company.gates

  let level
  if (gate0.result === 'fail') {
    level = 'low'
  } else if (coverage < 0.5 && gate1.result !== 'pass') {
    // Not enough was researched to rank it - say so instead of scoring it low.
    level = 'needs_research'
  } else if (gate1.result === 'pass' && total >= 65) {
    level = 'high'
  } else if (gate1.result === 'pass' || total >= 45) {
    level = 'medium'
  } else {
    level = 'low'
  }

  return {
    level,
    ...PRIORITY_LEVELS[level],
    score: total,
    coverage,
    contributions,
  }
}
