import {
  Box,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import { usePageMeta } from '../components/layout/AppShell'
import SectionCard from '../components/common/SectionCard'
import StatusBadge from '../components/common/StatusBadge'

function DotGlyph() {
  return (
    <Icon viewBox="0 0 8 8" boxSize="6px" color="gray.300" mt="6px" flexShrink={0}>
      <circle cx="4" cy="4" r="3" fill="currentColor" />
    </Icon>
  )
}

/**
 * Honest placeholder for modules that are not built yet. It states what the
 * module will do and which data it depends on, rather than showing a fake UI.
 */
export default function PlaceholderPage({ title, tagline, description, planned, dependsOn }) {
  usePageMeta(title, 'Coming next')

  return (
    <Box px={{ base: 4, md: 6 }} py={5} maxW="1100px" mx="auto">
      <Flex align="center" gap={3} mb={1.5}>
        <Heading size="lg" letterSpacing="-0.02em">
          {title}
        </Heading>
        <StatusBadge tone="blue">Coming next</StatusBadge>
      </Flex>
      <Text fontSize="sm" color="gray.600" mb={5} maxW="640px">
        {tagline}
      </Text>

      <Grid templateColumns={{ base: '1fr', lg: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap={4}>
        <SectionCard title="What this module will do">
          <Text fontSize="sm" color="gray.700" mb={4} lineHeight="tall">
            {description}
          </Text>
          <VStack align="stretch" spacing={2}>
            {planned.map((p) => (
              <HStack key={p} align="start" spacing={2.5}>
                <DotGlyph />
                <Text fontSize="xs" color="gray.600">
                  {p}
                </Text>
              </HStack>
            ))}
          </VStack>
        </SectionCard>

        <SectionCard title="Blocked on">
          <VStack align="stretch" spacing={3}>
            {dependsOn.map((d) => (
              <Box key={d.label}>
                <HStack justify="space-between" mb={0.5}>
                  <Text fontSize="xs" fontWeight={600} color="gray.700">
                    {d.label}
                  </Text>
                  <StatusBadge tone={d.tone ?? 'gray'}>{d.status}</StatusBadge>
                </HStack>
                <Text fontSize="2xs" color="gray.500" lineHeight="short">
                  {d.detail}
                </Text>
              </Box>
            ))}
          </VStack>
        </SectionCard>
      </Grid>
    </Box>
  )
}

export const PLACEHOLDERS = {
  research: {
    title: 'Research',
    tagline: 'The queue view: what to research next, and what is blocking each company.',
    description:
      'Research turns the gate checklists into an actionable worklist. Instead of opening each company to find out what is missing, a researcher will see one prioritized list of outstanding fields across the whole dataset, grouped by gate.',
    planned: [
      'Worklist of unresearched fields across all companies, ordered by priority',
      'Per-gate research templates matching the 108 sheet columns',
      'Capture form that writes evidence with a source URL and capture date',
      'Conflict resolution queue for the data-quality warnings surfaced today',
      'Researcher assignment and progress tracking',
    ],
    dependsOn: [
      {
        label: 'Evidence store',
        status: 'Not started',
        detail: 'Observations are currently reconstructed from spreadsheet cells with no source URLs.',
      },
      {
        label: 'Write path',
        status: 'Not started',
        detail: 'The prototype is read-only; capturing research needs a persistence layer.',
      },
    ],
  },
  hiring: {
    title: 'Hiring Intelligence',
    tagline: 'Cross-company view of hiring pain — the Gate 2 signal Ratch sells against.',
    description:
      'Today hiring data lives per company on the Hiring tab. This module will aggregate it: which roles are being reposted, where applicant volumes are high but the TA function is thin, and which companies show the sharpest hiring pain across the whole portfolio.',
    planned: [
      'Roles feed across every tracked company with source and freshness',
      'Repost and duplicate-JD detection (Gate 2: JD duplication, reposts)',
      'Applicant-volume vs. TA-headcount pain scoring',
      'External talent partner tracking',
      'Hiring manager and interview panel mapping',
    ],
    dependsOn: [
      {
        label: 'Gate 2 research',
        status: 'Not started',
        tone: 'gray',
        detail: 'JD analysis, applicant counts and hiring pain are unpopulated for all 20 companies.',
      },
      {
        label: 'Structured job records',
        status: 'Partial',
        tone: 'orange',
        detail: 'Roles are currently grouped per job board as free text rather than one record per role.',
      },
    ],
  },
  people: {
    title: 'People',
    tagline: 'Decision makers, HR and talent contacts across the portfolio.',
    description:
      'A person-level index built from Gate 4 research: who makes the hiring decision, who runs talent acquisition, and how each company is best approached.',
    planned: [
      'Directory of decision makers with role and seniority',
      'HR and TA contacts already identified during Gate 1',
      'Characteristics and background notes per person',
      'Contact channels captured during research',
      'Link from any person back to their company profile',
    ],
    dependsOn: [
      {
        label: 'Gate 4 research',
        status: 'Not started',
        detail: 'Decision makers, LinkedIn, phone and email columns are empty for every company.',
      },
      {
        label: 'HR / TA normalization',
        status: 'Partial',
        tone: 'orange',
        detail: 'HR and TA people exist in the sheet as free text inside a single cell.',
      },
    ],
  },
  outreach: {
    title: 'Outreach',
    tagline: 'Sequencing and tracking contact with qualified companies.',
    description:
      'The last step of the workflow: once a company clears Gate 4, this module tracks the message sent, the channel, and the response, so research effort can be measured against outcomes.',
    planned: [
      'Outreach status per company and per decision maker',
      'Message drafts linked to the evidence that justifies them',
      'Response and follow-up tracking',
      'Conversion reporting back to the gate pipeline',
    ],
    dependsOn: [
      {
        label: 'Gate 4 research',
        status: 'Not started',
        detail: 'No outreach messages or statuses exist in the source sheet.',
      },
      {
        label: 'Qualified pipeline',
        status: 'Blocked',
        tone: 'orange',
        detail: 'No company has passed Gate 2 or Gate 3 yet, so nothing is outreach-ready.',
      },
    ],
  },
}
