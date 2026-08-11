import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Textarea,
  Tooltip,
} from '@chakra-ui/react'
import { FieldFlag } from './DataQualityWarning'

/**
 * Form primitives for the research workspace.
 *
 * Two rules run through all of them:
 *  - an empty input means "not researched" and is stored as `null`, never as ""
 *    or 0, so the read views keep reporting absence honestly;
 *  - a field that carries a data-quality flag shows it while being edited, so
 *    the researcher sees the conflict they are being asked to resolve.
 */

/** "" -> null, so a cleared field reads as unresearched rather than empty. */
export const blankToNull = (v) => {
  if (v == null) return null
  const t = String(v).trim()
  return t === '' ? null : v
}

function Label({ label, hint, issues, required }) {
  return (
    <HStack spacing={1.5} mb={1} align="center">
      <FormLabel
        m={0}
        fontSize="2xs"
        fontWeight={600}
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="0.05em"
      >
        {label}
        {required && (
          <Text as="span" color="red.400" ml={0.5}>
            *
          </Text>
        )}
      </FormLabel>
      {hint && (
        <Tooltip label={hint} hasArrow placement="top">
          <Box as="span" cursor="help" color="gray.400" fontSize="2xs" fontWeight={700}>
            ⓘ
          </Box>
        </Tooltip>
      )}
      <FieldFlag issues={issues} />
    </HStack>
  )
}

export function TextField({
  label,
  value,
  onChange,
  placeholder = 'Not researched',
  hint,
  issues,
  helper,
  required,
  ...rest
}) {
  return (
    <FormControl>
      <Label label={label} hint={hint} issues={issues} required={required} />
      <Input
        value={value ?? ''}
        onChange={(e) => onChange(blankToNull(e.target.value))}
        placeholder={placeholder}
        bg="surface.raised"
        borderColor="surface.border"
        _placeholder={{ color: 'gray.400', fontStyle: 'italic' }}
        {...rest}
      />
      {helper && <FormHelperText fontSize="2xs">{helper}</FormHelperText>}
    </FormControl>
  )
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder = 'Not researched',
  rows = 3,
  hint,
  issues,
  helper,
}) {
  return (
    <FormControl>
      <Label label={label} hint={hint} issues={issues} />
      <Textarea
        value={value ?? ''}
        onChange={(e) => onChange(blankToNull(e.target.value))}
        placeholder={placeholder}
        rows={rows}
        size="sm"
        bg="surface.raised"
        borderColor="surface.border"
        focusBorderColor="brand.400"
        _placeholder={{ color: 'gray.400', fontStyle: 'italic' }}
      />
      {helper && <FormHelperText fontSize="2xs">{helper}</FormHelperText>}
    </FormControl>
  )
}

/** Empty stays null - it never collapses to 0. */
export function NumberField({ label, value, onChange, hint, issues, helper, min = 0, max }) {
  return (
    <FormControl>
      <Label label={label} hint={hint} issues={issues} />
      <NumberInput
        size="sm"
        value={value ?? ''}
        min={min}
        max={max}
        focusBorderColor="brand.400"
        onChange={(asString) => {
          const t = asString.trim()
          onChange(t === '' ? null : Number(t))
        }}
      >
        <NumberInputField
          placeholder="Not researched"
          bg="surface.raised"
          borderColor="surface.border"
          _placeholder={{ color: 'gray.400', fontStyle: 'italic' }}
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      {helper && <FormHelperText fontSize="2xs">{helper}</FormHelperText>}
    </FormControl>
  )
}

export function SelectField({ label, value, onChange, options, hint, issues, helper }) {
  return (
    <FormControl>
      <Label label={label} hint={hint} issues={issues} />
      <Select
        value={value ?? ''}
        onChange={(e) => onChange(blankToNull(e.target.value))}
        bg="surface.raised"
        borderColor="surface.border"
      >
        {options.map((o) => (
          <option key={o.value ?? '__blank'} value={o.value ?? ''}>
            {o.label}
          </option>
        ))}
      </Select>
      {helper && <FormHelperText fontSize="2xs">{helper}</FormHelperText>}
    </FormControl>
  )
}

function TrashGlyph() {
  return (
    <Icon viewBox="0 0 24 24" boxSize="13px">
      <path
        d="M4 7h16M9 7V5h6v2m-8 0 1 13h8l1-13"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export function RemoveButton({ onClick, label = 'Remove' }) {
  return (
    <Tooltip label={label} hasArrow placement="top">
      <IconButton
        aria-label={label}
        icon={<TrashGlyph />}
        size="xs"
        variant="ghost"
        colorScheme="red"
        onClick={onClick}
      />
    </Tooltip>
  )
}

export function AddButton({ onClick, children }) {
  return (
    <Button
      onClick={onClick}
      size="xs"
      variant="outline"
      borderStyle="dashed"
      borderColor="surface.borderStrong"
      color="gray.600"
      leftIcon={
        <Icon viewBox="0 0 24 24" boxSize="12px">
          <path
            d="M12 5v14M5 12h14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </Icon>
      }
      _hover={{ borderColor: 'brand.400', color: 'brand.600', bg: 'brand.50' }}
    >
      {children}
    </Button>
  )
}

/**
 * A repeatable section: a titled list of rows, each removable, with an add
 * button underneath. Used for founders, investors, jobs, team functions,
 * HR/TA people, decision makers and evidence.
 */
export function RepeatableList({
  label,
  items,
  onAdd,
  onRemove,
  addLabel,
  emptyLabel = 'Nothing recorded yet.',
  renderItem,
  hint,
  compact = false,
}) {
  return (
    <Box>
      {label && <Label label={label} hint={hint} />}

      {items.length === 0 ? (
        <Box
          px={3}
          py={compact ? 2 : 3}
          borderWidth="1px"
          borderStyle="dashed"
          borderColor="surface.border"
          borderRadius="md"
          bg="surface.sunken"
          mb={2}
        >
          <Text fontSize="xs" color="gray.500" fontStyle="italic">
            {emptyLabel}
          </Text>
        </Box>
      ) : (
        <Box mb={2}>
          {items.map((item, index) => (
            <Flex
              key={item.id ?? index}
              gap={2}
              align="start"
              px={compact ? 0 : 3}
              py={compact ? 1 : 2.5}
              borderWidth={compact ? 0 : '1px'}
              borderColor="surface.border"
              borderRadius="md"
              bg={compact ? 'transparent' : 'surface.sunken'}
              mb={compact ? 1.5 : 2}
            >
              <Box flex="1" minW={0}>
                {renderItem(item, index)}
              </Box>
              <Box pt={compact ? 0 : 4}>
                <RemoveButton onClick={() => onRemove(index)} />
              </Box>
            </Flex>
          ))}
        </Box>
      )}

      <AddButton onClick={onAdd}>{addLabel}</AddButton>
    </Box>
  )
}
