import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { DEFAULT_FILTERS, useWorkspace } from '../../state/WorkspaceContext'
import { PRIORITY_LEVELS } from '../../utils/priority'

const GATE_OPTIONS = [
  { value: 'all', label: 'Any' },
  { value: 'pass', label: 'Pass' },
  { value: 'fail', label: 'Fail' },
  { value: 'review', label: 'In review' },
  { value: 'not_evaluated', label: 'Not evaluated' },
]

function FilterRow({ label, children }) {
  return (
    <Box>
      <Text
        fontSize="2xs"
        fontWeight={600}
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="0.05em"
        mb={1.5}
      >
        {label}
      </Text>
      {children}
    </Box>
  )
}

export default function CompanyFilters({ isOpen, onClose }) {
  const { filters, setFilter, resetFilters, options, filtered, companies } = useWorkspace()
  const navigate = useNavigate()

  const apply = () => {
    navigate('/companies')
    onClose()
  }

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
      <DrawerOverlay bg="blackAlpha.300" />
      <DrawerContent>
        <DrawerHeader
          borderBottomWidth="1px"
          borderColor="surface.border"
          fontSize="sm"
          fontWeight={600}
          py={3.5}
        >
          Filter companies
          <Text fontSize="2xs" fontWeight={400} color="gray.500" mt={0.5}>
            {filtered.length} of {companies.length} match the current view
          </Text>
        </DrawerHeader>
        <DrawerCloseButton size="sm" top={3} />

        <DrawerBody py={4}>
          <VStack align="stretch" spacing={4}>
            <FilterRow label="Gate 0 — Qualification">
              <Select value={filters.gate0} onChange={(e) => setFilter('gate0', e.target.value)}>
                {GATE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </FilterRow>

            <FilterRow label="Gate 1 — Growth + Hiring">
              <Select value={filters.gate1} onChange={(e) => setFilter('gate1', e.target.value)}>
                {GATE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </FilterRow>

            <FilterRow label="Location">
              <Select
                value={filters.location}
                onChange={(e) => setFilter('location', e.target.value)}
              >
                <option value="all">All locations</option>
                {options.locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>
            </FilterRow>

            <FilterRow label="Funding stage">
              <Select value={filters.funding} onChange={(e) => setFilter('funding', e.target.value)}>
                <option value="all">All stages</option>
                {options.fundingTypes.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </Select>
            </FilterRow>

            <FilterRow label="Prototype priority">
              <Select
                value={filters.priority}
                onChange={(e) => setFilter('priority', e.target.value)}
              >
                <option value="all">Any priority</option>
                {Object.entries(PRIORITY_LEVELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </Select>
            </FilterRow>

            <Box pt={1}>
              <VStack align="stretch" spacing={2.5}>
                <Checkbox
                  size="sm"
                  isChecked={filters.hiringOnly}
                  onChange={(e) => setFilter('hiringOnly', e.target.checked)}
                >
                  <Text fontSize="xs">Only companies with observed open roles</Text>
                </Checkbox>
                <Checkbox
                  size="sm"
                  isChecked={filters.conflictsOnly}
                  onChange={(e) => setFilter('conflictsOnly', e.target.checked)}
                >
                  <Text fontSize="xs">Only companies with data conflicts</Text>
                </Checkbox>
              </VStack>
            </Box>
          </VStack>
        </DrawerBody>

        <DrawerFooter borderTopWidth="1px" borderColor="surface.border" py={3}>
          <HStack w="100%" justify="space-between">
            <Button
              variant="ghost"
              onClick={resetFilters}
              isDisabled={
                JSON.stringify(filters) === JSON.stringify(DEFAULT_FILTERS)
              }
            >
              Reset
            </Button>
            <Button colorScheme="brand" onClick={apply}>
              View {filtered.length} compan{filtered.length === 1 ? 'y' : 'ies'}
            </Button>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
