'use client';

import {
    Box,
    Flex,
    Text,
    IconButton,
    useDisclosure,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const NavBar = () => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const isDesktop = useBreakpointValue({ base: false, md: true });
    const pathname = usePathname();
    const menuRef = useRef(null);

    const [activeSection, setActiveSection] = useState('/');

    // Die Leiste folgt dem Scroll: der Abschnitt, der dem oberen Rand am
    // naechsten ist und noch sichtbar ist, gilt als aktiv. Ein reiner
    // IntersectionObserver-Vergleich reicht nicht, weil bei unterschiedlich
    // hohen Abschnitten mehrere gleichzeitig sichtbar sind.
    useEffect(() => {
        if (pathname !== '/') return;

        const ids = ['home', 'publications', 'projects', 'skillset', 'about', 'contact'];
        let frame = 0;

        const update = () => {
            frame = 0;
            // Der letzte Abschnitt, dessen Oberkante schon im oberen Drittel
            // angekommen ist. Toleranter als eine feste Linie, weil zwischen
            // den Abschnitten Abstaende liegen.
            const line = window.innerHeight * 0.35;
            let current = ids[0];
            for (const id of ids) {
                const el = document.getElementById(id);
                if (!el) continue;
                if (el.getBoundingClientRect().top - line <= 1) current = id;
                else break;
            }
            const atBottom =
                window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
            if (atBottom) current = ids[ids.length - 1];
            setActiveSection(current === 'home' ? '/' : '/#' + current);
        };

        const onScroll = () => {
            if (frame) return;
            frame = window.requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, [pathname]);

    const isActive = (href: string) =>
        pathname === '/' ? activeSection === href : pathname === href;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (menuRef.current && !(menuRef.current as HTMLElement).contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <Box
            position="fixed"
            top={0}
            zIndex="docked"
            py={4}
            px={6}
            left={0}
            right={0}
            boxShadow="0 5px 15px rgba(0, 0, 0, 0.2)"
            bg="rgba(26, 32, 44, 0.8)"
            color="white"
            backdropFilter="saturate(180%) blur(5px)" // Add blur to the navbar
            ref={menuRef}
        >
            <Flex align="center" justify="space-between">
                {!isDesktop && (
                    <IconButton
                        aria-label="Toggle Menu"
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        _hover={{ bg: 'rgba(255, 255, 255, 0.16)', color: 'white' }}
                        onClick={onToggle}
                        ml="auto"
                        borderRadius="0.7rem"
                        backgroundColor="rgba(255, 255, 255, 0.08)"
                        color="white"
                    />
                )}

                {isDesktop && (
                    <Flex justifyContent="center" fontSize="lg" alignItems="center" width="100%">
                        <Link href="/" passHref>
                            <Text
                                px={4}
                                py={2}
                                borderRadius="md"
                                mx={2}
                                bg={isActive('/') ? 'gray.700' : 'transparent'}
                                color={isActive('/') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                Home
                            </Text>
                        </Link>
                        <Link href="/#publications" passHref>
                            <Text
                                px={4}
                                py={2}
                                borderRadius="md"
                                mx={2}
                                bg={isActive('/#publications') ? 'gray.700' : 'transparent'}
                                color={isActive('/#publications') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                Publications
                            </Text>
                        </Link>
                        <Link href="/#projects" passHref>
                            <Text
                                px={4}
                                py={2}
                                borderRadius="md"
                                mx={2}
                                bg={isActive('/#projects') ? 'gray.700' : 'transparent'}
                                color={isActive('/#projects') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                Projects
                            </Text>
                        </Link>
                        <Link href="/#skillset" passHref>
                            <Text
                                px={4}
                                py={2}
                                borderRadius="md"
                                mx={2}
                                bg={isActive('/#skillset') ? 'gray.700' : 'transparent'}
                                color={isActive('/#skillset') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                Skillset
                            </Text>
                        </Link>
                        <Link href="/#about" passHref>
                            <Text
                                px={4}
                                py={2}
                                borderRadius="md"
                                mx={2}
                                bg={isActive('/#about') ? 'gray.700' : 'transparent'}
                                color={isActive('/#about') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                About
                            </Text>
                        </Link>
                        <Link href="/#contact" passHref>
                            <Text
                                px={4}
                                py={2}
                                borderRadius="md"
                                mx={2}
                                bg={isActive('/#contact') ? 'gray.700' : 'transparent'}
                                color={isActive('/#contact') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                Contact
                            </Text>
                        </Link>
                    </Flex>
                )}
            </Flex>

            {!isDesktop && isOpen && (
                <Box
                    position="sticky"
                    top="100%"
                    zIndex="docked"
                    py={4}
                    mx={0}

                >
                    <VStack spacing={2} display="flex" alignItems="left" fontSize="2xl">
                        <Link href="/" passHref>
                            <Text
                                py={1}
                                px={4}
                                borderRadius="md"
                                width="100%"
                                bg={isActive('/home') ? 'gray.700' : 'transparent'}
                                color={isActive('/home') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                Home
                            </Text>
                        </Link>
                        <Link href="/#publications" passHref>
                            <Text
                                py={1}
                                px={4}
                                borderRadius="md"
                                width="100%"
                                bg={isActive('/home') ? 'gray.700' : 'transparent'}
                                color={isActive('/home') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                Publications
                            </Text>
                        </Link>
                        <Link href="/#projects" passHref>
                            <Text
                                py={1}
                                px={4}
                                borderRadius="md"
                                width="100%"
                                bg={isActive('/#projects') ? 'gray.700' : 'transparent'}
                                color={isActive('/#projects') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                Projects
                            </Text>
                        </Link>
                        <Link href="/#skillset" passHref>
                            <Text
                                py={1}
                                px={4}
                                borderRadius="md"
                                width="100%"
                                bg={isActive('/#skillset') ? 'gray.700' : 'transparent'}
                                color={isActive('/#skillset') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                Skillset
                            </Text>
                        </Link>
                        <Link href="/#about" passHref>
                            <Text
                                py={1}
                                px={4}
                                borderRadius="md"
                                width="100%"
                                bg={isActive('/home') ? 'gray.700' : 'transparent'}
                                color={isActive('/home') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                About
                            </Text>
                        </Link>
                        <Link href="/#contact" passHref>
                            <Text
                                py={1}
                                px={4}
                                borderRadius="md"
                                width="100%"
                                bg={isActive('/home') ? 'gray.700' : 'transparent'}
                                color={isActive('/home') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                Contact
                            </Text>
                        </Link>
                    </VStack>
                </Box>
            )}
        </Box>
    );
};

export default NavBar;
