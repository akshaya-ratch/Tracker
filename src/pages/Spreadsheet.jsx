import { useEffect, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Select,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { usePageMeta } from '../components/layout/AppShell'
import SectionCard from '../components/common/SectionCard'
import SheetPreviewGrid from '../components/spreadsheet/SheetPreviewGrid'
import { sheetEditUrl, SPREADSHEET } from '../data/spreadsheetConfig'
import { fetchSheetTabs, fetchSpreadsheetCsv } from '../data/sheetsClient'
import { mapSheetToCompanies } from '../data/mapSheetRows'
import {
  createRestorePointBackup,
  createSyncBackup,
  deleteBackup,
  listHistoryEntries,
} from '../data/sheetBackups'
import { useWorkspace } from '../state/WorkspaceContext'

function Glyph({ d, ...rest }) {
  return (
    <Icon viewBox="0 0 24 24" boxSize="14px" {...rest}>
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

const ICONS = {
  refresh: 'M4 12a8 8 0 0 1 14.5-4.5M20 4v5h-5M20 12a8 8 0 0 1-14.5 4.5M4 20v-5h5',
  history: 'M12 7v5l3 2M4 12a8 8 0 1 0 2-5.3M4 4v5h5',
  open: 'M14 4h6v6M10 14 20 4M18 14v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5',
}

function formatWhen(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString()
}

function historyTitle(b) {
  return b.title || b.note || (b.tabName ? `Sheet “${b.tabName}”` : 'Snapshot')
}

function historySummary(b) {
  if (b.summary) {
    // Old noisy copy was just "21 updated" — rewrite for display
    const m = String(b.summary).match(/^(\d+)\s+updated$/i)
    if (m) {
      return `${m[1]} existing compan${m[1] === '1' ? 'y' : 'ies'} had Excel field changes (count can stay the same)`
    }
    return b.summary
  }
  if (b.hint) return b.hint
  const bits = []
  if (b.added) bits.push(`${b.added} new`)
  if (b.updated) bits.push(`${b.updated} with field changes`)
  if (!bits.length) bits.push('No changes recorded')
  return bits.join(' · ')
}

export default function Spreadsheet() {
  usePageMeta('Spreadsheet')
  const { importCompaniesFromSheet, replaceAllCompanies, companies, lastSheetSync } =
    useWorkspace()
  const toast = useToast()
  const historyDrawer = useDisclosure()

  const [tabs, setTabs] = useState([])
  const [tabsLoading, setTabsLoading] = useState(true)
  const [tabsError, setTabsError] = useState(null)
  const [selectedGid, setSelectedGid] = useState(SPREADSHEET.gid)

  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [backups, setBackups] = useState(() => listHistoryEntries())

  const selectedTab = tabs.find((t) => t.gid === selectedGid) ?? null

  const loadTabs = async () => {
    setTabsLoading(true)
    setTabsError(null)
    try {
      const list = await fetchSheetTabs()
      setTabs(list)
      setSelectedGid((current) =>
        list.some((t) => t.gid === current) ? current : list[0]?.gid ?? current,
      )
      return list
    } catch (err) {
      setTabsError(err.message)
      throw err
    } finally {
      setTabsLoading(false)
    }
  }

  useEffect(() => {
    loadTabs().catch(() => {})
  }, [])

  const runFetch = async () => {
    if (!selectedGid) {
      toast({ title: 'Select a sheet tab first', status: 'warning', duration: 2500, position: 'top' })
      return
    }
    setLoading(true)
    try {
      const data = await fetchSpreadsheetCsv({ gid: selectedGid })
      const mapped = mapSheetToCompanies(data.rows)
      const tabName = selectedTab?.name ?? selectedGid
      const before = companies

      setPreview({
        headers: data.headers,
        rows: data.rows,
        mapped: mapped.companies,
        skipped: mapped.skipped,
        fetchedAt: data.fetchedAt,
        tabName,
        gid: selectedGid,
      })

      const result = importCompaniesFromSheet(mapped.companies)

      if (result.added > 0 || result.updated > 0) {
        createSyncBackup({
          companiesBefore: before,
          tabName,
          gid: selectedGid,
          rowCount: data.rows.length,
          added: result.added,
          updated: result.updated,
          companyCountAfter: result.companies.length,
        })
        setBackups(listHistoryEntries())

        const parts = []
        if (result.added > 0) {
          parts.push(
            `${result.added} new compan${result.added === 1 ? 'y' : 'ies'} inserted`,
          )
        }
        if (result.updated > 0) {
          parts.push(
            `${result.updated} compan${result.updated === 1 ? 'y' : 'ies'} updated from Excel`,
          )
        }
        toast({
          title: result.added > 0 ? 'Excel changes applied' : 'Excel updates applied',
          description: `“${tabName}” · ${parts.join(' · ')}`,
          status: 'success',
          duration: 4500,
          isClosable: true,
          position: 'top',
        })
      } else {
        toast({
          title: 'Already up to date',
          description: `“${tabName}” fetched · no new or changed companies`,
          status: 'info',
          duration: 3500,
          isClosable: true,
          position: 'top',
        })
      }
    } catch (err) {
      toast({
        title: 'Could not fetch spreadsheet',
        description: err.message,
        status: 'error',
        duration: 6000,
        isClosable: true,
        position: 'top',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    try {
      await loadTabs()
    } catch {
      /* fetch will surface errors */
    }
    await runFetch()
  }

  const handleRestore = (backupId) => {
    const bak = backups.find((b) => b.id === backupId)
    if (!bak?.companies) {
      toast({
        title: 'Cannot restore',
        description: 'This history entry has no saved company list.',
        status: 'warning',
        duration: 3000,
        position: 'top',
      })
      return
    }
    createRestorePointBackup({
      companies,
      label: historyTitle(bak),
    })
    const n = replaceAllCompanies(bak.companies)
    setBackups(listHistoryEntries())
    historyDrawer.onClose()
    toast({
      title: 'List restored',
      description: `Back to ${n} companies (from ${formatWhen(bak.at)})`,
      status: 'success',
      duration: 4000,
      isClosable: true,
      position: 'top',
    })
  }

  const handleDeleteBackup = (id) => {
    setBackups(deleteBackup(id))
  }

  return (
    <Box flex="1" minH={0} display="flex" flexDirection="column" overflow="hidden" maxW="1800px" w="100%" mx="auto">
      <Box
        flexShrink={0}
        zIndex={15}
        bg="surface.page"
        borderBottomWidth="1px"
        borderColor="surface.border"
        px={{ base: 4, md: 6 }}
        py={3}
      >
        <Flex
          justify="space-between"
          align={{ base: 'stretch', md: 'center' }}
          gap={3}
          direction={{ base: 'column', md: 'row' }}
        >
          <HStack spacing={3} align="center" minW={0} flex="1">
            <Heading size="md" letterSpacing="-0.02em" flexShrink={0}>
              Spreadsheet
            </Heading>
            <Select
              maxW="220px"
              size="sm"
              value={selectedGid}
              onChange={(e) => {
                setSelectedGid(e.target.value)
                setPreview(null)
              }}
              bg="surface.raised"
              borderColor="surface.border"
              isDisabled={tabsLoading || !tabs.length}
            >
              {tabs.map((tab) => (
                <option key={tab.gid} value={tab.gid}>
                  {tab.name}
                </option>
              ))}
            </Select>
            <Text fontSize="2xs" color="gray.500" noOfLines={1} display={{ base: 'none', lg: 'block' }}>
              {tabsLoading
                ? 'Loading tabs…'
                : tabsError
                  ? tabsError
                  : `${companies.length} in db${lastSheetSync ? ` · synced ${formatWhen(lastSheetSync)}` : ''}`}
            </Text>
          </HStack>

          <HStack spacing={2} flexShrink={0}>
            <Tooltip label="Sync history & backups" hasArrow>
              <IconButton
                aria-label="History"
                variant="outline"
                borderColor="surface.borderStrong"
                icon={<Glyph d={ICONS.history} />}
                onClick={() => {
                  setBackups(listHistoryEntries())
                  historyDrawer.onOpen()
                }}
              />
            </Tooltip>
            <Tooltip label="Refresh this sheet tab" hasArrow>
              <IconButton
                aria-label="Refresh sheet"
                variant="outline"
                borderColor="surface.borderStrong"
                icon={<Glyph d={ICONS.refresh} />}
                onClick={handleRefresh}
                isLoading={loading}
                isDisabled={!selectedGid || tabsLoading}
              />
            </Tooltip>
            <Button
              as={Link}
              href={sheetEditUrl({ gid: selectedGid })}
              isExternal
              size="sm"
              variant="outline"
              borderColor="surface.borderStrong"
              leftIcon={<Glyph d={ICONS.open} />}
            >
              Open
            </Button>
            <Button
              size="sm"
              colorScheme="brand"
              onClick={() => runFetch()}
              isLoading={loading}
              loadingText="Fetching…"
              isDisabled={!selectedGid || tabsLoading}
            >
              Fetch
            </Button>
          </HStack>
        </Flex>
      </Box>

      <Box flex="1" minH={0} display="flex" flexDirection="column" overflow="hidden" px={{ base: 4, md: 6 }} py={3}>
        <SectionCard
          title={preview ? `Preview · ${preview.tabName}` : 'Preview'}
          subtitle={
            preview
              ? `${preview.rows.length} rows · ${preview.headers.length} columns · double-click a cell to edit`
              : 'Select a tab, then Fetch or Refresh'
          }
          action={
            preview ? (
              <Badge colorScheme="green" variant="subtle">
                {preview.headers.length} cols
              </Badge>
            ) : null
          }
          bodyProps={{ p: 0, flex: 1, minH: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          h="100%"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          {!preview ? (
            <Box px={4} py={10}>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                No data loaded yet. Pick a sheet tab, then Fetch.
              </Text>
            </Box>
          ) : (
            <SheetPreviewGrid
              headers={preview.headers}
              rows={preview.rows}
              onCellChange={(rowIndex, header, value) => {
                setPreview((p) => {
                  if (!p) return p
                  const rows = p.rows.map((r, i) =>
                    i === rowIndex ? { ...r, [header]: value } : r,
                  )
                  return { ...p, rows }
                })
              }}
            />
          )}
        </SectionCard>
      </Box>

      <Drawer isOpen={historyDrawer.isOpen} placement="right" onClose={historyDrawer.onClose} size="md">
        <DrawerOverlay bg="blackAlpha.400" />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="md">Change history</DrawerHeader>
          <DrawerBody px={4} pb={6}>
            <Text fontSize="xs" color="gray.500" mb={4}>
              Only shown when Excel actually changed something. Each card is one sync:
              previous list → new list. Undo restores the previous state.
            </Text>
            {backups.length === 0 ? (
              <Text fontSize="sm" color="gray.500">
                No changes logged yet. Fetch a sheet that adds or updates companies.
              </Text>
            ) : (
              <VStack align="stretch" spacing={3}>
                {backups.map((b) => (
                  <Box
                    key={b.id}
                    borderWidth="1px"
                    borderColor="surface.border"
                    borderRadius="md"
                    px={3}
                    py={3}
                    bg="surface.sunken"
                  >
                    <Flex justify="space-between" gap={2} align="start">
                      <Box minW={0}>
                        <HStack spacing={2} mb={0.5} flexWrap="wrap">
                          <Text fontSize="sm" fontWeight={600}>
                            {historyTitle(b)}
                          </Text>
                          {b.kind === 'safety' && (
                            <Badge colorScheme="orange" variant="subtle" fontSize="2xs">
                              Before undo
                            </Badge>
                          )}
                          {b.added > 0 && (
                            <Badge colorScheme="green" variant="subtle" fontSize="2xs">
                              +{b.added} new
                            </Badge>
                          )}
                          {b.updated > 0 && (
                            <Badge colorScheme="blue" variant="subtle" fontSize="2xs">
                              {b.updated} field change{b.updated === 1 ? '' : 's'}
                            </Badge>
                          )}
                        </HStack>
                        <Text fontSize="xs" color="gray.600">
                          {historySummary(b)}
                        </Text>
                        <Text fontSize="2xs" color="gray.500" mt={1} fontWeight={500}>
                          {b.companyCount != null && b.companyCountAfter != null
                            ? b.companyCount === b.companyCountAfter && (b.updated ?? 0) > 0
                              ? `${b.companyCount} companies (count unchanged)`
                              : `Before ${b.companyCount} → After ${b.companyCountAfter}`
                            : null}
                        </Text>
                        <Text fontSize="2xs" color="gray.400" mt={0.5}>
                          {formatWhen(b.at)}
                        </Text>
                      </Box>
                      <HStack spacing={1} flexShrink={0}>
                        <Button
                          size="xs"
                          colorScheme="brand"
                          variant="outline"
                          isDisabled={!b.companies?.length}
                          onClick={() => handleRestore(b.id)}
                        >
                          Undo
                        </Button>
                        <Button
                          size="xs"
                          variant="ghost"
                          colorScheme="red"
                          onClick={() => handleDeleteBackup(b.id)}
                        >
                          Delete
                        </Button>
                      </HStack>
                    </Flex>
                  </Box>
                ))}
              </VStack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
