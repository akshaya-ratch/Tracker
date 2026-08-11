import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const SIDEBAR_WIDTH = '236px'

const PageMetaContext = createContext(() => {})

/** Pages declare the title the top bar should show. */
export function usePageMeta(title, subtitle) {
  const set = useContext(PageMetaContext)
  useEffect(() => {
    set({ title, subtitle })
    document.title = title ? `${title} · Ratch MI` : 'Ratch · Market Intelligence'
  }, [set, title, subtitle])
}

/**
 * Desktop: fixed sidebar + scrolling main column.
 * Tablet / mobile: sidebar collapses into a drawer.
 */
export default function AppShell({ children }) {
  const nav = useDisclosure()
  const [meta, setMeta] = useState({ title: '', subtitle: '' })

  const setPageMeta = useMemo(
    () => (next) =>
      setMeta((prev) =>
        prev.title === next.title && prev.subtitle === next.subtitle ? prev : next,
      ),
    [],
  )

  return (
    <PageMetaContext.Provider value={setPageMeta}>
      <Flex h="100vh" overflow="hidden">
        <Box
          as="nav"
          w={SIDEBAR_WIDTH}
          flexShrink={0}
          display={{ base: 'none', lg: 'block' }}
          h="100%"
        >
          <Sidebar />
        </Box>

        <Drawer isOpen={nav.isOpen} placement="left" onClose={nav.onClose} size="xs">
          <DrawerOverlay bg="blackAlpha.400" />
          <DrawerContent maxW={SIDEBAR_WIDTH}>
            <Sidebar onNavigate={nav.onClose} />
          </DrawerContent>
        </Drawer>

        <Flex direction="column" flex="1" minW={0} h="100%">
          <TopBar onOpenSidebar={nav.onOpen} />
          <Box as="main" flex="1" minH={0} overflow="hidden" display="flex" flexDirection="column" bg="surface.page">
            {children}
          </Box>
        </Flex>
      </Flex>
    </PageMetaContext.Provider>
  )
}
