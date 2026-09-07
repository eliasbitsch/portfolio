'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, SimpleGrid, Tag, TagLabel, TagLeftIcon, Wrap, WrapItem, Image, Text, Link } from '@chakra-ui/react';
import {
  FaBolt, FaLaptopCode, FaMicrochip, FaPalette, FaBook, FaWrench, FaEye,
  FaGithub, FaFacebook, FaFlickr, FaLinkedin, FaYoutube, FaFilePdf, FaExternalLinkAlt,
} from 'react-icons/fa';
import { FaGears, FaRobot, FaVrCardboard } from "react-icons/fa6";
import SectionHeading from '../components/SectionHeading';

// Example projects data

type ProjectLink = { label: string; href: string };

/** Passendes Symbol zum Linkziel, damit die Zeile ohne Lesen erkennbar ist. */
function iconForLink(href: string) {
  const u = href.toLowerCase();
  if (u.includes('github.com')) return FaGithub;
  if (u.includes('facebook.com')) return FaFacebook;
  if (u.includes('flickr.com')) return FaFlickr;
  if (u.includes('linkedin.com')) return FaLinkedin;
  if (u.includes('youtube.com') || u.includes('youtu.be')) return FaYoutube;
  if (u.endsWith('.pdf')) return FaFilePdf;
  return FaExternalLinkAlt;
}

const MotionBox = motion(Box);

const projectsData = [
  {
    id: 1,
    category: ['XR & HRI', 'Robotics'],
    title: 'MetaMove',
    description:
      'Bare-hand mixed-reality teleoperation of an ABB GoFa cobot: Meta Quest 3 to ROS 2 with MoveIt Servo and an EGM bridge at 250 Hz, plus a distance-based speed-scaling safety layer and a live bidirectional digital twin. Accepted at the XR-SPro workshop, IEEE ISMAR 2026.',
    imageUrl: '/images/metamove.png',
    tags: ['Mixed Reality', 'Unity', 'C#', 'ROS 2', 'MoveIt Servo', 'Meta Quest 3', 'ABB GoFa'],
    icon: FaLaptopCode,
    links: [
      { label: 'Repository', href: 'https://github.com/eliasbitsch/MetaMove' },
      { label: 'IEEE ISMAR 2026', href: 'https://www.ieeeismar.net/2026/' },
      { label: 'XR-SPro workshop', href: 'https://sites.google.com/view/xr-spro2026/' },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/posts/uas-technikum-wien_changeourtomorrow-fhtechnikumwien-uastechnikumwien-activity-7487533458509070336-n1g_',
      },
      {
        label: 'FH Technikum Wien news',
        href: 'https://www.technikum-wien.at/news/digitale-zwillinge-in-der-robotik-projektergebnisse-aus-dem-master-robotics-engineering/',
      },
    ]
  },
  {
    id: 2,
    category: ['XR & HRI', 'Electronics'],
    title: 'FlexiStylus',
    description:
      'A handheld instrument for marking defects directly on a physical casting: the operator points at the flaw on the part itself instead of on a screen, and a collaborative robot picks up the marked positions. Shown publicly at SALZ 2026, the innovation festival of the University of Salzburg.',
    imageUrl: '/images/flexistylus.jpg',
    imageCredit: 'Photo: Kay Müller / Universität Salzburg, CC BY-NC 4.0',
    tags: ['Human-Robot Interaction', 'Tangible Interfaces', 'Mixed Reality', 'Embedded'],
    icon: FaLaptopCode,
    links: [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/posts/universitaet-salzburg_unisalzburg-universit%C3%A4tsalzburg-universityofsalzburg-activity-7437846030836039680-N2V9/',
      },
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/universitaetsalzburg/posts/1370668765101851/',
      },
      {
        label: 'Flickr',
        href: 'https://www.flickr.com/photos/uni-salzburg/albums/72177720332484057/',
      },
    ]
  },
  {
    id: 3,
    category: ['Robotics', 'Computer Vision'],
    title: 'Taurob-Tracker',
    description: 'Object detection using YOLO (You Only Look Once) for a robot arm manipulation-pipeline.',
    imageUrl: '/images/taurob.png',
    tags: ['Robotics', 'YOLO8', 'Python', 'OpenCV', 'ROS', 'Docker'],
    icon: FaLaptopCode,
    links: [{ label: 'ENRICH project', href: 'https://enrich.european-robotics.eu/' }]
  },
  {
    id: 4,
    category: ['Robotics', 'Electronics'],
    title: 'Circuit-Crusher',
    description: 'A Sumo-Bot for a competition at University.',
    imageUrl: '/images/circuit-crusher.jpg',
    tags: ['Arduino', 'Robotics', 'Sumo-Bot'],
    icon: FaLaptopCode,
    links: [{ label: 'Website', href: 'https://roboringout.at/2023/12/17/circuit-crusher/' }]
  },
  {
    id: 5,
    category: ['Robotics'],
    title: 'Path Planning Robot',
    description: 'A Robot that can solve a maze using ROS and its navigation stack.',
    imageUrl: '/images/path-planning.png',
    tags: ['ROS', 'Navigation Stack', 'Path Planning'],
    icon: FaPalette,
    links: [{ label: 'Repository', href: 'https://github.com/eliasbitsch/Docker-ROS-line-follower-path-planner' }]
  },
  {
    id: 6,
    category: ['Robotics'],
    title: 'Maze solving Robot',
    description: 'A Robot that can solve a maze using k-nearest neighbor classifier and A-Star algorithm.',
    imageUrl: '/images/maze-solver.png',
    tags: ['ROS', 'Python', 'Machine Learning'],
    icon: FaMicrochip,
    links: [{ label: 'Repository', href: 'https://github.com/eliasbitsch/Docker-ROS-maze-solver' }]

  },
  {
    id: 7,
    category: ['Robotics', 'Computer Vision'],
    title: 'Line follower Robot',
    description: 'A Robot that can follow a line using a camera with OpenCV Library.',
    imageUrl: '/images/line-follower.png',
    tags: ['ROS', 'Python', 'OpenCV'],
    icon: FaLaptopCode,
    links: [{ label: 'Repository', href: 'https://github.com/eliasbitsch/Docker-ROS-line-follower-path-planner' }]

  },
  {
    id: 8,
    category: ['Web & Software'],
    title: 'ROS online course',
    description: 'An online course about ROS.',
    imageUrl: '/images/rosCourse.png',
    tags: ['Next.js', 'Nextra', 'mdx', 'Typescript'],
    icon: FaLaptopCode,
    links: [{ label: 'Website', href: 'https://rosready.robolink.app/' }]

  },

  {
    id: 9,
    category: ['Web & Software'],
    title: 'Portfolio Website',
    description: 'A personal portfolio website built with Next.js, Typescript and Chakra UI.',
    imageUrl: '/images/portfolio-website.png',
    tags: ['Next.js', 'Typescript', 'Chakra UI'],
    icon: FaLaptopCode,
    links: [{ label: 'Repository', href: 'https://github.com/eliasbitsch/portfolio' }]

  },

  // Add more projects as needed
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');


  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(project =>
      Array.isArray(project.category)
        ? project.category.includes(selectedCategory) // If the project has multiple categories
        : project.category === selectedCategory // If the project has only one category
    );

  return (
    <Box p={5}
     
      minH="90vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      position="relative"
      overflow="hidden"
      mt={20}
    >



      <Box textAlign="left" maxWidth={{ base: "800px", xl: "1200px" }} width="100%" mx="auto">
        <SectionHeading>Projects</SectionHeading>
      </Box>

      <Box mt={4} maxWidth={{ base: "800px", xl: "1200px" }} width="100%" mx="auto">
        <Text fontSize="lg">A selection of projects I have worked on throughout my engineering journey</Text>
      </Box>

      <Wrap spacing={4} mt={4} justify="center" maxWidth={{ base: "800px", xl: "1200px" }} width="100%" mx="auto">
        {[
          { label: "All", icon: FaBolt, category: "All" },
          { label: "XR & HRI", icon: FaVrCardboard, category: "XR & HRI" },
          { label: "Robotics", icon: FaRobot, category: "Robotics" },
          { label: "Computer Vision", icon: FaEye, category: "Computer Vision" },
          { label: "Electronics", icon: FaMicrochip, category: "Electronics" },
          { label: "Web & Software", icon: FaLaptopCode, category: "Web & Software" },
        ].map((item) => (
          <WrapItem key={item.category}>
            <Tag
              size="lg"
              color="#718096"
              bg="gray.800"
              borderRadius="full"
              cursor="pointer"
              onClick={() => handleFilterChange(item.category)}
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

      <Box
        mt={6}
        mx="auto"
        maxWidth={{ base: 900, xl: 1200 }}
        width="100%"
        fontSize="sm"
        color="gray.400"
      >
        {selectedCategory === 'All'
          ? `${filteredProjects.length} projects`
          : `${filteredProjects.length} of ${projectsData.length} projects in ${selectedCategory}`}
      </Box>

      <SimpleGrid
        columns={{ base: 1, md: 2, xl: 3 }}
        spacing={6}
        mt={8}
        mx="auto"
        maxWidth={{ base: 900, xl: 1200 }}
        justifyContent="center">
        <AnimatePresence mode="popLayout">
        {filteredProjects.map((project, index) => (
          <MotionBox
            key={project.title}
            layout
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{
              duration: 0.42,
              ease: [0.16, 1, 0.3, 1],
              delay: index * 0.045,
              layout: { duration: 0.42, ease: [0.16, 1, 0.3, 1] },
            }}
            bg="gray.700"
            borderRadius="lg"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            _hover={{
              boxShadow: 'lg',
              '& img': { transform: 'scale(1.06)' },
            }}>
            <Box position="relative" overflow="hidden">
              {project.imageCredit && (
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  px={2}
                  py={1}
                  fontSize="10px"
                  color="whiteAlpha.800"
                  bg="blackAlpha.600"
                  zIndex={1}
                >
                  {project.imageCredit}
                </Box>
              )}
              <Image
                src={project.imageUrl}
                alt={project.title}
                objectFit={project.imageFit ?? 'cover'}
                bg={project.imageFit === 'contain' ? 'gray.800' : undefined}
                p={project.imageFit === 'contain' ? 3 : 0}
                width="100%"
                height="300px"
                transition="transform 0.3s ease-in-out"
              />
            </Box>
            <Box p={4}>
              <Text fontWeight="bold" fontSize="xl" mb={2}>{project.title}</Text>
              <Text fontSize="md" color="gray.400" mb={4}>{project.description}</Text>
              <Wrap>
                {project.tags.map(tag => (
                  <WrapItem key={tag}>
                    <Tag size="sm" bg="gray.600" borderRadius="full">
                      {tag}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>

              {project.links && project.links.length > 0 && (
                <Wrap mt={4} spacing={2}>
                  {project.links.map(link => (
                    <WrapItem key={link.href}>
                      <Link
                        href={link.href}
                        isExternal
                        display="inline-flex"
                        alignItems="center"
                        gap={2}
                        px={3}
                        py={1.5}
                        fontSize="sm"
                        fontWeight="medium"
                        borderRadius="full"
                        borderWidth="1px"
                        borderColor="gray.500"
                        color="gray.200"
                        _hover={{ bg: 'gray.600', color: 'white', textDecoration: 'none' }}
                        transition="background-color 0.2s ease, color 0.2s ease"
                      >
                        <Box as={iconForLink(link.href)} boxSize="0.9em" />
                        {link.label}
                      </Link>
                    </WrapItem>
                  ))}
                </Wrap>
              )}
            </Box>
          </MotionBox>
        ))}
        </AnimatePresence>
      </SimpleGrid>
    </Box>
  );
}
