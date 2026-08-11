import { Grid, Text, VStack } from '@chakra-ui/react'
import SectionCard from '../../common/SectionCard'
import { RepeatableList, SelectField, TextAreaField, TextField } from '../../common/FormFields'
import { newId } from '../../../state/useCompanyDraft'

const CATEGORIES = [
  { value: null, label: 'Uncategorised' },
  { value: 'Hiring', label: 'Hiring' },
  { value: 'Team', label: 'Team' },
  { value: 'Funding', label: 'Funding' },
  { value: 'Qualification', label: 'Qualification' },
  { value: 'Business', label: 'Business' },
  { value: 'People', label: 'People' },
]

const CONFIDENCE = [
  { value: null, label: 'Not set' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

const STATUSES = [
  { value: 'Observed', label: 'Observed' },
  { value: 'Needs verification', label: 'Needs verification' },
  { value: 'Not researched', label: 'Not researched' },
]

function emptyEvidence(companyId) {
  return {
    id: newId(`${companyId}-ev`),
    category: 'Hiring',
    observation: '',
    source: null,
    sourceUrl: null,
    recency: null,
    dateChecked: null,
    notes: null,
    confidence: null,
    status: 'Observed',
  }
}

/**
 * Evidence capture.
 *
 * Source URL and date checked are blank on every seeded record because the
 * source sheet holds neither — they are only ever filled in by hand here.
 */
export default function EvidenceEditor({ draft, addItem, removeItem, update }) {
  return (
    <SectionCard
      title="Evidence"
      subtitle={`${draft.evidence.length} observations · add what you find as you research`}
    >
      <RepeatableList
        items={draft.evidence}
        onAdd={() => addItem('evidence', emptyEvidence(draft.id))}
        onRemove={(i) => removeItem('evidence', i)}
        addLabel="Add Evidence"
        emptyLabel="No evidence recorded for this company yet."
        renderItem={(item, index) => (
          <VStack align="stretch" spacing={3}>
            <TextAreaField
              label="Observation"
              value={item.observation}
              onChange={(v) => update(`evidence.${index}.observation`, v)}
              rows={2}
              placeholder="What did you actually see?"
            />
            <Grid
              templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
              gap={3}
            >
              <SelectField
                label="Category"
                value={item.category}
                onChange={(v) => update(`evidence.${index}.category`, v)}
                options={CATEGORIES}
              />
              <TextField
                label="Source"
                value={item.source}
                onChange={(v) => update(`evidence.${index}.source`, v)}
                placeholder="LinkedIn, career page…"
              />
              <TextField
                label="Source URL"
                value={item.sourceUrl}
                onChange={(v) => update(`evidence.${index}.sourceUrl`, v)}
                placeholder="Paste the link"
                helper="Left blank unless you have the real link."
              />
              <TextField
                label="Date checked"
                type="date"
                value={item.dateChecked}
                onChange={(v) => update(`evidence.${index}.dateChecked`, v)}
              />
              <TextField
                label="Recency"
                value={item.recency}
                onChange={(v) => update(`evidence.${index}.recency`, v)}
                placeholder="e.g. 1 week ago"
              />
              <SelectField
                label="Confidence"
                value={item.confidence}
                onChange={(v) => update(`evidence.${index}.confidence`, v)}
                options={CONFIDENCE}
              />
              <SelectField
                label="Status"
                value={item.status}
                onChange={(v) => update(`evidence.${index}.status`, v)}
                options={STATUSES}
              />
            </Grid>
            <TextAreaField
              label="Notes"
              value={item.notes}
              onChange={(v) => update(`evidence.${index}.notes`, v)}
              rows={2}
              placeholder="Context, caveats, follow-ups."
            />
          </VStack>
        )}
      />

      <Text fontSize="2xs" color="gray.500" mt={4} lineHeight="short">
        Seeded observations were reconstructed from sheet 108, which records no
        URLs, dates or confidence ratings — those fields stay empty until a
        researcher fills them in. Nothing here is generated.
      </Text>
    </SectionCard>
  )
}
