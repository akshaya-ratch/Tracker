import {
  Box,
  Button,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import { GateBadge } from '../common/StatusBadge'

function CheckGlyph({ done }) {
  return (
    <Icon viewBox="0 0 16 16" boxSize="13px" flexShrink={0} mt="1px">
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

/** Evidence line item: a label with the value actually recorded for it. */
function EvidenceRow({ label, value, missingLabel = 'Not recorded' }) {
  const present = value != null && value !== ''
  return (
    <Flex
      justify="space-between"
      align="start"
      gap={4}
      py={1.5}
      borderBottomWidth="1px"
      borderColor="surface.border"
      _last={{ borderBottom: 'none' }}
    >
      <Text fontSize="xs" color="gray.600" flexShrink={0} minW="140px">
        {label}
      </Text>
      {present ? (
        <Text fontSize="xs" color="gray.800" fontWeight={500} textAlign="right">
          {value}
        </Text>
      ) : (
        <Text fontSize="xs" color="gray.400" fontStyle="italic" textAlign="right">
          {missingLabel}
        </Text>
      )}
    </Flex>
  )
}

/**
 * Checklist of what a gate still needs. Items tick off as the researcher fills
 * them in, so an unevaluated gate can still show partial progress.
 */
function ResearchChecklist({ items }) {
  const done = items.filter((i) => i.done).length
  return (
    <Box>
      <HStack justify="space-between" mb={2}>
        <Text
          fontSize="2xs"
          fontWeight={600}
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="0.05em"
        >
          Research checklist
        </Text>
        <Text fontSize="2xs" color="gray.500" className="tabular">
          {done} / {items.length} captured
        </Text>
      </HStack>
      <Grid
        templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }}
        columnGap={4}
        rowGap={1.5}
      >
        {items.map((item) => (
          <HStack key={item.label} spacing={2} align="start">
            <CheckGlyph done={item.done} />
            <Box minW={0}>
              <Text fontSize="xs" color={item.done ? 'gray.800' : 'gray.600'}>
                {item.label}
              </Text>
              {item.done && (
                <Text fontSize="2xs" color="gray.500" noOfLines={2}>
                  {item.value}
                </Text>
              )}
            </Box>
          </HStack>
        ))}
      </Grid>
    </Box>
  )
}

/** Researcher-entered reasoning and notes, shown once they exist. */
function GateNarrative({ record }) {
  if (!record.evidence && !record.notes) return null
  return (
    <VStack align="stretch" spacing={2.5}>
      {record.evidence && (
        <Box>
          <Text
            fontSize="2xs"
            fontWeight={600}
            color="gray.500"
            textTransform="uppercase"
            letterSpacing="0.05em"
            mb={1}
          >
            Evidence / reasoning
          </Text>
          <Text fontSize="xs" color="gray.700" whiteSpace="pre-wrap" lineHeight="short">
            {record.evidence}
          </Text>
        </Box>
      )}
      {record.notes && (
        <Box
          px={3}
          py={2}
          bg="surface.sunken"
          borderRadius="md"
          borderWidth="1px"
          borderColor="surface.border"
        >
          <Text fontSize="2xs" fontWeight={600} color="gray.500" mb={0.5}>
            NOTES
          </Text>
          <Text fontSize="xs" color="gray.700" whiteSpace="pre-wrap" lineHeight="short">
            {record.notes}
          </Text>
        </Box>
      )}
    </VStack>
  )
}

export default function GateCard({ gate, company, evidence, children, onResearch }) {
  const record = company.gates[gate.key]
  const evaluated = record.result !== 'not_evaluated'

  // Prefer the gate's actual evidence rows so captured fields tick off; fall
  // back to the static field list when a gate has no mapping yet.
  const checklist = evidence.length
    ? evidence.map((e) => ({ label: e.label, value: e.value, done: Boolean(e.value) }))
    : gate.researchFields.map((label) => ({ label, value: null, done: false }))
  const captured = checklist.filter((i) => i.done).length

  return (
    <Box
      bg="surface.raised"
      borderWidth="1px"
      borderColor={evaluated ? 'surface.border' : 'surface.border'}
      borderLeftWidth="3px"
      borderLeftColor={
        record.result === 'pass'
          ? 'green.400'
          : record.result === 'fail'
            ? 'red.400'
            : record.result === 'review' || record.result === 'unknown'
              ? 'blue.400'
              : 'gray.300'
      }
      borderRadius="lg"
      boxShadow="card"
      overflow="hidden"
    >
      <Flex
        align="center"
        justify="space-between"
        gap={3}
        px={4}
        py={3}
        borderBottomWidth="1px"
        borderColor="surface.border"
        bg={evaluated ? 'surface.raised' : 'surface.sunken'}
      >
        <Box minW={0}>
          <HStack spacing={2} mb={0.5}>
            <Text fontSize="2xs" fontWeight={700} color="brand.600" letterSpacing="0.06em">
              {gate.name.toUpperCase()}
            </Text>
            <Heading size="xs">{gate.title}</Heading>
          </HStack>
          <Text fontSize="2xs" color="gray.500" noOfLines={2}>
            {gate.description}
          </Text>
        </Box>
        <HStack spacing={2.5} flexShrink={0} align="center">
          <VStack align="end" spacing={1}>
            <GateBadge result={record.result} />
            {record.reason && (
              <Text fontSize="2xs" color="gray.500" textAlign="right" maxW="180px">
                {record.reason}
              </Text>
            )}
          </VStack>
          {onResearch && (
            <Button
              size="xs"
              variant={evaluated ? 'ghost' : 'outline'}
              colorScheme={evaluated ? 'gray' : 'brand'}
              onClick={() => onResearch(gate.index)}
              rightIcon={
                <Icon viewBox="0 0 24 24" boxSize="11px">
                  <path
                    d="M9 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Icon>
              }
            >
              {evaluated ? 'Edit' : `Research ${gate.name}`}
            </Button>
          )}
        </HStack>
      </Flex>

      <Box p={4}>
        {evaluated ? (
          <VStack align="stretch" spacing={3}>
            <Box>
              <Text
                fontSize="2xs"
                fontWeight={600}
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="0.05em"
                mb={1.5}
              >
                Evidence used
              </Text>
              <Box>
                {evidence.map((e) => (
                  <EvidenceRow key={e.label} {...e} />
                ))}
              </Box>
            </Box>
            <GateNarrative record={record} />
            {record.raw && (
              <Text fontSize="2xs" color="gray.400" fontFamily="mono">
                Recorded outcome: “{record.raw}”
              </Text>
            )}
            {children}
          </VStack>
        ) : (
          <VStack align="stretch" spacing={3.5}>
            <Box
              px={3}
              py={2.5}
              bg="surface.sunken"
              borderRadius="md"
              borderWidth="1px"
              borderColor="surface.border"
            >
              <Text fontSize="sm" fontWeight={600} color="gray.700">
                Not yet evaluated
              </Text>
              <Text fontSize="xs" color="gray.500" mt={0.5}>
                {captured > 0
                  ? `${captured} of ${checklist.length} fields captured — set a status on this gate once the picture is complete.`
                  : `No ${gate.name} outcome has been recorded for this company.`}
              </Text>
            </Box>
            <ResearchChecklist items={checklist} />
            <GateNarrative record={record} />
            {children}
          </VStack>
        )}
      </Box>
    </Box>
  )
}
