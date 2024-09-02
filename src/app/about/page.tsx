'use client';

import React, { useState } from 'react';
import { HStack, Tag, Box, SimpleGrid, Wrap, Text } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

// Example skills data with custom information
const skillsData = [
    {
        id: 1,
        category: 'Programming',
        name: 'C++',
        description: 'Robotics software',
        date: '2020 - Present',
        tags: ['Robotics', 'Software Development', 'C++']
    },
    {
        id: 2,
        category: 'Programming',
        name: 'Python',
        description: 'Robotics software',
        date: '2019 - Present',
        tags: ['Robotics', 'Machine Learning', 'Python']
    },
    {
        id: 3,
        category: 'Programming',
        name: 'ROS/ROS2',
        description: 'Robotics framework',
        date: '2021 - Present',
        tags: ['Robotics', 'ROS', 'Automation']
    },
    {
        id: 4,
        category: 'Programming',
        name: 'Linux',
        description: 'Operating system for robotics',
        date: '2018 - Present',
        tags: ['Linux', 'Operating Systems', 'Shell Scripting']
    },
    {
        id: 5,
        category: 'Programming',
        name: 'Bash',
        description: 'Scripting and automation',
        date: '2017 - Present',
        tags: ['Scripting', 'Automation', 'Bash']
    },
    // Add more skills with custom information as needed
];

export default function About() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const currentYear = new Date().getFullYear();


    // Create refs for all skills
    const skillRefs = skillsData.map(() => useInView({ triggerOnce: false, threshold: 0.1 }));

    // Filter skills based on the selected category
    const filteredSkills = selectedCategory === 'All'
        ? skillsData
        : skillsData.filter(skill => skill.category === selectedCategory);

    return (
        <Box
            p={5}
            bg="gray.900"
            minH="90vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            position="relative"
            overflow="hidden"
            mt={20}
        >
            {/* SVG Patterns with Fixed Margins */}
            <svg
                width="350"
                height="400"
                style={{
                    position: 'absolute',
                    top: "30rem",
                    left: '35%',
                    transform: 'translate(-180%, -50%)',
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
                width="350"
                height="750"
                style={{
                    position: 'absolute',
                    top: '0%',
                    right: '35%',
                    transform: 'translate(180%, -50%)',
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

            <Box textAlign="left" maxWidth="800px" width="100%" mx="auto">
                <Box fontSize="4xl" fontWeight="bold" display="inline-block" position="relative">
                    About
                    <hr style={{
                        width: '100%',
                        marginTop: '6px',
                        border: 'none',
                        height: '2px',
                        backgroundColor: 'currentColor',
                    }} />
                </Box>
            </Box>

            <SimpleGrid
                columns={1}
                spacing={4}
                mt={8}
                mx="auto"
                maxWidth="800px"
                width={'100%'}
                justifyContent="center"
            >
                {filteredSkills.map((skill) => {
                    const index = skillsData.findIndex(s => s.id === skill.id);
                    const { ref, inView } = skillRefs[index];

                    return (
                        <Box
                            key={skill.id}
                            ref={ref}
                            className={`card ${inView ? 'animate' : 'exit'}`}
                            bg="gray.800"
                            p={5}
                            borderRadius="lg"
                            boxShadow="lg"
                            width="100%"
                            transition="transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-in-out"
                        >
                            <HStack spacing={4} justify="space-between" align="start" mb={3}>
                                <Box flex="1">
                                    <Box fontSize="2xl" fontWeight="bold" color="white">
                                        {skill.name}
                                    </Box>
                                    <Box fontSize="sm" fontWeight="semibold" color="gray.400" mt={1}>
                                        {skill.description}
                                    </Box>
                                </Box>
                                <Box color="gray.500" fontSize="md">
                                    {skill.date}
                                </Box>
                            </HStack>
                            <Wrap spacing={2} mt={3}>
                                {skill.tags.map(tag => (
                                    <Tag
                                        key={tag}
                                        colorScheme="gray"
                                        variant="outline"
                                        borderRadius="full"
                                        fontSize="sm"
                                    >
                                        {tag}
                                    </Tag>
                                ))}
                            </Wrap>
                        </Box>
                    );
                })}
            </SimpleGrid>
            <Text fontSize="sm" color="gray.500" mt={10}>
                © {currentYear} Elias Bitsch. All rights reserved.
            </Text>
        </Box>
    );
}
