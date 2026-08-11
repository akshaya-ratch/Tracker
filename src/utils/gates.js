/**
 * Gate definitions for the Ratch research workflow.
 *
 * `researchFields` lists what a researcher still has to collect for a gate that
 * has not been evaluated. These map 1:1 to the columns of the 108 sheet, so the
 * checklist stays honest about what work remains.
 *
 * Gates 0–1 are elimination rounds; gates 2–5 are subjective assessments.
 */

export const GATES = [
  {
    key: 'gate0',
    index: 0,
    name: 'Gate 0',
    title: 'Funding & Qualification',
    description:
      'Is this a company Ratch should look at at all — funding type, amount, agenda and investors.',
    phase: 'elimination',
    researchFields: [
      'Funding type',
      'Funding amount',
      'Funding date',
      'Funding agenda',
      'Investors',
      'Funding remarks',
    ],
  },
  {
    key: 'gate1',
    index: 1,
    name: 'Gate 1',
    title: 'Growth + Hiring',
    description:
      'Is the company growing and actively hiring, with an engineering-weighted team.',
    phase: 'elimination',
    researchFields: [
      'Open roles',
      'Employees',
      'Team composition',
      'HR / TA',
      'Engineering density',
      'TA %',
      'Employee growth',
    ],
  },
  {
    key: 'gate2',
    index: 2,
    name: 'Gate 2',
    title: 'Hiring Pain Signals',
    description:
      'Is hiring actually painful for them — the signal Ratch sells against.',
    phase: 'subjective',
    researchFields: [
      'Hiring urgency signal',
      'JD duplication',
      'External talent partner',
      'Hiring manager',
      'Hiring badge',
    ],
  },
  {
    key: 'gate3',
    index: 3,
    name: 'Gate 3',
    title: 'Business / PMF',
    description: 'Coming next.',
    phase: 'subjective',
    researchFields: [],
  },
  {
    key: 'gate4',
    index: 4,
    name: 'Gate 4',
    title: 'Decision Maker',
    description: 'Coming next.',
    phase: 'subjective',
    researchFields: [],
  },
  {
    key: 'gate5',
    index: 5,
    name: 'Gate 5',
    title: 'Outreach',
    description: 'Coming next.',
    phase: 'subjective',
    researchFields: [],
  },
]

export const GATE_BY_KEY = Object.fromEntries(GATES.map((g) => [g.key, g]))

export const FUNDING_TYPES = [
  'Pre-seed',
  'Seed',
  'Angel / AJVC',
  'Pre-Series A',
  'Series A',
  'Pre-Series B',
  'Series B',
  'Series C',
  'Series D+',
  'Growth / Late stage',
  'IPO',
  'Bootstrapped',
  'Other',
]

export const JOB_STATUS_OPTIONS = [
  { value: 'open', label: 'Open / still accepting' },
  { value: 'closed', label: 'Closed' },
  { value: 'paused', label: 'Paused' },
  { value: 'unknown', label: 'Unknown' },
]

export const HR_TA_ROLES = [
  { value: 'HR', label: 'HR' },
  { value: 'TA', label: 'TA' },
]

export const HIRING_MANAGER_TYPES = [
  { value: 'TA', label: 'TA' },
  { value: 'HR', label: 'HR' },
  { value: 'founder', label: 'Founder' },
  { value: 'lead', label: 'Lead' },
  { value: 'other', label: 'Other' },
]

export const YES_NO = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

/**
 * The gate status vocabulary.
 * PASS green · FAIL red · REVIEW blue · NOT EVALUATED gray.
 * `unknown` is kept as an alias for records parsed from an unrecognised cell.
 */
export const GATE_RESULT = {
  pass: { label: 'Pass', color: 'green' },
  fail: { label: 'Fail', color: 'red' },
  review: { label: 'In review', color: 'blue' },
  unknown: { label: 'In review', color: 'blue' },
  not_evaluated: { label: 'Not yet evaluated', color: 'gray' },
}

/** Statuses that count as a recorded outcome. */
export const EVALUATED_RESULTS = ['pass', 'fail', 'review', 'unknown']

/** Aggregate gate stats across the whole dataset - drives the pipeline + KPIs. */
export function gateStats(companies, gateKey) {
  const results = companies.map((c) => c.gates[gateKey]?.result ?? 'not_evaluated')
  const evaluated = results.filter((r) => r !== 'not_evaluated')
  return {
    total: companies.length,
    evaluated: evaluated.length,
    passed: results.filter((r) => r === 'pass').length,
    failed: results.filter((r) => r === 'fail').length,
    inReview: results.filter((r) => r === 'review' || r === 'unknown').length,
    notEvaluated: results.filter((r) => r === 'not_evaluated').length,
    started: evaluated.length > 0,
  }
}

/**
 * Companies eligible to enter a gate: they passed everything before it.
 * Gate 2's queue is what "ready for research" means on the dashboard.
 */
export function eligibleFor(companies, gateIndex) {
  return companies.filter((c) =>
    GATES.slice(0, gateIndex).every((g) => c.gates[g.key]?.result === 'pass'),
  )
}
