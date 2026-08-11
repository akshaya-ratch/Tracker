import {
  Box,
  Flex,
  HStack,
  Icon,
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
import { useNavigate } from 'react-router-dom'
import { useWorkspace } from '../../state/WorkspaceContext'
import { primaryCity } from '../../data/repository'
import { GateBadge, PriorityBadge } from '../common/StatusBadge'
import { FieldFlag } from '../common/DataQualityWarning'
import EmptyState from '../common/EmptyState'
import { formatPercent } from '../../utils/calculations'
import { issuesForField } from '../../utils/dataQuality'

/**
 * Fixed widths keep all twelve columns on screen at desktop widths - the gate
 * and priority columns are the point of the table and must not fall off the
 * right edge. Below TABLE_MIN_WIDTH the container scrolls horizontally.
 */
const COLUMNS = [
  { key: 'name', label: 'Company', align: 'left', w: '178px' },
  { key: 'foundedYear', label: 'Founded', align: 'right', w: '62px' },
  { key: 'location', label: 'Location', align: 'left', w: '108px' },
  { key: 'funding', label: 'Funding', align: 'left', w: '164px' },
  { key: 'employees', label: 'Employees', align: 'right', w: '86px' },
  { key: 'openRoles', label: 'Open roles', align: 'right', w: '88px' },
  { key: 'hrTa', label: 'HR / TA', align: 'right', w: '68px' },
  { key: 'engDensity', label: 'Eng density', align: 'right', w: '88px' },
  { key: 'growth', label: 'Emp. growth', align: 'left', w: '96px' },
  { key: 'gate0', label: 'Gate 0', align: 'left', w: '72px' },
  { key: 'gate1', label: 'Gate 1', align: 'left', w: '92px' },
  { key: 'priority', label: 'Priority', align: 'left', w: '108px' },
  { key: null, label: '', align: 'right', w: '38px' },
]

const TABLE_MIN_WIDTH = '1248px'

/** Row affordance: every row opens that company's research workspace. */
function OpenGlyph() {
  return (
    <Icon viewBox="0 0 24 24" boxSize="14px" color="gray.300" _groupHover={{ color: 'brand.500' }}>
      <path
        d="M9 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

function SortGlyph({ state }) {
  return (
    <Icon viewBox="0 0 12 12" boxSize="9px" ml={1} opacity={state ? 1 : 0.35}>
      <path
        d="M6 2 9 5.5H3L6 2Z"
        fill="currentColor"
        opacity={state === 'asc' || !state ? 1 : 0.25}
      />
      <path
        d="M6 10 3 6.5h6L6 10Z"
        fill="currentColor"
        opacity={state === 'desc' || !state ? 1 : 0.25}
      />
    </Icon>
  )
}

/** "Not researched" is rendered as text, never as a zero. */
function Absent({ children = 'Not available' }) {
  return (
    <Text as="span" fontSize="xs" color="gray.400" fontStyle="italic">
      {children}
    </Text>
  )
}

function CompanyRow({ company, onOpen }) {
  const { derived, gates } = company
  const audit = derived.audit
  const density = derived.density.calculated ?? derived.density.source
  const { count: hrCount, sourceNote: hrRaw } = company.hr
  const { count: taCount } = company.ta
  const roles = company.openRoles?.atLeast ?? 0

  return (
    <Tr
      role="group"
      cursor="pointer"
      onClick={() => onOpen(company.id)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen(company.id)
        }
      }}
      _focusVisible={{ outline: '2px solid', outlineColor: 'brand.400', outlineOffset: '-2px' }}
      title={`Open ${company.name}'s research workspace`}
    >
      <Td>
        <Flex align="center" gap={2}>
          <Box minW={0}>
            <Text fontSize="sm" fontWeight={600} color="gray.900" noOfLines={1}>
              {company.name}
            </Text>
            <Text fontSize="2xs" color="gray.500" noOfLines={1}>
              {company.founders.length
                ? company.founders.slice(0, 2).join(', ') +
                  (company.founders.length > 2 ? ` +${company.founders.length - 2}` : '')
                : 'Founders not recorded'}
            </Text>
          </Box>
          {audit.conflicts.length > 0 && (
            <Tooltip
              hasArrow
              placement="top"
              label={audit.conflicts.map((c) => c.title).join(' · ')}
            >
              <Box
                boxSize="6px"
                borderRadius="full"
                bg="red.400"
                flexShrink={0}
                aria-label="Has data conflicts"
              />
            </Tooltip>
          )}
        </Flex>
      </Td>

      <Td textAlign="right" className="tabular" color="gray.700">
        {company.foundedYear ?? <Absent />}
      </Td>

      <Td>
        <Text fontSize="xs" color="gray.700" noOfLines={1}>
          {primaryCity(company.location) ?? <Absent />}
        </Text>
      </Td>

      <Td>
        <Text fontSize="xs" fontWeight={500} color="gray.800" noOfLines={1}>
          {company.funding.type ?? <Absent />}
        </Text>
        <Tooltip label={company.funding.amount} hasArrow placement="top" openDelay={300}>
          <Text fontSize="2xs" color="gray.500" noOfLines={1}>
            {company.funding.amount ?? '—'}
          </Text>
        </Tooltip>
      </Td>

      <Td textAlign="right">
        {derived.headcount != null ? (
          <HStack justify="flex-end" spacing={1}>
            <Text fontSize="sm" className="tabular" color="gray.800">
              {derived.headcount}
            </Text>
            <FieldFlag issues={issuesForField(audit, 'employees').filter((i) => i.severity === 'conflict')} label="!" />
          </HStack>
        ) : (
          <Absent />
        )}
      </Td>

      <Td textAlign="right">
        {roles > 0 ? (
          <Tooltip
            hasArrow
            placement="top"
            label="Lower bound — the sheet groups roles per job board, so overlapping listings are counted once."
          >
            <Text fontSize="sm" className="tabular" color="gray.800" cursor="help">
              ≥ {roles}
            </Text>
          </Tooltip>
        ) : company.hiring.notes.length ? (
          <Tooltip hasArrow placement="top" label={company.hiring.notes.join(' · ')}>
            <Text fontSize="xs" color="gray.500" cursor="help">
              None found
            </Text>
          </Tooltip>
        ) : (
          <Absent>Not researched</Absent>
        )}
      </Td>

      <Td textAlign="right">
        {hrRaw == null ? (
          <Absent>Not researched</Absent>
        ) : (
          <Tooltip hasArrow placement="top" label={hrRaw} openDelay={200}>
            <Text fontSize="sm" className="tabular" color="gray.800" cursor="help">
              {hrCount ?? '?'} / {taCount ?? '?'}
            </Text>
          </Tooltip>
        )}
      </Td>

      <Td textAlign="right">
        {density == null ? (
          <Absent />
        ) : (
          <HStack justify="flex-end" spacing={1}>
            <Text
              fontSize="sm"
              className="tabular"
              color={density >= 0.3 ? 'gray.800' : 'gray.500'}
              fontWeight={density >= 0.3 ? 600 : 400}
            >
              {formatPercent(density, 0)}
            </Text>
            {/* Flag conflicts always, and warnings when the value cannot be
                recomputed at all - a bare "0%" would otherwise read as fact. */}
            <FieldFlag
              issues={issuesForField(audit, 'engDensity').filter(
                (i) =>
                  i.severity === 'conflict' ||
                  (derived.density.calculated == null && i.severity === 'warning'),
              )}
              label="!"
            />
          </HStack>
        )}
      </Td>

      <Td>
        {company.employeeGrowth ? (
          <Text fontSize="xs" color="gray.700">
            {company.employeeGrowth}
          </Text>
        ) : (
          <Absent>Not researched</Absent>
        )}
      </Td>

      <Td>
        <GateBadge result={gates.gate0.result} reason={gates.gate0.reason} size="xs" />
      </Td>
      <Td>
        <GateBadge result={gates.gate1.result} reason={gates.gate1.reason} size="xs" />
      </Td>
      <Td>
        <PriorityBadge priority={derived.priority} />
      </Td>
      <Td textAlign="right" pr={2}>
        <OpenGlyph />
      </Td>
    </Tr>
  )
}

export default function CompanyTable({ companies, emptyMessage }) {
  const { sort, toggleSort } = useWorkspace()
  const navigate = useNavigate()

  if (!companies.length) {
    return (
      <Box p={4}>
        <EmptyState
          title="No companies match this view"
          description={emptyMessage ?? 'Clear a filter or change the search term to widen the result set.'}
        />
      </Box>
    )
  }

  return (
    <TableContainer overflowX="auto">
      <Table sx={{ tableLayout: 'fixed' }} w="100%" minW={TABLE_MIN_WIDTH}>
        <Thead position="sticky" top={0} zIndex={1}>
          <Tr>
            {COLUMNS.map((col) => {
              // The trailing chevron column is not sortable.
              if (!col.key) return <Th key="open" w={col.w} />
              const active = sort.key === col.key
              return (
                <Th
                  key={col.key}
                  textAlign={col.align}
                  w={col.w}
                  cursor="pointer"
                  userSelect="none"
                  onClick={() => toggleSort(col.key)}
                  color={active ? 'gray.800' : undefined}
                  _hover={{ color: 'gray.800' }}
                >
                  <Flex
                    align="center"
                    justify={col.align === 'right' ? 'flex-end' : 'flex-start'}
                  >
                    {col.label}
                    <SortGlyph state={active ? sort.direction : null} />
                  </Flex>
                </Th>
              )
            })}
          </Tr>
        </Thead>
        <Tbody>
          {companies.map((c) => (
            <CompanyRow key={c.id} company={c} onOpen={(id) => navigate(`/companies/${id}`)} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}
