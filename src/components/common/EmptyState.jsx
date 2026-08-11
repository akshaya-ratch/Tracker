import { Box, Heading, Icon, Text, VStack } from '@chakra-ui/react'

function EmptyGlyph(props) {
  return (
    <Icon viewBox="0 0 24 24" boxSize="22px" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 5.5h16v13H4zM4 9.5h16M9 9.5v9"
      />
    </Icon>
  )
}

export default function EmptyState({
  title,
  description,
  children,
  tone = 'gray',
  icon = true,
  py = 10,
}) {
  return (
    <VStack
      spacing={2}
      py={py}
      px={6}
      textAlign="center"
      borderWidth="1px"
      borderStyle="dashed"
      borderColor={`${tone}.200`}
      bg={tone === 'gray' ? 'surface.sunken' : `${tone}.50`}
      borderRadius="md"
    >
      {icon && <Box color={`${tone}.400`}>{<EmptyGlyph />}</Box>}
      <Heading size="xs" color="gray.700">
        {title}
      </Heading>
      {description && (
        <Text fontSize="xs" color="gray.500" maxW="440px">
          {description}
        </Text>
      )}
      {children}
    </VStack>
  )
}
