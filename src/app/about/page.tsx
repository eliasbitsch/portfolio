'use client';

import React, { useState } from 'react';
import { HStack, VStack, Tag, Box, SimpleGrid, Spacer, Wrap, Text } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaBriefcase, FaGraduationCap, FaCertificate } from 'react-icons/fa'; // Importing the React icon
import { PiCertificateLight } from "react-icons/pi";
import { url } from 'inspector';


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

interface SkillProps {
    skill: {
        id: number;
        category: string;
        name: string;
        description: string;
        text: string;
        date: string;
        tags: string[];
        url: string;
    };
}

const Skill: React.FC<SkillProps> = ({ skill }) => {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

    return (
        <a
            key={skill.id}
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            ref={ref}
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
};

// Main About component
export default function About() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const currentYear = new Date().getFullYear();

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
            <Box position="absolute" top="0" left="0" width="100%" height="100%" zIndex="-1">
                {/* Your SVG code goes here */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                    {/* Example SVG shapes */}
                    <circle cx="50" cy="50" r="40" fill="rgba(255,255,255,0.1)" />
                    <rect x="10" y="10" width="30" height="30" fill="rgba(255,255,255,0.1)" />
                </svg>
            </Box>

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
                            {categorySkills.map(skill => (
                                <Skill key={skill.id} skill={skill} />
                            ))}
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
