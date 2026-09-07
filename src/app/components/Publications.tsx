'use client';

import React from 'react';
import { Box, VStack, HStack, Stack, Tag, Wrap, Link } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import SectionHeading from './SectionHeading';

interface Publication {
    id: number;
    title: string;
    authors: string;
    venue: string;
    status: string;
    statusColor: string;
    date: string;
    tags: string[];
    url?: string;
}

const publications: Publication[] = [
    {
        id: 1,
        title: 'MetaMove: Bare-Hand Mixed-Reality Teleoperation of a Collaborative Robot with a Distance-Based Speed-Scaling Safety Layer',
        authors: 'Elias Bitsch, Viktoriia Ovdiienko, Philip Stix, Alexandra Saliger, Nikolaus Angel, Horst Orsolits',
        venue: 'XR-SPro Workshop, IEEE ISMAR 2026 Adjunct Proceedings, Bari, Italy',
        status: 'Accepted',
        statusColor: 'green',
        date: '2026',
        tags: ['Mixed Reality', 'Teleoperation', 'ROS 2', 'Hand Tracking', 'ISO/TS 15066'],
        url: 'https://sites.google.com/view/xr-spro2026/',
    },
    {
        id: 2,
        title: 'Human-Robot Interaction for Casting Parts and Defect Annotation',
        authors: 'Elias Bitsch',
        venue: 'Live demonstration, Applied AI Conference (AAIC), joint AIT and Fraunhofer session',
        status: 'Demonstration',
        statusColor: 'blue',
        date: '2026',
        tags: ['Human-Robot Interaction', 'Tangible Interfaces', 'Defect Annotation'],
    },
];

const PublicationCard: React.FC<{ publication: Publication }> = ({ publication }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    const card = (
        <Box
            ref={ref}
            className={`card ${inView ? 'animate' : ''}`}
            bg="gray.800"
            p={5}
            borderRadius="lg"
            boxShadow="lg"
            width="100%"
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
            transition="transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-in-out"
        >
            <VStack align="stretch" mb={3}>
                <HStack spacing={3} justify="space-between" align="flex-start">
                    <Box fontSize={{ base: 'md', md: 'xl' }} fontWeight="bold" color="white">
                        {publication.title}
                    </Box>
                    <Box color="gray.500" fontSize={{ base: 'sm', md: 'md' }} flexShrink={0}>
                        {publication.date}
                    </Box>
                </HStack>
                <Box fontSize="sm" color="gray.400" mt={1}>
                    {publication.authors}
                </Box>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    spacing={{ base: 2, md: 3 }}
                    mt={2}
                    align={{ base: 'flex-start', md: 'center' }}
                >
                    <Tag
                        colorScheme={publication.statusColor}
                        borderRadius="full"
                        fontSize="xs"
                        flexShrink={0}
                    >
                        {publication.status}
                    </Tag>
                    <Box fontSize="sm" color="gray.300">
                        {publication.venue}
                    </Box>
                </Stack>
            </VStack>
            <Wrap spacing={2} mt={3}>
                {publication.tags.map(tag => (
                    <Tag key={tag} colorScheme="gray" variant="outline" borderRadius="full" fontSize="sm">
                        {tag}
                    </Tag>
                ))}
            </Wrap>
        </Box>
    );

    return publication.url ? (
        <Link href={publication.url} isExternal _hover={{ textDecoration: 'none' }}>
            {card}
        </Link>
    ) : (
        card
    );
};

export default function Publications() {
    return (
        <Box p={5} pt={{ base: 24, md: 28 }} minH="100vh">
            <Box textAlign="left" maxWidth={{ base: "800px", xl: "1200px" }} width="100%" mx="auto">
                <SectionHeading>Publications</SectionHeading>
                <Box fontSize="md" color="gray.400" mt={3} mb={6}>
                    ORCID{' '}
                    <Link href="https://orcid.org/0009-0007-4777-554X" isExternal color="#3C5AF0">
                        0009-0007-4777-554X
                    </Link>
                </Box>
                <VStack spacing={5} align="stretch">
                    {publications.map(publication => (
                        <PublicationCard key={publication.id} publication={publication} />
                    ))}
                </VStack>
            </Box>
        </Box>
    );
}
