import { Box, Flex, HStack, Link, Text, Tooltip } from '@chakra-ui/react'
import StatusBadge from '../common/StatusBadge'
import { formatRelativeDays, freshnessInDays } from '../../utils/calculations'

const CATEGORY_TONE = {
  Hiring: 'blue',
  Team: 'teal',
  Funding: 'purple',
  Qualification: 'gray',
}

const STATUS_TONE = {
  Observed: 'green',
  'Needs verification': 'orange',
  'Not researched': 'gray',
}

const CONFIDENCE_TONE = { high: 'green', medium: 'orange', low: 'red' }

export default function EvidenceItem({ item }) {
  const days = freshnessInDays(item.recency)

  return (
    <Flex
      px={4}
      py={3}
      gap={4}
      align="start"
      borderBottomWidth="1px"
      borderColor="surface.border"
      _last={{ borderBottom: 'none' }}
      _hover={{ bg: 'surface.sunken' }}
      direction={{ base: 'column', md: 'row' }}
    >
      <Box minW="96px" flexShrink={0}>
        <StatusBadge tone={CATEGORY_TONE[item.category] ?? 'gray'}>
          {item.category}
        </StatusBadge>
      </Box>

      <Box flex="1" minW={0}>
        <Text fontSize="sm" color="gray.800" lineHeight="short">
          {item.observation}
        </Text>
        {item.notes && (
          <Text fontSize="2xs" color="gray.500" mt={1} lineHeight="short">
            {item.notes}
          </Text>
        )}
        <HStack spacing={2} mt={item.notes ? 1 : 1.5} flexWrap="wrap">
          {item.confidence && (
            <StatusBadge tone={CONFIDENCE_TONE[item.confidence] ?? 'gray'}>
              {item.confidence} confidence
            </StatusBadge>
          )}
          {item.dateChecked && (
            <Text fontSize="2xs" color="gray.500">
              Checked {item.dateChecked}
            </Text>
          )}
        </HStack>
      </Box>

      {/* Fixed widths so the three meta columns line up down the whole list. */}
      <HStack spacing={4} flexShrink={0} align="start" w={{ md: '330px' }}>
        <Box w="104px" flexShrink={0}>
          <Text fontSize="2xs" color="gray.400" mb={0.5}>
            Source
          </Text>
          {item.source || item.sourceUrl ? (
            item.sourceUrl ? (
              <Link
                href={item.sourceUrl}
                isExternal
                fontSize="xs"
                color="brand.600"
                fontWeight={500}
                noOfLines={1}
                onClick={(e) => e.stopPropagation()}
              >
                {item.source ?? item.sourceUrl}
              </Link>
            ) : (
              <Text fontSize="xs" color="gray.700" fontWeight={500} noOfLines={1}>
                {item.source}
              </Text>
            )
          ) : (
            <Tooltip label="No source was recorded in the sheet. URLs are never invented." hasArrow>
              <Text fontSize="xs" color="gray.400" fontStyle="italic" cursor="help">
                Not recorded
              </Text>
            </Tooltip>
          )}
        </Box>

        <Box w="118px" flexShrink={0}>
          <Text fontSize="2xs" color="gray.400" mb={0.5}>
            Recency
          </Text>
          {item.recency ? (
            <Tooltip
              label={days != null ? `≈ ${formatRelativeDays(days)}` : 'Not parseable to a date'}
              hasArrow
            >
              <Text fontSize="xs" color="gray.700" noOfLines={2} cursor="help" lineHeight="short">
                {item.recency}
              </Text>
            </Tooltip>
          ) : (
            <Text fontSize="xs" color="gray.400" fontStyle="italic">
              Unknown
            </Text>
          )}
        </Box>

        <Box w="104px" flexShrink={0}>
          <Text fontSize="2xs" color="gray.400" mb={0.5}>
            Status
          </Text>
          <StatusBadge tone={STATUS_TONE[item.status] ?? 'gray'}>{item.status}</StatusBadge>
        </Box>
      </HStack>
    </Flex>
  )
}
