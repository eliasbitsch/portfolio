'use client';

import React, { useState } from 'react';
import { Box, SimpleGrid, Tag, TagLabel, TagLeftIcon, Wrap, WrapItem, Image, Text } from '@chakra-ui/react';
import { FaBolt, FaLaptopCode, FaMicrochip, FaPalette, FaBook, FaWrench } from 'react-icons/fa';
import { FaGears } from "react-icons/fa6";

// Example projects data
const projectsData = [
  {
    id: 1,
    category: ['Programming', 'Electronics', 'Engineering'], // Array of categories
    title: 'Taurob-Tracker',
    description: 'Object detection using YOLO (You Only Look Once) for a robot arm manipulation-pipeline.',
    imageUrl: '/images/taurob.png',
    tags: ['Robotics', 'YOLO8', 'Python', 'OpenCV', 'ROS', 'Docker'],
    icon: FaLaptopCode,
    //githubUrl: 'https://enrich.european-robotics.eu/'
  },
  {
    id: 1,
    category: ['Programming', 'Electronics', 'Engineering'], // Array of categories
    title: 'Circuit-Crusher',
    description: 'A Sumo-Bot for a competition at University.',
    imageUrl: '/images/circuit-crusher.jpg',
    tags: ['Arduino', 'Robotics', 'Sumo-Bot'],
    icon: FaLaptopCode,
    githubUrl: 'https://roboringout.at/2023/12/17/circuit-crusher/'
  },
  {
    id: 2,
    category: 'Programming',
    title: 'Path Planning Robot',
    description: 'A Robot that can solve a maze using ROS and its navigation stack.',
    imageUrl: '/images/path-planning.png',
    tags: ['ROS', 'Navigation Stack', 'Path Planning'],
    icon: FaPalette,
    githubUrl: 'https://github.com/eliasbitsch/Docker-ROS-line-follower-path-planner'
  },
  {
    id: 3,
    category: 'Programming',
    title: 'Maze solving Robot',
    description: 'A Robot that can solve a maze using k-nearest neighbor classifier and A-Star algorithm.',
    imageUrl: '/images/maze-solver.png',
    tags: ['ROS', 'Python', 'Machine Learning'],
    icon: FaMicrochip,
    githubUrl: 'https://github.com/eliasbitsch/Docker-ROS-maze-solver'

  },
  {
    id: 4,
    category: 'Programming',
    title: 'Line follower Robot',
    description: 'A Robot that can follow a line using a camera with OpenCV Library.',
    imageUrl: '/images/line-follower.png',
    tags: ['ROS', 'Python', 'OpenCV'],
    icon: FaLaptopCode,
    githubUrl: 'https://github.com/eliasbitsch/Docker-ROS-line-follower-path-planner'

  },
  {
    id: 5,
    category: 'Programming',
    title: 'ROS online course',
    description: 'An online course about ROS.',
    imageUrl: '/images/rosCourse.png',
    tags: ['Next.js', 'Nextra', 'mdx', 'Typescript'],
    icon: FaLaptopCode,
    githubUrl: 'https://rosready.eliasbitsch.tech/'

  },

  {
    id: 6,
    category: 'Programming',
    title: 'Portfolio Website',
    description: 'A personal portfolio website built with Next.js, Typescript and Chakra UI.',
    imageUrl: '/images/portfolio-website.png',
    tags: ['Next.js', 'Typescript', 'Chakra UI'],
    icon: FaLaptopCode,
    githubUrl: 'https://github.com/eliasbitsch/portfolio'

  },

  // Add more projects as needed
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const currentYear = new Date().getFullYear();


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
          Projects
          <hr style={{
            width: '100%',     // Match the width of the text
            marginTop: '6px',   // Space between text and underline
            border: 'none',     // Remove default border
            height: '2px',      // Thickness of the underline
            backgroundColor: 'currentColor', // Match the color of the text
          }} />
        </Box>
      </Box>

      <Box mt={4} maxWidth="800px" width="100%" mx="auto">
        <Text fontSize="lg">A selection of projects I have worked on throughout my engineering journey</Text>
      </Box>

      <Wrap spacing={4} mt={4} justify="center" maxWidth="600px" width="100%" mx="auto">
        {[
          { label: "All", icon: FaBolt, category: "All" },
          { label: "Programming", icon: FaLaptopCode, category: "Programming" },
          { label: "Electronics", icon: FaMicrochip, category: "Electronics" },
          { label: "Engineering", icon: FaWrench, category: "Engineering" },
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

      <SimpleGrid
        columns={{ base: 1, md: 2 }} // One column on small screens and two columns on medium screens and larger
        spacing={6}
        mt={8}
        mx="auto"
        maxWidth={900}
        justifyContent="center">
        {filteredProjects.map(project => (
          <Box
            key={project.id}
            bg="gray.700"
            borderRadius="lg"
            overflow="hidden"
            as="a"
            href={project.githubUrl}
            target="_blank"  // Opens the link in a new tab
            rel="noopener noreferrer"  // Security measure for external links
            _hover={{
              transform: 'translateY(-5px)', // Move up on hover
              boxShadow: 'lg', // Add a shadow for better visual effect
            }}
            transition="transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-in-out">
            <Box
              position="relative"
              _hover={{
                '& img': {
                  transform: 'scale(1.1)', // Scale image on hover
                },
              }}
              transition="transform 0.3s ease-in-out"
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                objectFit="cover"
                scale={1}
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
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <Text fontSize="sm" color="gray.500" mt={10}>
        © {currentYear} Elias Bitsch. All rights reserved.
      </Text>
    </Box>
  );
}
