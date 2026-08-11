import { Box, Grid, HStack, Text, Tooltip, VStack } from '@chakra-ui/react'
import SectionCard from '../common/SectionCard'
import StatusBadge from '../common/StatusBadge'
import { FieldFlag } from '../common/DataQualityWarning'
import {
  formatRelativeDays,
  freshestListingDays,
  hasActiveListing,
  hasApplicantSignal,
  hasHiringBadge,
  hiringSources,
} from '../../utils/calculations'
import { issuesForField } from '../../utils/dataQuality'

/** One signal tile. `tone: null` means the signal was never researched. */
function Signal({ label, value, tone, note, issues }) {
  const unresearched = value == null

  return (
    <Box
      borderWidth="1px"
      borderColor="surface.border"
      borderRadius="md"
      px={3}
      py={2.5}
      bg={unresearched ? 'surface.sunken' : 'surface.raised'}
    >
      <HStack spacing={1.5} mb={1.5}>
        <Text
          fontSize="2xs"
          fontWeight={600}
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="0.05em"
        >
          {label}
        </Text>
        <FieldFlag issues={issues} />
      </HStack>

      {unresearched ? (
        <StatusBadge tone="gray">Not yet researched</StatusBadge>
      ) : typeof value === 'string' ? (
        <StatusBadge tone={tone ?? 'gray'}>{value}</StatusBadge>
      ) : (
        value
      )}

      {note && (
        <Text fontSize="2xs" color="gray.500" mt={1.5} lineHeight="short" noOfLines={3}>
          {note}
        </Text>
      )}
    </Box>
  )
}

export default function HiringSnapshot({ company }) {
  const audit = company.derived.audit
  const { hiring, openRoles } = company
  const roles = openRoles?.atLeast ?? 0
  const fresh = freshestListingDays(company)
  const sources = hiringSources(company)
  const badge = hasHiringBadge(company)
  const { count: hrCount, people: hrPeople, sourceNote: hrRaw, statedNone } = company.hr
  const { count: taCount, people: taPeople } = company.ta

  return (
    <SectionCard
      title="Hiring snapshot"
      subtitle="Signals as recorded in the 108 sheet — blanks are shown as unresearched, not as zero"
    >
      <Grid
        templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={3}
      >
        <Signal
          label="Open role signals"
          value={
            roles > 0 ? (
              <Text fontSize="lg" fontWeight={650} className="tabular" color="gray.900">
                ≥ {roles}
              </Text>
            ) : hiring.notes.length ? (
              'None found'
            ) : null
          }
          tone={roles > 0 ? 'green' : 'gray'}
          note={
            roles > 0
              ? `Across ${sources.length || 'unrecorded'} source${sources.length === 1 ? '' : 's'} · lower bound`
              : hiring.notes.join(' · ') || undefined
          }
          issues={issuesForField(audit, 'hiring')}
        />

        <Signal
          label="Job freshness"
          value={
            fresh != null ? (
              <Text fontSize="lg" fontWeight={650} className="tabular" color="gray.900">
                {formatRelativeDays(fresh)}
              </Text>
            ) : null
          }
          note={fresh != null ? 'Most recent listing observed' : undefined}
        />

        <Signal
          label="Applicant signals"
          value={hasApplicantSignal(company) ? 'Recorded' : null}
          tone="blue"
          note={
            hasApplicantSignal(company)
              ? hiring.jobs
                  .filter((g) => g.applicants)
                  .map((g) => g.applicants)
                  .join(' · ')
              : undefined
          }
        />

        <Signal
          label="Hiring urgency"
          value={hiring.urgency}
          tone="orange"
          note={
            hiring.urgency
              ? undefined
              : hasActiveListing(company)
                ? 'Not assessed. Listings are still accepting applicants.'
                : 'Not assessed for any company in this sheet.'
          }
        />

        <Signal
          label="HR"
          value={
            hrRaw == null ? null : hrCount != null ? (
              <Text fontSize="lg" fontWeight={650} className="tabular" color="gray.900">
                {hrCount}
              </Text>
            ) : (
              'Recorded'
            )
          }
          note={
            hrRaw == null
              ? undefined
              : hrPeople.length
                ? hrPeople.map((p) => p.name).join(', ')
                : statedNone
                  ? 'Sheet records no HR function'
                  : hrRaw
          }
          issues={issuesForField(audit, 'hrTa')}
        />

        <Signal
          label="TA"
          value={
            hrRaw == null ? null : taCount != null ? (
              <Text
                fontSize="lg"
                fontWeight={650}
                className="tabular"
                color={taCount === 0 ? 'orange.600' : 'gray.900'}
              >
                {taCount}
              </Text>
            ) : (
              'Unclear'
            )
          }
          note={
            hrRaw == null
              ? undefined
              : taPeople.length
                ? taPeople.map((p) => p.name).join(', ')
                : taCount === 0 && roles > 0
                  ? 'Hiring with no dedicated talent acquisition — a hiring-pain signal for Gate 2.'
                  : company.taPercent?.raw
                    ? `TA share recorded as “${company.taPercent.raw}”`
                    : undefined
          }
          issues={issuesForField(audit, 'taPercent')}
        />

        <Signal
          label="Hiring badge"
          value={badge == null ? null : badge ? 'Yes' : 'No'}
          tone={badge ? 'green' : 'gray'}
          note={hiring.hiringBadge.raw ?? undefined}
        />

        <Signal
          label="External talent partners"
          value={hiring.externalPartners.length ? hiring.externalPartners.join(', ') : null}
          tone="purple"
          note={
            hiring.externalPartners.length
              ? 'Third-party recruiting tooling observed'
              : 'Gate 2 field — not researched for this company.'
          }
        />
      </Grid>

      {sources.length > 0 && (
        <HStack spacing={2} mt={3} flexWrap="wrap">
          <Text fontSize="2xs" color="gray.500" fontWeight={600}>
            SOURCES OBSERVED
          </Text>
          {sources.map((s) => (
            <Tooltip key={s} label={`Roles for ${company.name} were seen on ${s}`} hasArrow>
              <Box>
                <StatusBadge tone="gray">{s}</StatusBadge>
              </Box>
            </Tooltip>
          ))}
        </HStack>
      )}
    </SectionCard>
  )
}
