import {
  Box,
  Flex,
  Grid,
  HStack,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from '@chakra-ui/react'
import SectionCard from '../common/SectionCard'
import EmptyState from '../common/EmptyState'
import StatusBadge from '../common/StatusBadge'
import { SourceConflict } from '../common/DataQualityWarning'
import { formatPercent, teamTotal } from '../../utils/calculations'

const FUNCTION_TONES = {
  engineering: 'brand.500',
  'information technology': 'brand.300',
  research: 'purple.400',
  operations: 'teal.400',
  'customer success and support': 'cyan.400',
  marketing: 'orange.300',
  'business development': 'blue.300',
  sales: 'blue.400',
  finance: 'gray.400',
  'human resources': 'pink.300',
  'arts and design': 'purple.300',
  'program and project management': 'teal.300',
  entrepreneurship: 'yellow.400',
  education: 'green.300',
  administrative: 'gray.300',
  purchasing: 'gray.400',
  'media and communication': 'orange.200',
}

function toneFor(fn) {
  return FUNCTION_TONES[fn.toLowerCase()] ?? 'gray.400'
}

function TeamBar({ item, total }) {
  const share = item.count / total
  return (
    <Box>
      <Flex justify="space-between" align="baseline" mb={1} gap={3}>
        <Text fontSize="xs" color="gray.700" fontWeight={500} noOfLines={1}>
          {item.function}
        </Text>
        <HStack spacing={2} flexShrink={0} className="tabular">
          <Text fontSize="sm" fontWeight={600} color="gray.900">
            {item.count}
          </Text>
          <Text fontSize="2xs" color="gray.400" minW="34px" textAlign="right">
            {formatPercent(share, 0)}
          </Text>
        </HStack>
      </Flex>
      <Box h="6px" bg="surface.sunken" borderRadius="full" overflow="hidden">
        <Box h="100%" w={`${share * 100}%`} bg={toneFor(item.function)} borderRadius="full" />
      </Box>
    </Box>
  )
}

export default function TeamComposition({ company }) {
  const team = company.team
  const total = teamTotal(company)
  const density = company.derived.density
  const reported = company.employees?.reported ?? null

  return (
    <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap={4}>
      <SectionCard
        title="Team composition"
        subtitle={
          total != null
            ? `${total} people across ${team.length} recorded functions`
            : 'Not recorded in the sheet'
        }
      >
        {team.length ? (
          <VStack align="stretch" spacing={3}>
            {team.map((t) => (
              <TeamBar key={t.function} item={t} total={total} />
            ))}

            {reported != null && Math.abs(reported - total) > 2 && (
              <Box pt={1}>
                <SourceConflict
                  sourceLabel="Reported headcount"
                  sourceValue={`${reported}`}
                  calcLabel="Sum of recorded functions"
                  calcValue={`${total}`}
                  note={`The breakdown accounts for ${formatPercent(
                    total / reported,
                    0,
                  )} of the reported headcount — ${
                    reported - total > 0
                      ? `${reported - total} people are not attributed to a function`
                      : `${total - reported} more than reported`
                  }.`}
                />
              </Box>
            )}
          </VStack>
        ) : (
          <EmptyState
            title="Team composition not researched"
            description="No function-level breakdown exists for this company in the 108 sheet."
          />
        )}
      </SectionCard>

      <SectionCard title="Engineering density" subtitle="Engineers as a share of headcount">
        {density.engineeringHeadcount == null && density.source == null ? (
          <EmptyState title="Not available" description="No engineering headcount recorded." py={6} />
        ) : (
          <VStack align="stretch" spacing={3.5}>
            <Stat>
              <StatLabel fontSize="2xs" color="gray.500" textTransform="uppercase" letterSpacing="0.05em">
                {density.conflict ? 'Calculated' : 'Engineering density'}
              </StatLabel>
              <HStack align="baseline" spacing={2}>
                <StatNumber fontSize="3xl" fontWeight={650} className="tabular">
                  {formatPercent(density.calculated ?? density.source) ?? '—'}
                </StatNumber>
                {density.conflict && <StatusBadge tone="orange">Needs verification</StatusBadge>}
              </HStack>
              <Text fontSize="2xs" color="gray.500" mt={1}>
                {density.engineeringHeadcount != null && density.calculated != null
                  ? `${density.engineeringHeadcount} engineers ÷ ${
                      density.basis === 'reported headcount' ? density.reported : density.teamTotal
                    } (${density.basis})`
                  : 'Source value only — cannot be recomputed from the recorded team.'}
              </Text>
            </Stat>

            <Progress
              value={(density.calculated ?? density.source ?? 0) * 100}
              size="sm"
              colorScheme="brand"
              bg="surface.sunken"
              borderRadius="full"
            />

            {density.conflict ? (
              <SourceConflict
                sourceLabel="Source value (sheet)"
                sourceValue={formatPercent(density.source)}
                calcLabel={`Calculated on ${density.basis}`}
                calcValue={formatPercent(density.calculated)}
                note={
                  density.calculatedOnTeam != null &&
                  Math.abs(density.calculatedOnTeam - density.source) <= 0.02
                    ? `The sheet value matches ${formatPercent(
                        density.calculatedOnTeam,
                      )} computed against the team breakdown total (${density.teamTotal}), not the reported headcount (${density.reported}). Confirm which denominator Gate 1 should use.`
                    : 'The recorded value cannot be reproduced from either denominator. Confirm the source.'
                }
              />
            ) : (
              <Box fontSize="xs" color="gray.600">
                <HStack justify="space-between" py={1}>
                  <Text>Source value</Text>
                  <Text fontWeight={600} className="tabular">
                    {formatPercent(density.source) ?? 'Not recorded'}
                  </Text>
                </HStack>
                {density.calculatedOnTeam != null && (
                  <HStack justify="space-between" py={1} borderTopWidth="1px" borderColor="surface.border">
                    <Text>On team breakdown</Text>
                    <Text fontWeight={600} className="tabular">
                      {formatPercent(density.calculatedOnTeam)}
                    </Text>
                  </HStack>
                )}
                {density.calculatedOnReported != null && (
                  <HStack justify="space-between" py={1} borderTopWidth="1px" borderColor="surface.border">
                    <Text>On reported headcount</Text>
                    <Text fontWeight={600} className="tabular">
                      {formatPercent(density.calculatedOnReported)}
                    </Text>
                  </HStack>
                )}
              </Box>
            )}
          </VStack>
        )}
      </SectionCard>
    </Grid>
  )
}
