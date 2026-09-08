'use client';

import React, { useState } from 'react';
import { HStack, VStack, Tag, Box, SimpleGrid, Spacer, Wrap, Text, Image, Flex } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaBriefcase, FaGraduationCap, FaCertificate, FaAtom, FaHandsHelping } from 'react-icons/fa'; // Importing the React icon
import { SiDassaultsystemes } from 'react-icons/si';
import { PiCertificateLight } from "react-icons/pi";
import { url } from 'inspector';
import SectionHeading from '../components/SectionHeading';


// Example skills data with custom information
const skillsData = [
    {
        id: 8,
        category: 'Education',
        name: 'FH Technikum Wien',
        description: 'Master: Robotics Engineering',
        logo: '/logos/technikum-wien.svg',
        text: 'Specialising in robot learning and mixed reality for human-robot collaboration. Master thesis in preparation on mixed-reality training and skill acquisition, building on MetaMove, a bare-hand teleoperation system for an ABB GoFa cobot presented at the XR-SPro workshop at IEEE ISMAR 2026.',
        date: '2025 - Present',
        tags: ['Robot Learning', 'Mixed Reality', 'Human-Robot Interaction', 'ROS 2', 'Unity'],
        url: 'https://www.technikum-wien.at/'
    },
    {
        id: 1,
        category: 'Education',
        name: 'FH Technikum Wien',
        description: 'Bachelor: Mechatronics and Robotics',
        logo: '/logos/technikum-wien.svg',
        text: 'Developed expertise in robotics and software engineering, using languages like C++ and Python, and tools such as ROS and OpenCV. Gained skills in hardware design and cybersecurity. Led a Sumo Bot Competition team and served as a technical guide during university open days, demonstrating both my technical prowess and leadership abilities.',
        date: '2023 - 2025',
        tags: ['Robotics', 'Software Development', 'C++', 'Machine Learning', 'Python'],
        url: 'https://www.technikum-wien.at/'
    },
    {
        id: 9,
        category: 'Career',
        name: 'AIT Austrian Institute of Technology',
        description: 'Technical Assistant, Center for Technology Experience',
        logo: '/logos/ait.svg',
        text: 'Research and prototyping in human-robot interaction. Building interactive systems and evaluating them with users in industrial settings. The work spans mixed reality, tangible interfaces and touch-based supervision, from concept and hardware through study design to analysis. Project details on request.',
        date: 'August 2025 - Present',
        tags: ['Mixed Reality', 'Human-Robot Interaction', 'User Studies', 'ROS 2', 'Unity'],
        url: 'https://www.ait.ac.at/'
    },
    {
        id: 10,
        category: 'Career',
        name: 'Internship at Elektrobit Austria',
        logo: '/logos/elektrobit.png',
        description: 'Software Developer',
        text: 'Designed and implemented an extension of the SOME/IP protocol that carries and honours quality-of-service parameters in distributed AUTOSAR Classic systems, so that services are discovered and prioritised across ECUs. Deployed on automotive test hardware and tested successfully.',
        date: 'February - June 2025',
        tags: ['AUTOSAR', 'SOME/IP', 'C++', 'Automotive'],
        url: 'https://www.elektrobit.com/'
    },
    {
        id: 4,
        category: 'Career',
        name: 'Civil Service',
        logo: '/logos/diakonie.svg',
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
        logo: '/logos/mars.svg',
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
        logo: '/logos/htl-eisenstadt.svg',
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
        logo: '/logos/gymnasium-neusiedl.png',
        description: 'High School',
        text: 'Developed a strong foundation in mathematics and physics, which laid the groundwork for my future studies in mechatronics and robotics. Learned how to design and build robots, program them using LEGO Mindstorms, to get a solid foundation in robotics.',
        date: '2012 - 2016',
        tags: ['Physics', 'Mathematics', 'LEGO Mindstorms'],
        url: 'https://www.gymnasium-neusiedl.at/'
    },
    {
        id: 11,
        category: 'Service',
        name: 'IEEE ICRA 2026',
        description: 'Student volunteer',
        text: 'Student volunteer at the IEEE International Conference on Robotics and Automation in Vienna, the largest annual conference in robotics.',
        date: '2026',
        photo: '/images/icra-2026.jpg',
        tags: ['Robotics', 'Conference', 'Volunteering'],
        url: 'https://www.linkedin.com/posts/uas-technikum-wien_changeourtomorrow-fhtechnikumwien-uastechnikumwien-activity-7477768452665937921-4nVw',
    },
    {
        id: 6,
        category: 'Certificates',
        name: 'SolidWorks',
        logoIcon: SiDassaultsystemes,
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
        logoIcon: FaAtom,
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
        logo?: string;
        logoIcon?: React.ElementType;
        photo?: string;
    };
}

const Skill: React.FC<SkillProps> = ({ skill }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    return (
        <a
            key={skill.id}
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            ref={ref}
        >

            <Box
                className={`card ${inView ? 'animate' : ''}`}
                bg="gray.800"
                p={5}
                borderRadius="lg"
                boxShadow="lg"
                position="relative"
                zIndex={1}
                _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: 'lg',
                }}
                width="100%"
                transition="transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-in-out"
            >
                <VStack align="stretch" mb={3}>
                    <HStack spacing={4} justify="space-between" align="center">
                        <HStack spacing={3} align="center">
                            {(skill.logo || skill.logoIcon) && (
                                <Box
                                    bg="white"
                                    borderRadius="md"
                                    px={2}
                                    py={1}
                                    flexShrink={0}
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    minWidth="38px"
                                    height="32px"
                                >
                                    {skill.logo ? (
                                        <Image
                                            src={skill.logo}
                                            alt={`${skill.name} logo`}
                                            height="22px"
                                            width="auto"
                                            display="block"
                                        />
                                    ) : (
                                        skill.logoIcon && (
                                            <Box as={skill.logoIcon} size="22px" color="gray.800" />
                                        )
                                    )}
                                </Box>
                            )}
                            <Box fontSize="2xl" fontWeight="bold" color="white">
                                {skill.name}
                            </Box>
                        </HStack>
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
                    {/* Ein Foto sagt bei so einem Eintrag mehr als die Zeile
                        darueber. Feste Hoehe, damit die Karte beim Laden
                        nicht springt. */}
                    {skill.photo && (
                        <Image
                            src={skill.photo}
                            alt={skill.name}
                            mt={3}
                            width="100%"
                            height={{ base: '200px', md: '280px' }}
                            objectFit="cover"
                            objectPosition="center 35%"
                            borderRadius="md"
                        />
                    )}
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

    // Get unique categories from the skills data
    const uniqueCategories = Array.from(new Set(skillsData.map(skill => skill.category)));

    return (
        <Box
            p={5}
           
            minH="90vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            position="relative"
            overflow="hidden"
            mt={20}
        >


            <Box textAlign="left" maxWidth={{ base: "800px", xl: "1200px" }} width="100%" mx="auto">
                <SectionHeading>About</SectionHeading>

                {/* Das Portraet steht hier und nicht im Hero. Es ist kein
                    Projekt und auch kein Aushaengeschild, sondern gehoert zu
                    der Frage, wer das eigentlich ist. Der Ausschnitt ist
                    bewusst weiter als ein Avatar, damit Kittel und Logo
                    sichtbar bleiben. */}
                <Flex
                    mt={8}
                    gap={{ base: 5, md: 8 }}
                    align="center"
                    direction={{ base: 'column', md: 'row' }}
                    textAlign={{ base: 'center', md: 'left' }}
                >
                    <Image
                        src="/images/profile-about.jpg"
                        alt="Elias Bitsch at the AIT Center for Technology Experience"
                        width={640}
                        height={640}
                        boxSize={{ base: '180px', md: '220px' }}
                        borderRadius="full"
                        objectFit="cover"
                        flexShrink={0}
                        border="3px solid"
                        borderColor="#3C5AF0"
                        boxShadow="0 10px 30px rgba(0,0,0,0.45)"
                    />
                    <Box fontSize={{ base: 'md', md: 'lg' }} color="gray.300" lineHeight="1.7">
                        Technical assistant at the AIT Center for Technology Experience and
                        Robotics Engineering master&apos;s student at UAS Technikum Wien. Most of
                        my work happens between a lab bench and a robot cell: building the thing,
                        then putting it in front of the people who are supposed to use it.
                    </Box>
                </Flex>
            </Box>

            <SimpleGrid
                columns={1}
                spacing={4}
                mt={8}
                mx="auto"
                maxWidth={{ base: "800px", xl: "1200px" }}
                width={'100%'}
                justifyContent="center"
            >
                {uniqueCategories.map((category) => {
                    const categorySkills = skillsData.filter(skill => skill.category === category);

                    const icon =
                        category === 'Career' ? <FaBriefcase style={{ color: 'white', fontSize: '1.5em' }} /> :
                            category === 'Education' ? <FaGraduationCap style={{ color: 'white', fontSize: '2em' }} /> :
                                category === 'Certificates' ? <PiCertificateLight style={{ color: 'white', fontSize: '2em' }} /> :
                                    category === 'Service' ? <FaHandsHelping style={{ color: 'white', fontSize: '1.5em' }} /> :
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

        </Box>
    );
}
