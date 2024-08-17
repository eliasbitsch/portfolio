'use client';

import { Box, Heading, Text, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import EmailIcon from './Icon';

const MotionText = motion(Text);
const MotionHeading = motion(Heading);

export default function Page() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      p={5}
      bg="gray.900"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
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
          top: '80%',
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

      <Link href="mailto:your-email@example.com" isExternal zIndex={1}>
        <EmailIcon size="2rem" color="white" />
      </Link>

      <Text fontSize="sm" color="gray.500" mt={8} zIndex={1}>
        © {currentYear} Elias Bitsch. All rights reserved.
      </Text>
    </Box>
  );
}
