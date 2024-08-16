import NavBar from './NavBar' // Import the NavBar component
import { Providers } from './providers'
import { fonts } from './fonts'
import './globals.css'; // Import your global CSS file

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en' className={fonts.rubik.variable}>
      <body>
        <Providers>
          <NavBar /> {/* Add the NavBar here */}
          {children}
        </Providers>
      </body>
    </html>
  )
}
