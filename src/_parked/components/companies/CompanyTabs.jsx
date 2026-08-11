import {
  Badge,
  Box,
  Flex,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react'
import CompanyOverview from './CompanyOverview'
import HiringSnapshot from '../hiring/HiringSnapshot'
import HiringRolesTable from '../hiring/HiringRolesTable'
import TeamComposition from '../team/TeamComposition'
import CompanyGates from '../gates/CompanyGates'
import EvidenceList from '../evidence/EvidenceList'
import OverviewEditor from './editors/OverviewEditor'
import HiringEditor from './editors/HiringEditor'
import TeamEditor from './editors/TeamEditor'
import GateForm from './editors/GateForm'
import EvidenceEditor from './editors/EvidenceEditor'

function TabLabel({ children, count, tone = 'gray' }) {
  return (
    <HStack spacing={1.5}>
      <Box>{children}</Box>
      {count != null && (
        <Badge colorScheme={tone} variant="subtle" className="tabular">
          {count}
        </Badge>
      )}
    </HStack>
  )
}

/**
 * The five research tabs. Each one renders the read-only intelligence view, or
 * its editor when the workspace is in editing mode - the read components are
 * untouched by editing and keep showing the last saved record.
 */
export default function CompanyTabs({
  company,
  isEditing = false,
  draft,
  update,
  addItem,
  removeItem,
  tabIndex,
  onTabChange,
  initialGate,
  onResearchGateRequest,
}) {
  const source = isEditing ? draft : company
  const roleCount = source.hiring.jobs.length
  const conflicts = company.derived.audit.conflicts.length
  const audit = company.derived.audit
  const editProps = { draft, update, addItem, removeItem, audit }

  // From the read-only gate cards: jump straight into that gate's form step.
  const onResearchGate = (gateIndex) => onResearchGateRequest?.(gateIndex)

  const tabStyles = {
    fontSize: 'sm',
    fontWeight: 600,
    color: 'gray.500',
    px: 3,
    py: 2.5,
    borderBottomWidth: '2px',
    borderColor: 'transparent',
    _selected: { color: 'brand.700', borderColor: 'brand.500' },
    _hover: { color: 'gray.800' },
  }

  return (
    <Tabs variant="unstyled" isLazy index={tabIndex} onChange={onTabChange}>
      <Box
        bg="surface.raised"
        borderBottomWidth="1px"
        borderColor="surface.border"
        px={{ base: 2, md: 4 }}
        position="sticky"
        top={0}
        zIndex={10}
      >
        <TabList overflowX="auto" overflowY="hidden">
          <Tab {...tabStyles}>Overview</Tab>
          <Tab {...tabStyles}>
            <TabLabel count={roleCount || undefined} tone="blue">
              Hiring
            </TabLabel>
          </Tab>
          <Tab {...tabStyles}>
            <TabLabel count={source.team.length || undefined}>Team</TabLabel>
          </Tab>
          <Tab {...tabStyles}>
            <TabLabel count={`${company.derived.completion.evaluated}/5`}>Gates</TabLabel>
          </Tab>
          <Tab {...tabStyles}>
            <TabLabel count={source.evidence.length || undefined}>Evidence</TabLabel>
          </Tab>
          {/* Not a <Tab> — it must not register as a panel index. */}
          {conflicts > 0 && (
            <Flex ml="auto" align="center" pl={4} pr={1} flexShrink={0}>
              <Badge colorScheme="red" variant="subtle">
                {conflicts} data conflict{conflicts === 1 ? '' : 's'}
              </Badge>
            </Flex>
          )}
        </TabList>
      </Box>

      <TabPanels>
        <TabPanel px={{ base: 4, md: 6 }} py={5}>
          {isEditing ? (
            <OverviewEditor {...editProps} />
          ) : (
            <CompanyOverview company={company} />
          )}
        </TabPanel>

        <TabPanel px={{ base: 4, md: 6 }} py={5}>
          {isEditing ? (
            <HiringEditor {...editProps} />
          ) : (
            <VStack align="stretch" spacing={4}>
              <HiringSnapshot company={company} />
              <HiringRolesTable company={company} />
            </VStack>
          )}
        </TabPanel>

        <TabPanel px={{ base: 4, md: 6 }} py={5}>
          {isEditing ? <TeamEditor {...editProps} /> : <TeamComposition company={company} />}
        </TabPanel>

        <TabPanel px={{ base: 4, md: 6 }} py={5}>
          {isEditing ? (
            <GateForm {...editProps} initialGate={initialGate} />
          ) : (
            <CompanyGates company={company} onResearch={onResearchGate} />
          )}
        </TabPanel>

        <TabPanel px={{ base: 4, md: 6 }} py={5}>
          {isEditing ? <EvidenceEditor {...editProps} /> : <EvidenceList company={company} />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
