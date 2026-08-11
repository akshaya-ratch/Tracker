import { Grid, VStack } from '@chakra-ui/react'
import SectionCard from '../common/SectionCard'
import {
  RepeatableList,
  SelectField,
  TextAreaField,
  TextField,
} from '../common/FormFields'
import { emptyInvestor } from '../../data/createCompany'
import { FUNDING_TYPES } from '../../utils/gates'
import GateStatusPanel from './GateStatusPanel'

const FUNDING_TYPE_OPTIONS = [
  { value: null, label: 'Not researched' },
  ...FUNDING_TYPES.map((t) => ({ value: t, label: t })),
]

function investorName(entry) {
  if (entry == null) return ''
  if (typeof entry === 'string') return entry
  return entry.name ?? ''
}

/** Gate 0 — funding & qualification research fields + status panel. */
export default function Gate0Form({ draft, update }) {
  const funding = draft.funding ?? {}
  const investors = funding.investors ?? []

  const setInvestors = (next) => update('funding.investors', next)

  return (
    <VStack align="stretch" spacing={4}>
      <SectionCard title="Funding" subtitle="Gate 0 research">
        <VStack align="stretch" spacing={4}>
          <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={4}>
            <SelectField
              label="Funding type"
              value={funding.type}
              onChange={(v) => update('funding.type', v)}
              options={FUNDING_TYPE_OPTIONS}
            />
            <TextField
              label="Funding amount"
              value={funding.amount}
              onChange={(v) => update('funding.amount', v)}
              placeholder="₹8 crore (~$960K)"
              helper={
                funding.amountRaw && funding.amountRaw !== funding.amount
                  ? `Split from: “${funding.amountRaw}”`
                  : undefined
              }
            />
            <TextField
              label="Funding date"
              value={funding.date}
              onChange={(v) => update('funding.date', v)}
              placeholder="11 Jun 2026"
            />
            <TextField
              label="Funding agenda"
              value={funding.agenda}
              onChange={(v) => update('funding.agenda', v)}
              placeholder="What the round is for"
            />
          </Grid>

          <RepeatableList
            label={`Investors (${investors.length})`}
            items={investors.map((entry, i) =>
              typeof entry === 'string'
                ? { id: `inv-${i}`, name: entry }
                : { id: entry.id ?? `inv-${i}`, name: entry.name ?? '' },
            )}
            onAdd={() => setInvestors([...investors, emptyInvestor()])}
            onRemove={(i) => setInvestors(investors.filter((_, idx) => idx !== i))}
            addLabel="Add Investor"
            emptyLabel="No investors recorded."
            compact
            renderItem={(item, index) => (
              <TextField
                label="Investor"
                value={investorName(investors[index])}
                onChange={(v) => {
                  const next = [...investors]
                  const current = next[index]
                  if (typeof current === 'string' || current == null) {
                    next[index] = { id: item.id, name: v ?? '' }
                  } else {
                    next[index] = { ...current, name: v ?? '' }
                  }
                  setInvestors(next)
                }}
                placeholder="Investor name"
              />
            )}
          />

          <TextAreaField
            label="Remarks"
            value={funding.remarks}
            onChange={(v) => update('funding.remarks', v)}
            rows={2}
            placeholder="Notes on the round, sources, caveats."
          />
        </VStack>
      </SectionCard>

      <SectionCard title="Gate 0 decision">
        <GateStatusPanel
          gateKey="gate0"
          draft={draft}
          onChange={(gate) => update('gates.gate0', gate)}
        />
      </SectionCard>
    </VStack>
  )
}
