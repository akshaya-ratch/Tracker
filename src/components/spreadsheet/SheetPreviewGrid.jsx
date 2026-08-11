import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'

const DEFAULT_WIDTH = 160
const MIN_WIDTH = 72
const FROZEN_DEFAULTS = [72, 220]

/** Soft green highlight for Gate columns (GSheet-like). */
const GATE_BG = '#e8f5e9'
const GATE_BG_HEADER = '#c8e6c9'
const GATE_BORDER = '#a5d6a7'

function isGateColumn(header) {
  return /gate\s*[0-5]|g\s*[0-5]\b/i.test(String(header || ''))
}

function filterKey(value) {
  const v = String(value ?? '').trim()
  return v ? v.toLowerCase() : '(blank)'
}

function prettyFilterLabel(key) {
  if (key === '(blank)') return '(Blanks)'
  return key.replace(/\b\w/g, (c) => c.toUpperCase())
}

function FilterGlyph(props) {
  return (
    <Icon viewBox="0 0 24 24" boxSize="12px" {...props}>
      <path
        d="M4 6h16l-6 7.5V19l-4 2v-7.5L4 6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

function SearchGlyph(props) {
  return (
    <Icon viewBox="0 0 24 24" boxSize="13px" color="gray.400" {...props}>
      <path
        d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </Icon>
  )
}

/** Google Sheets–style filter menu on the Gate column header. */
function GateFilterMenu({ column, options, selected, onChange, onClear }) {
  const [query, setQuery] = useState('')
  const active = selected?.length > 0
  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return options
    return options.filter((k) => prettyFilterLabel(k).toLowerCase().includes(q))
  }, [options, query])

  const allVisibleSelected =
    filteredOptions.length > 0 && filteredOptions.every((k) => (selected ?? []).includes(k))

  const toggleSelectAllVisible = () => {
    if (allVisibleSelected) {
      onChange((selected ?? []).filter((k) => !filteredOptions.includes(k)))
    } else {
      onChange([...new Set([...(selected ?? []), ...filteredOptions])])
    }
  }

  return (
    <Popover
      placement="bottom-end"
      isLazy
      strategy="fixed"
      onOpen={() => setQuery('')}
    >
      <PopoverTrigger>
        <IconButton
          aria-label={`Filter ${column}`}
          size="xs"
          variant="ghost"
          minW="20px"
          h="20px"
          color={active ? 'green.700' : 'gray.500'}
          bg={active ? 'green.100' : 'transparent'}
          _hover={{ bg: 'green.100' }}
          icon={<FilterGlyph />}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        />
      </PopoverTrigger>
      <PopoverContent
        w="220px"
        maxW="90vw"
        borderColor="surface.border"
        boxShadow="lg"
        zIndex={50}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <PopoverBody px={2} pt={2} pb={1}>
          <InputGroup size="sm" mb={2}>
            <InputLeftElement pointerEvents="none" h="32px">
              <SearchGlyph />
            </InputLeftElement>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter values"
              bg="surface.sunken"
              borderColor="surface.border"
            />
          </InputGroup>

          <Button
            size="xs"
            variant="ghost"
            w="100%"
            justifyContent="flex-start"
            mb={1}
            onClick={toggleSelectAllVisible}
          >
            {allVisibleSelected ? 'Clear selection' : 'Select all'}
          </Button>

          <Box maxH="200px" overflowY="auto" px={1}>
            <CheckboxGroup value={selected ?? []} onChange={onChange}>
              <Stack spacing={1}>
                {filteredOptions.length === 0 ? (
                  <Text fontSize="xs" color="gray.400" py={2}>
                    No matches
                  </Text>
                ) : (
                  filteredOptions.map((key) => (
                    <Checkbox key={key} value={key} size="sm" colorScheme="green">
                      <Text as="span" fontSize="xs" noOfLines={1} title={prettyFilterLabel(key)}>
                        {prettyFilterLabel(key)}
                      </Text>
                    </Checkbox>
                  ))
                )}
              </Stack>
            </CheckboxGroup>
          </Box>
        </PopoverBody>
        <PopoverFooter
          borderColor="surface.border"
          py={1.5}
          px={2}
          display="flex"
          justifyContent="flex-end"
        >
          <Button size="xs" variant="ghost" onClick={onClear} isDisabled={!active}>
            Clear filter
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  )
}

function EditableCell({
  value,
  gate,
  editing,
  draft,
  onDoubleClick,
  onDraftChange,
  onCommit,
  onCancel,
}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!editing) return
    const el = ref.current
    if (!el) return
    el.focus()
    el.select?.()
  }, [editing])

  if (editing) {
    return (
      <Textarea
        ref={ref}
        value={draft}
        onChange={(e) => onDraftChange(e.target.value)}
        onBlur={onCommit}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault()
            onCancel()
          } else if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onCommit()
          }
        }}
        size="xs"
        rows={2}
        minH="28px"
        fontSize="xs"
        lineHeight="1.3"
        p={1}
        bg="white"
        borderColor="brand.400"
        _focus={{ borderColor: 'brand.500', boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)' }}
        onClick={(e) => e.stopPropagation()}
      />
    )
  }

  return (
    <Box
      as="span"
      display="block"
      minH="1.2em"
      cursor="text"
      onDoubleClick={onDoubleClick}
      title={value ? `${value} — double-click to edit` : 'Double-click to edit'}
      _hover={gate ? { bg: '#dcedc8' } : undefined}
    >
      {value || '—'}
    </Box>
  )
}

export default function SheetPreviewGrid({ headers, rows, onCellChange }) {
  const [widths, setWidths] = useState(() =>
    headers.map((_, i) => FROZEN_DEFAULTS[i] ?? DEFAULT_WIDTH),
  )
  const [filters, setFilters] = useState({})
  const [edit, setEdit] = useState(null) // { rowIndex, header, draft }
  const dragRef = useRef(null)

  useEffect(() => {
    setWidths((prev) =>
      headers.map((_, i) => prev[i] ?? FROZEN_DEFAULTS[i] ?? DEFAULT_WIDTH),
    )
    setFilters({})
    setEdit(null)
  }, [headers])

  const frozenLeft = useMemo(() => {
    const lefts = [0]
    let acc = 0
    for (let i = 0; i < Math.min(2, headers.length); i++) {
      acc += widths[i] ?? DEFAULT_WIDTH
      lefts.push(acc)
    }
    return lefts
  }, [headers.length, widths])

  const filterOptions = useMemo(() => {
    const map = {}
    for (const h of headers) {
      if (!isGateColumn(h)) continue
      const values = new Set()
      for (const row of rows) values.add(filterKey(row[h]))
      map[h] = [...values].sort((a, b) => {
        if (a === '(blank)') return -1
        if (b === '(blank)') return 1
        return a.localeCompare(b)
      })
    }
    return map
  }, [headers, rows])

  const visibleRows = useMemo(() => {
    const active = Object.entries(filters).filter(([, selected]) => selected?.length > 0)
    return rows
      .map((row, index) => ({ row, index }))
      .filter(({ row }) =>
        active.length === 0
          ? true
          : active.every(([col, selected]) => selected.includes(filterKey(row[col]))),
      )
  }, [rows, filters])

  const onResizeStart = useCallback(
    (index, event) => {
      event.preventDefault()
      event.stopPropagation()
      const startW = widths[index] ?? DEFAULT_WIDTH
      const startX = event.clientX
      dragRef.current = { index, startX, startW }

      const onMove = (e) => {
        const drag = dragRef.current
        if (!drag) return
        const next = Math.max(MIN_WIDTH, drag.startW + (e.clientX - drag.startX))
        setWidths((w) => {
          const copy = [...w]
          copy[drag.index] = next
          return copy
        })
      }
      const onUp = () => {
        dragRef.current = null
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [widths],
  )

  const commitEdit = useCallback(() => {
    setEdit((current) => {
      if (!current) return null
      const original = rows[current.rowIndex]?.[current.header] ?? ''
      if (String(current.draft) !== String(original) && typeof onCellChange === 'function') {
        onCellChange(current.rowIndex, current.header, current.draft)
      }
      return null
    })
  }, [onCellChange, rows])

  const clearFilters = () => setFilters({})
  const hasActiveFilters = Object.values(filters).some((v) => v?.length > 0)
  const activeFilterCount = Object.values(filters).filter((v) => v?.length > 0).length

  return (
    <Box flex="1" minH={0} display="flex" flexDirection="column" overflow="hidden">
      <Flex
        flexShrink={0}
        px={3}
        py={1.5}
        align="center"
        justify="space-between"
        gap={2}
        borderBottomWidth="1px"
        borderColor="surface.border"
        bg="surface.raised"
        minH="32px"
      >
        <HStack spacing={2} minW={0}>
          <Text fontSize="2xs" color="gray.500">
            {visibleRows.length === rows.length
              ? `${rows.length} rows`
              : `${visibleRows.length} of ${rows.length} rows`}
          </Text>
          {hasActiveFilters && (
            <Badge colorScheme="green" variant="subtle" fontSize="2xs">
              {activeFilterCount} filter{activeFilterCount === 1 ? '' : 's'} on
            </Badge>
          )}
        </HStack>
        {hasActiveFilters && (
          <Button size="xs" variant="ghost" h="24px" onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </Flex>

      <Box
        flex="1"
        minH={0}
        overflow="auto"
        sx={{ '& table': { borderCollapse: 'separate', borderSpacing: 0 } }}
      >
        <Box as="table" w="max-content" minW="100%" fontSize="xs">
          <Box as="thead">
            <Box as="tr">
              {headers.map((h, i) => {
                const w = widths[i] ?? DEFAULT_WIDTH
                const frozen = i < 2
                const gate = isGateColumn(h)
                return (
                  <Box
                    as="th"
                    key={`${h}-${i}`}
                    position="sticky"
                    top={0}
                    left={frozen ? `${frozenLeft[i]}px` : undefined}
                    zIndex={frozen ? 5 : 3}
                    bg={gate ? GATE_BG_HEADER : 'surface.raised'}
                    w={`${w}px`}
                    minW={`${w}px`}
                    maxW={`${w}px`}
                    px={2}
                    py={2}
                    pr={4}
                    textAlign="left"
                    fontWeight={650}
                    color={gate ? 'green.800' : 'gray.600'}
                    textTransform="none"
                    letterSpacing="normal"
                    borderRightWidth="1px"
                    borderBottomWidth="1px"
                    borderColor={gate ? GATE_BORDER : 'surface.borderStrong'}
                    boxShadow={
                      frozen && i === 1
                        ? '2px 0 4px rgba(0,0,0,0.06), 0 1px 0 var(--chakra-colors-surface-borderStrong)'
                        : '0 1px 0 var(--chakra-colors-surface-borderStrong)'
                    }
                    userSelect="none"
                  >
                    <Flex align="center" gap={1} minW={0}>
                      <Text noOfLines={1} title={h} flex="1" minW={0}>
                        {h || `Column ${i + 1}`}
                      </Text>
                      {gate && (
                        <GateFilterMenu
                          column={h}
                          options={filterOptions[h] || []}
                          selected={filters[h] ?? []}
                          onChange={(vals) => setFilters((f) => ({ ...f, [h]: vals }))}
                          onClear={() =>
                            setFilters((f) => {
                              const next = { ...f }
                              delete next[h]
                              return next
                            })
                          }
                        />
                      )}
                    </Flex>
                    <Box
                      as="span"
                      position="absolute"
                      top={0}
                      right={0}
                      w="5px"
                      h="100%"
                      cursor="col-resize"
                      onMouseDown={(e) => onResizeStart(i, e)}
                      _hover={{ bg: 'brand.200' }}
                    />
                  </Box>
                )
              })}
            </Box>
          </Box>

          <Box as="tbody">
            {visibleRows.length === 0 ? (
              <Box as="tr">
                <Box as="td" px={4} py={8} colSpan={Math.max(headers.length, 1)}>
                  <Text color="gray.500" textAlign="center">
                    No rows match the filters. Clear filters to see all rows.
                  </Text>
                </Box>
              </Box>
            ) : (
              visibleRows.map(({ row, index: rowIndex }) => (
                <Box
                  as="tr"
                  key={rowIndex}
                  _hover={{ '& td:not([data-gate])': { bg: 'brand.50' } }}
                >
                  {headers.map((h, i) => {
                    const w = widths[i] ?? DEFAULT_WIDTH
                    const frozen = i < 2
                    const gate = isGateColumn(h)
                    const value = row[h] ?? ''
                    const isEditing = edit?.rowIndex === rowIndex && edit?.header === h
                    return (
                      <Box
                        as="td"
                        key={`${rowIndex}-${i}`}
                        data-gate={gate ? '1' : undefined}
                        position={frozen ? 'sticky' : 'relative'}
                        left={frozen ? `${frozenLeft[i]}px` : undefined}
                        zIndex={frozen ? 2 : 1}
                        bg={gate ? GATE_BG : 'surface.raised'}
                        w={`${w}px`}
                        minW={`${w}px`}
                        maxW={`${w}px`}
                        px={2}
                        py={1.5}
                        borderBottomWidth="1px"
                        borderRightWidth="1px"
                        borderColor={gate ? GATE_BORDER : 'surface.border'}
                        boxShadow={frozen && i === 1 ? '2px 0 4px rgba(0,0,0,0.06)' : undefined}
                        verticalAlign="top"
                        whiteSpace="pre-wrap"
                        wordBreak="break-word"
                      >
                        <EditableCell
                          value={value}
                          gate={gate}
                          editing={isEditing}
                          draft={isEditing ? edit.draft : ''}
                          onDoubleClick={() =>
                            setEdit({
                              rowIndex,
                              header: h,
                              draft: String(value ?? ''),
                            })
                          }
                          onDraftChange={(draft) =>
                            setEdit((e) => (e ? { ...e, draft } : e))
                          }
                          onCommit={commitEdit}
                          onCancel={() => setEdit(null)}
                        />
                      </Box>
                    )
                  })}
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
