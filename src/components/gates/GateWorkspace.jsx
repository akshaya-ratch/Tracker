import { useCallback } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import { GATES } from '../../utils/gates'
import {
  calcEngDensity,
  calcTaPercent,
  formatPercent,
} from '../../utils/calculations'
import Gate0Form from './Gate0Form'
import Gate1Form from './Gate1Form'
import Gate2Form from './Gate2Form'
import GatePlaceholderForm from './GatePlaceholderForm'

/** Immutable nested set by dotted path (mirrors useCompanyDraft.setPath). */
function setPath(object, path, value) {
  const keys = String(path).split('.')
  const clone = Array.isArray(object) ? [...object] : { ...object }
  let cursor = clone
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    const next = cursor[key]
    cursor[key] = Array.isArray(next) ? [...next] : { ...(next ?? {}) }
    cursor = cursor[key]
  }
  cursor[keys[keys.length - 1]] = value
  return clone
}

/** Attach Gate 1 derived metrics before persisting. */
function withGate1Computed(draft) {
  const jobs = draft.hiring?.jobs ?? []
  const taPct = calcTaPercent(draft)
  const engDens = calcEngDensity(draft)

  return {
    ...draft,
    openRoles: {
      ...(draft.openRoles ?? {}),
      atLeast: jobs.length,
      exact: draft.openRoles?.exact ?? false,
    },
    taPercent: {
      value: taPct == null ? null : taPct / 100,
      raw: taPct == null ? null : `${taPct.toFixed(1)}%`,
      unitAmbiguous: false,
    },
    engDensity: {
      value: engDens,
      raw: engDens == null ? null : formatPercent(engDens),
      unitAmbiguous: false,
    },
  }
}

/**
 * Company research workspace: tabs for Gate 0–5.
 * Props: { draft, setDraft, onSave, isDirty }
 */
export default function GateWorkspace({ draft, setDraft, onSave, isDirty }) {
  const update = useCallback(
    (path, value) => {
      setDraft((d) => setPath(d, path, value))
    },
    [setDraft],
  )

  const handleSave = () => {
    const next = withGate1Computed(draft)
    setDraft(next)
    onSave?.(next)
  }

  return (
    <Box>
      <Flex
        align={{ base: 'stretch', sm: 'center' }}
        justify="space-between"
        gap={3}
        mb={4}
        direction={{ base: 'column', sm: 'row' }}
      >
        <Box minW={0}>
          <Heading size="sm" letterSpacing="-0.01em" noOfLines={1}>
            {draft.name || 'Untitled company'}
          </Heading>
          <Text fontSize="xs" color="gray.500" mt={0.5}>
            Gate-by-gate research workspace
          </Text>
        </Box>
        <Button
          size="sm"
          colorScheme="brand"
          onClick={handleSave}
          isDisabled={isDirty === false}
        >
          Save
        </Button>
      </Flex>

      <Tabs variant="enclosed" colorScheme="brand" isLazy>
        <TabList overflowX="auto" overflowY="hidden" flexWrap="nowrap">
          {GATES.map((gate) => (
            <Tab key={gate.key} whiteSpace="nowrap" fontSize="sm">
              {gate.name}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel px={0} pt={4}>
            <Gate0Form draft={draft} update={update} />
          </TabPanel>
          <TabPanel px={0} pt={4}>
            <Gate1Form draft={draft} update={update} />
          </TabPanel>
          <TabPanel px={0} pt={4}>
            <Gate2Form draft={draft} update={update} />
          </TabPanel>
          <TabPanel px={0} pt={4}>
            <GatePlaceholderForm gateKey="gate3" draft={draft} update={update} />
          </TabPanel>
          <TabPanel px={0} pt={4}>
            <GatePlaceholderForm gateKey="gate4" draft={draft} update={update} />
          </TabPanel>
          <TabPanel px={0} pt={4}>
            <GatePlaceholderForm gateKey="gate5" draft={draft} update={update} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
