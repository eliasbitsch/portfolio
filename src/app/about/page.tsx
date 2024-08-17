import { Box, Heading, Text } from '@chakra-ui/react'

export default function About() {
    return (
        <Box
            p={5}
            bg="gray.900"
            minH="90vh"
            mt={20}
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            position="relative"
            overflow="hidden">
            <Heading as="h1" size="2xl" mb={4}>
                About Me
            </Heading>
            <Text fontSize="lg">
                Here you can write about yourself.
            </Text>
        </Box>
    )
}
