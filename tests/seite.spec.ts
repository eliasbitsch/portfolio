import { test, expect, Page } from '@playwright/test';

/*
  Diese Tests pruefen genau die Fehler, die beim Bauen der Seite
  tatsaechlich aufgetreten sind, nicht ausgedachte Faelle:

  - vier Projektkarten standen ohne Bild da, weil die Galerie zu frueh
    abbrach
  - Videos liefen nicht, weil eine Nummer mit einer anderen verglichen
    wurde
  - die Lightbox haengte am unteren Rand statt in der Mitte
  - ein Bild tauchte doppelt auf
  - der Zaehler zeigte eine Seite mehr an, als es gibt

  Alles davon war im Browser sofort sichtbar und beim Programmieren
  unsichtbar. Genau dafuer sind diese Tests da.
*/

const PROJEKTE = [
    'MetaMove',
    'ROS online course',
    'FlexiStylus',
    'MONUMENTAL',
    'Taurob-Tracker',
    'TurtleBot 4 linear controller',
    'ABB robot cell in RobotStudio',
    'Conveyor belt with a digital twin',
    'Ball Balancing Robot',
    'Circuit-Crusher',
    'Maze solving Robot & Line follower',
    'Hardware from scratch',
    'Portfolio Website',
];

/** Bis ans Ende scrollen, damit alles nachlaedt, was verzoegert laedt. */
async function ganzDurchscrollen(page: Page) {
    await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 400));
    });
}

test.describe('Startseite', () => {
    test('laedt ohne fehlgeschlagene Anfragen', async ({ page }) => {
        const kaputt: string[] = [];
        page.on('response', r => {
            if (r.status() >= 400) kaputt.push(`${r.status()} ${r.url()}`);
        });
        await page.goto('/');
        await ganzDurchscrollen(page);
        expect(kaputt, 'keine Anfrage darf mit 4xx oder 5xx enden').toEqual([]);
    });

    test('hat Titel und Symbol fuer den Browsertab', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Elias Bitsch/);
        const symbol = await page.request.get('/icon.png');
        expect(symbol.status()).toBe(200);
    });

    test('zeigt kein kaputtes Bild', async ({ page }) => {
        await page.goto('/');
        await ganzDurchscrollen(page);
        const kaputt = await page.evaluate(() =>
            [...document.querySelectorAll('img')]
                .filter(i => i.complete && i.naturalWidth === 0)
                .map(i => i.src),
        );
        expect(kaputt).toEqual([]);
    });

    test('laeuft nicht seitlich ueber den Rand', async ({ page }) => {
        await page.goto('/');
        await ganzDurchscrollen(page);
        const ueberstand = await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        );
        expect(ueberstand, 'die Seite darf sich nicht waagrecht schieben lassen').toBeLessThanOrEqual(1);
    });
});

test.describe('Projekte', () => {
    test('jedes Projekt hat ein Bild oder ein Video', async ({ page }) => {
        await page.goto('/');
        await ganzDurchscrollen(page);
        const ohneMedium = await page.evaluate((titel: string[]) => {
            const fehlt: string[] = [];
            const gesehen = new Set<string>();
            const lauf = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
            let n: Node | null;
            while ((n = lauf.nextNode())) {
                const t = (n.textContent || '').trim();
                if (!titel.includes(t) || gesehen.has(t)) continue;
                gesehen.add(t);
                let karte: HTMLElement | null = n.parentElement;
                for (let k = 0; k < 7 && karte; k++) {
                    if (karte.querySelector('img, video')) break;
                    karte = karte.parentElement;
                }
                if (!karte || !karte.querySelector('img, video')) fehlt.push(t);
            }
            return fehlt;
        }, PROJEKTE);
        expect(ohneMedium, 'eine Karte ohne Medium sieht aus wie ein Ladefehler').toEqual([]);
    });

    test('alle erwarteten Projekte sind da', async ({ page }) => {
        await page.goto('/');
        await ganzDurchscrollen(page);
        const text = await page.locator('body').innerText();
        for (const p of PROJEKTE) expect(text).toContain(p);
    });

    test('kein Medium erscheint zweimal in derselben Galerie', async ({ page }) => {
        await page.goto('/');
        await ganzDurchscrollen(page);
        const doppelte = await page.evaluate(() => {
            const treffer: string[] = [];
            const spuren = [...document.querySelectorAll('div')].filter(
                d => getComputedStyle(d).scrollSnapType.startsWith('x') && d.offsetParent !== null,
            );
            for (const s of spuren) {
                const quellen = [...s.children]
                    .map(c => {
                        const el = c.querySelector('img, video') as HTMLImageElement | HTMLVideoElement | null;
                        if (!el) return '';
                        const q = (el as HTMLVideoElement).currentSrc || (el as HTMLImageElement).src;
                        // Vorschau und grosse Fassung gehoeren zusammen
                        return q.replace(/_t\.jpg$/, '.jpg').split('/').pop() || '';
                    })
                    .filter(Boolean);
                const einmal = new Set(quellen);
                if (einmal.size !== quellen.length) treffer.push(quellen.join(', '));
            }
            return treffer;
        });
        expect(doppelte).toEqual([]);
    });

    test('jedes Kartenvideo spielt wirklich', async ({ page }) => {
        await page.goto('/');
        await ganzDurchscrollen(page);
        const stehen = await page.evaluate(async () => {
            const sichtbar = [...document.querySelectorAll('video')].filter(
                v => v.offsetParent !== null && (v.currentSrc || v.src).includes('/videos/'),
            );
            const still: string[] = [];
            for (const v of sichtbar) {
                v.scrollIntoView({ block: 'center' });
                await new Promise(r => setTimeout(r, 500));
                const vorher = v.currentTime;
                await new Promise(r => setTimeout(r, 700));
                if (v.currentTime <= vorher) still.push((v.currentSrc || v.src).split('/').pop() || '');
            }
            return still;
        });
        expect(stehen, 'ein stehendes Video sieht aus wie ein kaputtes Bild').toEqual([]);
    });
});

test.describe('Lightbox', () => {
    test('oeffnet mittig und zaehlt richtig', async ({ page }) => {
        test.skip(test.info().project.name !== 'desktop', 'die Lightbox gibt es nur im Raster');
        await page.goto('/');
        await ganzDurchscrollen(page);

        const ergebnis = await page.evaluate(async () => {
            const spur = [...document.querySelectorAll('div')].find(
                d =>
                    getComputedStyle(d).scrollSnapType.startsWith('x') &&
                    d.offsetParent !== null &&
                    d.children.length > 1,
            );
            if (!spur) return { fehler: 'kein Blaetterwerk gefunden' };
            const seiten = spur.children.length;
            (spur.children[1] as HTMLElement).scrollIntoView({ block: 'center' });
            await new Promise(r => setTimeout(r, 400));
            (spur.children[1] as HTMLElement).click();
            await new Promise(r => setTimeout(r, 1200));

            const ov = [...document.querySelectorAll('div')].find(d => {
                const cs = getComputedStyle(d);
                return cs.position === 'fixed' && cs.zIndex === '2000';
            });
            if (!ov) return { fehler: 'Lightbox oeffnet nicht' };
            const k = ov.getBoundingClientRect();
            const zaehler = [...ov.querySelectorAll('div')]
                .map(d => (d.textContent || '').trim())
                .find(t => /^\d+ \/ \d+$/.test(t));
            return {
                oben: Math.round(k.top),
                links: Math.round(k.left),
                breite: Math.round(k.width),
                hoehe: Math.round(k.height),
                fensterBreite: window.innerWidth,
                fensterHoehe: window.innerHeight,
                zaehler,
                seitenImBlaetterwerk: seiten,
            };
        });

        expect(ergebnis.fehler).toBeUndefined();
        // Sie muss das Fenster fuellen. Frueher hing sie unten, weil ein
        // Vorfahr ein transform trug und position:fixed sich dann darauf
        // bezieht statt auf das Fenster.
        expect(ergebnis.oben).toBe(0);
        expect(ergebnis.links).toBe(0);
        expect(ergebnis.breite).toBe(ergebnis.fensterBreite);
        expect(ergebnis.hoehe).toBe(ergebnis.fensterHoehe);

        // Der Zaehler darf nicht mehr Seiten nennen, als das Blaetterwerk
        // hat. Das Kartenbild zaehlt dort mit, in der Lightbox nicht.
        const [, gesamt] = (ergebnis.zaehler || '0 / 0').split('/').map(s => Number(s.trim()));
        expect(gesamt).toBe((ergebnis.seitenImBlaetterwerk || 1) - 1);
    });
});

test.describe('Publikationen', () => {
    test('nennt keine Titel von Arbeiten in anonymer Begutachtung', async ({ page }) => {
        await page.goto('/');
        const text = await page.locator('body').innerText();
        for (const geheim of [
            'Limits of Plausibility',
            'Perceptual Stressor',
            'What Error Is It Now',
            'Jakob Uhl',
            'Ceballos',
        ]) {
            expect(text, `"${geheim}" darf nicht auf der Seite stehen`).not.toContain(geheim);
        }
    });

    test('nennt keine vertraulichen Projektnamen', async ({ page }) => {
        await page.goto('/');
        await ganzDurchscrollen(page);
        const text = await page.locator('body').innerText();
        for (const geheim of ['Crayler', 'vibrotactile', 'Waschbecken']) {
            expect(text, `"${geheim}" gehoert nicht auf die oeffentliche Seite`).not.toContain(geheim);
        }
    });
});
