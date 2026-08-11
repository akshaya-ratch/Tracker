import {
  Alert,
  AlertDescription,
  Badge,
  Box,
  HStack,
  Icon,
  List,
  ListItem,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { SEVERITY } from '../../utils/dataQuality'

function WarningGlyph(props) {
  return (
    <Icon viewBox="0 0 16 16" boxSize="12px" {...props}>
      <path
        fill="currentColor"
        d="M8 1.5 15 14H1L8 1.5Zm0 4.3a.7.7 0 0 0-.7.75l.2 3a.5.5 0 0 0 1 0l.2-3A.7.7 0 0 0 8 5.8Zm0 5.2a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
      />
    </Icon>
  )
}

/** "4 source conflicts" / "2 need verification" / "3 not available". */
function summarise(severity, count) {
  if (severity === 'conflict') return `${count} source conflict${count === 1 ? '' : 's'}`
  if (severity === 'warning') return `${count} need${count === 1 ? 's' : ''} verification`
  return `${count} not available`
}

/** Small inline flag that sits next to a suspect value. */
export function FieldFlag({ issues, label }) {
  if (!issues?.length) return null
  const worst = issues.some((i) => i.severity === 'conflict')
    ? 'conflict'
    : issues.some((i) => i.severity === 'warning')
      ? 'warning'
      : 'missing'
  const meta = SEVERITY[worst]

  return (
    <Tooltip
      hasArrow
      placement="top"
      openDelay={150}
      label={
        <VStack align="start" spacing={1}>
          {issues.map((i, idx) => (
            <Box key={idx}>
              <Text fontWeight={600}>{i.title}</Text>
              <Text opacity={0.85}>{i.detail}</Text>
            </Box>
          ))}
        </VStack>
      }
    >
      <Badge
        colorScheme={meta.color}
        variant="subtle"
        display="inline-flex"
        alignItems="center"
        gap={1}
        cursor="help"
      >
        <WarningGlyph />
        {label ?? meta.label}
      </Badge>
    </Tooltip>
  )
}

/**
 * Explicit source-vs-calculated disclosure. Never overwrite the researcher's
 * manually entered value - show both and let them decide.
 */
export function SourceConflict({ sourceLabel, sourceValue, calcLabel, calcValue, note }) {
  return (
    <Box
      borderWidth="1px"
      borderColor="orange.200"
      bg="orange.50"
      borderRadius="md"
      px={3}
      py={2}
      fontSize="xs"
    >
      <HStack spacing={2} mb={1.5}>
        <WarningGlyph color="orange.500" />
        <Text fontWeight={600} color="orange.800">
          Needs verification
        </Text>
      </HStack>
      <VStack align="stretch" spacing={0.5} className="tabular">
        <HStack justify="space-between">
          <Text color="gray.600">{sourceLabel}</Text>
          <Text fontWeight={600} color="gray.800">
            {sourceValue}
          </Text>
        </HStack>
        <HStack justify="space-between">
          <Text color="gray.600">{calcLabel}</Text>
          <Text fontWeight={600} color="gray.800">
            {calcValue}
          </Text>
        </HStack>
      </VStack>
      {note && (
        <Text mt={1.5} color="orange.700" lineHeight="short">
          {note}
        </Text>
      )}
    </Box>
  )
}

/** Full audit panel used on the company page. */
export default function DataQualityWarning({ audit, compact = false, flat = false }) {
  if (!audit.issues.length) return null

  const groups = [
    { key: 'conflict', items: audit.conflicts },
    { key: 'warning', items: audit.warnings },
    { key: 'missing', items: audit.missing },
  ].filter((g) => g.items.length)

  if (compact) {
    return (
      <HStack spacing={1.5}>
        {groups.map((g) => (
          <Badge key={g.key} colorScheme={SEVERITY[g.key].color} variant="subtle">
            {g.items.length} {SEVERITY[g.key].label.toLowerCase()}
          </Badge>
        ))}
      </HStack>
    )
  }

  return (
    <Alert
      status={audit.conflicts.length ? 'warning' : 'info'}
      variant="left-accent"
      alignItems="flex-start"
      borderRadius="md"
      py={flat ? 0 : 3}
      px={flat ? 0 : 4}
      bg={flat ? 'transparent' : undefined}
      borderLeftWidth={flat ? 0 : undefined}
    >
      <Box>
        <HStack spacing={2} mb={2} display={flat ? 'none' : 'flex'}>
          <Text fontWeight={600} fontSize="sm">
            Data quality
          </Text>
          {groups.map((g) => (
            <Badge key={g.key} colorScheme={SEVERITY[g.key].color} variant="subtle">
              {summarise(g.key, g.items.length)}
            </Badge>
          ))}
        </HStack>
        <AlertDescription>
          <List spacing={1.5} fontSize="xs">
            {audit.issues.map((issue, i) => (
              <ListItem key={i}>
                <HStack align="start" spacing={2}>
                  <Badge
                    colorScheme={SEVERITY[issue.severity].color}
                    variant="subtle"
                    flexShrink={0}
                    minW="94px"
                    textAlign="center"
                    whiteSpace="nowrap"
                  >
                    {SEVERITY[issue.severity].label}
                  </Badge>
                  <Box>
                    <Text as="span" fontWeight={600} color="gray.800">
                      {issue.title}.
                    </Text>{' '}
                    <Text as="span" color="gray.600">
                      {issue.detail}
                    </Text>
                  </Box>
                </HStack>
              </ListItem>
            ))}
          </List>
        </AlertDescription>
      </Box>
    </Alert>
  )
}
