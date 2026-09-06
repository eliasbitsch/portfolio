'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import Hero from './components/Hero';
import Publications from './components/Publications';
import Projects from './projects/page';
import Skillset from './skillset/page';
import About from './about/page';
import Contact from './components/Contact';

const Section = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <Box as="section" id={id}>
    {children}
  </Box>
);

export default function Page() {
  return (
    <Box>
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
      <Section id="contact">
        <Contact />
      </Section>
    </Box>
  );
}
