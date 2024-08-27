'use client';

import React, { useState } from 'react';
import { Box, SimpleGrid, Tag, TagLabel, TagLeftIcon, Wrap, WrapItem, Image, Text } from '@chakra-ui/react';
import { FaBolt, FaLaptopCode, FaMicrochip, FaPalette, FaBook, FaWrench } from 'react-icons/fa';

// Example projects data
const projectsData = [
  {
    id: 1,
    category: 'Web Development',
    title: 'Circuit-Crusher',
    description: 'A Sumo-Bot for a competition at University.',
    imageUrl: 'https://image.geo.de/34423086/t/u8/v1/w1440/r0/-/katze-as-97589769.jpg',
    tags: ['React', 'Chakra UI', 'JavaScript'],
    icon: FaLaptopCode
  },
  {
    id: 2,
    category: 'Electronics',
    title: 'Smart Home System',
    description: 'An IoT-based smart home system for controlling appliances.',
    imageUrl: '/images/smarthome.png',
    tags: ['IoT', 'Arduino', 'Home Automation'],
    icon: FaMicrochip
  },
  {
    id: 3,
    category: 'Web Development',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with payment integration.',
    imageUrl: '/images/ecommerce.png',
    tags: ['Node.js', 'Express', 'MongoDB'],
    icon: FaLaptopCode
  },
  {
    id: 4,
    category: 'Art & Design',
    title: 'Digital Art Portfolio',
    description: 'A portfolio showcasing my digital art and design work.',
    imageUrl: '/images/artportfolio.png',
    tags: ['Photoshop', 'Illustrator', 'Digital Art'],
    icon: FaPalette
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
    : projectsData.filter(project => project.category === selectedCategory);

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
        <Text fontSize="lg">A selection of projects I've worked on throughout my engineering journey</Text>
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
        spacing={6}
        mt={8}
        mx="auto"
        maxWidth={800}
        justifyContent="center">
        {filteredProjects.map(project => (
          <Box key={project.id} bg="gray.700" borderRadius="md" overflow="hidden"
            _hover={{
              transform: 'translateY(-5px)', // Move up on hover
              boxShadow: 'lg', // Add a shadow for better visual effect
            }}
            transition="transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-in-out">
            <Image src={project.imageUrl} alt={project.title} objectFit="cover" width="100%" height="200px" />
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
    </Box >
  );
}
