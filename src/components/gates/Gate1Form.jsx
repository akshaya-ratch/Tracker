import { Box, Grid, HStack, Text, VStack } from '@chakra-ui/react'
import SectionCard from '../common/SectionCard'
import {
  NumberField,
  RepeatableList,
  SelectField,
  TextField,
} from '../common/FormFields'
import {
  emptyHrTaPerson,
  emptyOpenRole,
  emptyTeamRow,
  newEntityId,
} from '../../data/createCompany'
import {
  calcEngDensity,
  calcTaPercent,
  formatPercent,
} from '../../utils/calculations'
import { HR_TA_ROLES, JOB_STATUS_OPTIONS } from '../../utils/gates'
import GateStatusPanel from './GateStatusPanel'

const JOB_STATUS_SELECT = [
  { value: null, label: 'Not researched' },
  ...JOB_STATUS_OPTIONS,
]

const HR_TA_ROLE_SELECT = [...HR_TA_ROLES]

/** Normalize a job row to the Gate 1 shape used going forward. */
function jobFields(job) {
  return {
    title: job.title ?? job.roles ?? '',
    sourceName: job.sourceName ?? job.source ?? '',
    sourceLink: job.sourceLink ?? '',
    postedAt: job.postedAt ?? job.recency ?? '',
    applicants: job.applicants ?? '',
    status: job.status ?? '',
    remarks: job.remarks ?? '',
  }
}

/** Combined HR+TA list derived from the two people arrays. */
function combinedHrTa(draft) {
  const hr = (draft.hr?.people ?? []).map((p) => ({
    id: p.id || newEntityId('hr'),
    role: 'HR',
    name: p.name ?? '',
    linkedin: p.linkedin ?? '',
  }))
  const ta = (draft.ta?.people ?? []).map((p) => ({
    id: p.id || newEntityId('ta'),
    role: 'TA',
    name: p.name ?? '',
    linkedin: p.linkedin ?? '',
  }))
  return [...hr, ...ta]
}

/**
 * Write a combined HR/TA list back into hr.people / ta.people / counts,
 * and sync those entries into company.people (preserving founders + manual).
 * Uses a single nested patch via successive path updates (functional setDraft).
 */
function writeHrTaPeople(draft, update, items) {
  const hrPeople = items
    .filter((p) => p.role === 'HR')
    .map((p) => ({
      id: p.id,
      name: p.name || null,
      role: 'HR',
      linkedin: p.linkedin || null,
      function: 'HR',
    }))
  const taPeople = items
    .filter((p) => p.role === 'TA')
    .map((p) => ({
      id: p.id,
      name: p.name || null,
      role: 'TA',
      linkedin: p.linkedin || null,
      function: 'TA',
    }))

  const keep = (draft.people ?? []).filter(
    (p) => p.source === 'founder' || p.source === 'manual',
  )
  const people = [
    ...keep,
    ...hrPeople.map((p) => ({
      id: p.id,
      name: p.name,
      role: 'HR',
      linkedin: p.linkedin,
      source: 'hr',
    })),
    ...taPeople.map((p) => ({
      id: p.id,
      name: p.name,
      role: 'TA',
      linkedin: p.linkedin,
      source: 'ta',
    })),
  ]

  update('hr', {
    ...(draft.hr ?? {}),
    people: hrPeople,
    count: hrPeople.length,
  })
  update('ta', {
    ...(draft.ta ?? {}),
    people: taPeople,
    count: taPeople.length,
  })
  update('people', people)
}

/** Gate 1 — growth + hiring research fields + computed TA% / eng density. */
export default function Gate1Form({ draft, update }) {
  const jobs = draft.hiring?.jobs ?? []
  const team = draft.team ?? []
  const hrTa = combinedHrTa(draft)

  const taPct = calcTaPercent(draft)
  const engDens = calcEngDensity(draft)

  const setJobs = (next) => update('hiring.jobs', next)
  const setTeam = (next) => update('team', next)

  const patchJob = (index, partial) => {
    const next = jobs.map((j, i) => {
      if (i !== index) return j
      const base = { ...j, ...jobFields(j), ...partial }
      // Keep legacy aliases in sync for parked views.
      if (partial.title !== undefined) base.roles = partial.title
      if (partial.sourceName !== undefined) base.source = partial.sourceName
      if (partial.postedAt !== undefined) base.recency = partial.postedAt
      return base
    })
    setJobs(next)
  }

  const patchHrTa = (index, partial) => {
    const next = hrTa.map((p, i) => (i === index ? { ...p, ...partial } : p))
    writeHrTaPeople(draft, update, next)
  }

  return (
    <VStack align="stretch" spacing={4}>
      <SectionCard
        title="Open roles"
        subtitle="Gate 1 asks for more than two open roles"
      >
        <RepeatableList
          label={`Open roles (${jobs.length})`}
          items={jobs}
          onAdd={() => setJobs([...jobs, emptyOpenRole()])}
          onRemove={(i) => setJobs(jobs.filter((_, idx) => idx !== i))}
          addLabel="Add Open Role"
          emptyLabel="No open roles recorded."
          renderItem={(job, index) => {
            const fields = jobFields(job)
            return (
              <Grid
                templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                gap={2.5}
              >
                <TextField
                  label="Title"
                  value={fields.title}
                  onChange={(v) => patchJob(index, { title: v ?? '' })}
                  placeholder="Role title"
                />
                <TextField
                  label="Source name"
                  value={fields.sourceName}
                  onChange={(v) => patchJob(index, { sourceName: v ?? '' })}
                  placeholder="LinkedIn, FoundIt…"
                />
                <TextField
                  label="Source link"
                  value={fields.sourceLink}
                  onChange={(v) => patchJob(index, { sourceLink: v ?? '' })}
                  placeholder="https://…"
                />
                <TextField
                  label="Posted date"
                  value={fields.postedAt}
                  onChange={(v) => patchJob(index, { postedAt: v ?? '' })}
                  placeholder="1 week ago / 11 Jun 2026"
                />
                <TextField
                  label="Applicants / clicks"
                  value={fields.applicants}
                  onChange={(v) => patchJob(index, { applicants: v ?? '' })}
                  placeholder="100+"
                />
                <SelectField
                  label="Status"
                  value={fields.status || null}
                  onChange={(v) => patchJob(index, { status: v ?? '' })}
                  options={JOB_STATUS_SELECT}
                />
                <Box gridColumn={{ base: 'auto', lg: '1 / -1' }}>
                  <TextField
                    label="Remarks"
                    value={fields.remarks}
                    onChange={(v) => patchJob(index, { remarks: v ?? '' })}
                    placeholder="Notes on this listing"
                  />
                </Box>
              </Grid>
            )
          }}
        />
      </SectionCard>

      <SectionCard title="Headcount & team">
        <VStack align="stretch" spacing={4}>
          <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={4}>
            <NumberField
              label="Employee count"
              value={draft.employees?.reported}
              onChange={(v) => update('employees.reported', v)}
              helper="Reported headcount used for TA% and eng density."
            />
            <TextField
              label="Employee growth"
              value={draft.employeeGrowth}
              onChange={(v) => update('employeeGrowth', v)}
              placeholder="e.g. +40% YoY / doubled in 18 months"
            />
          </Grid>

          <RepeatableList
            label={`Team composition (${team.length})`}
            items={team}
            onAdd={() => setTeam([...team, emptyTeamRow()])}
            onRemove={(i) => setTeam(team.filter((_, idx) => idx !== i))}
            addLabel="Add Function"
            emptyLabel="No team functions recorded."
            renderItem={(row, index) => (
              <Grid templateColumns={{ base: '1fr', sm: '2fr 1fr' }} gap={2.5}>
                <TextField
                  label="Function"
                  value={row.function}
                  onChange={(v) => update(`team.${index}.function`, v ?? '')}
                  placeholder="Engineering, Sales…"
                />
                <NumberField
                  label="Count"
                  value={row.count}
                  onChange={(v) => update(`team.${index}.count`, v)}
                />
              </Grid>
            )}
          />

          <HStack
            spacing={6}
            px={3}
            py={2.5}
            borderWidth="1px"
            borderColor="surface.border"
            borderRadius="md"
            bg="surface.sunken"
            flexWrap="wrap"
          >
            <Box>
              <Text fontSize="2xs" fontWeight={600} color="gray.500" textTransform="uppercase" letterSpacing="0.05em">
                TA %
              </Text>
              <Text fontSize="sm" fontWeight={600} color="gray.700" mt={0.5}>
                {taPct == null ? '—' : `${taPct.toFixed(1)}%`}
              </Text>
            </Box>
            <Box>
              <Text fontSize="2xs" fontWeight={600} color="gray.500" textTransform="uppercase" letterSpacing="0.05em">
                Eng density
              </Text>
              <Text fontSize="sm" fontWeight={600} color="gray.700" mt={0.5}>
                {formatPercent(engDens) ?? '—'}
              </Text>
            </Box>
          </HStack>
        </VStack>
      </SectionCard>

      <SectionCard title="HR / TA" subtitle="Combined list — split by role on save">
        <RepeatableList
          label={`HR / TA people (${hrTa.length})`}
          items={hrTa}
          onAdd={() => writeHrTaPeople(draft, update, [...hrTa, emptyHrTaPerson()])}
          onRemove={(i) => writeHrTaPeople(draft, update, hrTa.filter((_, idx) => idx !== i))}
          addLabel="Add Person"
          emptyLabel="No HR or TA people named."
          renderItem={(person, index) => (
            <Grid templateColumns={{ base: '1fr', sm: '120px 1fr 1fr' }} gap={2.5}>
              <SelectField
                label="Role"
                value={person.role}
                onChange={(v) => patchHrTa(index, { role: v ?? 'HR' })}
                options={HR_TA_ROLE_SELECT}
              />
              <TextField
                label="Name"
                value={person.name}
                onChange={(v) => patchHrTa(index, { name: v ?? '' })}
                placeholder="Full name"
              />
              <TextField
                label="LinkedIn"
                value={person.linkedin}
                onChange={(v) => patchHrTa(index, { linkedin: v ?? '' })}
                placeholder="https://linkedin.com/in/…"
              />
            </Grid>
          )}
        />
      </SectionCard>

      <SectionCard title="Gate 1 decision">
        <GateStatusPanel
          gateKey="gate1"
          draft={draft}
          onChange={(gate) => update('gates.gate1', gate)}
        />
      </SectionCard>
    </VStack>
  )
}
