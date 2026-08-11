import { Box, Flex, Heading, Text } from '@chakra-ui/react'

/** The one surface primitive: white card, hairline border, restrained shadow. */
export default function SectionCard({
  title,
  subtitle,
  action,
  children,
  bodyProps = {},
  ...rest
}) {
  return (
    <Box
      bg="surface.raised"
      borderWidth="1px"
      borderColor="surface.border"
      borderRadius="lg"
      boxShadow="card"
      overflow="hidden"
      {...rest}
    >
      {(title || action) && (
        <Flex
          flexShrink={0}
          align="center"
          justify="space-between"
          gap={3}
          px={4}
          py={3}
          borderBottomWidth="1px"
          borderColor="surface.border"
        >
          <Box minW={0}>
            {title && (
              <Heading size="xs" letterSpacing="-0.005em">
                {title}
              </Heading>
            )}
            {subtitle && (
              <Text fontSize="xs" color="gray.500" mt={0.5}>
                {subtitle}
              </Text>
            )}
          </Box>
          {action && <Box flexShrink={0}>{action}</Box>}
        </Flex>
      )}
      <Box p={title ? 4 : 0} {...bodyProps}>
        {children}
      </Box>
    </Box>
  )
}
