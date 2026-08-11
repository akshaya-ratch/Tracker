import { useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { usePageMeta } from '../components/layout/AppShell'
import { useWorkspace } from '../state/WorkspaceContext'
import { useCompanyDraft } from '../state/useCompanyDraft'
import GateWorkspace from '../components/gates/GateWorkspace'
import { GateBadge } from '../components/common/StatusBadge'
import { currentStage } from '../utils/calculations'
import { GATES } from '../utils/gates'
import { newEntityId } from '../data/createCompany'

function emptyGate() {
  return {
    raw: null,
    result: 'not_evaluated',
    reason: null,
    notes: null,
    evidence: null,
  }
}

/** Fill any missing gate / hiring fields so older records open cleanly. */
function normalizeCompany(company) {
  const gates = { ...(company.gates ?? {}) }
  for (const g of GATES) {
    if (!gates[g.key]) gates[g.key] = emptyGate()
  }

  const founders = (company.founders ?? []).map((f) =>
    typeof f === 'string'
      ? { id: newEntityId('founder'), name: f, designation: null, linkedin: null }
      : f,
  )

  const rawBadge = company.hiring?.hiringBadge
  const hiringBadge =
    rawBadge && typeof rawBadge === 'object' && !('raw' in rawBadge)
      ? {
          personId: rawBadge.personId ?? null,
          name: rawBadge.name ?? null,
          role: rawBadge.role ?? null,
          linkedin: rawBadge.linkedin ?? null,
        }
      : { personId: null, name: null, role: null, linkedin: null }

  return {
    ...company,
    founders,
    people: company.people ?? [],
    gates,
    funding: {
      type: null,
      amount: null,
      date: null,
      agenda: null,
      amountRaw: null,
      investors: [],
      remarks: null,
      ...(company.funding ?? {}),
    },
    hiring: {
      jobs: [],
      notes: [],
      urgencySignal: null,
      jdDuplication: null,
      ...(company.hiring ?? {}),
      externalTalentPartner: {
        present: null,
        name: null,
        ...(company.hiring?.externalTalentPartner ?? {}),
      },
      hiringManager: {
        type: null,
        name: null,
        personId: null,
        ...(company.hiring?.hiringManager ?? {}),
      },
      hiringBadge,
    },
    hr: company.hr ?? { count: null, people: [], sourceNote: null, statedNone: false },
    ta: company.ta ?? { count: null, people: [], sourceNote: null, statedNone: false },
  }
}

function NotFound() {
  usePageMeta('Company not found')
  return (
    <Box px={{ base: 4, md: 6 }} py={10} maxW="720px" mx="auto">
      <Heading size="md">Company not found</Heading>
      <Text fontSize="sm" color="gray.600" mt={2}>
        It may have been removed, or the link is wrong.
      </Text>
      <Button as={RouterLink} to="/companies" mt={4} colorScheme="brand" size="sm">
        Back to companies
      </Button>
    </Box>
  )
}

export default function CompanyDetails() {
  const { id } = useParams()
  const { getCompany } = useWorkspace()
  const company = getCompany(id)
  if (!company) return <NotFound />
  return <CompanyResearchPage company={normalizeCompany(company)} />
}

function CompanyResearchPage({ company }) {
  const navigate = useNavigate()
  const toast = useToast()
  const stage = currentStage(company)

  usePageMeta(company.name, stage.label)

  const { draft, setDraft, isDirty, save, cancel, syncTo } = useCompanyDraft(company, true)

  // Keep draft in sync if the saved company identity changes.
  useEffect(() => {
    syncTo(normalizeCompany(company))
  }, [company.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSave = (next) => {
    const saved = save(next)
    toast({
      title: `${saved.name} saved`,
      description: currentStage(saved).label,
      status: 'success',
      duration: 2500,
      isClosable: true,
    })
  }

  return (
    <Box flex="1" minH={0} overflowY="auto">
    <Box px={{ base: 4, md: 6 }} py={5} maxW="1100px" mx="auto">
      <Flex
        justify="space-between"
        align={{ base: 'start', md: 'center' }}
        gap={3}
        mb={5}
        direction={{ base: 'column', md: 'row' }}
      >
        <Box minW={0}>
          <Button
            size="xs"
            variant="ghost"
            mb={1}
            onClick={() => navigate('/companies')}
            px={0}
            color="gray.500"
            fontWeight={500}
          >
            ← Companies
          </Button>
          <Heading size="lg" letterSpacing="-0.02em" noOfLines={1}>
            {company.name}
          </Heading>
          <HStack mt={1.5} spacing={2} flexWrap="wrap">
            <GateBadge result={stage.result} />
            <Text fontSize="sm" color="gray.600">
              {stage.label}
            </Text>
            {company.location && (
              <Text fontSize="sm" color="gray.500">
                · {company.location}
              </Text>
            )}
          </HStack>
        </Box>

        <HStack spacing={2}>
          {isDirty && (
            <Button size="sm" variant="ghost" onClick={cancel}>
              Discard
            </Button>
          )}
        </HStack>
      </Flex>

      <VStack align="stretch" spacing={4}>
        <GateWorkspace
          draft={draft}
          setDraft={setDraft}
          onSave={handleSave}
          isDirty={isDirty}
        />
      </VStack>
    </Box>
    </Box>
  )
}
