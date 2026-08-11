/**
 * DATA ACCESS BOUNDARY
 * --------------------
 * Every component reads companies through this module - never from the raw data
 * file. Swapping the prototype's local array for Supabase (or any API) means
 * changing only the four functions below; component code is unaffected.
 *
 * The functions are intentionally synchronous: the prototype has no backend, so
 * it must not pretend to fetch. When a real source is wired in, make these async
 * and add a `useCompanies()` hook around them.
 */

import { companies as rawCompanies, datasetMeta } from './marketIntelligence'
import { priorityFor } from '../utils/priority'
import { auditCompany } from '../utils/dataQuality'
import { engineeringDensity, effectiveHeadcount, gateCompletion } from '../utils/calculations'

/**
 * Attaches the derived, UI-only fields to a stored company record.
 * Exported because the workspace re-runs it after every save, so calculated
 * metrics, data-quality flags and priority stay in sync with edits.
 */
export function decorate(company) {
  return {
    ...company,
    derived: {
      priority: priorityFor(company),
      audit: auditCompany(company),
      density: engineeringDensity(company),
      headcount: effectiveHeadcount(company),
      completion: gateCompletion(company),
    },
  }
}

const decorated = rawCompanies.map(decorate)

/** The pristine sheet values, used by "Reset to source" in the workspace. */
const seedById = new Map(rawCompanies.map((c) => [c.id, c]))

export function getCompanies() {
  return decorated
}

export function getCompanyById(id) {
  return decorated.find((c) => c.id === id) ?? null
}

/** The original record as extracted from sheet 108, before any edits. */
export function getSeedCompany(id) {
  const seed = seedById.get(id)
  return seed ? decorate(structuredClone(seed)) : null
}

export function getDatasetMeta() {
  return datasetMeta
}

/**
 * Distinct values for the filter dropdowns. Takes the live list so options
 * created by editing (a new funding stage, a new city) appear immediately.
 */
export function getFilterOptions(companies = decorated) {
  const locations = new Set()
  const fundingTypes = new Set()
  for (const c of companies) {
    if (c.location) locations.add(primaryCity(c.location))
    if (c.funding.type) fundingTypes.add(c.funding.type)
  }
  return {
    locations: [...locations].sort(),
    fundingTypes: [...fundingTypes].sort(),
  }
}

/** "Bengaluru, Karnataka, India" -> "Bengaluru"; multi-site entries keep both. */
export function primaryCity(location) {
  if (!location) return null
  return location
    .split(';')
    .map((part) => part.split(',')[0].trim())
    .join(' / ')
}
