import { defineConfig, devices } from '@playwright/test';

/*
  Die Tests laufen gegen die gebaute Seite, nicht gegen den
  Entwicklungsmodus. Nur so faellt auf, wenn eine Datei im Build fehlt
  oder ein Pfad erst nach dem Bauen nicht mehr stimmt.

  `webServer` baut und startet selbst, damit `npm test` ohne
  Vorbereitung laeuft.
*/
export default defineConfig({
    testDir: './tests',
    timeout: 45_000,
    expect: { timeout: 10_000 },
    fullyParallel: false,
    workers: 1,
    reporter: [['list']],
    use: {
        baseURL: 'http://localhost:3040',
        trace: 'retain-on-failure',
    },
    projects: [
        { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
        { name: 'iphone-se', use: { ...devices['iPhone SE'] } },
        { name: 'iphone-12', use: { ...devices['iPhone 12 Pro'] } },
    ],
    webServer: {
        command: 'npm run build && npx next start -p 3040',
        url: 'http://localhost:3040',
        reuseExistingServer: false,
        timeout: 180_000,
    },
});
