'use client';

import { useEffect } from 'react';

/**
 * Gummiband am Scrollende, wie es macOS und iOS von Haus aus machen.
 *
 * Warum ueberhaupt Code: CSS kann den Effekt nur abschalten
 * (overscroll-behavior), nicht erzeugen. Auf Windows und Android gibt es ihn
 * nicht, also muss er nachgebaut werden.
 *
 * Der Eingriff bleibt bewusst klein: Das Rad wird nur abgefangen, wenn die
 * Seite bereits ganz oben oder ganz unten steht und weiter in dieselbe
 * Richtung gedreht wird. Beim normalen Scrollen passiert nichts. Auf
 * Apple-Geraeten ist alles aus, sonst federt es doppelt.
 */
export default function OverscrollBounce() {
    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const ua = navigator.userAgent;
        const isApple = /Mac|iPhone|iPad|iPod/.test(ua) && !/Windows/.test(ua);

        /* Auf Beruehrungsgeraeten gar nicht erst anfassen.

           Um `preventDefault` auf `touchmove` aufrufen zu duerfen, muss der
           Zuhoerer nicht-passiv angemeldet sein. Ein nicht-passiver
           touchmove-Zuhoerer zwingt den Browser, vor jedem Bildlauf auf
           JavaScript zu warten, und genau daran zerbricht das native
           Einrasten: das Blaettern von Seite zu Seite wird weich und
           unentschlossen. In der Konsole steht dann die Meldung, dass der
           Abbruch ignoriert wurde, weil der Bildlauf schon laeuft.

           Gebraucht wird das hier ohnehin nicht: Android und iOS bringen
           ihr eigenes Ueberziehen mit. Der Nachbau ist nur fuer Mausraeder
           auf dem Desktop da. */
        const beruehrung = window.matchMedia('(pointer: coarse)').matches;
        if (reduced || isApple || beruehrung) return;

        const root = document.getElementById('bounce-root');
        if (!root) return;

        const MAX = 110;          // maximaler Ausschlag in Pixeln
        const STIFFNESS = 0.16;   // Rueckstellkraft
        const DAMPING = 0.72;     // Daempfung, verhindert Nachschwingen

        let offset = 0;
        let velocity = 0;
        let raw = 0;              // ungedaempfte Summe der Radbewegung
        let frame = 0;
        let releasing = false;

        const draw = () => {
            root.style.transform = offset === 0 ? '' : `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        };

        const spring = () => {
            velocity += -offset * STIFFNESS;
            velocity *= DAMPING;
            offset += velocity;

            if (Math.abs(offset) < 0.4 && Math.abs(velocity) < 0.4) {
                offset = 0;
                velocity = 0;
                raw = 0;
                releasing = false;
                frame = 0;
                draw();
                return;
            }
            draw();
            frame = window.requestAnimationFrame(spring);
        };

        const release = () => {
            if (releasing || offset === 0) return;
            releasing = true;
            if (!frame) frame = window.requestAnimationFrame(spring);
        };

        let releaseTimer = 0;

        const atTop = () => window.scrollY <= 0;
        const atBottom = () =>
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;

        const onWheel = (e: WheelEvent) => {
            const pullingUp = e.deltaY < 0 && atTop();
            const pullingDown = e.deltaY > 0 && atBottom();

            if (!pullingUp && !pullingDown) {
                if (offset !== 0) release();
                return;
            }

            e.preventDefault();
            releasing = false;
            if (frame) {
                window.cancelAnimationFrame(frame);
                frame = 0;
            }

            raw += -e.deltaY;
            // Progressiver Widerstand: je weiter gezogen, desto zaeher.
            const sign = Math.sign(raw);
            offset = sign * MAX * (1 - Math.exp(-Math.abs(raw) / (MAX * 1.6)));
            velocity = 0;
            draw();

            window.clearTimeout(releaseTimer);
            releaseTimer = window.setTimeout(release, 90);
        };

        let touchY = 0;
        const onTouchStart = (e: TouchEvent) => {
            touchY = e.touches[0].clientY;
            raw = 0;
        };

        const onTouchMove = (e: TouchEvent) => {
            const dy = e.touches[0].clientY - touchY;
            const pullingDownAtTop = dy > 0 && atTop();
            const pullingUpAtBottom = dy < 0 && atBottom();
            if (!pullingDownAtTop && !pullingUpAtBottom) return;

            e.preventDefault();
            raw = dy;
            const sign = Math.sign(raw);
            offset = sign * MAX * (1 - Math.exp(-Math.abs(raw) / (MAX * 1.6)));
            draw();
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: true });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', release, { passive: true });

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', release);
            window.clearTimeout(releaseTimer);
            if (frame) window.cancelAnimationFrame(frame);
            root.style.transform = '';
        };
    }, []);

    return null;
}
