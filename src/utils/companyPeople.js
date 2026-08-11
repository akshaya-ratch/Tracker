/**
 * Selectable people for the hiring-badge picker.
 * Merges founders, HR, TA, the company.people roster, and a custom badge entry.
 */

function pushUnique(out, seen, person) {
  if (!person?.name && !person?.id) return
  const key = person.id || `${person.source}:${String(person.name || '').toLowerCase()}`
  if (seen.has(key)) return
  seen.add(key)
  out.push({
    id: person.id || key,
    name: person.name ?? null,
    role: person.role ?? person.designation ?? null,
    linkedin: person.linkedin ?? null,
    source: person.source ?? 'manual',
  })
}

/** Collect selectable people for hiring badge from founders, hr, ta, and hiring.hiringBadge if custom. */
export function companyPeopleOptions(company) {
  const out = []
  const seen = new Set()

  for (const f of company.founders ?? []) {
    pushUnique(out, seen, {
      id: f.id,
      name: f.name,
      role: f.designation ?? 'Founder',
      linkedin: f.linkedin,
      source: 'founder',
    })
  }

  for (const p of company.hr?.people ?? []) {
    pushUnique(out, seen, {
      id: p.id,
      name: p.name,
      role: p.role ?? p.function ?? 'HR',
      linkedin: p.linkedin,
      source: 'hr',
    })
  }

  for (const p of company.ta?.people ?? []) {
    pushUnique(out, seen, {
      id: p.id,
      name: p.name,
      role: p.role ?? p.function ?? 'TA',
      linkedin: p.linkedin,
      source: 'ta',
    })
  }

  for (const p of company.people ?? []) {
    pushUnique(out, seen, p)
  }

  const badge = company.hiring?.hiringBadge
  if (badge && (badge.name || badge.personId) && badge.personId === 'manual') {
    pushUnique(out, seen, {
      id: 'manual',
      name: badge.name,
      role: badge.role,
      linkedin: badge.linkedin,
      source: 'manual',
    })
  }

  return out
}
