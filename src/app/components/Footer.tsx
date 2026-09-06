import React from 'react';
import { Text, Box } from '@chakra-ui/react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            as="footer"
            p={4}
            textAlign="center"
            position="relative"
            mt={10}
            width="100%"
        >
            <Text fontSize="sm" color="gray.500">
                © {currentYear} Elias Bitsch. All rights reserved.
            </Text>
        </Box>
    );
};

export default Footer;
