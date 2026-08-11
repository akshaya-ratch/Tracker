import { Text, VStack } from '@chakra-ui/react'
import SectionCard from '../common/SectionCard'
import { GATE_BY_KEY } from '../../utils/gates'
import GateStatusPanel from './GateStatusPanel'

/** Placeholder for gates whose research fields are not wired yet (3 / 4 / 5). */
export default function GatePlaceholderForm({ gateKey, draft, update }) {
  const meta = GATE_BY_KEY[gateKey]
  const title = meta ? `${meta.name} · ${meta.title}` : gateKey

  return (
    <VStack align="stretch" spacing={4}>
      <SectionCard title={title} subtitle={meta?.description}>
        <Text fontSize="sm" color="gray.600">
          Fields for this gate will be added next.
        </Text>
      </SectionCard>

      <SectionCard title={`${meta?.name ?? 'Gate'} decision`}>
        <GateStatusPanel
          gateKey={gateKey}
          draft={draft}
          onChange={(gate) => update(`gates.${gateKey}`, gate)}
        />
      </SectionCard>
    </VStack>
  )
}
