import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  Progress,
  Text,
  Tooltip,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { GateBadge, PriorityBadge } from '../common/StatusBadge'
import DataQualityWarning from '../common/DataQualityWarning'
import { currentStage } from '../../utils/calculations'

function BackGlyph() {
  return (
    <Icon viewBox="0 0 24 24" boxSize="13px">
      <path
        d="M15 6l-6 6 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

function Meta({ label, children }) {
  return (
    <HStack spacing={1.5} fontSize="xs">
      <Text color="gray.500">{label}</Text>
      <Text color="gray.800" fontWeight={500} className="tabular">
        {children}
      </Text>
    </HStack>
  )
}

function EditGlyph() {
  return (
    <Icon viewBox="0 0 24 24" boxSize="13px">
      <path
        d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Zm10-13 3 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  )
}

export default function CompanyHeader({ company, isEditing, isEdited, onEdit }) {
  const { derived, gates } = company
  const stage = currentStage(company)
  const headcount = derived.headcount

  return (
    <Box
      bg="surface.raised"
      borderBottomWidth="1px"
      borderColor="surface.border"
      px={{ base: 4, md: 6 }}
      pt={4}
      pb={0}
    >
      <Breadcrumb fontSize="xs" color="gray.500" mb={2.5} separator="/">
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="/companies" _hover={{ color: 'brand.600' }}>
            Companies
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <Text color="gray.700">{company.name}</Text>
        </BreadcrumbItem>
      </Breadcrumb>

      <Flex
        justify="space-between"
        align="start"
        gap={5}
        direction={{ base: 'column', lg: 'row' }}
      >
        <Box minW={0}>
          <HStack spacing={3} align="center" mb={1.5} flexWrap="wrap">
            <Heading size="lg" letterSpacing="-0.02em">
              {company.name}
            </Heading>
            <PriorityBadge priority={derived.priority} />
            {isEditing ? (
              <Badge colorScheme="brand" variant="solid">
                Editing
              </Badge>
            ) : (
              isEdited && (
                <Tooltip
                  hasArrow
                  label="This record has been edited in this session. Reset restores the sheet 108 values."
                >
                  <Badge colorScheme="purple" variant="subtle" cursor="help">
                    Edited
                  </Badge>
                </Tooltip>
              )
            )}
          </HStack>

          <Wrap spacing={4} align="center" mb={2.5}>
            {company.location && (
              <WrapItem>
                <Text fontSize="sm" color="gray.700">
                  {company.location}
                </Text>
              </WrapItem>
            )}
            {company.foundedYear && (
              <WrapItem>
                <Meta label="Founded">{company.foundedYear}</Meta>
              </WrapItem>
            )}
            <WrapItem>
              <Meta label="Employees">
                {headcount != null ? (
                  headcount
                ) : (
                  <Text as="span" color="gray.400" fontStyle="italic" fontWeight={400}>
                    Not available
                  </Text>
                )}
              </Meta>
            </WrapItem>
            {company.employees?.range && (
              <WrapItem>
                <Meta label="Range">{company.employees.range.label}</Meta>
              </WrapItem>
            )}
          </Wrap>

          <HStack spacing={4} align="center" flexWrap="wrap">
            <HStack spacing={1.5}>
              <Text fontSize="2xs" color="gray.500" fontWeight={600} letterSpacing="0.04em">
                GATE 0
              </Text>
              <GateBadge result={gates.gate0.result} reason={gates.gate0.reason} />
            </HStack>
            <HStack spacing={1.5}>
              <Text fontSize="2xs" color="gray.500" fontWeight={600} letterSpacing="0.04em">
                GATE 1
              </Text>
              <GateBadge result={gates.gate1.result} reason={gates.gate1.reason} />
            </HStack>
            <Divider orientation="vertical" h="16px" borderColor="surface.borderStrong" />
            <Text fontSize="xs" color="gray.600" fontWeight={500}>
              {stage.label}
            </Text>
            <DataQualityWarning audit={derived.audit} compact />
          </HStack>
        </Box>

        <VStack
          align="stretch"
          spacing={2.5}
          minW={{ base: '100%', lg: '260px' }}
          maxW={{ lg: '300px' }}
          pb={1}
        >
          <Box>
            <Flex justify="space-between" align="baseline" mb={1}>
              <Text fontSize="2xs" fontWeight={600} color="gray.500" letterSpacing="0.05em">
                RESEARCH COMPLETION
              </Text>
              <Tooltip
                hasArrow
                label={`${derived.completion.evaluated} of 5 gates carry a recorded outcome`}
              >
                <Text fontSize="xs" fontWeight={600} color="gray.700" className="tabular">
                  {derived.completion.evaluated}/5 gates
                </Text>
              </Tooltip>
            </Flex>
            <Progress
              value={derived.completion.percent}
              size="sm"
              colorScheme="brand"
              borderRadius="full"
              bg="surface.sunken"
            />
          </Box>
          <HStack spacing={2}>
            <Button
              as={RouterLink}
              to="/companies"
              leftIcon={<BackGlyph />}
              variant="outline"
              borderColor="surface.borderStrong"
            >
              Back
            </Button>
            {!isEditing && (
              <Button
                leftIcon={<EditGlyph />}
                colorScheme="brand"
                onClick={onEdit}
                flex="1"
              >
                Edit research
              </Button>
            )}
          </HStack>
        </VStack>
      </Flex>
    </Box>
  )
}
