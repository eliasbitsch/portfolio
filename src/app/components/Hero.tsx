'use client';

import { Box, Heading, Text, Link, HStack, VStack, Tooltip, Flex, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { MdOutlineMailOutline } from "react-icons/md";


const MotionText = motion(Text);
const MotionHeading = motion(Heading);
const MotionHStack = motion(HStack);

export default function Hero() {
  return (
    <Box
      px={{ base: 5, md: 8 }}
      py={{ base: 6, md: 10 }}
      minH={{ base: 'calc(100vh - 64px)', md: 'calc(100vh - 76px)' }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      position="relative"
      className="hero-motion"
    >

      {/* Portraet neben dem Namen, nicht darueber. Darueber schiebt es die
          Symbolzeile unter den Rand, und auf einem iPhone SE ist dafuer
          kein Platz: der Hero fuellt dort 603 von 667 Pixeln. Neben dem
          Namen kostet es fast keine Hoehe. */}
      <MotionHStack
        spacing={{ base: 4, md: 6 }}
        mb={{ base: 3, md: 5 }}
        zIndex={1}
        align="center"
        initial={{ opacity: 0, x: '-20vw' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Image
          src="/images/profile.jpg"
          alt="Elias Bitsch"
          width={320}
          height={320}
          boxSize={{ base: '64px', sm: '84px', md: '104px' }}
          borderRadius="full"
          objectFit="cover"
          flexShrink={0}
          border="3px solid"
          borderColor="#3C5AF0"
          boxShadow="0 8px 24px rgba(0,0,0,0.45)"
        />
        <MotionHeading
          as="h1"
          /* Auf einem iPhone SE stehen 667 Pixel zur Verfuegung. Mit den
             alten Groessen war der Hero 860 hoch und die Symbolzeile lag
             unter dem Rand, also unsichtbar. Genau die soll aber
             angeklickt werden. */
          fontSize={{ base: '3xl', sm: '5xl', md: '6xl' }}
          fontWeight="1000"
          color="#3C5AF0"
          mb={0}
          textAlign="left"
        >
          Elias Bitsch
        </MotionHeading>
      </MotionHStack>

      <MotionText
        fontSize={{ base: 'sm', sm: 'lg', md: '2xl' }}
        mb={{ base: 2, md: 3 }}
        color="white"
        lineHeight="1.6"
        maxWidth={{ base: '100%', md: '700px', xl: '900px' }}
        mx="auto"
        initial={{ opacity: 0, x: '-20vw' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        zIndex={1}
      >
        I am a <b>Robotics Engineering master&apos;s student</b> at UAS Technikum Wien
        and a technical assistant at the AIT Center for Technology Experience.
      </MotionText>

      <MotionText
        fontSize={{ base: 'sm', sm: 'lg', md: '2xl' }}
        mb={{ base: 2, md: 3 }}
        color="white"
        lineHeight="1.6"
        maxWidth={{ base: '100%', md: '700px', xl: '900px' }}
        mx="auto"
        initial={{ opacity: 0, x: '-20vw' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.05 }}
        zIndex={1}
      >
        I build mixed-reality systems for human-robot collaboration and test them with real
        operators: bare-hand teleoperation across Unity and ROS 2, purpose-built feedback
        hardware, and touch interfaces for supervising robots.
      </MotionText>

      {/* Der Kern fuer alles, was mit Lernen zu tun hat. Steht bewusst als
          eigener kurzer Absatz und nicht am Ende des vorigen, sonst liest ihn
          niemand. */}
      <MotionText
        fontSize={{ base: 'sm', sm: 'lg', md: '2xl' }}
        mb={{ base: 2, md: 3 }}
        color="white"
        lineHeight="1.6"
        maxWidth={{ base: '100%', md: '700px', xl: '900px' }}
        mx="auto"
        initial={{ opacity: 0, x: '-20vw' }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 }}
        zIndex={1}
      >
        What I care about is the <b>learning</b>: whether someone can still do the task once
        the headset comes off. That question is where my research interest sits, and it is why
        I wrote an online course on the stack I work with.
      </MotionText>



      {/* Social Media & Resume Links with Hover Text */}
      <HStack spacing={{ base: 6, md: 10 }} mt={{ base: 3, md: 6 }} zIndex={1}>
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
            href="mailto:eliasbitsch@hotmail.com"
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
    </Box>
  );
}
