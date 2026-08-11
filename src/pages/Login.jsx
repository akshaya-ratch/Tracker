import { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) return <Navigate to="/" replace />

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    const result = login(email, password)
    setSubmitting(false)
    if (!result.ok) {
      toast({
        title: 'Login failed',
        description: result.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      return
    }
    toast({
      title: 'Signed in',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    })
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="surface.page"
      px={4}
      backgroundImage="radial-gradient(ellipse at top, rgba(63,95,214,0.08), transparent 55%)"
    >
      <Box
        w="100%"
        maxW="380px"
        bg="surface.raised"
        borderWidth="1px"
        borderColor="surface.border"
        borderRadius="lg"
        boxShadow="raised"
        px={6}
        py={7}
      >
        <Flex align="center" gap={2.5} mb={6}>
          <Flex
            boxSize="32px"
            borderRadius="md"
            bg="brand.600"
            align="center"
            justify="center"
            color="white"
            fontWeight={700}
            fontSize="sm"
          >
            R
          </Flex>
          <Box>
            <Text fontSize="xs" fontWeight={700} letterSpacing="0.08em" color="gray.900">
              RATCH
            </Text>
            <Text fontSize="2xs" color="gray.500">
              Market Intelligence
            </Text>
          </Box>
        </Flex>

        <Heading size="md" mb={1} letterSpacing="-0.02em">
          Sign in
        </Heading>
        <Text fontSize="sm" color="gray.500" mb={5}>
          Use your Ratch workspace credentials.
        </Text>

        <Box as="form" onSubmit={onSubmit}>
          <VStack spacing={3.5} align="stretch">
            <FormControl isRequired>
              <FormLabel fontSize="xs" color="gray.600" mb={1}>
                Email
              </FormLabel>
              <Input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@ratch.ai"
                bg="surface.sunken"
                borderColor="surface.border"
                size="sm"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel fontSize="xs" color="gray.600" mb={1}>
                Password
              </FormLabel>
              <Input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                bg="surface.sunken"
                borderColor="surface.border"
                size="sm"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="brand"
              size="sm"
              mt={1}
              isLoading={submitting}
              loadingText="Signing in…"
            >
              Sign in
            </Button>
          </VStack>
        </Box>
      </Box>
    </Flex>
  )
}
