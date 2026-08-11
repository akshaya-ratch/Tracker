import { Badge, Tooltip } from '@chakra-ui/react'
import { GATE_RESULT } from '../../utils/gates'

/**
 * The single badge vocabulary for the whole app.
 * PASS green · FAIL red · WARNING amber · NOT STARTED gray · IN REVIEW blue.
 */
export function GateBadge({ result, reason, size = 'sm' }) {
  const meta = GATE_RESULT[result] ?? GATE_RESULT.not_evaluated
  const badge = (
    <Badge
      colorScheme={meta.color}
      variant={result === 'not_evaluated' ? 'subtle' : 'solid'}
      fontSize={size === 'xs' ? '2xs' : 'xs'}
      opacity={result === 'not_evaluated' ? 0.85 : 1}
    >
      {meta.label}
    </Badge>
  )
  return reason ? (
    <Tooltip label={reason} placement="top" hasArrow openDelay={200}>
      {badge}
    </Tooltip>
  ) : (
    badge
  )
}

export function PriorityBadge({ priority }) {
  return (
    <Tooltip
      hasArrow
      placement="top"
      openDelay={200}
      label={`Prototype priority · score ${priority.score}`}
    >
      <Badge colorScheme={priority.color} variant="subtle" fontSize="2xs">
        {priority.label}
      </Badge>
    </Tooltip>
  )
}

export default function StatusBadge({ tone = 'gray', children, tip, ...rest }) {
  const badge = (
    <Badge colorScheme={tone} variant="subtle" {...rest}>
      {children}
    </Badge>
  )
  return tip ? (
    <Tooltip label={tip} placement="top" hasArrow openDelay={200}>
      {badge}
    </Tooltip>
  ) : (
    badge
  )
}
