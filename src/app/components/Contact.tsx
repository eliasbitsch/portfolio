'use client';

import React from 'react';
import { Box, VStack, HStack, Link, SimpleGrid, Icon } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { SiOrcid } from 'react-icons/si';
import SectionHeading from './SectionHeading';

interface Channel {
    id: string;
    label: string;
    value: string;
    href: string;
    icon: React.ElementType;
    external: boolean;
}

const channels: Channel[] = [
    {
        id: 'mail',
        label: 'Email',
        value: 'eliasbitsch@protonmail.com',
        href: 'mailto:eliasbitsch@protonmail.com',
        icon: MdOutlineMailOutline,
        external: false,
    },
    {
        id: 'mail2',
        label: 'Email (alternative)',
        value: 'eliasbitsch@hotmail.com',
        href: 'mailto:eliasbitsch@hotmail.com',
        icon: MdOutlineMailOutline,
        external: false,
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        value: 'elias-bitsch',
        href: 'https://www.linkedin.com/in/elias-bitsch-a1b617239/',
        icon: FaLinkedin,
        external: true,
    },
    {
        id: 'github',
        label: 'GitHub',
        value: 'github.com/eliasbitsch',
        href: 'https://github.com/eliasbitsch',
        icon: FaGithub,
        external: true,
    },
    {
        id: 'orcid',
        label: 'ORCID',
        value: '0009-0007-4777-554X',
        href: 'https://orcid.org/0009-0007-4777-554X',
        icon: SiOrcid,
        external: true,
    },
    {
        id: 'cv',
        label: 'Curriculum Vitae',
        value: 'Download PDF',
        href: '/assets/CV_Elias_Bitsch.pdf',
        icon: FaFileAlt,
        external: true,
    },
];

const ChannelCard: React.FC<{ channel: Channel }> = ({ channel }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    return (
        <Link
            href={channel.href}
            isExternal={channel.external}
            _hover={{ textDecoration: 'none' }}
            ref={ref}
        >
            <Box
                className={`card ${inView ? 'animate' : ''}`}
                bg="gray.800"
                p={5}
                borderRadius="lg"
                boxShadow="lg"
                height="100%"
                _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
                transition="transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-in-out"
            >
                <HStack spacing={4} align="center">
                    <Icon as={channel.icon} boxSize="24px" color="#3C5AF0" />
                    <VStack align="flex-start" spacing={0}>
                        <Box fontSize="sm" color="gray.400">
                            {channel.label}
                        </Box>
                        <Box fontSize="md" fontWeight="semibold" color="white">
                            {channel.value}
                        </Box>
                    </VStack>
                </HStack>
            </Box>
        </Link>
    );
};

export default function Contact() {
    return (
        <Box p={5} pt={{ base: 24, md: 28 }} pb={{ base: 16, md: 20 }} minH="100vh">
            <Box textAlign="left" maxWidth={{ base: "800px", xl: "1200px" }} width="100%" mx="auto">
                <SectionHeading>Contact</SectionHeading>
                <Box fontSize="md" color="gray.400" mt={3} mb={6} maxWidth="640px">
                    Happy to talk about mixed reality for human-robot collaboration, user studies,
                    or a possible collaboration. Email is the fastest way to reach me.
                </Box>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {channels.map(channel => (
                        <ChannelCard key={channel.id} channel={channel} />
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
}
