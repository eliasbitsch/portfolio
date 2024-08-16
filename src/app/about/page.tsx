import { Box, Heading, Text } from '@chakra-ui/react'

export default function About() {
    return (
        <Box textAlign="center" py={10} px={30}>
            <Heading as="h1" size="2xl" mb={4}>
                About Me
            </Heading>
            <Text fontSize="lg">
                Here you can write about yourself.
            </Text>
        </Box>
    )
}
