import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { usePageMeta } from '../components/layout/AppShell'
import { useWorkspace } from '../state/WorkspaceContext'
import SectionCard from '../components/common/SectionCard'
import EmptyState from '../components/common/EmptyState'
import { GateBadge } from '../components/common/StatusBadge'
import AddCompanyModal from '../components/companies/AddCompanyModal'
import { currentStage, isOutreachPassed } from '../utils/calculations'

function formatCreatedAt(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function Companies() {
  usePageMeta('Companies')
  const { companies } = useWorkspace()
  const addModal = useDisclosure()
  const navigate = useNavigate()

  return (
    <Box flex="1" minH={0} overflowY="auto">
    <Box px={{ base: 4, md: 6 }} py={5} maxW="1400px" mx="auto">
      <Flex
        justify="space-between"
        align={{ base: 'start', md: 'end' }}
        gap={4}
        direction={{ base: 'column', md: 'row' }}
        mb={4}
      >
        <Box>
          <Heading size="lg" letterSpacing="-0.02em">
            Companies
          </Heading>
          <Text fontSize="sm" color="gray.600" mt={1}>
            {companies.length === 0
              ? 'No companies yet — add one from the dashboard.'
              : `${companies.length} compan${companies.length === 1 ? 'y' : 'ies'} tracked`}
          </Text>
        </Box>
        <Button colorScheme="brand" onClick={addModal.onOpen}>
          Add new company
        </Button>
      </Flex>

      <SectionCard
        title="All companies"
        subtitle="Click a company to open Gate 0–5 research"
        bodyProps={{ p: 0 }}
      >
        {companies.length === 0 ? (
          <Box px={4} py={2}>
            <EmptyState
              title="No companies yet"
              description="Add a company to see it listed here with Gate 0 in progress."
              py={12}
            >
              <Button mt={3} colorScheme="brand" onClick={addModal.onOpen}>
                Add new company
              </Button>
            </EmptyState>
          </Box>
        ) : (
          <TableContainer overflowX="auto">
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Company</Th>
                  <Th>Created</Th>
                  <Th>Passing status</Th>
                  <Th>Outreach</Th>
                </Tr>
              </Thead>
              <Tbody>
                {companies.map((company) => {
                  const stage = currentStage(company)
                  const outreachOk = isOutreachPassed(company)
                  return (
                    <Tr
                      key={company.id}
                      _hover={{ bg: 'brand.50' }}
                      cursor="pointer"
                      onClick={() => navigate(`/companies/${company.id}`)}
                    >
                      <Td>
                        <Text fontWeight={600} color="gray.900">
                          {company.name}
                        </Text>
                        {company.location && (
                          <Text fontSize="2xs" color="gray.500" mt={0.5}>
                            {company.location}
                          </Text>
                        )}
                      </Td>
                      <Td>
                        <Text fontSize="sm" color="gray.700" className="tabular">
                          {formatCreatedAt(company.createdAt)}
                        </Text>
                      </Td>
                      <Td>
                        <Flex align="center" gap={2} wrap="wrap">
                          <Badge colorScheme="blue" variant="subtle">
                            {stage.name}
                          </Badge>
                          <GateBadge result={stage.result} size="xs" />
                          <Text fontSize="2xs" color="gray.500">
                            {stage.label}
                          </Text>
                        </Flex>
                      </Td>
                      <Td>
                        <Badge
                          colorScheme={outreachOk ? 'green' : 'gray'}
                          variant={outreachOk ? 'solid' : 'subtle'}
                        >
                          {outreachOk ? 'Passed for outreach' : 'Not passed'}
                        </Badge>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </SectionCard>

      <AddCompanyModal isOpen={addModal.isOpen} onClose={addModal.onClose} />
    </Box>
    </Box>
  )
}
