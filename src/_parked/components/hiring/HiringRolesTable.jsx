import {
  Box,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react'
import SectionCard from '../common/SectionCard'
import EmptyState from '../common/EmptyState'
import StatusBadge from '../common/StatusBadge'
import { FieldFlag } from '../common/DataQualityWarning'
import { formatRelativeDays, freshnessInDays } from '../../utils/calculations'
import { issuesForField } from '../../utils/dataQuality'

/** Location hints the sheet writes inline, e.g. "(Delhi - remote)". */
const LOCATION_HINT = /\(([^)]*(?:remote|delhi|kolkata|mumbai|bengaluru|bangalore|chennai|hyderabad|pune)[^)]*)\)/i

function splitLocation(text) {
  if (!text) return { role: text, location: null }
  const m = text.match(LOCATION_HINT)
  if (!m) return { role: text, location: null }
  return { role: text.replace(m[0], '').replace(/\s{2,}/g, ' ').trim(), location: m[1].trim() }
}

function Missing({ children = 'Not available' }) {
  return (
    <Text as="span" fontSize="xs" color="gray.400" fontStyle="italic">
      {children}
    </Text>
  )
}

function statusTone(status) {
  if (!status) return 'gray'
  if (/accept/i.test(status)) return 'green'
  if (/closed|expired/i.test(status)) return 'red'
  return 'blue'
}

/**
 * The sheet stores hiring as five parallel multi-line columns grouped by job
 * board. Each row below is one such group, kept intact rather than split into
 * invented per-role records.
 */
export default function HiringRolesTable({ company }) {
  const groups = company.hiring.jobs
  const alignmentIssues = issuesForField(company.derived.audit, 'hiring')

  if (!groups.length) {
    return (
      <SectionCard title="Roles & listings">
        <EmptyState
          title={
            company.hiring.notes.length
              ? 'No open roles found during research'
              : 'Role listings not researched'
          }
          description={
            company.hiring.notes.length
              ? company.hiring.notes.join(' · ')
              : 'The open-roles columns are blank for this company in the 108 sheet.'
          }
        />
      </SectionCard>
    )
  }

  return (
    <SectionCard
      title="Roles & listings"
      subtitle={`${groups.length} listing group${groups.length === 1 ? '' : 's'}, one per source as recorded`}
      action={<FieldFlag issues={alignmentIssues} />}
      bodyProps={{ p: 0 }}
    >
      <TableContainer overflowX="auto">
        <Table>
          <Thead>
            <Tr>
              <Th minW="260px">Role</Th>
              <Th minW="110px">Location</Th>
              <Th minW="110px">Source</Th>
              <Th minW="140px">Recency</Th>
              <Th minW="150px">Applicants</Th>
              <Th minW="120px">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {groups.map((g) => {
              const parsed = splitLocation(g.roles)
              const role = parsed.role
              // An explicitly entered location always beats the one inferred
              // from the role text.
              const location = g.location ?? parsed.location
              const days = freshnessInDays(g.recency)
              const gate2 = [
                g.jdDuplication && `JD duplication: ${g.jdDuplication}`,
                g.reposted && `Reposted: ${g.reposted}`,
                g.hiringManager && `Hiring manager: ${g.hiringManager}`,
                g.panel && `Panel: ${g.panel}`,
              ].filter(Boolean)
              return (
                <Tr key={g.index}>
                  <Td>
                    <Text fontSize="sm" color="gray.800" whiteSpace="normal">
                      {role || <Missing>Role title not recorded</Missing>}
                    </Text>
                    {gate2.length > 0 && (
                      <Text fontSize="2xs" color="gray.500" mt={1} whiteSpace="normal">
                        {gate2.join(' · ')}
                      </Text>
                    )}
                    {g.jdAnalysis && (
                      <Text fontSize="2xs" color="gray.600" mt={1} whiteSpace="normal">
                        {g.jdAnalysis}
                      </Text>
                    )}
                  </Td>
                  <Td>
                    {location ? (
                      <Text fontSize="xs" color="gray.700">
                        {location}
                      </Text>
                    ) : (
                      <Missing>Not specified</Missing>
                    )}
                  </Td>
                  <Td>
                    {g.source ? (
                      <StatusBadge tone="gray">{g.source}</StatusBadge>
                    ) : (
                      <Missing />
                    )}
                  </Td>
                  <Td>
                    {g.recency ? (
                      <HStack spacing={1.5}>
                        <Text fontSize="xs" color="gray.700" whiteSpace="normal">
                          {g.recency}
                        </Text>
                        {days != null && (
                          <Tooltip
                            hasArrow
                            label={`Freshest listing in this group: ${formatRelativeDays(days)}`}
                          >
                            <Box
                              boxSize="6px"
                              borderRadius="full"
                              flexShrink={0}
                              bg={days <= 14 ? 'green.400' : days <= 60 ? 'orange.300' : 'gray.300'}
                            />
                          </Tooltip>
                        )}
                      </HStack>
                    ) : (
                      <Missing />
                    )}
                  </Td>
                  <Td>
                    {g.applicants ? (
                      <Text fontSize="xs" color="gray.700" whiteSpace="normal">
                        {g.applicants}
                      </Text>
                    ) : (
                      <Missing>Not captured</Missing>
                    )}
                  </Td>
                  <Td>
                    {g.status ? (
                      <StatusBadge tone={statusTone(g.status)}>{g.status}</StatusBadge>
                    ) : (
                      <Missing>Unknown</Missing>
                    )}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>

      <Box px={4} py={2.5} borderTopWidth="1px" borderColor="surface.border" bg="surface.sunken">
        <Text fontSize="2xs" color="gray.500" lineHeight="short">
          Rows preserve the sheet's grouping: one entry per job board, with the roles,
          recency and applicant notes exactly as captured. Values are matched across
          columns by position — where a column has fewer entries than the role column,
          the cell is shown as not captured rather than guessed.
        </Text>
      </Box>
    </SectionCard>
  )
}
