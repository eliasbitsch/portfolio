import { test, expect, Page } from '@playwright/test';

/*
  Auf dem Handy ragte in der Career-Liste der Firmenname aus der Karte:
  Logo, Name und Datum standen in einer Zeile ohne Umbruch. Der Test
  "laeuft nicht seitlich ueber den Rand" hat das nicht gesehen, weil die
  Seite selbst nicht breiter wurde, nur der Inhalt einer Karte.

  Geprueft wird deshalb jedes Element in jeder Karte: Es darf weder ueber
  den Kartenrand hinausragen noch seinen eigenen Text abschneiden.
*/

async function ganzDurchscrollen(page: Page) {
    await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 600) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
        await new Promise(r => setTimeout(r, 400));
    });
}

async function ueberlaeufe(page: Page) {
    return page.evaluate(() => {
        const funde: string[] = [];
        document.querySelectorAll<HTMLElement>('.card').forEach(card => {
            const rand = card.getBoundingClientRect();
            const titel = (card.textContent ?? '').trim().slice(0, 40);
            card.querySelectorAll<HTMLElement>('*').forEach(el => {
                if (!el.offsetParent && getComputedStyle(el).position !== 'fixed') return;
                const r = el.getBoundingClientRect();
                if (r.width === 0 || r.height === 0) return;
                const text = (el.innerText ?? el.textContent ?? '').trim().slice(0, 40);
                if (r.right > rand.right + 1 || r.left < rand.left - 1)
                    funde.push(`[${titel}] "${text}" ragt ${Math.round(Math.max(r.right - rand.right, rand.left - r.left))}px aus der Karte`);
                const s = getComputedStyle(el);
                if (el.scrollWidth > el.clientWidth + 1 && s.overflowX !== 'visible' && el.children.length === 0)
                    funde.push(`[${titel}] "${text}" schneidet Text ab`);
            });
        });
        return funde;
    });
}

for (const pfad of ['/', '/about']) {
    test(`keine Karte laeuft ueber (${pfad})`, async ({ page }) => {
        const antwort = await page.goto(pfad);
        test.skip(antwort?.status() === 404, `${pfad} gibt es nicht`);
        await ganzDurchscrollen(page);
        // die Karten blenden beim Scrollen ein; warten bis die Animation steht
        await page.waitForTimeout(800);
        expect(await ueberlaeufe(page)).toEqual([]);
    });
}
