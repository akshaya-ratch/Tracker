import { useEffect, useRef, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useOutsideClick,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../state/AuthContext'
import { useWorkspace } from '../../state/WorkspaceContext'
import { primaryCity } from '../../data/repository'
import { currentStage } from '../../utils/calculations'
import { GateBadge } from '../common/StatusBadge'

function Glyph({ d, ...rest }) {
  return (
    <Icon viewBox="0 0 24 24" boxSize="15px" {...rest}>
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

const ICON = {
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 5 5',
  menu: 'M4 7h16M4 12h16M4 17h16',
}

function GlobalSearch() {
  const { quickSearch } = useWorkspace()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useOutsideClick({ ref, handler: () => setOpen(false) })

  useEffect(() => {
    const onKey = (e) => {
      const tag = document.activeElement?.tagName
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const results = quickSearch(q)

  const go = (companyId) => {
    navigate(companyId ? `/companies/${companyId}` : '/companies')
    setQ('')
    setOpen(false)
  }

  return (
    <Box position="relative" ref={ref} flex="1" maxW="440px">
      <InputGroup>
        <InputLeftElement pointerEvents="none" h="32px">
          <Glyph d={ICON.search} color="gray.400" boxSize="14px" />
        </InputLeftElement>
        <Input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && results.length) go(results[0].id)
            if (e.key === 'Escape') setOpen(false)
          }}
          placeholder="Search companies…"
          bg="surface.sunken"
          borderColor="transparent"
          _hover={{ borderColor: 'surface.borderStrong' }}
          _focus={{ bg: 'surface.raised' }}
        />
        {!q && (
          <InputRightElement h="32px" pr={2} pointerEvents="none">
            <Kbd fontSize="2xs" color="gray.400" bg="transparent" borderColor="surface.borderStrong">
              /
            </Kbd>
          </InputRightElement>
        )}
      </InputGroup>

      {open && q.trim() && (
        <Box
          position="absolute"
          top="calc(100% + 6px)"
          left={0}
          right={0}
          bg="surface.raised"
          borderWidth="1px"
          borderColor="surface.border"
          borderRadius="lg"
          boxShadow="raised"
          zIndex={30}
          overflow="hidden"
          maxH="380px"
          overflowY="auto"
        >
          {results.length === 0 ? (
            <Box px={3} py={4}>
              <Text fontSize="xs" color="gray.500">
                No companies match “{q}”.
              </Text>
            </Box>
          ) : (
            <List>
              {results.map((c) => {
                const stage = currentStage(c)
                return (
                  <ListItem
                    key={c.id}
                    px={3}
                    py={2}
                    cursor="pointer"
                    _hover={{ bg: 'brand.50' }}
                    borderBottomWidth="1px"
                    borderColor="surface.border"
                    _last={{ borderBottom: 'none' }}
                    onClick={() => go(c.id)}
                  >
                    <Flex align="center" justify="space-between" gap={3}>
                      <Box minW={0}>
                        <Text fontSize="sm" fontWeight={600} color="gray.800" noOfLines={1}>
                          {c.name}
                        </Text>
                        <Text fontSize="2xs" color="gray.500" noOfLines={1}>
                          {primaryCity(c.location) ?? 'Location not set'} · {stage.label}
                        </Text>
                      </Box>
                      <GateBadge result={stage.result} size="xs" />
                    </Flex>
                  </ListItem>
                )
              })}
            </List>
          )}
        </Box>
      )}
    </Box>
  )
}

export default function TopBar({ onOpenSidebar }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <Flex
      as="header"
      align="center"
      gap={3}
      px={{ base: 3, md: 5 }}
      py={2.5}
      bg="surface.raised"
      borderBottomWidth="1px"
      borderColor="surface.border"
      position="sticky"
      top={0}
      zIndex={20}
    >
      <IconButton
        aria-label="Open navigation"
        variant="ghost"
        display={{ base: 'inline-flex', lg: 'none' }}
        icon={<Glyph d={ICON.menu} />}
        onClick={onOpenSidebar}
      />

      <GlobalSearch />

      <HStack spacing={2} ml="auto" flexShrink={0}>
        <Menu placement="bottom-end">
          <Tooltip label={user?.email || 'Account'} hasArrow placement="bottom-end">
            <MenuButton
              as={Button}
              variant="ghost"
              p={0}
              minW="auto"
              h="auto"
              borderRadius="full"
            >
              <Avatar size="xs" name={user?.name || user?.email || 'User'} bg="brand.600" color="white" />
            </MenuButton>
          </Tooltip>
          <MenuList fontSize="sm" minW="180px" borderColor="surface.border" py={1}>
            <Box px={3} py={2} borderBottomWidth="1px" borderColor="surface.border">
              <Text fontSize="xs" fontWeight={600} noOfLines={1}>
                {user?.name || 'Signed in'}
              </Text>
              <Text fontSize="2xs" color="gray.500" noOfLines={1}>
                {user?.email}
              </Text>
            </Box>
            <MenuItem onClick={handleLogout} fontSize="sm">
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  )
}
