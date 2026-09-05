'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import Hero from './components/Hero';
import Publications from './components/Publications';
import Projects from './projects/page';
import Skillset from './skillset/page';
import About from './about/page';

const Section = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <Box as="section" id={id} scrollSnapAlign="start" scrollMarginTop="72px">
    {children}
  </Box>
);

export default function Page() {
  return (
    <Box bg="gray.900">
      <Section id="home">
        <Hero />
      </Section>
      <Section id="publications">
        <Publications />
      </Section>
      <Section id="projects">
        <Projects />
      </Section>
      <Section id="skillset">
        <Skillset />
      </Section>
      <Section id="about">
        <About />
      </Section>
      <Box as="footer" textAlign="center" py={6} fontSize="sm" color="gray.500">
        © {new Date().getFullYear()} Elias Bitsch. All rights reserved.
      </Box>
    </Box>
  );
}
