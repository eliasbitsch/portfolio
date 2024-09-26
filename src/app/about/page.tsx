'use client';

import React, { useState } from 'react';
import { HStack, VStack, Tag, Box, SimpleGrid, Spacer, Wrap, Text } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaBriefcase, FaGraduationCap, FaCertificate } from 'react-icons/fa'; // Importing the React icon
import { PiCertificateLight } from "react-icons/pi";
import { url } from 'inspector';
import { useRef } from 'react';


// Example skills data with custom information
const skillsData = [
    {
        id: 1,
        category: 'Education',
        name: 'FH Technikum Wien',
        description: 'Bachelor: Mechatronics and Robotics',
        text: 'Developed expertise in robotics and software engineering, using languages like C++ and Python, and tools such as ROS and OpenCV. Gained skills in hardware design and cybersecurity. Led a Sumo Bot Competition team and served as a technical guide during university open days, demonstrating both my technical prowess and leadership abilities.',
        date: '2023 - Present',
        tags: ['Robotics', 'Software Development', 'C++', 'Machine Learning', 'Python'],
        url: 'https://www.technikum-wien.at/'
    },
    {
        id: 4,
        category: 'Career',
        name: 'Civil Service',
        description: 'Diakonie',
        text: 'Worked as a social worker, helping people in need and supporting them in their daily lives. Developed strong communication and interpersonal skills, as well as the ability to work under pressure and in a team.',
        date: '2021 - 2022',
        tags: ['Social Work', 'Communication', 'Teamwork'],
        url: 'https://www.diakonie.at/unsere-angebote-und-einrichtungen/diakoniezentrum-gols-altenwohn-und-pflegeheim',
    },
    {
        id: 5,
        category: 'Career',
        name: 'Internship at Mars Inc.',
        description: 'Servicing and Maintenance Technician',
        text: 'Worked as a technician, maintaining SCARA robots, including servicing SCARA robots and welding robotic parts like a robotic gripper from an articulated arm robot.',
        date: 'August 2018 & August 2019',
        tags: ['Scara-Robots', 'Welding', 'Servicing'],
        url: 'https://aut.mars.com/'
    },
    {
        id: 2,
        category: 'Education',
        name: 'HTL Eisenstadt ',
        description: 'Mechatronics',
        text: 'Developed a strong foundation in mechatronics and robotics, learning to design and build robots, program microcontrollers, and use machine learning algorithms. Led a team to victory in the RoboCup Junior Austria competition, demonstrating my technical skills and ability to work in a team.',
        date: '2016 - 2021',
        tags: ['Robotics', 'Microcontrollers', 'PLC-Programming'],
        url: 'https://www.htleisenstadt.at/'
    },
    {
        id: 3,
        category: 'Education',
        name: 'Gymnasium Neusiedl am See',
        description: 'High School',
        text: 'Developed a strong foundation in mathematics and physics, which laid the groundwork for my future studies in mechatronics and robotics. Learned how to design and build robots, program them using LEGO Mindstorms, to get a solid foundation in robotics.',
        date: '2012 - 2016',
        tags: ['Physics', 'Mathematics', 'LEGO Mindstorms'],
        url: 'https://www.gymnasium-neusiedl.at/'
    },
    {
        id: 6,
        category: 'Certificates',
        name: 'SolidWorks',
        description: 'Certified for mechanical design',
        text: 'Certified for mechanical design, including 3D modeling. Developed expertise in SolidWorks, a leading CAD software used in the industry.',
        date: '2023',
        tags: ['CAD', '3D Modeling', 'Mechanical Design'],
        url: '/assets/Solidworks-Certificate.pdf'
    },
    {
        id: 7,
        category: 'Certificates',
        name: 'Quantum Computing',
        description: 'Certificaty for Quantum Computing',
        text: 'Certificate for Quantum Computing, including Quantum Algorithms and Quantum Machine Learning. Developed basics in Quantum Computing, a promising technology used in the industry.',
        date: '2023',
        tags: ['Quantum Computing', 'Quantum Algorithms'],
        url: '/assets/Certificate_quantum_computing.pdf'

    }
];

export default function About() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const currentYear = new Date().getFullYear();

    // Create refs for all skills
    const skillRefs = skillsData.map(() => {
        const inViewRef = useRef(null);  // Create a ref for each skill
        const { ref, inView } = useInView({
            triggerOnce: false,
            threshold: 0.1,
        });

        return { inViewRef, ref, inView };  // Store ref and inView status for each skill
    });

    // Filter skills based on the selected category
    const filteredSkills = selectedCategory === 'All'
        ? skillsData
        : skillsData.filter(skill => skill.category === selectedCategory);

    // Get unique categories from the skills data
    const uniqueCategories = Array.from(new Set(skillsData.map(skill => skill.category)));

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
            {/* ...SVG Code... */}

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
                {uniqueCategories.map((category) => {
                    const categorySkills = skillsData.filter(skill => skill.category === category);

                    const icon =
                        category === 'Career' ? <FaBriefcase style={{ color: 'white', fontSize: '1.5em' }} /> :
                            category === 'Education' ? <FaGraduationCap style={{ color: 'white', fontSize: '2em' }} /> :
                                category === 'Certificates' ? <PiCertificateLight style={{ color: 'white', fontSize: '2em' }} /> :
                                    null;

                    return (
                        <React.Fragment key={category}>
                            <HStack spacing={2} alignItems="center" mt={8} mb={4}>
                                <Text
                                    fontSize="2xl"
                                    fontWeight="bold"
                                    color="white"
                                    position="relative"
                                    _after={{
                                        content: '""',
                                        position: 'absolute',
                                        left: 0,
                                        bottom: -2,
                                        height: '2px',
                                        width: '100%',
                                        backgroundColor: 'white',
                                    }}
                                >
                                    {category}
                                </Text>
                                <Box>
                                    {icon}
                                </Box>
                            </HStack>
                            {categorySkills.map((skill) => {
                                const index = skillsData.findIndex(s => s.id === skill.id);
                                const { ref, inView } = skillRefs[index];

                                return (
                                    <a
                                        key={skill.id}
                                        href={skill.url} // Use the URL from the skill data
                                        target="_blank" // Open in a new tab
                                        rel="noopener noreferrer" // Security best practice
                                        ref={ref}
                                    >
                                        <Box
                                            className={`card ${inView ? 'animate' : 'exit'}`}
                                            bg="gray.800"
                                            p={5}
                                            borderRadius="lg"
                                            boxShadow="lg"
                                            _hover={{
                                                transform: 'translateY(-5px)',
                                                boxShadow: 'lg',
                                            }}
                                            width="100%"
                                            transition="transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-in-out"
                                        >
                                            <VStack align="stretch" mb={3}>
                                                <HStack spacing={4} justify="space-between" align="center">
                                                    <Box fontSize="2xl" fontWeight="bold" color="white">
                                                        {skill.name}
                                                    </Box>
                                                    <Spacer />
                                                    <Box color="gray.500" fontSize="md">
                                                        {skill.date}
                                                    </Box>
                                                </HStack>
                                                <Box fontSize="sm" fontWeight="semibold" color="gray.400" mt={1}>
                                                    {skill.description}
                                                </Box>
                                                <Box fontSize="sm" mt={1}>
                                                    {skill.text}
                                                </Box>
                                            </VStack>
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
                                    </a>
                                );
                            })}
                        </React.Fragment>
                    );
                })}
            </SimpleGrid>

            <Text fontSize="sm" color="gray.500" mt={10}>
                © {currentYear} Elias Bitsch. All rights reserved.
            </Text>
        </Box>
    );
}


