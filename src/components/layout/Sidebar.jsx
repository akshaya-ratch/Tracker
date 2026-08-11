import {
  Badge,
  Box,
  Divider,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { useWorkspace } from '../../state/WorkspaceContext'

const NAV_ICONS = {
  dashboard: 'M3 3h7v7H3V3Zm11 0h7v4h-7V3ZM3 14h7v7H3v-7Zm11-3h7v10h-7V11Z',
  companies: 'M3 21V7l7-4v6l7-4v16H3Zm4-4h3m-3-4h3m4 8h3m-3-4h3',
  spreadsheet:
    'M4 4h16v16H4V4Zm4 4h8M8 12h8M8 16h5M4 8h16M8 4v16',
}

function NavIcon({ name }) {
  return (
    <Icon viewBox="0 0 24 24" boxSize="15px" flexShrink={0}>
      <path
        d={NAV_ICONS[name]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

function NavItem({ to, icon, label, count, end = false }) {
  return (
    <Box
      as={NavLink}
      to={to}
      end={end}
      display="block"
      px={2.5}
      py={1.5}
      borderRadius="md"
      fontSize="sm"
      fontWeight={500}
      color="gray.600"
      _hover={{ bg: 'surface.sunken', color: 'gray.900' }}
      _activeLink={{
        bg: 'brand.50',
        color: 'brand.700',
        fontWeight: 600,
        boxShadow: 'inset 2px 0 0 var(--chakra-colors-brand-500)',
      }}
      transition="background 120ms ease"
    >
      <Flex align="center" gap={2.5}>
        {icon && <NavIcon name={icon} />}
        <Text noOfLines={1}>{label}</Text>
        {count != null && (
          <Badge
            ml="auto"
            colorScheme="gray"
            variant="subtle"
            className="tabular"
            bg="surface.sunken"
            color="gray.600"
          >
            {count}
          </Badge>
        )}
      </Flex>
    </Box>
  )
}

export default function Sidebar({ onNavigate }) {
  const { companies } = useWorkspace()

  return (
    <Flex
      direction="column"
      h="100%"
      w="100%"
      bg="surface.raised"
      borderRightWidth="1px"
      borderColor="surface.border"
      onClick={onNavigate}
    >
      <Box px={4} py={4} borderBottomWidth="1px" borderColor="surface.border">
        <HStack spacing={2.5} align="center">
          <Flex
            boxSize="26px"
            borderRadius="md"
            bg="brand.600"
            align="center"
            justify="center"
            color="white"
            fontWeight={700}
            fontSize="xs"
            letterSpacing="-0.02em"
            flexShrink={0}
          >
            R
          </Flex>
          <Box lineHeight="1.15">
            <Text fontSize="sm" fontWeight={700} letterSpacing="0.06em" color="gray.900">
              RATCH
            </Text>
            <Text fontSize="2xs" color="gray.500" letterSpacing="0.02em">
              Market Intelligence
            </Text>
          </Box>
        </HStack>
      </Box>

      <VStack align="stretch" spacing={0.5} px={2} pb={4} flex="1" overflowY="auto">
        <Box pt={3} />
        <NavItem to="/" icon="dashboard" label="Dashboard" end />
        <NavItem to="/companies" icon="companies" label="Companies" count={companies.length} />
        <NavItem to="/spreadsheet" icon="spreadsheet" label="Spreadsheet" />
      </VStack>

      <Divider borderColor="surface.border" />
      <Box px={4} py={3}>
        <Text fontSize="2xs" color="gray.400" lineHeight="short">
          {companies.length === 0
            ? 'No companies yet — add one from the dashboard.'
            : `${companies.length} compan${companies.length === 1 ? 'y' : 'ies'} tracked`}
        </Text>
      </Box>
    </Flex>
  )
}
