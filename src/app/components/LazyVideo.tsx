'use client';

import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

/*
  Ein Kartenvideo, das erst laedt, wenn es zu sehen ist.

  Vorher stand ueberall `autoPlay` mit `preload="metadata"`. Beide
  Darstellungen, Raster und Handy-Ansicht, halten dieselben Videos im
  DOM, auch die gerade ausgeblendete. Der Browser hat deshalb jede Datei
  mehrfach angefragt und ein Dutzend Videos gleichzeitig dekodiert.

  Jetzt: nichts laden, bis das Element im Fenster steht, dann laden und
  abspielen, und wieder anhalten, sobald es hinausgescrollt ist. Ein
  ausgeblendetes Element schneidet nie, laedt also nie.
*/
export default function LazyVideo({ src, poster }: { src: string; poster: string }) {
    const v = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const el = v.current;
        if (!el) return;
        const beobachter = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    if (!el.src) el.src = src;
                    // play() selbst stoesst das Laden an. Auf
                    // loadeddata zu warten, bevor man play() ruft, ist bei
                    // preload="none" eine Sackgasse: es laedt ja nichts,
                    // solange niemand abspielen will. Also immer zuerst
                    // play(), und nur wenn das scheitert, nach dem Laden
                    // noch einmal versuchen.
                    el.play().catch(() => {
                        el.addEventListener(
                            'loadeddata',
                            () => el.play().catch(() => undefined),
                            { once: true },
                        );
                        el.load();
                    });
                } else {
                    el.pause();
                }
            },
            { threshold: 0, rootMargin: '200px 0px' },
        );
        beobachter.observe(el);
        return () => beobachter.disconnect();
    }, [src]);

    return (
        <Box
            as="video"
            ref={v as never}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            objectFit="cover"
            width="100%"
            height="100%"
        />
    );
}
