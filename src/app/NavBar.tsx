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

const NavBar = () => {
    const { isOpen, onToggle } = useDisclosure();
    const isDesktop = useBreakpointValue({ base: false, md: true });
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

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
        >
            <Flex align="center" justify="space-between" >
                {!isDesktop && (
                    <IconButton
                        aria-label="Toggle Menu"
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        //variant="outline"

                        _hover={{ bg: 'rgba(255, 255, 255, 0.16)', color: 'white' }}

                        onClick={onToggle}
                        mr="auto"
                        borderRadius="0.7rem"
                        backgroundColor="rgba(255, 255, 255, 0.08)"
                        color="white"
                    />
                )}



                {isDesktop && (
                    <Flex ml={200} justifyContent="flex-start" fontSize="lg" alignItems="center">
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
                        <Link href="/about" passHref>
                            <Text
                                px={4}
                                py={2}
                                borderRadius="md"
                                mx={2}
                                bg={isActive('/about') ? 'gray.700' : 'transparent'}
                                color={isActive('/about') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                About
                            </Text>
                        </Link>
                        <Link href="/skillset" passHref>
                            <Text
                                px={4}
                                py={2}
                                borderRadius="md"
                                mx={2}
                                bg={isActive('/skillset') ? 'gray.700' : 'transparent'}
                                color={isActive('/skillset') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                Skillset
                            </Text>
                        </Link>
                        <Link href="/projects" passHref>
                            <Text
                                px={4}
                                py={2}
                                borderRadius="md"
                                mx={2}
                                bg={isActive('/projects') ? 'gray.700' : 'transparent'}
                                color={isActive('/projects') ? 'white' : 'gray.300'}
                                _hover={{ bg: 'gray.700', color: 'white' }}
                                transition="background-color 0.2s ease, color 0.2s ease"
                            >
                                Projects
                            </Text>
                        </Link>
                    </Flex>
                )}
            </Flex>

            {
                !isDesktop && isOpen && (
                    // <Box
                    //     position="fixed"
                    //     top="60px" // Adjust based on your navbar height
                    //     left={0}
                    //     right={0}
                    //     px={6}
                    //     py={4}
                    //     bg="rgba(26, 32, 44, 0.8)"
                    //     color="white"
                    //     backdropFilter='auto'
                    //     backdropBlur='8px'
                    //     zIndex="dropdown" // Ensure it’s above other content
                    // >


                    <Box
                        position="sticky"
                        top="100%"
                        zIndex="docked"
                        py={4}
                        mx={0}


                    >
                        <VStack spacing={2} display="flex" alignItems="left"

                        >
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
                            <Link href="/about" passHref>
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
                            <Link href="/skillset" passHref>
                                <Text
                                    py={1}
                                    px={4}
                                    borderRadius="md"
                                    width="100%"
                                    bg={isActive('/skillset') ? 'gray.700' : 'transparent'}
                                    color={isActive('/skillset') ? 'white' : 'gray.300'}
                                    _hover={{ bg: 'gray.700', color: 'white' }}
                                    transition="background-color 0.2s ease, color 0.2s ease"
                                >
                                    Skillset
                                </Text>
                            </Link>
                            <Link href="/projects" passHref>
                                <Text
                                    py={1}
                                    px={4}
                                    borderRadius="md"
                                    width="100%"
                                    bg={isActive('/projects') ? 'gray.700' : 'transparent'}
                                    color={isActive('/projects') ? 'white' : 'gray.300'}
                                    _hover={{ bg: 'gray.700', color: 'white' }}
                                    transition="background-color 0.2s ease, color 0.2s ease"
                                >
                                    Projects
                                </Text>
                            </Link>
                        </VStack>

                    </Box>
                )
            }
        </Box >
    );
};

export default NavBar;
