'use client';

import React, { useState } from 'react';
import { HStack, Tag, TagLabel, TagLeftIcon, Box, SimpleGrid, Wrap, WrapItem, Text } from '@chakra-ui/react';
import { FaMicrochip, FaGears, FaRaspberryPi, FaWifi, FaEye, FaAws, FaJava, FaBolt, FaLaptopCode, FaBook, FaWrench } from 'react-icons/fa6';
import { FaTools } from "react-icons/fa";
import { SiTailwindcss, SiCplusplus, SiPython, SiRos, SiLinux, SiGnubash, SiDocker, SiOpencv, SiC, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiSass, SiNextdotjs, SiReact, SiMysql, SiArduino, SiEasyeda, SiAutodesk, SiGit, SiJenkins, SiWireshark, SiKalilinux } from 'react-icons/si';
import { MdElectricBolt, MdFactory } from "react-icons/md";
import { RiJavascriptFill } from "react-icons/ri";
import { PiDotsThreeBold } from "react-icons/pi";
import { useInView } from 'react-intersection-observer';

import Icon from '@mdi/react';
import { mdiPrinter3d } from '@mdi/js';

// Example skills data
const skillsData = [
    
        { id: 8, category: 'Programming', name: 'C', description: 'Embedded systems', icon: SiC },
        { id: 1, category: 'Programming', name: 'C++', description: 'Robotics software', icon: SiCplusplus },
        { id: 2, category: 'Programming', name: 'Python', description: 'Robotics software', icon: SiPython },
        { id: 3, category: 'Programming', name: 'ROS/ROS2', description: 'Robotics framework', icon: SiRos },
        { id: 7, category: 'Programming', name: 'OpenCV', description: 'Computer vision', icon: SiOpencv },
        { id: 4, category: 'Programming', name: 'Linux', description: 'Operating system for robotics', icon: SiLinux },
        { id: 6, category: 'Programming', name: 'Docker', description: 'Containerization & Deployment', icon: SiDocker },
        { id: 29, category: 'Libraries & Services', name: 'Git', description: 'Version control', icon: SiGit },
        { id: 24, category: 'Electronics', name: 'Microcontrollers', description: 'Microcontroller-based systems', icon: FaMicrochip },
        { id: 20, category: 'Electronics', name: 'Raspberry Pi', description: 'Single-board computer', icon: FaRaspberryPi },
        { id: 21, category: 'Electronics', name: 'Arduino', description: 'Microcontroller programming', icon: SiArduino },
        { id: 25, category: 'Design', name: 'SolidWorks', description: '3D CAD design', icon: FaWrench },
        { id: 26, category: 'Design', name: 'Fusion360', description: '3D CAD design', icon: SiAutodesk },
        { id: 27, category: 'Design', name: '3D Printing', description: 'Prototyping', icon: () => <Icon path={mdiPrinter3d} size={1.5} /> },
        { id: 9, category: 'Programming', name: 'PLC-programming', description: 'Industrial automation', icon: MdFactory },
        { id: 28, category: 'Libraries & Services', name: 'AWS', description: 'Cloud computing', icon: FaAws },
        { id: 30, category: 'Tools', name: 'Wireshark', description: 'Network analysis', icon: SiWireshark },
        { id: 33, category: 'Tools', name: 'aircrack-ng', description: 'Wireless security', icon: FaWifi },
        { id: 10, category: 'Programming', name: 'Java', description: 'Enterprise development', icon: FaJava },
        { id: 11, category: 'Programming', name: 'JavaScript', description: 'Web development', icon: RiJavascriptFill },
        { id: 12, category: 'Programming', name: 'TypeScript', description: 'Web development', icon: SiTypescript },
        { id: 13, category: 'Programming', name: 'HTML', description: 'Web development', icon: SiHtml5 },
        { id: 14, category: 'Programming', name: 'CSS', description: 'Web development', icon: SiCss3 },
        { id: 17, category: 'Programming', name: 'Next.js', description: 'Web development', icon: SiNextdotjs },
        { id: 18, category: 'Programming', name: 'React Native', description: 'Mobile app development', icon: SiReact },
        { id: 19, category: 'Programming', name: 'SQL', description: 'Database management', icon: SiMysql },
        { id: 34, category: 'Electronics', name: 'Soldering', description: 'Electronics assembly', icon: MdElectricBolt },
        { id: 35, category: 'Electronics', name: 'EasyEDA', description: 'PCB design', icon: FaMicrochip },
        { id: 36, category: 'Electronics', name: 'Arduino', description: 'Arduino related', icon: SiArduino }
    
    
];

export default function Skillset() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const currentYear = new Date().getFullYear();

    const handleFilterChange = (category: string) => {
        setSelectedCategory(category);
    };

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
            {/* SVG Patterns */}
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

            <Box textAlign="left" maxWidth="600px" width="100%" mx="auto">
                <Box fontSize="4xl" fontWeight="bold" display="inline-block" position="relative">
                    Skillset
                    <hr style={{
                        width: '100%',
                        marginTop: '6px',
                        border: 'none',
                        height: '2px',
                        backgroundColor: 'currentColor',
                    }} />
                </Box>
            </Box>

            <Box mt={4} maxWidth="600px" width="100%" mx="auto">
                <Text fontSize="lg">A list of my technical skills.</Text>
            </Box>

            <Wrap spacing={4} mt={4} justify="center" maxWidth="600px" width="100%" mx="auto">
                {[
                    { label: "All", icon: FaBolt, category: "All" },
                    { label: "Programming", icon: FaLaptopCode, category: "Programming" },
                    { label: "Electronics", icon: FaMicrochip, category: "Electronics" },
                    { label: "Design", icon: FaWrench, category: "Design" },
                    { label: "Libraries & Services", icon: FaBook, category: "Libraries & Services" },
                    { label: "Tools", icon: FaTools, category: "Tools" } // Specify the size here
                ].map((item) => (
                    <WrapItem key={item.category}>
                        <Tag
                            size="lg"
                            color="#718096"
                            bg="gray.800"
                            borderRadius="full"
                            cursor="pointer"
                            onClick={() => handleFilterChange(item.category)}
                            padding="0.5rem 1rem"
                            boxShadow={selectedCategory === item.category ? '0 0 0 3px rgba(66, 153, 225, 0.6)' : 'none'}
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
                columns={{ base: 1, md: 2 }}
                spacing={4}
                mt={8}
                mx="auto"
                maxWidth={600}
                width={'100%'}
                justifyContent="center"
            >
                {filteredSkills.map((skill) => (
                    <SkillCard key={skill.id} skill={skill} />
                ))}
            </SimpleGrid>
            <Text fontSize="sm" color="gray.500" mt={10}>
                © {currentYear} Elias Bitsch. All rights reserved.
            </Text>
        </Box>
    );
}

// SkillCard component
type Skill = {
    id: number;
    category: string;
    name: string;
    description: string;
    icon: React.ElementType;
};

function SkillCard({ skill }: { skill: Skill }) {
    const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

    return (
        <Box
            ref={ref}
            className={`card ${inView ? 'animate' : 'exit'}`}
            bg="gray.700"
            p={4}
            borderRadius="lg"
            _hover={{
                transform: 'translateY(-5px)',
                boxShadow: 'lg',
            }}
            transition="transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-in-out"
        >
            <HStack spacing={4} align="start">
                <Box as={skill.icon} boxSize="40px" />
                <Box flex="1" overflow="hidden">
                    <Box fontWeight="bold" mb={1}>
                        {skill.name}
                    </Box>
                    <Box
                        fontSize="sm"
                        color="gray.400"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                    >
                        {skill.description}
                    </Box>
                </Box>
            </HStack>
        </Box>
    );
}