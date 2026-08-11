let entitySeq = 0

/** Stable id for rows the researcher adds (founders, roles, people, etc.). */
export function newEntityId(prefix = 'id') {
  entitySeq += 1
  return `${prefix}-${Date.now().toString(36)}-${entitySeq}`
}

function newFounderId() {
  return newEntityId('founder')
}

function emptyGate() {
  return {
    raw: null,
    result: 'not_evaluated',
    reason: null,
    notes: null,
    evidence: null,
  }
}

function slugify(name) {
  const base = String(name || 'company')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
  return `${base || 'company'}-${Date.now().toString(36)}`
}

/**
 * Build a new company record from the Add Company form.
 * Starts at Gate 0 (not evaluated) with outreach not passed.
 */
export function createCompany({
  name,
  foundedYear,
  linkedin,
  website,
  location,
  founders = [],
}) {
  const id = slugify(name)
  const cleanFounders = founders
    .map((f) => ({
      id: f.id || newFounderId(),
      name: f.name?.trim() || null,
      designation: f.designation?.trim() || null,
      linkedin: f.linkedin?.trim() || null,
    }))
    .filter((f) => f.name)

  const people = cleanFounders.map((f) => ({
    id: f.id,
    name: f.name,
    role: f.designation,
    linkedin: f.linkedin,
    source: 'founder',
  }))

  return {
    id,
    slNo: null,
    name: name.trim(),
    foundedYear: foundedYear == null || foundedYear === '' ? null : Number(foundedYear),
    linkedin: linkedin?.trim() || null,
    website: website?.trim() || null,
    founders: cleanFounders,
    founderNote: null,
    location: location?.trim() || null,
    createdAt: new Date().toISOString(),
    funding: {
      type: null,
      amount: null,
      date: null,
      agenda: null,
      amountRaw: null,
      investors: [],
      remarks: null,
    },
    employees: {
      reported: null,
      range: null,
      raw: null,
    },
    team: [],
    engDensity: { raw: null, value: null, unitAmbiguous: false },
    taPercent: { raw: null, value: null, unitAmbiguous: false },
    employeeGrowth: null,
    hiring: {
      jobs: [],
      notes: [],
      columnCounts: {},
      externalPartners: [],
      urgency: null,
      urgencySignal: null,
      jdDuplication: null,
      reposts: null,
      externalTalentPartner: { present: null, name: null },
      hiringManager: { type: null, name: null, personId: null },
      hiringBadge: { personId: null, name: null, role: null, linkedin: null },
      panel: null,
      jdAnalysis: null,
      teamAnalysis: null,
      applicantCount: null,
      hiringPain: null,
    },
    hr: { count: null, people: [], sourceNote: null, statedNone: false },
    ta: { count: null, people: [], sourceNote: null, statedNone: false },
    people,
    gates: {
      gate0: emptyGate(),
      gate1: emptyGate(),
      gate2: emptyGate(),
      gate3: emptyGate(),
      gate4: emptyGate(),
      gate5: emptyGate(),
    },
    business: {
      product: null,
      growth: null,
      revenue: null,
      pmf: null,
      publicPerception: null,
      customers: null,
    },
    brief: null,
    decisionMakers: [],
    outreach: {
      status: null,
      message: null,
      channel: null,
      link: null,
    },
    openRoles: { atLeast: 0, exact: false },
    evidence: [],
  }
}

export function emptyFounder() {
  return {
    id: newFounderId(),
    name: '',
    designation: '',
    linkedin: '',
  }
}

export function emptyOpenRole() {
  return {
    id: newEntityId('job'),
    title: '',
    sourceName: '',
    sourceLink: '',
    postedAt: '',
    applicants: '',
    status: '',
    remarks: '',
  }
}

export function emptyTeamRow() {
  return {
    id: newEntityId('team'),
    function: '',
    count: null,
  }
}

export function emptyHrTaPerson() {
  return {
    id: newEntityId('hrta'),
    role: 'HR',
    name: '',
    linkedin: '',
  }
}

export function emptyInvestor() {
  return {
    id: newEntityId('investor'),
    name: '',
  }
}
