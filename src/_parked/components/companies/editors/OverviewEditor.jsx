import { Grid, VStack } from '@chakra-ui/react'
import SectionCard from '../../common/SectionCard'
import { TextField } from '../../common/FormFields'
import {
  BusinessSection,
  DecisionMakersSection,
  FoundersSection,
  FundingSection,
  IdentitySection,
} from './sections'
import { issuesForField } from '../../../utils/dataQuality'

/**
 * Overview editing, organised by topic. Every field here is the same component
 * the gate-by-gate form uses - see ./sections.jsx.
 */
export default function OverviewEditor(props) {
  const { draft, update, audit } = props

  return (
    <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap={4}>
      <VStack align="stretch" spacing={4}>
        <SectionCard title="Company information">
          <IdentitySection {...props} />
          <VStack align="stretch" mt={4}>
            <TextField
              label="Employee growth"
              value={draft.employeeGrowth}
              onChange={(v) => update('employeeGrowth', v)}
              issues={issuesForField(audit, 'employeeGrowth')}
              helper="Gate 1 field — empty for every company in the source sheet."
            />
          </VStack>
        </SectionCard>

        <SectionCard title="Funding" subtitle="Gate 0 research">
          <FundingSection {...props} />
        </SectionCard>

        <SectionCard title="Business / PMF" subtitle="Gate 3 research">
          <BusinessSection {...props} />
        </SectionCard>
      </VStack>

      <VStack align="stretch" spacing={4}>
        <SectionCard title="Founders" subtitle={`${draft.founders.length} recorded`}>
          <FoundersSection {...props} />
        </SectionCard>

        <SectionCard title="Decision makers" subtitle="Gate 4 research">
          <DecisionMakersSection {...props} />
        </SectionCard>
      </VStack>
    </Grid>
  )
}
