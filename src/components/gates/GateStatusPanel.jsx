import { Alert, AlertIcon, Box, Grid, VStack } from '@chakra-ui/react'
import { SelectField, TextAreaField, TextField } from '../common/FormFields'
import { GATE_BY_KEY } from '../../utils/gates'

const ELIMINATION_STATUSES = [
  { value: 'pass', label: 'Pass' },
  { value: 'fail', label: 'Fail' },
  { value: 'not_evaluated', label: 'Not yet evaluated' },
]

const SUBJECTIVE_STATUSES = [
  { value: 'pass', label: 'Pass' },
  { value: 'fail', label: 'Fail' },
  { value: 'review', label: 'In review' },
  { value: 'not_evaluated', label: 'Not yet evaluated' },
]

/**
 * Shared gate footer: status, reason, remarks/notes, and phase banner.
 * `onChange` receives the full updated gate record for `gateKey`.
 */
export default function GateStatusPanel({ gateKey, draft, onChange }) {
  const meta = GATE_BY_KEY[gateKey]
  const record = draft.gates?.[gateKey] ?? {
    result: 'not_evaluated',
    reason: null,
    notes: null,
  }
  const isElimination = meta?.phase === 'elimination' || (meta?.index ?? 0) <= 1
  const statuses = isElimination ? ELIMINATION_STATUSES : SUBJECTIVE_STATUSES

  const patch = (partial) => onChange({ ...record, ...partial })

  return (
    <Box
      mt={2}
      pt={4}
      borderTopWidth="1px"
      borderColor="surface.border"
    >
      <VStack align="stretch" spacing={3.5}>
        <Alert
          status={isElimination ? 'warning' : 'info'}
          variant="subtle"
          borderRadius="md"
          fontSize="sm"
          py={2}
        >
          <AlertIcon />
          {isElimination ? 'Elimination round' : 'Subjective assessment'}
        </Alert>

        <Grid templateColumns={{ base: '1fr', md: '220px 1fr' }} gap={4}>
          <SelectField
            label="Status"
            value={record.result ?? 'not_evaluated'}
            onChange={(v) => patch({ result: v ?? 'not_evaluated' })}
            options={statuses}
          />
          <TextField
            label="Reason"
            value={record.reason}
            onChange={(v) => patch({ reason: v })}
            placeholder={
              isElimination
                ? 'e.g. Eng density below threshold'
                : 'Short reason shown on the gate badge'
            }
          />
        </Grid>

        <TextAreaField
          label="Comments / remarks"
          value={record.notes}
          onChange={(v) => patch({ notes: v })}
          rows={3}
          placeholder="Open questions, caveats, what to check next."
        />
      </VStack>
    </Box>
  )
}
