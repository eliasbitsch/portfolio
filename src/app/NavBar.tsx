'use client'

import {
    Box,
    Flex,
    Text,
    IconButton,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    useBreakpointValue,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation' // Use usePathname instead of useRouter



const NavBar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isDesktop = useBreakpointValue({ base: false, md: true })
    const pathname = usePathname() // Get the current pathname

    // Function to check if the current path matches the link's href
    const isActive = (href: string) => pathname === href

    return (
        <Box
            position="sticky"
            top={0}
            className="navbar"  // Apply the custom class here
            zIndex="docked"
            py={4}
            px={6}
            boxShadow="0 5px 15px rgba(0, 0, 0, 0.2);"


        >
            <Flex align="center" justify="space-between">
                {/* Left-aligned items */}
                <Flex align="center" flex={1}>
                    {isDesktop && (
                        <Flex ml={200} fontSize="lg" align="center">
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

                {/* Hamburger icon (only visible on mobile) */}
                {!isDesktop && (
                    <IconButton
                        aria-label="Open Menu"
                        icon={<HamburgerIcon />}
                        variant="outline"
                        color="white"
                        onClick={onOpen}
                        ml="auto"
                    />
                )}

                {/* Drawer Menu (only visible on mobile) */}
                <Drawer isOpen={isOpen} onClose={onClose} placement="right">
                    <DrawerOverlay />
                    <DrawerContent bg="gray.800" color="white">
                        <DrawerHeader>
                            <Flex justify="space-between" align="center">
                                <Text fontSize="lg" fontWeight="bold">
                                    MyApp
                                </Text>
                                <IconButton
                                    aria-label="Close Menu"
                                    icon={<CloseIcon />}
                                    onClick={onClose}
                                />
                            </Flex>
                        </DrawerHeader>
                        <DrawerBody>
                            <Flex direction="column" mt={4}>
                                <Link href="/" passHref>
                                    <Text
                                        mb={4}
                                        _hover={{ textDecoration: 'underline' }}
                                        textDecoration={isActive('/') ? 'underline' : 'none'}
                                        color={isActive('/') ? 'white' : 'gray.300'}
                                    >
                                        Home
                                    </Text>
                                </Link>
                                <Link href="/about" passHref>
                                    <Text
                                        mb={4}
                                        _hover={{ textDecoration: 'underline' }}
                                        textDecoration={isActive('/about') ? 'underline' : 'none'}
                                        color={isActive('/about') ? 'white' : 'gray.300'}
                                    >
                                        About
                                    </Text>
                                </Link>
                                <Link href="/contact" passHref>
                                    <Text
                                        mb={4}
                                        _hover={{ textDecoration: 'underline' }}
                                        textDecoration={isActive('/contact') ? 'underline' : 'none'}
                                        color={isActive('/contact') ? 'white' : 'gray.300'}
                                    >
                                        Contact
                                    </Text>
                                </Link>
                            </Flex>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
        </Box>
    )
}

export default NavBar
