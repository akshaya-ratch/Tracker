import {
  Avatar,
  Box,
  Grid,
  GridItem,
  HStack,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import SectionCard from '../common/SectionCard'
import Field, { Value } from '../common/Field'
import DataQualityWarning from '../common/DataQualityWarning'
import EmptyState from '../common/EmptyState'
import { issuesForField } from '../../utils/dataQuality'
import { NOT_RESEARCHED } from '../../utils/calculations'

function initials(name) {
  return name
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

/** Founders are people, not a comma-joined blob. */
function FounderCard({ name }) {
  return (
    <HStack
      spacing={2.5}
      px={2.5}
      py={2}
      borderWidth="1px"
      borderColor="surface.border"
      borderRadius="md"
      bg="surface.sunken"
      minW="180px"
    >
      <Avatar size="xs" name={initials(name)} bg="brand.100" color="brand.700" />
      <Box minW={0}>
        <Text fontSize="xs" fontWeight={600} color="gray.800" noOfLines={1}>
          {name}
        </Text>
        <Text fontSize="2xs" color="gray.500">
          Founder
        </Text>
      </Box>
    </HStack>
  )
}

export default function CompanyOverview({ company }) {
  const audit = company.derived.audit
  const { funding, employees, business } = company
  const hasBusinessData =
    Object.values(business).some(Boolean) || Boolean(company.brief)

  return (
    <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap={4}>
      <GridItem minW={0}>
        <VStack align="stretch" spacing={4}>
          <SectionCard title="Company information">
            <Grid
              templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
              gap={4}
            >
              <Field label="Startup name" value={company.name} />
              <Field label="Founded year" value={company.foundedYear} />
              <Field label="Location" value={company.location} />
              <Field
                label="Employees (reported)"
                value={employees.reported}
                issues={issuesForField(audit, 'employees')}
                fallback="Not recorded"
              />
              <Field
                label="Employee range"
                value={employees.range?.label}
                issues={issuesForField(audit, 'employees')}
              />
              <Field
                label="Employee growth"
                value={company.employeeGrowth}
                fallback={NOT_RESEARCHED}
                issues={issuesForField(audit, 'employeeGrowth')}
              />
            </Grid>

            {employees.raw && (
              <Text fontSize="2xs" color="gray.400" mt={3} fontFamily="mono">
                Source cell: “{employees.raw}”
              </Text>
            )}
          </SectionCard>

          <SectionCard title="Funding">
            <Grid templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap={4} mb={4}>
              <Field label="Funding type" value={funding.type} />
              <Field label="Funding amount">
                <Value>{funding.amount}</Value>
              </Field>
              <Field label="Funding date" value={funding.date} fallback="Not recorded" />
            </Grid>

            <Box>
              <Text
                fontSize="2xs"
                fontWeight={600}
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="0.05em"
                mb={1.5}
              >
                Investors {funding.investors.length > 0 && `(${funding.investors.length})`}
              </Text>
              {funding.investors.length ? (
                <Wrap spacing={1.5}>
                  {funding.investors.map((inv, i) => (
                    <WrapItem key={i}>
                      <Tag size="sm" variant="subtle" colorScheme="gray" fontSize="xs">
                        {inv}
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
              ) : (
                <Value>{null}</Value>
              )}
            </Box>
          </SectionCard>

          <SectionCard
            title="Founders"
            subtitle={
              company.founders.length
                ? `${company.founders.length} recorded in the sheet`
                : undefined
            }
          >
            {company.founders.length ? (
              <Wrap spacing={2}>
                {company.founders.map((f, i) => (
                  <WrapItem key={i}>
                    <FounderCard name={f} />
                  </WrapItem>
                ))}
              </Wrap>
            ) : (
              <EmptyState title="No founders recorded" py={6} />
            )}

            {company.founderNote && (
              <Box
                mt={3}
                px={3}
                py={2}
                bg="orange.50"
                borderWidth="1px"
                borderColor="orange.200"
                borderRadius="md"
              >
                <Text fontSize="2xs" fontWeight={600} color="orange.800" mb={0.5}>
                  Extra note in the founders cell — needs verification
                </Text>
                <Text fontSize="xs" color="orange.900">
                  {company.founderNote}
                </Text>
              </Box>
            )}
          </SectionCard>

          {/* Gate 3 / Gate 4 fields - empty in the source sheet, fillable in the
              workspace, and shown here as soon as a researcher captures them. */}
          <SectionCard
            title="Business & PMF"
            subtitle="Gate 3 research · edit this company to capture it"
          >
            <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={4}>
              <Field label="Product" value={business.product} fallback={NOT_RESEARCHED} />
              <Field label="Business growth" value={business.growth} fallback={NOT_RESEARCHED} />
              <Field label="Revenue" value={business.revenue} fallback={NOT_RESEARCHED} />
              <Field label="Product-market fit" value={business.pmf} fallback={NOT_RESEARCHED} />
              <Field
                label="Public perception"
                value={business.publicPerception}
                fallback={NOT_RESEARCHED}
              />
              <Field label="Customers" value={business.customers} fallback={NOT_RESEARCHED} />
            </Grid>
            <Box mt={4}>
              <Field label="Brief" value={company.brief} fallback={NOT_RESEARCHED} />
            </Box>
            {!hasBusinessData && (
              <Text fontSize="2xs" color="gray.500" mt={3}>
                Product, business and brief are collected at Gate 3 and Gate 4. Nothing
                has been recorded for this company yet.
              </Text>
            )}
          </SectionCard>

          {company.decisionMakers.length > 0 && (
            <SectionCard
              title="Decision makers"
              subtitle={`${company.decisionMakers.length} recorded · Gate 4 research`}
            >
              <VStack align="stretch" spacing={3}>
                {company.decisionMakers.map((person) => (
                  <Box
                    key={person.id}
                    px={3}
                    py={2.5}
                    borderWidth="1px"
                    borderColor="surface.border"
                    borderRadius="md"
                    bg="surface.sunken"
                  >
                    <HStack justify="space-between" align="start" gap={3}>
                      <Box minW={0}>
                        <Text fontSize="sm" fontWeight={600} color="gray.800">
                          {person.name || 'Unnamed'}
                        </Text>
                        <Text fontSize="2xs" color="gray.500">
                          {person.role ?? 'Role not recorded'}
                        </Text>
                      </Box>
                      <VStack align="end" spacing={0.5} fontSize="2xs" color="gray.600">
                        {person.email && <Text>{person.email}</Text>}
                        {person.phone && <Text>{person.phone}</Text>}
                        {person.linkedin && (
                          <Text color="brand.600" noOfLines={1} maxW="220px">
                            {person.linkedin}
                          </Text>
                        )}
                      </VStack>
                    </HStack>
                    {person.characteristics && (
                      <Text fontSize="xs" color="gray.600" mt={1.5}>
                        {person.characteristics}
                      </Text>
                    )}
                  </Box>
                ))}
              </VStack>
            </SectionCard>
          )}
        </VStack>
      </GridItem>

      <GridItem minW={0}>
        <VStack align="stretch" spacing={4}>
          <SectionCard title="Data quality" subtitle="Surfaced, never silently corrected">
            <DataQualityWarning audit={audit} flat />
          </SectionCard>

          <SectionCard title="Prototype priority" subtitle="Frontend heuristic — not the Ratch scoring engine">
            <HStack justify="space-between" mb={3}>
              <Text fontSize="sm" fontWeight={600} color={`${company.derived.priority.color}.600`}>
                {company.derived.priority.label}
              </Text>
              <Text fontSize="xs" color="gray.500" className="tabular">
                score {company.derived.priority.score}
              </Text>
            </HStack>

            {company.derived.priority.contributions.length ? (
              <VStack align="stretch" spacing={2}>
                {company.derived.priority.contributions.map((c, i) => (
                  <Box key={i}>
                    <HStack justify="space-between" align="baseline">
                      <Text fontSize="xs" color="gray.700" fontWeight={500}>
                        {c.label}
                      </Text>
                      <Text fontSize="2xs" color="gray.500" className="tabular">
                        +{c.points}
                      </Text>
                    </HStack>
                    <Text fontSize="2xs" color="gray.500">
                      {c.detail}
                    </Text>
                  </Box>
                ))}
              </VStack>
            ) : (
              <Text fontSize="xs" color="gray.500">
                No positive signals recorded yet.
              </Text>
            )}

            <Text fontSize="2xs" color="gray.400" mt={3} lineHeight="short">
              Signal coverage {Math.round(company.derived.priority.coverage * 100)}% —
              the share of scoring inputs that have any data at all.
            </Text>
          </SectionCard>
        </VStack>
      </GridItem>
    </Grid>
  )
}
