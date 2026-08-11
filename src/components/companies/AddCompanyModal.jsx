import { useState } from 'react'
import {
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { TextField, NumberField, RepeatableList } from '../common/FormFields'
import { useWorkspace } from '../../state/WorkspaceContext'
import { emptyFounder } from '../../data/createCompany'

const INITIAL = () => ({
  name: '',
  foundedYear: '',
  linkedin: '',
  website: '',
  location: '',
  founders: [emptyFounder()],
})

export default function AddCompanyModal({ isOpen, onClose }) {
  const { addCompany } = useWorkspace()
  const toast = useToast()
  const [form, setForm] = useState(INITIAL)
  const [submitting, setSubmitting] = useState(false)

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const updateFounder = (index, key, value) => {
    setForm((f) => {
      const founders = f.founders.map((row, i) =>
        i === index ? { ...row, [key]: value ?? '' } : row,
      )
      return { ...f, founders }
    })
  }

  const reset = () => setForm(INITIAL())

  const handleClose = () => {
    reset()
    onClose()
  }

  const handleSubmit = () => {
    const name = form.name?.trim()
    if (!name) {
      toast({
        title: 'Company name is required',
        status: 'warning',
        duration: 2500,
        isClosable: true,
      })
      return
    }

    setSubmitting(true)
    try {
      const saved = addCompany({
        name,
        foundedYear: form.foundedYear,
        linkedin: form.linkedin,
        website: form.website,
        location: form.location,
        founders: form.founders,
      })
      toast({
        title: `${saved.name} added`,
        description: 'Starts at Gate 0 · not yet passed for outreach.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      handleClose()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.400" />
      <ModalContent bg="surface.raised" borderRadius="lg" mx={3}>
        <ModalHeader fontSize="md" letterSpacing="-0.01em">
          Add new company
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={2}>
          <VStack align="stretch" spacing={4}>
            <Text fontSize="sm" color="gray.600">
              Capture the basics. Gate status and outreach start empty — you will
              fill those in later.
            </Text>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={3}>
              <TextField
                label="Company name"
                value={form.name}
                onChange={(v) => setField('name', v ?? '')}
                placeholder="Acme Robotics"
                required
              />
              <NumberField
                label="Founded year"
                value={form.foundedYear === '' ? null : form.foundedYear}
                onChange={(v) => setField('foundedYear', v ?? '')}
                placeholder="2022"
                min={1800}
                max={2100}
              />
              <TextField
                label="LinkedIn"
                value={form.linkedin}
                onChange={(v) => setField('linkedin', v ?? '')}
                placeholder="https://linkedin.com/company/…"
              />
              <TextField
                label="Company website"
                value={form.website}
                onChange={(v) => setField('website', v ?? '')}
                placeholder="https://…"
              />
              <TextField
                label="Location"
                value={form.location}
                onChange={(v) => setField('location', v ?? '')}
                placeholder="Bengaluru, Karnataka, India"
              />
            </Grid>

            <RepeatableList
              label="Founders"
              items={form.founders}
              addLabel="Add founder"
              emptyLabel="No founders yet — click Add founder."
              onAdd={() =>
                setForm((f) => ({ ...f, founders: [...f.founders, emptyFounder()] }))
              }
              onRemove={(index) =>
                setForm((f) => ({
                  ...f,
                  founders: f.founders.filter((_, i) => i !== index),
                }))
              }
              renderItem={(item, index) => (
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr 1fr' }} gap={2}>
                  <TextField
                    label="Name"
                    value={item.name}
                    onChange={(v) => updateFounder(index, 'name', v)}
                    placeholder="Founder name"
                  />
                  <TextField
                    label="Designation"
                    value={item.designation}
                    onChange={(v) => updateFounder(index, 'designation', v)}
                    placeholder="CEO / Co-founder"
                  />
                  <TextField
                    label="LinkedIn"
                    value={item.linkedin}
                    onChange={(v) => updateFounder(index, 'linkedin', v)}
                    placeholder="https://linkedin.com/in/…"
                  />
                </Grid>
              )}
            />
          </VStack>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button variant="ghost" onClick={handleClose} isDisabled={submitting}>
            Cancel
          </Button>
          <Button colorScheme="brand" onClick={handleSubmit} isLoading={submitting}>
            Save company
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
