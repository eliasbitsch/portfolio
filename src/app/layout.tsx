import NavBar from './components/NavBar';
import ScrollMotion from './components/ScrollMotion'; // Import the NavBar component
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
            <NavBar /> {/* Add the NavBar here */}
            <Box flex="1" pt={{ base: "64px", md: "76px" }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
