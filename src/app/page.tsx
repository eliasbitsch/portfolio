'use client';

import { Box, Heading, Text, Link, HStack, VStack, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import EmailIcon from './Icon';

const MotionText = motion(Text);
const MotionHeading = motion(Heading);

export default function Page() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      p={5}
      bg="gray.900"
      minH="90vh"
      mt={20}
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      position="relative"
      overflow="hidden"
    >
      {/* SVG Patterns with Fixed Margins */}
      <svg
        width="300"
        height="500"
        style={{
          position: 'absolute',
          top: "30rem",
          left: '30%',
          transform: 'translate(-150%, -50%)',
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
        width="300"
        height="300"
        style={{
          position: 'absolute',
          top: '20%',
          right: '30%',
          transform: 'translate(150%, -50%)',
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
        maxWidth="45%" // Responsive width
        mx={[5, 10, 20]} // Responsive margins
        initial={{ opacity: 0, x: '-20vw' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        zIndex={1}
      >
        I am a <b>Programmer, Mechatronics Engineer, and Robotics Engineer</b>
        <br />
        dedicated to advancing technology through innovative development.
        <br />
        <br />
        My work focuses on applying computational and artificial intelligence
        <br />
        to robotics and automation, driving progress in engineering and intelligent
        systems.
      </MotionText>

      {/* Social Media & Resume Links with Hover Text */}
      <HStack spacing={10} mt={6} zIndex={1}>
        <VStack spacing={2}>
          <Link href="https://github.com/your-github-profile" isExternal>
            <Tooltip label="GitHub" placement="bottom" bg="gray.800" color="white">
              <span><FaGithub size="2rem" color="white" /></span>
            </Tooltip>
          </Link>
          <Text color="gray.400" fontSize="sm" mt={1} opacity={0} transition="opacity 0.3s ease" _hover={{ opacity: 1 }}>GitHub</Text>
        </VStack>
        <VStack spacing={2}>
          <Link href="mailto:your-email@example.com" isExternal>
            <Tooltip label="Email" placement="bottom" bg="gray.800" color="white">
              <span><EmailIcon size="2rem" color="white" /></span>
            </Tooltip>
          </Link>
          <Text color="gray.400" fontSize="sm" mt={1} opacity={0} transition="opacity 0.3s ease" _hover={{ opacity: 1 }}>Email</Text>
        </VStack>
        <VStack spacing={2}>
          <Link href="https://www.linkedin.com/in/your-linkedin-profile" isExternal>
            <Tooltip label="LinkedIn" placement="bottom" bg="gray.800" color="white">
              <span><FaLinkedin size="2rem" color="#0A66C2" /></span>
            </Tooltip>
          </Link>
          <Text color="gray.400" fontSize="sm" mt={1} opacity={0} transition="opacity 0.3s ease" _hover={{ opacity: 1 }}>LinkedIn</Text>
        </VStack>
        <VStack spacing={2}>
          <Link href="path-to-your-resume.pdf" isExternal>
            <Tooltip label="Resume" placement="bottom" bg="gray.800" color="white">
              <span><FaFileAlt size="2rem" color="white" /></span>
            </Tooltip>
          </Link>
          <Text color="gray.400" fontSize="sm" mt={1} opacity={0} transition="opacity 0.3s ease" _hover={{ opacity: 1 }}>Resume</Text>
        </VStack>
      </HStack>

      <Text fontSize="sm" color="gray.500" mt={8} zIndex={1}>
        © {currentYear} Elias Bitsch. All rights reserved.
      </Text>
    </Box>
  );
}
