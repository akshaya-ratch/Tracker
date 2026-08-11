import { Grid, VStack } from '@chakra-ui/react'
import SectionCard from '../../common/SectionCard'
import {
  EngineeringDensitySection,
  HeadcountSection,
  HrTaSection,
  TeamCompositionSection,
} from './sections'
import { teamTotal } from '../../../utils/calculations'

/**
 * Team editing, organised by topic.
 *
 * Engineering density recalculates live from the team breakdown as counts are
 * typed, but it never overwrites the value recorded in the source sheet - that
 * disagreement is intelligence, not an error to paper over.
 */
export default function TeamEditor(props) {
  const { draft } = props
  const total = teamTotal(draft)

  return (
    <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap={4}>
      <VStack align="stretch" spacing={4}>
        <SectionCard title="Headcount">
          <HeadcountSection {...props} />
        </SectionCard>

        <SectionCard
          title="Team composition"
          subtitle={
            total != null
              ? `${total} people across ${draft.team.length} functions`
              : 'No breakdown recorded'
          }
        >
          <TeamCompositionSection {...props} />
        </SectionCard>

        <SectionCard
          title="HR / TA"
          subtitle="Who owns hiring inside the company — the Gate 2 access path"
        >
          <HrTaSection {...props} />
        </SectionCard>
      </VStack>

      <VStack align="stretch" spacing={4}>
        <SectionCard
          title="Engineering density"
          subtitle="Recalculated live — the source value is never overwritten"
        >
          <EngineeringDensitySection {...props} />
        </SectionCard>
      </VStack>
    </Grid>
  )
}
