import { Box, Heading, Text } from '@chakra-ui/react'

export default function Projects() {
  return (
    <Box textAlign="center" py={10} px={30}>
      <Heading as="h1" size="2xl" mb={4}>
        My Projects
      </Heading>
      <Text fontSize="lg">
        Here you can showcase your projects.
      </Text>
    </Box>
  )
}
