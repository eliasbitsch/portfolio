import { Box, Heading, Text } from '@chakra-ui/react'

export default function Skillset() {
    return (
        <Box textAlign="center" py={10} px={30}>
            <Heading as="h1" size="2xl" mb={4}>
                My Skillset
            </Heading>
            <Text fontSize="lg">
                Here you can list your skills.
            </Text>
        </Box>
    )
}
