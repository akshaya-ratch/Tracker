import { useMemo, useState } from 'react'
import { Box, Button, HStack, Text, Wrap, WrapItem } from '@chakra-ui/react'
import SectionCard from '../common/SectionCard'
import EmptyState from '../common/EmptyState'
import EvidenceItem from './EvidenceItem'

/**
 * The 108 sheet is not yet a formal evidence store, so every item here is
 * derived from a cell that was actually filled in. Where the sheet names a
 * source (a job board) it is shown; where it does not, the item is marked
 * "Not recorded" — no URL is ever fabricated.
 */
export default function EvidenceList({ company }) {
  const [category, setCategory] = useState('all')
  const evidence = company.evidence ?? []

  const categories = useMemo(
    () => ['all', ...new Set(evidence.map((e) => e.category))],
    [evidence],
  )

  const visible = useMemo(
    () => (category === 'all' ? evidence : evidence.filter((e) => e.category === category)),
    [evidence, category],
  )

  const sourced = evidence.filter((e) => e.source).length

  if (!evidence.length) {
    return (
      <SectionCard title="Evidence">
        <EmptyState
          title="No research observations recorded"
          description="Nothing has been captured for this company beyond its identity row."
        />
      </SectionCard>
    )
  }

  return (
    <SectionCard
      title="Evidence"
      subtitle={`${evidence.length} observations · ${sourced} carry a named source`}
      action={
        <Wrap spacing={1.5}>
          {categories.map((c) => (
            <WrapItem key={c}>
              <Button
                size="xs"
                variant={category === c ? 'solid' : 'ghost'}
                colorScheme={category === c ? 'brand' : 'gray'}
                onClick={() => setCategory(c)}
                textTransform="capitalize"
              >
                {c === 'all' ? `All (${evidence.length})` : c}
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      }
      bodyProps={{ p: 0 }}
    >
      <Box>
        {visible.map((item) => (
          <EvidenceItem key={item.id} item={item} />
        ))}
      </Box>

      <Box px={4} py={2.5} borderTopWidth="1px" borderColor="surface.border" bg="surface.sunken">
        <HStack spacing={2} align="start">
          <Text fontSize="2xs" color="gray.500" lineHeight="short">
            Observations are reconstructed from the research sheet, which is not yet a
            formal evidence database. Items without a recorded source are marked as
            such — no links or URLs are generated. Once evidence is captured directly,
            each row will carry its own source URL, capture date and researcher.
          </Text>
        </HStack>
      </Box>
    </SectionCard>
  )
}
