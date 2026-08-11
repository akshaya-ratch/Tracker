import { Box, Text, VStack } from '@chakra-ui/react'
import GateCard from './GateCard'
import { GATES } from '../../utils/gates'
import { formatPercent, teamTotal } from '../../utils/calculations'

/**
 * Maps each gate to the evidence actually present in the sheet for it.
 * Anything not in the sheet renders as an explicit "Not recorded" line rather
 * than being omitted, so the researcher can see the hole.
 */
function evidenceFor(gateKey, company) {
  const density = company.derived.density
  const { count: hrCount, sourceNote: hrRaw } = company.hr
  const { count: taCount } = company.ta

  switch (gateKey) {
    case 'gate0':
      return [
        { label: 'Founded year', value: company.foundedYear },
        { label: 'Location', value: company.location },
        { label: 'Funding type', value: company.funding.type },
        { label: 'Funding amount', value: company.funding.amount },
        {
          label: 'Investors',
          value: company.funding.investors.length
            ? `${company.funding.investors.length} recorded`
            : null,
        },
      ]
    case 'gate1':
      return [
        {
          label: 'Open roles (> 2)',
          value:
            company.openRoles.atLeast > 0
              ? `At least ${company.openRoles.atLeast}`
              : company.hiring.notes.length
                ? company.hiring.notes.join('; ')
                : null,
          missingLabel: 'Not researched',
        },
        {
          label: 'Employees',
          value: company.employees.reported ?? (teamTotal(company) ? `${teamTotal(company)} (from team breakdown)` : null),
        },
        {
          label: 'Team composition',
          value: company.team.length ? `${company.team.length} functions recorded` : null,
        },
        {
          label: 'HR / TA',
          value: hrRaw ? `${hrCount ?? '?'} HR · ${taCount ?? '?'} TA` : null,
          missingLabel: 'Not researched',
        },
        {
          label: 'Engineering density',
          value: density.conflict
            ? `${formatPercent(density.source)} source / ${formatPercent(density.calculated)} calculated`
            : formatPercent(density.calculated ?? density.source),
        },
        { label: 'Employee growth', value: company.employeeGrowth, missingLabel: 'Not researched' },
      ]
    case 'gate2': {
      const h = company.hiring
      return [
        { label: 'JD analysis', value: h.jdAnalysis, missingLabel: 'Not researched' },
        { label: 'Team analysis', value: h.teamAnalysis, missingLabel: 'Not researched' },
        { label: 'Applicant count', value: h.applicantCount, missingLabel: 'Not researched' },
        { label: 'Hiring pain', value: h.hiringPain, missingLabel: 'Not researched' },
        { label: 'JD duplication', value: h.jdDuplication, missingLabel: 'Not researched' },
        { label: 'Reposts', value: h.reposts, missingLabel: 'Not researched' },
        {
          label: 'External talent partners',
          value: h.externalPartners.length ? h.externalPartners.join(', ') : null,
          missingLabel: 'Not researched',
        },
        {
          label: 'Hiring manager / panel',
          value: [h.hiringManager, h.panel].filter(Boolean).join(' · ') || null,
          missingLabel: 'Not researched',
        },
      ]
    }
    case 'gate3': {
      const b = company.business
      return [
        { label: 'Product', value: b.product, missingLabel: 'Not researched' },
        { label: 'Business growth', value: b.growth, missingLabel: 'Not researched' },
        { label: 'Revenue', value: b.revenue, missingLabel: 'Not researched' },
        { label: 'PMF', value: b.pmf, missingLabel: 'Not researched' },
        { label: 'Public perception', value: b.publicPerception, missingLabel: 'Not researched' },
        { label: 'Customers', value: b.customers, missingLabel: 'Not researched' },
      ]
    }
    case 'gate4': {
      const dm = company.decisionMakers
      const withField = (key) => dm.filter((p) => p[key]).length
      return [
        {
          label: 'Decision makers',
          value: dm.length ? dm.map((p) => p.name).filter(Boolean).join(', ') || `${dm.length} recorded` : null,
          missingLabel: 'Not researched',
        },
        {
          label: 'Characteristics',
          value: withField('characteristics') ? `${withField('characteristics')} described` : null,
          missingLabel: 'Not researched',
        },
        {
          label: 'LinkedIn',
          value: withField('linkedin') ? `${withField('linkedin')} captured` : null,
          missingLabel: 'Not researched',
        },
        {
          label: 'Email',
          value: withField('email') ? `${withField('email')} captured` : null,
          missingLabel: 'Not researched',
        },
        {
          label: 'Phone',
          value: withField('phone') ? `${withField('phone')} captured` : null,
          missingLabel: 'Not researched',
        },
        { label: 'Brief', value: company.brief, missingLabel: 'Not researched' },
        {
          label: 'Outreach status',
          value: company.outreach.status,
          missingLabel: 'Not started',
        },
      ]
    }
    default:
      return []
  }
}

export default function CompanyGates({ company, onResearch }) {
  return (
    <VStack align="stretch" spacing={4}>
      <Box
        px={4}
        py={3}
        bg="surface.raised"
        borderWidth="1px"
        borderColor="surface.border"
        borderRadius="lg"
        boxShadow="card"
      >
        <Text fontSize="sm" fontWeight={600} color="gray.800">
          Research status: {company.derived.completion.evaluated} of 5 gates evaluated
        </Text>
        <Text fontSize="xs" color="gray.500" mt={0.5}>
          Gates 2, 3 and 4 are unpopulated across the entire 108 sheet. The
          checklists below are the fields a researcher still has to collect.
        </Text>
      </Box>

      {GATES.map((gate) => (
        <GateCard
          key={gate.key}
          gate={gate}
          company={company}
          evidence={evidenceFor(gate.key, company)}
          onResearch={onResearch}
        />
      ))}
    </VStack>
  )
}
