import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { usePageMeta } from '../components/layout/AppShell'
import { useWorkspace } from '../state/WorkspaceContext'
import AddCompanyModal from '../components/companies/AddCompanyModal'
import EmptyState from '../components/common/EmptyState'

function PlusGlyph(props) {
  return (
    <Icon viewBox="0 0 24 24" boxSize="14px" {...props}>
      <path
        d="M12 5v14M5 12h14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  )
}

export default function Dashboard() {
  usePageMeta('Dashboard')
  const { companies } = useWorkspace()
  const addModal = useDisclosure()

  return (
    <Box flex="1" minH={0} overflowY="auto">
    <Box px={{ base: 4, md: 6 }} py={5} maxW="960px" mx="auto">
      <Flex
        justify="space-between"
        align={{ base: 'start', md: 'end' }}
        gap={4}
        direction={{ base: 'column', md: 'row' }}
        mb={8}
      >
        <Box>
          <Heading size="lg" letterSpacing="-0.02em">
            Dashboard
          </Heading>
          <Text fontSize="sm" color="gray.600" mt={1}>
            Start by adding a company. Gates and outreach come next, one step at a time.
          </Text>
        </Box>
        <Button colorScheme="brand" leftIcon={<PlusGlyph />} onClick={addModal.onOpen}>
          Add new company
        </Button>
      </Flex>

      <VStack align="stretch" spacing={5}>
        <EmptyState
          title={companies.length === 0 ? 'Nothing here yet' : 'Dashboard is intentionally empty'}
          description={
            companies.length === 0
              ? 'Add your first company to begin. You will find it under Companies with Gate 0 in progress.'
              : `${companies.length} compan${companies.length === 1 ? 'y is' : 'ies are'} tracked. Open Companies to review gate and outreach status — more dashboard views will land here later.`
          }
          py={16}
        >
          <Flex gap={2} mt={3} wrap="wrap" justify="center">
            <Button colorScheme="brand" leftIcon={<PlusGlyph />} onClick={addModal.onOpen}>
              Add new company
            </Button>
            {companies.length > 0 && (
              <Button
                as={RouterLink}
                to="/companies"
                variant="outline"
                borderColor="surface.borderStrong"
              >
                View companies
              </Button>
            )}
          </Flex>
        </EmptyState>
      </VStack>

      <AddCompanyModal isOpen={addModal.isOpen} onClose={addModal.onClose} />
    </Box>
    </Box>
  )
}
