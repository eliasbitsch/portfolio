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

    return (
        <Box p={4}>
            <Box fontSize="xl" fontWeight="bold">Skills</Box>
            <Wrap spacing={4} mt={4} justify="center">
                <WrapItem>
                    <Tag size="lg" variant={selectedCategory === 'All' ? 'solid' : 'outline'} bg="gray.700" borderRadius="full" cursor="pointer" onClick={() => handleFilterChange('All')}>
                        <TagLeftIcon boxSize="12px" as={FaBolt} />
                        <TagLabel>All</TagLabel>
                    </Tag>
                </WrapItem>
                <WrapItem>
                    <Tag size="lg" variant={selectedCategory === 'Programming' ? 'solid' : 'outline'} bg="gray.700" borderRadius="full" cursor="pointer" onClick={() => handleFilterChange('Programming')}>
                        <TagLeftIcon boxSize="12px" as={FaLaptopCode} />
                        <TagLabel>Programming</TagLabel>
                    </Tag>
                </WrapItem>
                <WrapItem>
                    <Tag size="lg" variant={selectedCategory === 'Electronics' ? 'solid' : 'outline'} bg="gray.700" borderRadius="full" cursor="pointer" onClick={() => handleFilterChange('Electronics')}>
                        <TagLeftIcon boxSize="12px" as={FaMicrochip} />
                        <TagLabel>Electronics</TagLabel>
                    </Tag>
                </WrapItem>
                <WrapItem>
                    <Tag size="lg" variant={selectedCategory === 'Art & Design' ? 'solid' : 'outline'} bg="gray.700" borderRadius="full" cursor="pointer" onClick={() => handleFilterChange('Art & Design')}>
                        <TagLeftIcon boxSize="12px" as={FaPalette} />
                        <TagLabel>Art & Design</TagLabel>
                    </Tag>
                </WrapItem>
                <WrapItem>
                    <Tag size="lg" variant={selectedCategory === 'Libraries & Services' ? 'solid' : 'outline'} bg="gray.700" borderRadius="full" cursor="pointer" onClick={() => handleFilterChange('Libraries & Services')}>
                        <TagLeftIcon boxSize="12px" as={FaBook} />
                        <TagLabel>Libraries & Services</TagLabel>
                    </Tag>
                </WrapItem>
                <WrapItem>
                    <Tag size="lg" variant={selectedCategory === 'Other' ? 'solid' : 'outline'} bg="gray.700" borderRadius="full" cursor="pointer" onClick={() => handleFilterChange('Other')}>
                        <TagLeftIcon boxSize="12px" as={FaWrench} />
                        <TagLabel>Other</TagLabel>
                    </Tag>
                </WrapItem>
            </Wrap>

            <SimpleGrid columns={[1, 2]} spacing={4} mt={8}>
                {filteredSkills.map(skill => (
                    <Box key={skill.id} bg="gray.700" p={4} borderRadius="md">
                        <HStack>
                            <Box as={skill.icon} boxSize="20px" />
                            <Box>
                                <Box fontWeight="bold">{skill.name}</Box>
                                <Box fontSize="sm" color="gray.400">{skill.description}</Box>
                            </Box>
                        </HStack>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
}
