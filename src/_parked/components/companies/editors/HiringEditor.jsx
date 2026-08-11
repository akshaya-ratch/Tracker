import { Box, Text, VStack } from '@chakra-ui/react'
import SectionCard from '../../common/SectionCard'
import { HiringSignalsSection, JobsSection } from './sections'

/**
 * Hiring editing, organised by topic: company-wide signals first, then the
 * jobs list with every per-role field exposed.
 */
export default function HiringEditor(props) {
  const { draft } = props

  return (
    <VStack align="stretch" spacing={4}>
      <SectionCard
        title="Hiring signals"
        subtitle="Company-wide signals. Per-role detail goes on each job below."
      >
        <HiringSignalsSection {...props} />
      </SectionCard>

      <SectionCard
        title="Jobs"
        subtitle={`${draft.hiring.jobs.length} recorded · open-role counts and freshness are derived from these`}
      >
        <JobsSection {...props} variant="full" />

        {draft.hiring.notes.length > 0 && (
          <Box mt={4} px={3} py={2} bg="surface.sunken" borderRadius="md">
            <Text fontSize="2xs" fontWeight={600} color="gray.600" mb={0.5}>
              RESEARCH NOTES FROM THE SOURCE SHEET
            </Text>
            <Text fontSize="xs" color="gray.600">
              {draft.hiring.notes.join(' · ')}
            </Text>
          </Box>
        )}
      </SectionCard>
    </VStack>
  )
}
