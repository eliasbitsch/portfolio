'use client';

import { Box, Heading, Text, Link, HStack, VStack, Tooltip, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";


const MotionText = motion(Text);
const MotionHeading = motion(Heading);

export default function Page() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      p={5}
      bg="gray.900"
      minH="90vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
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

      <MotionHeading
        as="h1"
        size="3xl"
        mb={5}
        mt={10}
        fontWeight="1000"
        color="#3C5AF0"
        initial={{ opacity: 0, x: '-20vw' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        zIndex={1}
      >
        Elias Bitsch
      </MotionHeading>

      <MotionText
        fontSize="2xl"
        mb={3}
        color="white"
        lineHeight="1.5"
        maxWidth="700px" // Responsive width
        mx={[5, 10, 20]} // Responsive margins
        initial={{ opacity: 0, x: '-20vw' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        zIndex={1}
      >
        I am a <b>Mechatronics & Robotics Engineering student</b>
        <br />
        dedicated to advancing technology through innovative&nbsp;development.
        <br />
        <br />
        My interest focuses on applying computational and artificial&nbsp;intelligence
        <br />
        to robotics and automation, driving progress in engineering and&nbsp;intelligent
        systems.
      </MotionText>



      {/* Social Media & Resume Links with Hover Text */}
      <HStack spacing={10} mt={6}>
        <VStack spacing={2}>
          <Link
            href="https://github.com/eliasbitsch"
            isExternal
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Tooltip label="GitHub" placement="bottom" bg="gray.800" color="white">
              <Box
                p={2}
                bg="transparent"
                borderRadius="lg"
                transition="all 0.3s ease"
                _hover={{
                  bg: 'gray.700',
                  color: 'white',
                  borderRadius: 'lg',
                  transform: 'scale(1.1)',
                }}
              >
                <FaGithub size="2rem" color="white" />
              </Box>
            </Tooltip>
          </Link>
          <Text color="gray.400" fontSize="sm" mt={1} opacity={0} transition="opacity 0.3s ease" _hover={{ opacity: 1 }}>
            GitHub
          </Text>
        </VStack>

        <VStack spacing={2}>
          <Link
            href="mailto:eliasbitsch@protonmail.com"
            isExternal
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Tooltip label="Email" placement="bottom" bg="gray.800" color="white">
              <Box
                p={2}
                bg="transparent"
                borderRadius="lg"
                transition="all 0.3s ease"
                _hover={{
                  bg: 'gray.700',
                  color: 'white',
                  borderRadius: 'lg',
                  transform: 'scale(1.1)',
                }}
              >
                <MdOutlineMailOutline size="2rem" color="white" />
              </Box>
            </Tooltip>
          </Link>
          <Text color="gray.400" fontSize="sm" mt={1} opacity={0} transition="opacity 0.3s ease" _hover={{ opacity: 1 }}>
            Email
          </Text>
        </VStack>

        <VStack spacing={2}>
          <Link
            href="https://www.linkedin.com/in/elias-bitsch-a1b617239/"
            isExternal
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Tooltip label="LinkedIn" placement="bottom" bg="gray.800" color="white">
              <Box
                p={2}
                bg="transparent"
                borderRadius="lg"
                transition="all 0.3s ease"
                _hover={{
                  bg: 'gray.700',
                  color: 'white',
                  borderRadius: 'lg',
                  transform: 'scale(1.1)',
                }}
              >
                <FaLinkedin size="2rem" color="#0A66C2" />
              </Box>
            </Tooltip>
          </Link>
          <Text color="gray.400" fontSize="sm" mt={1} opacity={0} transition="opacity 0.3s ease" _hover={{ opacity: 1 }}>
            LinkedIn
          </Text>
        </VStack>

        <VStack spacing={2}>
          <Link
            href="/assets/CV_Elias_Bitsch.pdf"
            isExternal
            _hover={{
              textDecoration: 'none',
            }}
          >
            <Tooltip label="Resume" placement="bottom" bg="gray.800" color="white">
              <Box
                p={2}
                bg="transparent"
                borderRadius="lg"
                transition="all 0.3s ease"
                _hover={{
                  bg: 'gray.700',
                  color: 'white',
                  borderRadius: 'lg',
                  transform: 'scale(1.1)',
                }}
              >
                <FaFileAlt size="2rem" color="white" />
              </Box>
            </Tooltip>
          </Link>
          <Text color="gray.400" fontSize="sm" mt={1} opacity={0} transition="opacity 0.3s ease" _hover={{ opacity: 1 }}>
            Resume
          </Text>
        </VStack>
      </HStack>
      <Text fontSize="sm" color="gray.500">
        © {currentYear} Elias Bitsch. All rights reserved.
      </Text>
    </Box>
  );
}
