'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IconType } from 'react-icons';
import { Box, SimpleGrid, Tag, TagLabel, TagLeftIcon, Wrap, WrapItem, Image, Text, Link } from '@chakra-ui/react';
import {
  FaBolt, FaLaptopCode, FaMicrochip, FaPalette, FaBook, FaWrench, FaEye,
  FaGithub, FaFacebook, FaFlickr, FaLinkedin, FaYoutube, FaFilePdf, FaExternalLinkAlt,
} from 'react-icons/fa';
import { FaGears, FaRobot, FaVrCardboard } from "react-icons/fa6";
import SectionHeading from '../components/SectionHeading';
import Gallery from '../components/Gallery';
import ProjectReel from '../components/ProjectReel';
import { galleries } from './galleries';

// Example projects data

type ProjectLink = { label: string; href: string };

type Project = {
  id: number;
  category: string | string[];
  title: string;
  description: string;
  imageUrl: string;
  imageCredit?: string;
  imageFit?: 'cover' | 'contain';
  videoUrl?: string;
  tags: string[];
  icon: IconType;
  links?: ProjectLink[];
};

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

const projectsData: Project[] = [
  {
    id: 1,
    category: ['XR & HRI', 'Robotics'],
    title: 'MetaMove',
    description:
      'Bare-hand mixed-reality teleoperation of an ABB GoFa cobot: Meta Quest 3 to ROS 2 with MoveIt Servo and an EGM bridge at 250 Hz, plus a distance-based speed-scaling safety layer and a live bidirectional digital twin. Accepted at the XR-SPro workshop, IEEE ISMAR 2026.',
    // Die erste Seite der Camera-Ready, exakt im Kartenverhaeltnis
    // geschnitten. Vorher war es ein breiteres Bild mit `contain`, das
    // die Karte oben und unten nicht ausgefuellt und die Bildunterschrift
    // angeschnitten hat.
    imageUrl: '/images/metamove-paper.jpg',
    imageCredit: '© 2026 IEEE · MetaMove, XR-SPro workshop, ISMAR-Adjunct 2026',
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
    category: ['Learning', 'Robotics', 'Web & Software'],
    title: 'ROS online course',
    description:
      'A course that teaches ROS from the first node to a working robot, written as structured lessons with runnable examples so that readers learn by doing rather than by reading.',
    imageUrl: '/images/rosCourse.png',
    tags: ['Teaching', 'ROS', 'Next.js', 'MDX'],
    icon: FaBook,
    links: [{ label: 'Website', href: 'https://rosready.robolink.app/' }]
  },
  {
    id: 3,
    category: ['XR & HRI', 'Electronics'],
    title: 'FlexiStylus',
    description:
      'A handheld instrument for marking defects directly on a physical casting: the operator points at the flaw on the part itself instead of on a screen, and a collaborative robot picks up the marked positions. Shown publicly at SALZ 2026.',
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
    id: 4,
    category: ['Learning', 'Robotics', 'Computer Vision', 'Web & Software'],
    title: 'MONUMENTAL',
    description:
      'An operator interface for two rail-mounted brick-laying arms: a 3D view of the site, joint sliders, a wrist camera that detects the bricks, behaviour-tree missions and a prompt field for spoken commands. The same site can be driven with a pencil on a tablet or with a game controller, so the operator arrives already knowing the input device and spends the learning time on the task instead of the interface. Master project in Robotics Engineering.',
    // Kein Video mehr: die Ueberblendung zwischen Stift und Gamepad war
    // ein Ersatz dafuer, dass man die beiden Fotos nicht sehen konnte.
    // Jetzt blaettert man sie in der Karte durch.
    imageUrl: '/gallery/monumental/monumental-03-bedienung-mit-stift.jpg',
    tags: ['HMI', 'Skill Transfer', 'Behaviour Trees', 'Computer Vision', 'Gamepad'],
    icon: FaLaptopCode,
    links: [{ label: 'Repository', href: 'https://github.com/eliasbitsch/MONUMENTAL' }]
  },
  {
    id: 5,
    category: ['Robotics', 'Computer Vision'],
    title: 'Taurob-Tracker',
    description:
      'A tracked field robot that has to find and turn a valve on its own. My part was the perception: a YOLOv8 detector on a RealSense camera that finds the valve wheel and hands its position to the arm, so the operator no longer has to line up the gripper by hand. Team project at UAS Technikum Wien.',
    imageUrl: '/images/taurob-poster.jpg',
    videoUrl: '/videos/taurob-loop.mp4',
    tags: ['Robotics', 'YOLO8', 'Python', 'OpenCV', 'ROS', 'Docker'],
    icon: FaLaptopCode,
    links: [
      { label: 'Video', href: 'https://youtu.be/5edSvdcf2qw' },
      { label: 'Repository', href: 'https://github.com/eliasbitsch/taurob_tracker' },
    ]
  },
  {
    id: 6,
    category: ['Robotics'],
    title: 'TurtleBot 4 linear controller',
    description:
      'A closed-loop controller that drives a TurtleBot 4 to a goal pose: it reads the odometry, computes the velocity command and stops once the goal is reached. Written in C++ against ROS 2 and run from a container.',
    imageUrl: '/images/turtlebot-poster.jpg',
    videoUrl: '/videos/turtlebot-loop.mp4',
    tags: ['ROS 2', 'C++', 'Odometry', 'Control', 'Docker'],
    icon: FaGears,
    links: [{ label: 'Repository', href: 'https://github.com/eliasbitsch/turtlebot4' }]
  },
  {
    id: 7,
    category: ['Robotics'],
    title: 'ABB robot cell in RobotStudio',
    description:
      'A simulated production cell in ABB RobotStudio: an industrial arm on a pedestal moves parts between two conveyors, inside a fenced workspace with a light curtain. Built and run entirely in simulation, so the motion, the reach and the cycle can be checked before any real robot is touched.',
    imageUrl: '/images/robotstudio-poster.jpg',
    videoUrl: '/videos/robotstudio-loop.mp4',
    tags: ['ABB RobotStudio', 'Industrial Robotics', 'Simulation', 'Pick and Place'],
    icon: FaGears,
    links: [{ label: 'Video', href: 'https://youtu.be/vYTb_kCp25o' }]
  },
  {
    id: 8,
    category: ['Robotics', 'Web & Software'],
    title: 'Conveyor belt with a digital twin',
    description:
      'A conveyor controlled from a Siemens PLC: the program and the HMI screen are built in TIA Portal, and the panel talks over the S7 connection to a Visual Components model of the same belt. Pressing Start on the panel starts the belt in the simulation, the direction arrow follows, and the box travels. The point is that the control logic can be commissioned against the model before the hardware exists.',
    imageUrl: '/images/conveyor-poster.jpg',
    videoUrl: '/videos/conveyor-loop.mp4',
    tags: ['TIA Portal', 'SIMATIC HMI', 'PLC', 'Visual Components', 'Digital Twin'],
    icon: FaGears,
  },
  {
    id: 9,
    category: ['Robotics', 'Electronics'],
    title: 'Ball Balancing Robot',
    description:
      'A semester project: a tilting platform that holds a steel ball in place. Servos drive the plate over two axes and a PID closed-loop controller on an Arduino keeps correcting the position.',
    imageUrl: '/images/ball-poster.jpg',
    videoUrl: '/videos/ball-loop.mp4',
    tags: ['Arduino', 'PID Control', 'Servos', 'Mechatronics'],
    icon: FaMicrochip,
    links: [{ label: 'Video', href: 'https://youtu.be/Y26tN3HcXMo' }]
  },
  {
    id: 10,
    category: ['Robotics', 'Electronics'],
    title: 'Circuit-Crusher',
    description:
      'A Sumo-Bot for the RoboRingOut competition at UAS Technikum Wien. I led a team of eight through design, build and programming, and coached the members who had never written firmware or read a schematic before.',
    imageUrl: '/images/sumo-poster.jpg',
    videoUrl: '/videos/sumo-loop.mp4',
    tags: ['Team lead', 'Arduino', 'Robotics', 'Sumo-Bot', 'Mentoring'],
    icon: FaLaptopCode,
    links: [
      { label: 'RoboRingOut', href: 'https://www.technikum-wien.at/events/roboringout/' },
      { label: 'Light show', href: 'https://youtu.be/zhJGluGIH-M' },
      { label: 'Group round 1', href: 'https://youtu.be/A-VXeM4SAiU' },
      { label: 'Group round 2', href: 'https://youtu.be/1UgvpUVvd5g' },
      { label: 'Round 1', href: 'https://youtu.be/QKWNmb7PCEQ' },
      { label: 'Round 2', href: 'https://youtu.be/sZUUmsF36ec' },
      { label: 'Round 3', href: 'https://youtu.be/iBfT-xtsofQ' },
    ]
  },
  {
    id: 11,
    category: ['Robotics', 'Computer Vision'],
    title: 'Maze solving Robot & Line follower',
    description:
      'Two ROS behaviours on the same robot: finding its way through a maze with the ROS navigation stack, an A-Star planner and a k-nearest neighbour classifier, and following a line from the camera image with OpenCV. The clip ends on the camera view, where the red band is the region the detector looks at and the green dot is the line centre it steers to. Packaged in Docker.',
    imageUrl: '/images/maze-poster.jpg',
    videoUrl: '/videos/maze-loop.mp4',
    tags: ['ROS', 'Python', 'OpenCV', 'Path Planning', 'Docker'],
    icon: FaPalette,
    links: [
      { label: 'Video', href: 'https://youtu.be/5yGivDq1IQU' },
      {
        label: 'Line follower repo',
        href: 'https://github.com/eliasbitsch/Docker-ROS-line-follower-path-planner',
      },
      {
        label: 'Maze solver repo',
        href: 'https://github.com/eliasbitsch/Docker-ROS-maze-solver',
      },
    ]
  },

  {
    id: 12,
    category: ['Electronics', 'Robotics'],
    title: 'Hardware from scratch',
    description:
      'The making side: printed circuit boards from schematic to soldered board, etched and milled in house, parts milled and turned from aluminium, and pneumatic handling stations with valve terminals and sensors. Built at HTL Eisenstadt between 2016 and 2021, and still in use: the feedback hardware I build at AIT today comes off the same bench.',
    imageUrl: '/gallery/hardware-from-scratch/platine-fertig-bestueckt-2021.jpg',
    tags: ['PCB Design', 'Milling', 'Turning', 'Soldering', 'Pneumatics', 'CAD'],
    icon: FaGears,
  },
  {
    id: 13,
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
          { label: "Learning", icon: FaBook, category: "Learning" },
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

      {/* Handy: eine Bildschirmseite pro Projekt, waagrecht durch die
          Medien. Desktop bleibt das Raster. Zwei Darstellungen statt einer
          Umschaltung, weil sich die Bedienung grundlegend unterscheidet. */}
      <ProjectReel projects={filteredProjects} galleries={galleries} />

      <SimpleGrid
        display={{ base: 'none', md: 'grid' }}
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
              {/* Die Medienflaeche ist ein Blaetterwerk: seitlich wischen
                  zeigt die weiteren Aufnahmen an Ort und Stelle, ein Tippen
                  vergroessert. Punkte im Bild sagen, dass es weitergeht. */}
              <Gallery
                items={galleries[project.title] ?? []}
                title={project.title}
                hero={
                  project.videoUrl ? (
                    /* Laeuft wie ein GIF, wiegt aber einen Bruchteil: stumm,
                       in der Schleife, ohne Bedienelemente. */
                    <Box
                      as="video"
                      src={project.videoUrl}
                      poster={project.imageUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      objectFit="cover"
                      width="100%"
                      height="100%"
                    />
                  ) : (
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      objectFit={project.imageFit ?? 'cover'}
                      bg={project.imageFit === 'contain' ? 'gray.800' : undefined}
                      p={project.imageFit === 'contain' ? 3 : 0}
                      width="100%"
                      height="100%"
                    />
                  )
                }
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
