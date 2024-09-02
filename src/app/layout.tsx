import NavBar from './components/NavBar'; // Import the NavBar component
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
            <NavBar /> {/* Add the NavBar here */}
            <Box flex="1">{children}</Box> {/* Main content area */}
            {/* <Footer /> Add the Footer here */}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
