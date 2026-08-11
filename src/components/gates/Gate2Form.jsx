import { useMemo, useState } from 'react'
import { Box, Grid, VStack } from '@chakra-ui/react'
import SectionCard from '../common/SectionCard'
import {
  SelectField,
  TextAreaField,
  TextField,
} from '../common/FormFields'
import { newEntityId } from '../../data/createCompany'
import { companyPeopleOptions } from '../../utils/companyPeople'
import { HIRING_MANAGER_TYPES, YES_NO } from '../../utils/gates'
import GateStatusPanel from './GateStatusPanel'

const YES_NO_SELECT = [
  { value: null, label: 'Not researched' },
  ...YES_NO,
]

const HM_TYPE_SELECT = [
  { value: null, label: 'Not researched' },
  ...HIRING_MANAGER_TYPES,
]

const ADD_NEW = '__add_new__'

/** Gate 2 — hiring pain signals + hiring badge picker. */
export default function Gate2Form({ draft, update }) {
  const hiring = draft.hiring ?? {}
  const partner = hiring.externalTalentPartner ?? { present: null, name: null }
  const manager = hiring.hiringManager ?? { type: null, name: null, personId: null }
  const badge = hiring.hiringBadge ?? {
    personId: null,
    name: null,
    role: null,
    linkedin: null,
  }

  const people = useMemo(() => companyPeopleOptions(draft), [draft])
  const [addingNew, setAddingNew] = useState(
    () => badge.personId === 'manual' || (badge.name && !badge.personId),
  )

  const personOptions = [
    { value: null, label: 'Not selected' },
    ...people.map((p) => ({
      value: p.id,
      label: p.role ? `${p.name} (${p.role})` : p.name || p.id,
    })),
    { value: ADD_NEW, label: 'Add new person…' },
  ]

  const selectBadgePerson = (personId) => {
    if (personId === ADD_NEW) {
      setAddingNew(true)
      update('hiring.hiringBadge', {
        personId: 'manual',
        name: badge.name ?? null,
        role: badge.role ?? null,
        linkedin: badge.linkedin ?? null,
      })
      return
    }
    setAddingNew(false)
    if (!personId) {
      update('hiring.hiringBadge', {
        personId: null,
        name: null,
        role: null,
        linkedin: null,
      })
      return
    }
    const person = people.find((p) => p.id === personId)
    update('hiring.hiringBadge', {
      personId,
      name: person?.name ?? null,
      role: person?.role ?? null,
      linkedin: person?.linkedin ?? null,
    })
  }

  const patchManualBadge = (partial) => {
    const next = {
      personId: 'manual',
      name: badge.name ?? null,
      role: badge.role ?? null,
      linkedin: badge.linkedin ?? null,
      ...partial,
    }
    update('hiring.hiringBadge', next)

    // Keep a manual entry on company.people for later selection.
    const others = (draft.people ?? []).filter((p) => p.source !== 'manual')
    if (next.name) {
      update('people', [
        ...others,
        {
          id: next.personId || newEntityId('person'),
          name: next.name,
          role: next.role,
          linkedin: next.linkedin,
          source: 'manual',
        },
      ])
    } else {
      update('people', others)
    }
  }

  return (
    <VStack align="stretch" spacing={4}>
      <SectionCard title="Hiring pain signals" subtitle="Gate 2 research">
        <VStack align="stretch" spacing={4}>
          <TextAreaField
            label="Hiring urgency signal"
            value={hiring.urgencySignal ?? hiring.urgency}
            onChange={(v) => {
              update('hiring.urgencySignal', v)
              update('hiring.urgency', v)
            }}
            rows={3}
            placeholder="e.g. High — 6 roles posted in 2 weeks, multiple boards"
          />

          <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={4}>
            <SelectField
              label="JD duplication"
              value={hiring.jdDuplication}
              onChange={(v) => update('hiring.jdDuplication', v)}
              options={YES_NO_SELECT}
            />
            <SelectField
              label="External talent partner"
              value={partner.present}
              onChange={(v) =>
                update('hiring.externalTalentPartner', {
                  ...partner,
                  present: v,
                  name: v === 'yes' ? partner.name : null,
                })
              }
              options={YES_NO_SELECT}
            />
          </Grid>

          {partner.present === 'yes' && (
            <TextField
              label="Talent partner name"
              value={partner.name}
              onChange={(v) =>
                update('hiring.externalTalentPartner', { ...partner, name: v })
              }
              placeholder="Agency or tool, e.g. Zoho Recruit"
            />
          )}

          <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={4}>
            <SelectField
              label="Hiring manager type"
              value={manager.type}
              onChange={(v) =>
                update('hiring.hiringManager', { ...manager, type: v })
              }
              options={HM_TYPE_SELECT}
            />
            <TextField
              label="Hiring manager name"
              value={manager.name}
              onChange={(v) =>
                update('hiring.hiringManager', { ...manager, name: v })
              }
              placeholder="Full name"
            />
          </Grid>
        </VStack>
      </SectionCard>

      <SectionCard title="Hiring badge" subtitle="LinkedIn recruiter / hiring badge holder">
        <VStack align="stretch" spacing={4}>
          <SelectField
            label="Person"
            value={addingNew ? ADD_NEW : badge.personId}
            onChange={selectBadgePerson}
            options={personOptions}
            helper="Pick from founders, HR, TA, or add someone new."
          />

          {addingNew && (
            <Box
              px={3}
              py={3}
              borderWidth="1px"
              borderColor="surface.border"
              borderRadius="md"
              bg="surface.sunken"
            >
              <Grid templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap={2.5}>
                <TextField
                  label="Name"
                  value={badge.name}
                  onChange={(v) => patchManualBadge({ name: v })}
                  placeholder="Full name"
                />
                <TextField
                  label="Role"
                  value={badge.role}
                  onChange={(v) => patchManualBadge({ role: v })}
                  placeholder="Recruiter, TA Lead…"
                />
                <TextField
                  label="LinkedIn"
                  value={badge.linkedin}
                  onChange={(v) => patchManualBadge({ linkedin: v })}
                  placeholder="https://linkedin.com/in/…"
                />
              </Grid>
            </Box>
          )}
        </VStack>
      </SectionCard>

      <SectionCard title="Gate 2 decision">
        <GateStatusPanel
          gateKey="gate2"
          draft={draft}
          onChange={(gate) => update('gates.gate2', gate)}
        />
      </SectionCard>
    </VStack>
  )
}
