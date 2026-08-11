import {
  Badge,
  Box,
  Flex,
  Grid,
  HStack,
  Icon,
  Progress,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { GATES, eligibleFor, gateStats } from '../../utils/gates'

function Arrow() {
  return (
    <Flex
      align="center"
      justify="center"
      color="gray.300"
      flexShrink={0}
      px={0.5}
      transform={{ base: 'rotate(90deg)', xl: 'none' }}
    >
      <Icon viewBox="0 0 24 24" boxSize="14px">
        <path
          d="M5 12h14m-5-5 5 5-5 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Icon>
    </Flex>
  )
}

function GateNode({ gate, companies }) {
  const navigate = useNavigate()
  const stats = gateStats(companies, gate.key)
  const queue = eligibleFor(companies, gate.index).length

  const started = stats.started
  const passRate = stats.evaluated ? stats.passed / stats.evaluated : 0

  const status = !started
    ? { label: 'Not started', color: 'gray' }
    : stats.notEvaluated > 0
      ? { label: 'In review', color: 'blue' }
      : { label: 'Complete', color: 'green' }

  return (
    <Box
      role="group"
      cursor="pointer"
      onClick={() => navigate(`/companies/gate/${gate.index}`)}
      bg="surface.raised"
      borderWidth="1px"
      borderColor={started ? 'surface.border' : 'surface.border'}
      borderRadius="lg"
      boxShadow="card"
      px={3.5}
      py={3}
      minW={0}
      flex="1"
      transition="all 120ms ease"
      _hover={{ borderColor: 'brand.300', boxShadow: 'raised' }}
      opacity={started ? 1 : 0.92}
    >
      <Flex justify="space-between" align="center" gap={2} mb={1}>
        <Text fontSize="2xs" fontWeight={700} color="brand.600" letterSpacing="0.06em">
          {gate.name.toUpperCase()}
        </Text>
        <Badge colorScheme={status.color} variant="subtle">
          {status.label}
        </Badge>
      </Flex>

      <Text fontSize="sm" fontWeight={600} color="gray.900" noOfLines={1} mb={0.5}>
        {gate.title}
      </Text>
      <Text fontSize="2xs" color="gray.500" noOfLines={2} minH="28px" lineHeight="short">
        {gate.description}
      </Text>

      <Box mt={2.5}>
        {started ? (
          <>
            <HStack justify="space-between" mb={1.5} className="tabular">
              <Text fontSize="xs" color="gray.600">
                <Text as="span" fontWeight={700} color="gray.900" fontSize="sm">
                  {stats.evaluated}
                </Text>{' '}
                evaluated
              </Text>
              <Tooltip
                hasArrow
                label={`${stats.passed} pass · ${stats.failed} fail`}
                placement="top"
              >
                <Text fontSize="xs" color="gray.600" cursor="help">
                  <Text as="span" fontWeight={700} color="green.600">
                    {stats.passed}
                  </Text>{' '}
                  passed
                </Text>
              </Tooltip>
            </HStack>
            <Progress
              value={passRate * 100}
              size="xs"
              colorScheme="green"
              bg="red.100"
              borderRadius="full"
            />
            <Text fontSize="2xs" color="gray.400" mt={1} className="tabular">
              {Math.round(passRate * 100)}% pass rate
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="xs" color="gray.500" mb={1.5}>
              <Text as="span" fontWeight={700} color="gray.700" fontSize="sm" className="tabular">
                {queue}
              </Text>{' '}
              in queue
            </Text>
            <Progress value={0} size="xs" colorScheme="gray" borderRadius="full" />
            <Text fontSize="2xs" color="gray.400" mt={1}>
              No companies evaluated yet
            </Text>
          </>
        )}
      </Box>
    </Box>
  )
}

/**
 * The workflow spine: Gate 0 → Gate 4, with honest "not started" nodes for the
 * gates the 108 sheet has not reached.
 */
export default function GatePipeline({ companies }) {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        xl: 'repeat(4, minmax(0, 1fr) auto) minmax(0, 1fr)',
      }}
      alignItems="stretch"
      gap={{ base: 2, xl: 0 }}
    >
      {GATES.map((gate, i) => (
        <Box key={gate.key} display="contents">
          <GateNode gate={gate} companies={companies} />
          {i < GATES.length - 1 && <Arrow />}
        </Box>
      ))}
    </Grid>
  )
}
