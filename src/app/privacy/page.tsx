import { Box, Heading, Link, Text } from '@chakra-ui/react';
import SectionHeading from '../components/SectionHeading';

export const metadata = {
  title: 'Privacy | Elias Bitsch',
};

/* Bewusst kurz und ohne Ortsangabe: sagt ehrlich, was gezaehlt wird und
   was nicht. Die Statistik laeuft auf dem eigenen Server ohne Cookies. */
export default function PrivacyPage() {
  return (
    <Box maxW="760px" mx="auto" px={5} mt={20} mb={10}>
      <SectionHeading>Privacy</SectionHeading>

      <Text mt={8} color="gray.300">
        This is a personal website. It sets no cookies, shows no ads and contains no social media plugins. Links to
        LinkedIn, GitHub and other sites are plain links; nothing is loaded from them until you click.
      </Text>

      <Heading as="h3" size="md" mt={8} mb={2}>
        Anonymous visitor statistics
      </Heading>
      <Text color="gray.300">
        To see how many people visit and which pages they read, this site uses{' '}
        <Link href="https://umami.is" isExternal textDecoration="underline">
          Umami
        </Link>
        , an open-source analytics tool that runs on my own server. It counts page views together with the referring
        site, browser, operating system, device type, screen size, language and the approximate location (country,
        region, city) derived from the IP address. Your IP address itself is not stored, no cookies are set, and you
        are not tracked across other websites. The data stays on my server and is not shared with anyone.
      </Text>

      <Heading as="h3" size="md" mt={8} mb={2}>
        Hosting
      </Heading>
      <Text color="gray.300">
        The site runs on a server rented from IONOS SE in Germany. To deliver pages, the server necessarily processes
        technical connection data such as your IP address.
      </Text>

      <Heading as="h3" size="md" mt={8} mb={2}>
        Contact
      </Heading>
      <Text color="gray.300">
        If you write to me, I use your message and address only to reply. For questions about your data, or to ask for
        information about or deletion of it, write to{' '}
        <Link href="mailto:eliasbitsch@hotmail.com" textDecoration="underline">
          eliasbitsch@hotmail.com
        </Link>
        .
      </Text>
    </Box>
  );
}
