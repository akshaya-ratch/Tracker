import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef } from 'react'

/**
 * The workspace action bar. Sticks to the bottom of the page while editing so
 * Save is always reachable from any tab, and states plainly whether there are
 * unsaved changes.
 */
export default function EditBar({ isDirty, onSave, onCancel, onReset, isEdited }) {
  const reset = useDisclosure()
  const cancelRef = useRef(null)

  return (
    <>
      <Box
        position="sticky"
        bottom={0}
        zIndex={15}
        bg="surface.raised"
        borderTopWidth="1px"
        borderColor="surface.border"
        boxShadow="0 -4px 12px rgba(16, 24, 40, 0.06)"
        px={{ base: 4, md: 6 }}
        py={2.5}
      >
        <Flex align="center" justify="space-between" gap={3} maxW="1800px" mx="auto">
          <HStack spacing={2.5} minW={0}>
            <Badge colorScheme={isDirty ? 'orange' : 'gray'} variant="subtle">
              {isDirty ? 'Unsaved changes' : 'No changes'}
            </Badge>
            <Text fontSize="2xs" color="gray.500" noOfLines={1}>
              Saving updates the table, gate badges, priority and calculated
              metrics immediately.
            </Text>
          </HStack>

          <HStack spacing={2} flexShrink={0}>
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={reset.onOpen}
              isDisabled={!isEdited && !isDirty}
            >
              Reset
            </Button>
            <Button
              variant="outline"
              borderColor="surface.borderStrong"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button colorScheme="brand" onClick={onSave} isDisabled={!isDirty}>
              Save Changes
            </Button>
          </HStack>
        </Flex>
      </Box>

      <AlertDialog
        isOpen={reset.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={reset.onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="md" fontWeight={600} pb={2}>
              Reset to source data?
            </AlertDialogHeader>
            <AlertDialogBody fontSize="sm" color="gray.600">
              This discards every change made to this company in this session —
              including changes already saved — and restores the values extracted
              from sheet 108.
            </AlertDialogBody>
            <AlertDialogFooter gap={2}>
              <Button ref={cancelRef} onClick={reset.onClose} variant="ghost">
                Keep my changes
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onReset()
                  reset.onClose()
                }}
              >
                Reset to source
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
