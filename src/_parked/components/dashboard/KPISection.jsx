import {
  Box,
  Grid,
  HStack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import StatusBadge from '../common/StatusBadge'

/**
 * A KPI card that can express "not started" as a first-class state.
 * `value === null` renders the status text instead of a number - never 0.
 */
function KPICard({ label, value, of, helper, status, tone = 'gray', tip }) {
  const unavailable = value == null

  const card = (
    <Box
      bg="surface.raised"
      borderWidth="1px"
      borderColor="surface.border"
      borderRadius="lg"
      boxShadow="card"
      px={3.5}
      py={3}
      cursor={tip ? 'help' : 'default'}
      transition="border-color 120ms ease"
      _hover={{ borderColor: 'surface.borderStrong' }}
    >
      <Stat>
        <StatLabel
          fontSize="2xs"
          fontWeight={600}
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="0.05em"
          lineHeight="1.3"
          minH="28px"
          noOfLines={2}
        >
          {label}
        </StatLabel>

        {unavailable ? (
          <Box mt={1.5} mb={0.5}>
            <StatusBadge tone={tone}>{status}</StatusBadge>
          </Box>
        ) : (
          <HStack align="baseline" spacing={1} mt={0.5}>
            <StatNumber fontSize="2xl" fontWeight={650} className="tabular" lineHeight="1.2">
              {value}
            </StatNumber>
            {of != null && (
              <Text fontSize="xs" color="gray.400" className="tabular">
                / {of}
              </Text>
            )}
          </HStack>
        )}

        <StatHelpText fontSize="2xs" color="gray.500" mb={0} mt={1}>
          {helper}
        </StatHelpText>
      </Stat>
    </Box>
  )

  return tip ? (
    <Tooltip label={tip} hasArrow placement="top" openDelay={200}>
      {card}
    </Tooltip>
  ) : (
    card
  )
}

export default function KPISection({ kpis }) {
  return (
    <Grid
      templateColumns={{
        base: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(4, 1fr)',
        xl: 'repeat(7, 1fr)',
      }}
      gap={3}
    >
      {kpis.map((k) => (
        <KPICard key={k.label} {...k} />
      ))}
    </Grid>
  )
}
