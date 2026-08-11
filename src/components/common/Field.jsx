import { Box, HStack, Text } from '@chakra-ui/react'
import { FieldFlag } from './DataQualityWarning'

export const NOT_AVAILABLE = 'Not available'
export const NOT_RESEARCHED = 'Not yet researched'

/**
 * Renders a value, or an explicit absence marker. Missing data is never shown
 * as 0 or an empty cell - it is labelled.
 */
export function Value({ children, fallback = NOT_AVAILABLE, ...rest }) {
  const empty =
    children == null ||
    children === '' ||
    (Array.isArray(children) && children.length === 0)

  if (empty) {
    return (
      <Text as="span" fontSize="sm" color="gray.400" fontStyle="italic" {...rest}>
        {fallback}
      </Text>
    )
  }
  return (
    <Text as="span" fontSize="sm" color="gray.800" {...rest}>
      {children}
    </Text>
  )
}

/** Label-above-value pair used across the Overview and Hiring tabs. */
export default function Field({
  label,
  value,
  fallback,
  issues,
  children,
  align = 'start',
  ...rest
}) {
  return (
    <Box {...rest}>
      <HStack spacing={1.5} mb={1} align="center" justify={align === 'end' ? 'flex-end' : 'flex-start'}>
        <Text
          fontSize="2xs"
          fontWeight={600}
          color="gray.500"
          textTransform="uppercase"
          letterSpacing="0.05em"
          whiteSpace="nowrap"
        >
          {label}
        </Text>
        <FieldFlag issues={issues} />
      </HStack>
      {children ?? <Value fallback={fallback}>{value}</Value>}
    </Box>
  )
}
