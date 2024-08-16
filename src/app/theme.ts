import { extendTheme } from '@chakra-ui/react';

// Define your custom theme
export const theme = extendTheme({
  styles: {
    global: {
      // Apply styles to the body
      body: {
        bg: 'gray.900', // Set the background color here
        color: 'white', // Optional: Set the text color if needed
      },
    },
  },
  // Add other theme customizations if needed
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },
});
