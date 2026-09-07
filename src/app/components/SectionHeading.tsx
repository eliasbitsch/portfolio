'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

/**
 * Eine Abschnittsueberschrift fuer die ganze Seite: gleiche Groesse, gleiche
 * Ausrichtung und ein Unterstrich mit fester Breite. Vorher lief der Strich
 * auf Textbreite, dadurch war er unter "Publications" doppelt so lang wie
 * unter "About".
 */
export default function SectionHeading({ children }: { children: React.ReactNode }) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
        rootMargin: '0px 0px -5% 0px',
    });

    return (
        <Box
            ref={ref}
            as="h2"
            className={`reveal ${inView ? 'animate' : ''}`}
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight="bold"
            color="white"
            mb={1}
        >
            {children}
            <Box height="3px" width="96px" bg="#3C5AF0" borderRadius="full" mt={2} />
        </Box>
    );
}
