'use client';

import { useEffect } from 'react';

/**
 * Schreibt die Scrollposition als --sy auf das html-Element. Alles Weitere
 * passiert im CSS ueber transform und opacity, also auf der GPU. Wir fassen
 * das Scrollen selbst nicht an: eigene Scroll-Physik fuehlt sich auf dem
 * Trackpad zwar weich an, auf dem Telefon aber traege und kaputt.
 */
export default function ScrollMotion() {
    useEffect(() => {
        const root = document.documentElement;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) return;

        let frame = 0;
        const write = () => {
            frame = 0;
            root.style.setProperty('--sy', String(Math.round(window.scrollY)));
        };
        const onScroll = () => {
            if (!frame) frame = window.requestAnimationFrame(write);
        };

        write();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame) window.cancelAnimationFrame(frame);
        };
    }, []);

    return null;
}
