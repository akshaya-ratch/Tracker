import { Box, Grid, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { SourceConflict } from '../../common/DataQualityWarning'
import StatusBadge from '../../common/StatusBadge'
import {
  NumberField,
  RepeatableList,
  SelectField,
  TextAreaField,
  TextField,
  blankToNull,
} from '../../common/FormFields'
import { newId } from '../../../state/useCompanyDraft'
import { engineeringDensity, formatPercent, teamTotal } from '../../../utils/calculations'
import { issuesForField } from '../../../utils/dataQuality'

/**
 * Shared field groups.
 *
 * Both editing views are built from these: the topic editors (Overview /
 * Hiring / Team) and the gate-by-gate form. A field therefore behaves
 * identically wherever a researcher meets it, and there is one place to change
 * it.
 *
 * Every section takes the same props: { draft, update, addItem, removeItem, audit }.
 */

const YES_NO = [
  { value: null, label: 'Not researched' },
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

const LISTING_STATUS = [
  { value: null, label: 'Not researched' },
  { value: 'still accepting', label: 'Still accepting' },
  { value: 'closed', label: 'Closed' },
  { value: 'unclear', label: 'Unclear' },
]

const RANGE = /^\s*(\d[\d,]*)\s*[-–]\s*(\d[\d,]*)\s*$/

/** "51-200" -> the stored range object; free text is kept as a label. */
export function parseRange(text) {
  if (!text || !text.trim()) return null
  const m = text.match(RANGE)
  if (!m) return { min: null, max: null, label: text.trim() }
  return {
    min: Number(m[1].replace(/,/g, '')),
    max: Number(m[2].replace(/,/g, '')),
    label: `${m[1]}-${m[2]} employees`,
  }
}

/** "37.8%" -> 0.378, "0.378" -> 0.378, "" -> null. */
export function parseDensity(text) {
  const v = blankToNull(text)
  if (v == null) return null
  const m = String(v).match(/(\d+(?:\.\d+)?)/)
  if (!m) return null
  const n = Number(m[1])
  return String(v).includes('%') || n > 1 ? n / 100 : n
}

export function emptyJob(companyId) {
  return {
    id: newId(`${companyId}-job`),
    index: null,
    roles: '',
    location: null,
    source: null,
    recency: null,
    applicants: null,
    status: null,
    jdDuplication: null,
    reposted: null,
    hiringManager: null,
    panel: null,
    jdAnalysis: null,
  }
}

/* ------------------------------------------------------------------ Gate 0 */

export function IdentitySection({ draft, update }) {
  return (
    <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={4}>
      <TextField
        label="Startup name"
        value={draft.name}
        onChange={(v) => update('name', v)}
        placeholder="Company name"
        required
      />
      <NumberField
        label="Founded year"
        value={draft.foundedYear}
        onChange={(v) => update('foundedYear', v)}
        min={1900}
        max={2100}
      />
      <TextField
        label="Location"
        value={draft.location}
        onChange={(v) => update('location', v)}
        placeholder="City, State, Country"
      />
    </Grid>
  )
}

export function FoundersSection({ draft, update, addItem, removeItem }) {
  return (
    <VStack align="stretch" spacing={4}>
      <RepeatableList
        label={`Founders (${draft.founders.length})`}
        items={draft.founders.map((name, i) => ({ id: `f-${i}`, name }))}
        onAdd={() => addItem('founders', '')}
        onRemove={(i) => removeItem('founders', i)}
        addLabel="Add Founder"
        emptyLabel="No founders recorded."
        compact
        renderItem={(item, index) => (
          <Input
            value={draft.founders[index] ?? ''}
            onChange={(e) => update(`founders.${index}`, e.target.value)}
            onBlur={(e) => update(`founders.${index}`, e.target.value.trim())}
            placeholder="Founder name"
            bg="surface.raised"
            borderColor="surface.border"
          />
        )}
      />

      {draft.founderNote && (
        <TextAreaField
          label="Note left in the source cell"
          value={draft.founderNote}
          onChange={(v) => update('founderNote', v)}
          rows={2}
          helper="Text the sheet stored alongside the founder names. Clear it once resolved."
        />
      )}
    </VStack>
  )
}

export function FundingSection({ draft, update, addItem, removeItem }) {
  const { funding } = draft
  return (
    <VStack align="stretch" spacing={4}>
      <Grid templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap={4}>
        <TextField
          label="Funding type"
          value={funding.type}
          onChange={(v) => update('funding.type', v)}
          placeholder="Seed, Pre-Series A…"
        />
        <TextField
          label="Funding amount"
          value={funding.amount}
          onChange={(v) => update('funding.amount', v)}
          placeholder="₹8 crore (~$960K)"
        />
        <TextField
          label="Funding date"
          value={funding.date}
          onChange={(v) => update('funding.date', v)}
          placeholder="11 Jun 2026"
          helper={
            funding.amountRaw && funding.amountRaw !== funding.amount
              ? `Split from: “${funding.amountRaw}”`
              : undefined
          }
        />
      </Grid>

      <RepeatableList
        label={`Investors (${funding.investors.length})`}
        items={funding.investors.map((name, i) => ({ id: `inv-${i}`, name }))}
        onAdd={() => addItem('funding.investors', '')}
        onRemove={(i) => removeItem('funding.investors', i)}
        addLabel="Add Investor"
        emptyLabel="No investors recorded."
        compact
        renderItem={(item, index) => (
          <Input
            value={funding.investors[index] ?? ''}
            onChange={(e) => update(`funding.investors.${index}`, e.target.value)}
            onBlur={(e) => update(`funding.investors.${index}`, e.target.value.trim())}
            placeholder="Investor name"
            bg="surface.raised"
            borderColor="surface.border"
          />
        )}
      />
    </VStack>
  )
}

/* ------------------------------------------------------------------ Gate 1 */

export function HeadcountSection({ draft, update, audit }) {
  const reported = draft.employees.reported
  const range = draft.employees.range
  const outsideRange =
    reported != null &&
    range?.min != null &&
    (reported < range.min || reported > range.max)

  return (
    <VStack align="stretch" spacing={3}>
      <Grid templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap={4}>
        <NumberField
          label="Employees (reported)"
          value={reported}
          onChange={(v) => update('employees.reported', v)}
          issues={issuesForField(audit, 'employees')}
          helper="Leave empty if not researched — it will not become 0."
        />
        <TextField
          label="Employee range"
          value={range?.label ?? ''}
          onChange={(v) => update('employees.range', parseRange(v))}
          placeholder="51-200"
          helper="Format: 51-200"
        />
        <TextField
          label="Employee growth"
          value={draft.employeeGrowth}
          onChange={(v) => update('employeeGrowth', v)}
        />
      </Grid>

      {outsideRange && (
        <SourceConflict
          sourceLabel="Reported headcount"
          sourceValue={`${reported}`}
          calcLabel="Stated range"
          calcValue={range.label}
          note="⚠ Source conflict — the reported headcount sits outside the stated range. Both values are kept as entered."
        />
      )}

      {draft.employees.raw && (
        <Text fontSize="2xs" color="gray.400" fontFamily="mono">
          Source cell: “{draft.employees.raw}”
        </Text>
      )}
    </VStack>
  )
}

export function TeamCompositionSection({ draft, update, addItem, removeItem }) {
  return (
    <RepeatableList
      label={`Team functions (${draft.team.length}${
        teamTotal(draft) != null ? ` · ${teamTotal(draft)} people` : ''
      })`}
      items={draft.team}
      onAdd={() => addItem('team', { id: newId(`${draft.id}-team`), function: '', count: null })}
      onRemove={(i) => removeItem('team', i)}
      addLabel="Add Team Function"
      emptyLabel="No team functions recorded."
      compact
      renderItem={(item, index) => (
        <HStack spacing={2} align="center">
          <Input
            value={item.function ?? ''}
            onChange={(e) => update(`team.${index}.function`, e.target.value)}
            placeholder="Engineering"
            bg="surface.raised"
            borderColor="surface.border"
            flex="1"
          />
          <Input
            value={item.count ?? ''}
            onChange={(e) => {
              const t = e.target.value.trim()
              update(`team.${index}.count`, t === '' ? null : Number(t) || 0)
            }}
            placeholder="0"
            type="number"
            min={0}
            w="88px"
            textAlign="right"
            className="tabular"
            bg="surface.raised"
            borderColor="surface.border"
          />
        </HStack>
      )}
    />
  )
}

/**
 * Engineering density. Recalculates live from the team breakdown but never
 * overwrites the recorded source value — a disagreement is intelligence.
 */
export function EngineeringDensitySection({ draft, update }) {
  const density = engineeringDensity(draft)

  return (
    <VStack align="stretch" spacing={3.5}>
      <TextField
        label="Source value (as recorded)"
        value={draft.engDensity.raw}
        onChange={(v) =>
          update('engDensity', {
            raw: v,
            value: parseDensity(v),
            unitAmbiguous: v != null && String(v).includes('%'),
          })
        }
        placeholder="0.378 or 37.8%"
        helper="Accepts a fraction or a percentage."
      />

      <Box
        px={3}
        py={2.5}
        borderWidth="1px"
        borderColor="surface.border"
        borderRadius="md"
        bg="surface.sunken"
      >
        <HStack justify="space-between" mb={1}>
          <Text fontSize="2xs" fontWeight={600} color="gray.500" letterSpacing="0.05em">
            CALCULATED
          </Text>
          {density.calculated == null && <StatusBadge tone="gray">Not available</StatusBadge>}
        </HStack>
        <Text fontSize="2xl" fontWeight={650} className="tabular" color="gray.900">
          {formatPercent(density.calculated) ?? '—'}
        </Text>
        <Text fontSize="2xs" color="gray.500" mt={0.5}>
          {density.engineeringHeadcount != null && density.calculated != null
            ? `${density.engineeringHeadcount} engineers ÷ ${
                density.basis === 'reported headcount' ? density.reported : density.teamTotal
              } (${density.basis})`
            : 'Add an Engineering row and a headcount to calculate this.'}
        </Text>
      </Box>

      {density.conflict && (
        <SourceConflict
          sourceLabel="Source value"
          sourceValue={formatPercent(density.source)}
          calcLabel="Calculated value"
          calcValue={formatPercent(density.calculated)}
          note="Source value differs from calculated value — needs verification. The source value has been kept exactly as entered."
        />
      )}
    </VStack>
  )
}

function PeopleList({ draft, update, addItem, removeItem, path, label, emptyLabel, roleHint }) {
  const people = path === 'hr' ? draft.hr.people : draft.ta.people
  return (
    <RepeatableList
      label={`${label} (${people.length})`}
      items={people}
      onAdd={() =>
        addItem(`${path}.people`, {
          id: newId(`${draft.id}-${path}`),
          name: '',
          function: null,
          linkedin: null,
        })
      }
      onRemove={(i) => removeItem(`${path}.people`, i)}
      addLabel="Add Person"
      emptyLabel={emptyLabel}
      renderItem={(person, index) => (
        <Grid templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap={2.5}>
          <TextField
            label="Name"
            value={person.name}
            onChange={(v) => update(`${path}.people.${index}.name`, v)}
            placeholder="Full name"
          />
          <TextField
            label="Function"
            value={person.function}
            onChange={(v) => update(`${path}.people.${index}.function`, v)}
            placeholder={roleHint}
          />
          <TextField
            label="LinkedIn (optional)"
            value={person.linkedin}
            onChange={(v) => update(`${path}.people.${index}.linkedin`, v)}
            placeholder="Profile URL"
          />
        </Grid>
      )}
    />
  )
}

export function HrTaSection({ draft, update, addItem, removeItem, audit }) {
  return (
    <VStack align="stretch" spacing={4}>
      <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={4}>
        <NumberField
          label="HR count"
          value={draft.hr.count}
          onChange={(v) => update('hr.count', v)}
          issues={issuesForField(audit, 'hrTa')}
          helper="0 means the sheet recorded no HR function."
        />
        <NumberField
          label="TA count"
          value={draft.ta.count}
          onChange={(v) => update('ta.count', v)}
        />
      </Grid>

      <PeopleList
        draft={draft}
        update={update}
        addItem={addItem}
        removeItem={removeItem}
        path="hr"
        label="HR people"
        emptyLabel="No HR people named."
        roleHint="HR / HR cum TA"
      />
      <PeopleList
        draft={draft}
        update={update}
        addItem={addItem}
        removeItem={removeItem}
        path="ta"
        label="TA people"
        emptyLabel="No dedicated talent-acquisition people named."
        roleHint="Recruiter"
      />

      {draft.hr.sourceNote && (
        <Text fontSize="2xs" color="gray.400" fontFamily="mono">
          Source cell: “{draft.hr.sourceNote.replace(/\n/g, ' · ')}”
        </Text>
      )}
    </VStack>
  )
}

/* ------------------------------------------------------------- Gate 1 / 2 */

/**
 * The jobs list. `variant` decides how much of each job is exposed:
 *   'basic' — Gate 1: is there real hiring activity?
 *   'pain'  — Gate 2: what do those roles reveal about hiring pain?
 *   'full'  — the Hiring tab: everything.
 */
export function JobsSection({ draft, update, addItem, removeItem, variant = 'full' }) {
  const showBasic = variant !== 'pain'
  const showPain = variant !== 'basic'

  return (
    <RepeatableList
      items={draft.hiring.jobs}
      onAdd={() => addItem('hiring.jobs', emptyJob(draft.id))}
      onRemove={(i) => removeItem('hiring.jobs', i)}
      addLabel="Add Job"
      emptyLabel="No jobs recorded. Adding one feeds the open-role count, freshness and priority."
      renderItem={(job, index) => {
        const p = `hiring.jobs.${index}`
        return (
          <VStack align="stretch" spacing={3}>
            {showBasic && (
              <Grid
                templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                gap={3}
              >
                <TextField
                  label="Role"
                  value={job.roles}
                  onChange={(v) => update(`${p}.roles`, v)}
                  placeholder="Job title, or how the sheet grouped them"
                />
                <TextField
                  label="Location"
                  value={job.location}
                  onChange={(v) => update(`${p}.location`, v)}
                  placeholder="Bengaluru / Remote"
                />
                <TextField
                  label="Source"
                  value={job.source}
                  onChange={(v) => update(`${p}.source`, v)}
                  placeholder="LinkedIn, Naukri, career page…"
                />
                <TextField
                  label="Recency"
                  value={job.recency}
                  onChange={(v) => update(`${p}.recency`, v)}
                  placeholder="e.g. 2 weeks ago"
                  helper="Parsed into job freshness where possible."
                />
                <TextField
                  label="Applicant count"
                  value={job.applicants}
                  onChange={(v) => update(`${p}.applicants`, v)}
                  placeholder="e.g. 100+ applicants"
                />
                <SelectField
                  label="Status"
                  value={job.status}
                  onChange={(v) => update(`${p}.status`, v)}
                  options={LISTING_STATUS}
                />
              </Grid>
            )}

            {showPain && (
              <>
                {!showBasic && (
                  <Text fontSize="sm" fontWeight={600} color="gray.800">
                    {job.roles || 'Untitled role'}
                    {job.source && (
                      <Text as="span" fontWeight={400} color="gray.500" fontSize="xs">
                        {' '}
                        · {job.source}
                      </Text>
                    )}
                  </Text>
                )}
                <Grid
                  templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
                  gap={3}
                >
                  <SelectField
                    label="JD duplication"
                    value={job.jdDuplication}
                    onChange={(v) => update(`${p}.jdDuplication`, v)}
                    options={YES_NO}
                  />
                  <SelectField
                    label="Reposted"
                    value={job.reposted}
                    onChange={(v) => update(`${p}.reposted`, v)}
                    options={YES_NO}
                  />
                  <TextField
                    label="Hiring manager"
                    value={job.hiringManager}
                    onChange={(v) => update(`${p}.hiringManager`, v)}
                  />
                  <TextField
                    label="Panel"
                    value={job.panel}
                    onChange={(v) => update(`${p}.panel`, v)}
                  />
                </Grid>
                <TextAreaField
                  label="JD analysis"
                  value={job.jdAnalysis}
                  onChange={(v) => update(`${p}.jdAnalysis`, v)}
                  rows={2}
                  placeholder="What this specific JD says about their hiring pain."
                />
              </>
            )}
          </VStack>
        )
      }}
    />
  )
}

/* ------------------------------------------------------------------ Gate 2 */

export function HiringSignalsSection({ draft, update, addItem, removeItem, audit }) {
  const { hiring } = draft
  return (
    <VStack align="stretch" spacing={4}>
      <Grid
        templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={4}
      >
        <TextField
          label="Hiring urgency"
          value={hiring.urgency}
          onChange={(v) => update('hiring.urgency', v)}
          placeholder="e.g. High — 6 roles in 2 weeks"
          issues={issuesForField(audit, 'hiring')}
        />
        <TextField
          label="JD duplication"
          value={hiring.jdDuplication}
          onChange={(v) => update('hiring.jdDuplication', v)}
          placeholder="Duplicate JDs observed?"
        />
        <TextField
          label="Reposts"
          value={hiring.reposts}
          onChange={(v) => update('hiring.reposts', v)}
          placeholder="Roles reposted?"
        />
        <TextField
          label="Hiring manager"
          value={hiring.hiringManager}
          onChange={(v) => update('hiring.hiringManager', v)}
        />
        <TextField
          label="Interview panel"
          value={hiring.panel}
          onChange={(v) => update('hiring.panel', v)}
        />
        <TextField
          label="Applicant count"
          value={hiring.applicantCount}
          onChange={(v) => update('hiring.applicantCount', v)}
          placeholder="Aggregate applicant signal"
        />
      </Grid>

      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={4}>
        <TextAreaField
          label="JD analysis"
          value={hiring.jdAnalysis}
          onChange={(v) => update('hiring.jdAnalysis', v)}
          placeholder="What the job descriptions reveal."
        />
        <TextAreaField
          label="Hiring pain"
          value={hiring.hiringPain}
          onChange={(v) => update('hiring.hiringPain', v)}
          placeholder="The Gate 2 conclusion — where does hiring hurt?"
        />
        <TextAreaField
          label="Team analysis"
          value={hiring.teamAnalysis}
          onChange={(v) => update('hiring.teamAnalysis', v)}
          placeholder="Team shape read against the open roles."
        />
        <TextField
          label="Hiring badge"
          value={hiring.hiringBadge.raw}
          onChange={(v) => update('hiring.hiringBadge.raw', v)}
          placeholder='e.g. "yes, Akshata R"'
          helper="LinkedIn recruiter badge, as observed."
        />
      </Grid>

      <RepeatableList
        label={`External talent partners (${hiring.externalPartners.length})`}
        items={hiring.externalPartners.map((name, i) => ({ id: `p-${i}`, name }))}
        onAdd={() => addItem('hiring.externalPartners', '')}
        onRemove={(i) => removeItem('hiring.externalPartners', i)}
        addLabel="Add Talent Partner"
        emptyLabel="No external talent partners recorded."
        compact
        renderItem={(item, index) => (
          <Input
            value={hiring.externalPartners[index] ?? ''}
            onChange={(e) => update(`hiring.externalPartners.${index}`, e.target.value)}
            onBlur={(e) => update(`hiring.externalPartners.${index}`, e.target.value.trim())}
            placeholder="Agency or tool, e.g. Zoho Recruit"
            bg="surface.raised"
            borderColor="surface.border"
          />
        )}
      />
    </VStack>
  )
}

/* ------------------------------------------------------------------ Gate 3 */

export function BusinessSection({ draft, update }) {
  return (
    <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={4}>
      <TextAreaField
        label="Product"
        value={draft.business.product}
        onChange={(v) => update('business.product', v)}
        placeholder="What do they actually sell?"
      />
      <TextAreaField
        label="Business growth"
        value={draft.business.growth}
        onChange={(v) => update('business.growth', v)}
      />
      <TextAreaField
        label="Revenue"
        value={draft.business.revenue}
        onChange={(v) => update('business.revenue', v)}
      />
      <TextAreaField
        label="Product-market fit"
        value={draft.business.pmf}
        onChange={(v) => update('business.pmf', v)}
      />
      <TextAreaField
        label="Public perception"
        value={draft.business.publicPerception}
        onChange={(v) => update('business.publicPerception', v)}
      />
      <TextAreaField
        label="Customers"
        value={draft.business.customers}
        onChange={(v) => update('business.customers', v)}
      />
    </Grid>
  )
}

/* ------------------------------------------------------------------ Gate 4 */

export function DecisionMakersSection({ draft, update, addItem, removeItem }) {
  return (
    <VStack align="stretch" spacing={4}>
      <RepeatableList
        items={draft.decisionMakers}
        onAdd={() =>
          addItem('decisionMakers', {
            id: newId(`${draft.id}-dm`),
            name: '',
            role: null,
            characteristics: null,
            linkedin: null,
            email: null,
            phone: null,
          })
        }
        onRemove={(i) => removeItem('decisionMakers', i)}
        addLabel="Add Decision Maker"
        emptyLabel="No decision makers researched yet."
        renderItem={(person, index) => {
          const p = `decisionMakers.${index}`
          return (
            <VStack align="stretch" spacing={2.5}>
              <Grid
                templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                gap={2.5}
              >
                <TextField
                  label="Name"
                  value={person.name}
                  onChange={(v) => update(`${p}.name`, v)}
                  placeholder="Full name"
                />
                <TextField
                  label="Role"
                  value={person.role}
                  onChange={(v) => update(`${p}.role`, v)}
                  placeholder="Head of Engineering"
                />
                <TextField
                  label="LinkedIn"
                  value={person.linkedin}
                  onChange={(v) => update(`${p}.linkedin`, v)}
                  placeholder="Paste the profile URL"
                />
                <TextField
                  label="Email"
                  value={person.email}
                  onChange={(v) => update(`${p}.email`, v)}
                  placeholder="name@company.com"
                />
                <TextField
                  label="Phone"
                  value={person.phone}
                  onChange={(v) => update(`${p}.phone`, v)}
                />
              </Grid>
              <TextAreaField
                label="Characteristics"
                value={person.characteristics}
                onChange={(v) => update(`${p}.characteristics`, v)}
                rows={2}
              />
            </VStack>
          )
        }}
      />
      <Text fontSize="2xs" color="gray.500">
        Contact details are only ever what a researcher enters here — none are generated.
      </Text>
    </VStack>
  )
}

export function OutreachSection({ draft, update }) {
  return (
    <VStack align="stretch" spacing={3.5}>
      <TextAreaField
        label="Brief"
        value={draft.brief}
        onChange={(v) => update('brief', v)}
        rows={3}
        placeholder="The one-paragraph summary used for outreach."
      />
      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
        <TextField
          label="Outreach status"
          value={draft.outreach.status}
          onChange={(v) => update('outreach.status', v)}
          placeholder="Not started / Sent / Replied"
        />
        <TextField
          label="Channel"
          value={draft.outreach.channel}
          onChange={(v) => update('outreach.channel', v)}
          placeholder="LinkedIn, email…"
        />
        <TextField
          label="Status link"
          value={draft.outreach.link}
          onChange={(v) => update('outreach.link', v)}
          placeholder="Paste a link if you have one"
        />
      </Grid>
      <TextAreaField
        label="Outreach message"
        value={draft.outreach.message}
        onChange={(v) => update('outreach.message', v)}
        rows={4}
        placeholder="The message sent, or the draft being prepared."
      />
    </VStack>
  )
}

/* ------------------------------------------------------- gate decision block */

const CORE_STATUSES = [
  { value: 'pass', label: 'Pass' },
  { value: 'fail', label: 'Fail' },
  { value: 'review', label: 'Review' },
]
const NOT_EVALUATED = { value: 'not_evaluated', label: 'Not evaluated' }

/** Status + reason + evidence + notes for one gate. */
export function GateDecisionSection({ gate, draft, update }) {
  const record = draft.gates[gate.key]
  const path = `gates.${gate.key}`
  const statuses = gate.index <= 1 ? [...CORE_STATUSES, NOT_EVALUATED] : [NOT_EVALUATED, ...CORE_STATUSES]

  return (
    <VStack align="stretch" spacing={3.5}>
      <Grid templateColumns={{ base: '1fr', md: '200px 1fr' }} gap={4}>
        <SelectField
          label="Status"
          value={record.result}
          onChange={(v) => update(`${path}.result`, v ?? 'not_evaluated')}
          options={statuses}
        />
        <TextField
          label="Reason / decision summary"
          value={record.reason}
          onChange={(v) => update(`${path}.reason`, v)}
          placeholder={gate.index <= 1 ? 'e.g. Engg Density' : 'Short reason shown on the gate badge'}
        />
      </Grid>

      <TextAreaField
        label="Evidence / reasoning"
        value={record.evidence}
        onChange={(v) => update(`${path}.evidence`, v)}
        rows={3}
        placeholder={`What did you find that supports this ${gate.name} outcome?`}
      />
      <TextAreaField
        label="Notes"
        value={record.notes}
        onChange={(v) => update(`${path}.notes`, v)}
        rows={2}
        placeholder="Open questions, caveats, what to check next."
      />

      {record.raw && (
        <Text fontSize="2xs" color="gray.400" fontFamily="mono">
          Source cell: “{record.raw}”
        </Text>
      )}
    </VStack>
  )
}
