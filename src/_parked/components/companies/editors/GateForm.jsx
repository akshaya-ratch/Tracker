import { useMemo, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Icon,
  Progress,
  Text,
  VStack,
} from '@chakra-ui/react'
import SectionCard from '../../common/SectionCard'
import { GateBadge } from '../../common/StatusBadge'
import { GATES } from '../../../utils/gates'
import { teamTotal } from '../../../utils/calculations'
import {
  BusinessSection,
  DecisionMakersSection,
  EngineeringDensitySection,
  FoundersSection,
  FundingSection,
  GateDecisionSection,
  HeadcountSection,
  HiringSignalsSection,
  HrTaSection,
  IdentitySection,
  JobsSection,
  OutreachSection,
  TeamCompositionSection,
} from './sections'

/**
 * GATE-BY-GATE RESEARCH FORM
 * --------------------------
 * The 108 sheet is organised by gate, and so is the research itself: you work a
 * company from Gate 0 to Gate 4. This form follows that order.
 *
 * Each step gathers the fields that gate actually depends on - pulled from
 * wherever they live in the data model - and ends with the gate decision. The
 * same field components back the topic tabs, so a value edited here is the same
 * value edited there.
 */

/**
 * What each gate needs, and how to tell whether it has been captured.
 * `done` is a pure function of the draft, so the rail ticks over as you type.
 */
const STEPS = {
  gate0: {
    blurb: 'Establish that this is a company Ratch should look at at all.',
    sections: [
      { title: 'Company identity', Component: IdentitySection },
      { title: 'Founders', Component: FoundersSection },
      { title: 'Funding', Component: FundingSection },
    ],
    checks: [
      { label: 'Founded year', done: (d) => d.foundedYear != null },
      { label: 'Location', done: (d) => Boolean(d.location) },
      { label: 'Founders', done: (d) => d.founders.some(Boolean) },
      { label: 'Funding type', done: (d) => Boolean(d.funding.type) },
      { label: 'Funding amount', done: (d) => Boolean(d.funding.amount) },
      { label: 'Investors', done: (d) => d.funding.investors.some(Boolean) },
    ],
  },
  gate1: {
    blurb: 'Is the company growing, actively hiring, and engineering-weighted?',
    sections: [
      { title: 'Headcount', Component: HeadcountSection },
      { title: 'Team composition', Component: TeamCompositionSection },
      { title: 'Engineering density', Component: EngineeringDensitySection },
      { title: 'HR / TA', Component: HrTaSection },
      {
        title: 'Open roles',
        subtitle: 'Gate 1 asks for more than two open roles',
        Component: JobsSection,
        props: { variant: 'basic' },
      },
    ],
    checks: [
      { label: 'Employees', done: (d) => d.employees.reported != null || teamTotal(d) != null },
      { label: 'Employee range', done: (d) => Boolean(d.employees.range) },
      { label: 'Team composition', done: (d) => d.team.length > 0 },
      { label: 'Engineering density', done: (d) => d.engDensity.value != null },
      { label: 'HR / TA', done: (d) => d.hr.count != null || d.ta.count != null },
      { label: 'Open roles', done: (d) => d.hiring.jobs.length > 0 },
      { label: 'Employee growth', done: (d) => Boolean(d.employeeGrowth) },
    ],
  },
  gate2: {
    blurb: 'Is hiring actually painful for them? This is the signal Ratch sells against.',
    sections: [
      { title: 'Hiring pain signals', Component: HiringSignalsSection },
      {
        title: 'Per-role analysis',
        subtitle: 'Duplication, reposts and panel detail for each open role',
        Component: JobsSection,
        props: { variant: 'pain' },
      },
    ],
    checks: [
      { label: 'JD analysis', done: (d) => Boolean(d.hiring.jdAnalysis) },
      { label: 'Team analysis', done: (d) => Boolean(d.hiring.teamAnalysis) },
      { label: 'Applicant count', done: (d) => Boolean(d.hiring.applicantCount) },
      { label: 'Hiring pain', done: (d) => Boolean(d.hiring.hiringPain) },
      { label: 'JD duplication', done: (d) => Boolean(d.hiring.jdDuplication) },
      { label: 'Reposts', done: (d) => Boolean(d.hiring.reposts) },
      { label: 'External talent partners', done: (d) => d.hiring.externalPartners.some(Boolean) },
      {
        label: 'Hiring manager / panel',
        done: (d) => Boolean(d.hiring.hiringManager || d.hiring.panel),
      },
    ],
  },
  gate3: {
    blurb: 'Is the underlying business real enough to sustain a deal?',
    sections: [{ title: 'Business / PMF', Component: BusinessSection }],
    checks: [
      { label: 'Product', done: (d) => Boolean(d.business.product) },
      { label: 'Business growth', done: (d) => Boolean(d.business.growth) },
      { label: 'Revenue', done: (d) => Boolean(d.business.revenue) },
      { label: 'PMF', done: (d) => Boolean(d.business.pmf) },
      { label: 'Public perception', done: (d) => Boolean(d.business.publicPerception) },
      { label: 'Customers', done: (d) => Boolean(d.business.customers) },
    ],
  },
  gate4: {
    blurb: 'Who do we contact, and what do we say?',
    sections: [
      { title: 'Decision makers', Component: DecisionMakersSection },
      { title: 'Brief & outreach', Component: OutreachSection },
    ],
    checks: [
      { label: 'Decision makers', done: (d) => d.decisionMakers.some((p) => p.name) },
      { label: 'Characteristics', done: (d) => d.decisionMakers.some((p) => p.characteristics) },
      { label: 'LinkedIn', done: (d) => d.decisionMakers.some((p) => p.linkedin) },
      { label: 'Phone', done: (d) => d.decisionMakers.some((p) => p.phone) },
      { label: 'Email', done: (d) => d.decisionMakers.some((p) => p.email) },
      { label: 'Brief', done: (d) => Boolean(d.brief) },
      { label: 'Outreach', done: (d) => Boolean(d.outreach.status || d.outreach.message) },
    ],
  },
}

function Chevron({ dir = 'right' }) {
  return (
    <Icon viewBox="0 0 24 24" boxSize="12px">
      <path
        d={dir === 'right' ? 'M9 6l6 6-6 6' : 'M15 6l-6 6 6 6'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

function Tick({ done }) {
  return (
    <Icon viewBox="0 0 16 16" boxSize="12px" flexShrink={0} mt="2px">
      {done ? (
        <>
          <circle cx="8" cy="8" r="7" fill="var(--chakra-colors-green-100)" />
          <path
            d="M4.8 8.2 7 10.4l4.2-4.6"
            fill="none"
            stroke="var(--chakra-colors-green-600)"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <circle
          cx="8"
          cy="8"
          r="6.2"
          fill="none"
          stroke="var(--chakra-colors-gray-300)"
          strokeWidth="1.4"
          strokeDasharray="2.5 2.5"
        />
      )}
    </Icon>
  )
}

/** Left rail: all five gates, their status, and how much is captured. */
function StepRail({ draft, current, onSelect }) {
  return (
    <VStack align="stretch" spacing={1.5}>
      {GATES.map((gate) => {
        const step = STEPS[gate.key]
        const done = step.checks.filter((c) => c.done(draft)).length
        const record = draft.gates[gate.key]
        const active = current === gate.index

        return (
          <Box
            key={gate.key}
            as="button"
            type="button"
            textAlign="left"
            onClick={() => onSelect(gate.index)}
            px={3}
            py={2.5}
            borderRadius="md"
            borderWidth="1px"
            borderColor={active ? 'brand.300' : 'surface.border'}
            bg={active ? 'brand.50' : 'surface.raised'}
            _hover={{ borderColor: active ? 'brand.400' : 'surface.borderStrong' }}
            transition="all 120ms ease"
          >
            <Flex justify="space-between" align="center" gap={2} mb={1}>
              <Text
                fontSize="2xs"
                fontWeight={700}
                letterSpacing="0.06em"
                color={active ? 'brand.700' : 'brand.600'}
              >
                {gate.name.toUpperCase()}
              </Text>
              <GateBadge result={record.result} size="xs" />
            </Flex>
            <Text
              fontSize="xs"
              fontWeight={600}
              color={active ? 'gray.900' : 'gray.700'}
              noOfLines={1}
              mb={1.5}
            >
              {gate.title}
            </Text>
            <Progress
              value={(done / step.checks.length) * 100}
              size="xs"
              colorScheme={done === step.checks.length ? 'green' : 'brand'}
              bg="surface.sunken"
              borderRadius="full"
            />
            <Text fontSize="2xs" color="gray.500" mt={1} className="tabular">
              {done} / {step.checks.length} fields captured
            </Text>
          </Box>
        )
      })}
    </VStack>
  )
}

export default function GateForm({ draft, update, addItem, removeItem, audit, initialGate }) {
  // Open on the requested gate, else on the first one with no outcome yet -
  // that is the work still to do.
  const startAt = useMemo(() => {
    if (initialGate != null && GATES[initialGate]) return initialGate
    const idx = GATES.findIndex((g) => draft.gates[g.key].result === 'not_evaluated')
    return idx === -1 ? 0 : idx
    // Computed once, on mount, so the step does not jump while typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [current, setCurrent] = useState(startAt)
  const gate = GATES[current]
  const step = STEPS[gate.key]
  const sectionProps = { draft, update, addItem, removeItem, audit }

  const checks = step.checks.map((c) => ({ ...c, isDone: c.done(draft) }))
  const captured = checks.filter((c) => c.isDone).length

  return (
    <Flex gap={4} align="start" direction={{ base: 'column', lg: 'row' }}>
      <Box w={{ base: '100%', lg: '236px' }} flexShrink={0} position={{ lg: 'sticky' }} top={{ lg: '76px' }}>
        <Text
          fontSize="2xs"
          fontWeight={600}
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="0.05em"
          mb={2}
          px={1}
        >
          Research by gate
        </Text>
        <StepRail draft={draft} current={current} onSelect={setCurrent} />
      </Box>

      <Box flex="1" minW={0}>
        <VStack align="stretch" spacing={4}>
          {/* Step header */}
          <Box
            bg="surface.raised"
            borderWidth="1px"
            borderColor="surface.border"
            borderLeftWidth="3px"
            borderLeftColor="brand.500"
            borderRadius="lg"
            boxShadow="card"
            px={4}
            py={3.5}
          >
            <Flex justify="space-between" align="start" gap={4} mb={2}>
              <Box minW={0}>
                <HStack spacing={2} mb={1}>
                  <Text fontSize="2xs" fontWeight={700} color="brand.600" letterSpacing="0.06em">
                    {gate.name.toUpperCase()}
                  </Text>
                  <Badge colorScheme="gray" variant="subtle">
                    Step {current + 1} of {GATES.length}
                  </Badge>
                </HStack>
                <Heading size="sm">{gate.title}</Heading>
                <Text fontSize="xs" color="gray.600" mt={1}>
                  {step.blurb}
                </Text>
              </Box>
              <GateBadge result={draft.gates[gate.key].result} />
            </Flex>

            {/* Checklist for this gate, ticking over live */}
            <Box mt={3} pt={3} borderTopWidth="1px" borderColor="surface.border">
              <HStack justify="space-between" mb={2}>
                <Text
                  fontSize="2xs"
                  fontWeight={600}
                  color="gray.500"
                  textTransform="uppercase"
                  letterSpacing="0.05em"
                >
                  Fields this gate depends on
                </Text>
                <Text fontSize="2xs" color="gray.500" className="tabular">
                  {captured} / {checks.length} captured
                </Text>
              </HStack>
              <Flex wrap="wrap" columnGap={4} rowGap={1.5}>
                {checks.map((c) => (
                  <HStack key={c.label} spacing={1.5} align="start">
                    <Tick done={c.isDone} />
                    <Text fontSize="xs" color={c.isDone ? 'gray.800' : 'gray.500'}>
                      {c.label}
                    </Text>
                  </HStack>
                ))}
              </Flex>
            </Box>
          </Box>

          {/* The gate's fields */}
          {step.sections.map(({ title, subtitle, Component, props }) => (
            <SectionCard key={title} title={title} subtitle={subtitle}>
              <Component {...sectionProps} {...props} />
            </SectionCard>
          ))}

          {/* The decision */}
          <SectionCard
            title={`${gate.name} decision`}
            subtitle="Leave on “Not evaluated” until the picture is complete — it stays out of every completion figure."
          >
            <GateDecisionSection gate={gate} draft={draft} update={update} />
          </SectionCard>

          {/* Step navigation */}
          <Flex justify="space-between" align="center" gap={3} pb={2}>
            <Button
              variant="outline"
              borderColor="surface.borderStrong"
              leftIcon={<Chevron dir="left" />}
              onClick={() => setCurrent((i) => i - 1)}
              isDisabled={current === 0}
            >
              {current > 0 ? GATES[current - 1].name : 'Back'}
            </Button>

            <Text fontSize="2xs" color="gray.500" textAlign="center" display={{ base: 'none', md: 'block' }}>
              Your entries are held across all five steps — save once when you are done.
            </Text>

            <Button
              colorScheme="brand"
              variant="outline"
              rightIcon={<Chevron />}
              onClick={() => setCurrent((i) => i + 1)}
              isDisabled={current === GATES.length - 1}
            >
              {current < GATES.length - 1 ? GATES[current + 1].name : 'Done'}
            </Button>
          </Flex>
        </VStack>
      </Box>
    </Flex>
  )
}
