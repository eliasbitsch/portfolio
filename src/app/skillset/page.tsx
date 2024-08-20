'use client';

import React, { useState } from 'react';
import { HStack, Tag, TagLabel, TagLeftIcon, Box, SimpleGrid, Wrap, WrapItem } from '@chakra-ui/react';
import { FaBolt, FaLaptopCode, FaMicrochip, FaPalette, FaBook, FaWrench } from 'react-icons/fa';

// Example skills data
const skillsData = [
    { id: 1, category: 'Programming', name: 'React', description: 'Web development', icon: FaLaptopCode },
    { id: 2, category: 'Electronics', name: 'EasyEDA', description: 'Electronics', icon: FaMicrochip },
    { id: 3, category: 'Electronics', name: 'KiCad', description: 'Electronics', icon: FaMicrochip },
    { id: 4, category: 'Electronics', name: 'Soldering', description: 'Electronics', icon: FaMicrochip },
    { id: 5, category: 'Electronics', name: 'Microcontrollers', description: 'Electronics', icon: FaMicrochip },
    { id: 6, category: 'CAD Design', name: 'Fusion 360', description: 'CAD Design', icon: FaWrench },
    { id: 7, category: 'Programming', name: 'Next.js', description: 'Web development', icon: FaLaptopCode },
    { id: 8, category: 'Programming', name: 'Python', description: 'Web development', icon: FaLaptopCode },
    { id: 9, category: 'Programming', name: 'Django', description: 'Web development', icon: FaLaptopCode },
    { id: 10, category: 'Programming', name: '.NET', description: 'Web development', icon: FaLaptopCode },
    // Add more skills as needed
];
'use client';
import React, { useState } from 'react';
import { HStack, Tag, TagLabel, TagLeftIcon, Box, SimpleGrid, Wrap, WrapItem } from '@chakra-ui/react';
import { FaBolt, FaLaptopCode, FaMicrochip, FaPalette, FaBook, FaWrench } from 'react-icons/fa';

// Example skills data
const skillsData = [
    { id: 1, category: 'Programming', name: 'React', description: 'Web development', icon: FaLaptopCode },
    { id: 2, category: 'Electronics', name: 'EasyEDA', description: 'Electronics', icon: FaMicrochip },
    { id: 3, category: 'Electronics', name: 'KiCad', description: 'Electronics', icon: FaMicrochip },
    { id: 4, category: 'Electronics', name: 'Soldering', description: 'Electronics', icon: FaMicrochip },
    { id: 5, category: 'Electronics', name: 'Microcontrollers', description: 'Electronics', icon: FaMicrochip },
    { id: 6, category: 'CAD Design', name: 'Fusion 360', description: 'CAD Design', icon: FaWrench },
    { id: 7, category: 'Programming', name: 'Next.js', description: 'Web development', icon: FaLaptopCode },
    { id: 8, category: 'Programming', name: 'Python', description: 'Web development', icon: FaLaptopCode },
    { id: 9, category: 'Programming', name: 'Django', description: 'Web development', icon: FaLaptopCode },
    { id: 10, category: 'Programming', name: '.NET', description: 'Web development', icon: FaLaptopCode },
    // Add more skills as needed
];

export default function Skillset() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleFilterChange = (category: string) => {
        setSelectedCategory(category);
    };

    const filteredSkills = selectedCategory === 'All'
        ? skillsData
        : skillsData.filter(skill => skill.category === selectedCategory);

    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleFilterChange = (category: string) => {
        setSelectedCategory(category);
    };

    const filteredSkills = selectedCategory === 'All'
        ? skillsData
        : skillsData.filter(skill => skill.category === selectedCategory);

    return (
        <Box
            p={5}
            bg="gray.900"
            minH="90vh"
            flexDirection="column"
            alignItems="center"
            position="relative"
            overflow="hidden"
            mt={20}
        >
            {/* SVG Patterns with Fixed Margins */}
            <svg
                width="300"
                height="500"
                style={{
                    position: 'absolute',
                    top: "30rem",
                    left: '30%',
                    transform: 'translate(-150%, -50%)',
                    zIndex: 0,
                }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="squarePattern1" patternUnits="userSpaceOnUse" width="20" height="20">
                        <rect x="5" y="5" width="4" height="4" fill="#374151" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#squarePattern1)" />
            </svg>

            <svg
                width="300"
                height="300"
                style={{
                    position: 'absolute',
                    top: '20%',
                    right: '30%',
                    transform: 'translate(150%, -50%)',
                    zIndex: 0,
                }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="squarePattern2" patternUnits="userSpaceOnUse" width="20" height="20">
                        <rect x="5" y="5" width="4" height="4" fill="#374151" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#squarePattern2)" />
            </svg>

            <Box textAlign="center">
                <Box fontSize="4xl" fontWeight="bold" display="inline-block" position="relative">
                    Skillset
                    <hr style={{
                        width: '100%',     // Match the width of the text
                        marginTop: '6px',   // Space between text and underline
                        border: 'none',     // Remove default border
                        height: '2px',      // Thickness of the underline
                        backgroundColor: 'currentColor', // Match the color of the text
                    }} />
                </Box>

            </Box>
            <Box textAlign="center">
                <Box
                    fontSize="gl" mt={4} display="inline-block" position="relative">A list of my technical skills. </Box>
            </Box>
            <Wrap spacing={4} mt={4} justify="center" maxWidth="600px" width="100%" mx="auto">
                {[
                    { label: "All", icon: FaBolt, category: "All" },
                    { label: "Programming", icon: FaLaptopCode, category: "Programming" },
                    { label: "Electronics", icon: FaMicrochip, category: "Electronics" },
                    { label: "Art & Design", icon: FaPalette, category: "Art & Design" },
                    { label: "Libraries & Services", icon: FaBook, category: "Libraries & Services" },
                    { label: "Other", icon: FaWrench, category: "Other" },
                ].map((item) => (
                    <WrapItem key={item.category}>
                        <Tag
                            size="lg"
                            color="#718096"
                            bg="gray.800"
                            borderRadius="full"
                            cursor="pointer"
                            onClick={() => handleFilterChange(item.category)}
                            //border={`2px solid ${selectedCategory === item.category ? 'green' : 'transparent'}`}
                            padding="0.5rem 1rem" // Adjust this padding to make space for the border
                            transition="border 0.1s ease-in-out, box-shadow 0.1s ease-in-out"
                            boxShadow={selectedCategory === item.category ? ' 0 0 0 3px rgba(66, 153, 225, 0.6)' : 'none'}
                            display="flex"
                            alignItems="center"
                        >
                            <TagLeftIcon boxSize="12px" as={item.icon} />
                            <TagLabel>{item.label}</TagLabel>
                        </Tag>
                    </WrapItem>
                ))}
            </Wrap>




            <SimpleGrid
                columns={[1, 2]}
                spacing={4}
                mt={8}
                mx="auto"
                maxWidth={600}
                justifyContent="center"
            >
                {filteredSkills.map(skill => (
                    <Box
                        key={skill.id}
                        bg="gray.700"
                        p={4}
                        borderRadius="lg"
                        _hover={{
                            transform: 'translateY(-5px)', // Move up on hover
                            boxShadow: 'lg', // Add a shadow for better visual effect
                        }}
                        transition="transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-in-out"

                    >
                        <HStack>
                            <Box as={skill.icon} boxSize="20px" />
                            <Box>
                                <Box fontWeight="bold">{skill.name}</Box>
                                <Box fontSize="sm" color="gray.400">{skill.description}</Box>
                            </Box>
                        </HStack>
                    </Box>
                ))
                }
            </SimpleGrid >
        </Box >
    );
}
