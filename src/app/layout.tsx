import NavBar from './components/NavBar';
import ScrollMotion from './components/ScrollMotion';
import OverscrollBounce from './components/OverscrollBounce';
import Footer from './components/Footer'; // Import the Footer component
import { Providers } from './providers';
import { fonts } from './fonts';
import './globals.css'; // Import your global CSS file
import { Box } from '@chakra-ui/react'; // Import Box from Chakra UI for layout

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <Providers>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <ScrollMotion />
            <OverscrollBounce />
            <NavBar />
            {/* Das Gummiband bewegt nur den Inhalt, die fixe Leiste bleibt stehen. */}
            <Box id="bounce-root" flex="1" pt={{ base: "64px", md: "76px" }} willChange="transform">
              {children}
              <Footer />
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
