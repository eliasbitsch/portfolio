'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, HStack, Tag, Wrap, WrapItem, Link } from '@chakra-ui/react';
import type { IconType } from 'react-icons';
import type { MediaItem } from './Gallery';
import SwipeHint from './SwipeHint';

/*
  Handy-Ansicht der Projekte: eine Bildschirmseite pro Projekt.

  Senkrecht wird von Projekt zu Projekt gewischt, waagrecht innerhalb
  eines Projekts durch seine Medien. Beides laeuft ueber CSS scroll-snap
  und damit ueber den Bildlauf des Browsers, nicht ueber eigene
  Wischerkennung. Das ist der Grund, warum es sich richtig anfuehlt:
  Schwung, Abbremsen und Gummiband kommen vom System und nicht aus
  nachgebautem JavaScript, das auf jedem Geraet anders aussieht.

  Die Videos laufen nur auf der Seite, die gerade zu sehen ist. Acht
  Videos gleichzeitig abzuspielen laesst jedes Telefon heiss werden.
*/

export type ReelProject = {
    title: string;
    description: string;
    imageUrl: string;
    videoUrl?: string;
    tags: string[];
    icon: IconType;
    links?: { label: string; href: string }[];
};

function Seite({ children, ...rest }: React.ComponentProps<typeof Box>) {
    return (
        <Box
            minWidth="100%"
            width="100%"
            height="100%"
            flexShrink={0}
            scrollSnapAlign="start"
            // Ohne das rutscht ein schneller Wisch ueber mehrere Seiten.
            // Reels laesst pro Wisch genau eine weiterspringen.
            scrollSnapStop="always"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
            {...rest}
        >
            {children}
        </Box>
    );
}

function Projekt({ projekt, medien, erstes }: { projekt: ReelProject; medien: MediaItem[]; erstes: boolean }) {
    const spur = useRef<HTMLDivElement>(null);
    const [seite, setSeite] = useState(0);
    const [sichtbar, setSichtbar] = useState(false);
    const wurzel = useRef<HTMLDivElement>(null);

    // Nur das Projekt, das gerade auf dem Schirm ist, spielt Videos ab.
    useEffect(() => {
        const el = wurzel.current;
        if (!el) return;
        const beobachter = new IntersectionObserver(
            ([e]) => setSichtbar(e.isIntersecting && e.intersectionRatio > 0.55),
            { threshold: [0, 0.55, 1] },
        );
        beobachter.observe(el);
        return () => beobachter.disconnect();
    }, []);

    useEffect(() => {
        const el = wurzel.current;
        if (!el) return;
        // Nicht die Videos durchzaehlen: zwischen ihnen liegen Bilder,
        // und dann stimmt die laufende Nummer nicht mehr mit der Seite
        // ueberein. Jedes Video traegt deshalb seine Seitennummer selbst.
        el.querySelectorAll('video').forEach(v => {
            const i = Number((v as HTMLVideoElement).dataset.seite);
            if (sichtbar && i === seite) {
                // Mit preload="metadata" sind oft noch keine Bilddaten da,
                // und dann scheitert play() lautlos. Also erst versuchen und
                // bei zu wenig Daten wiederholen, sobald sie eintreffen.
                const los = () => v.play().catch(() => undefined);
                if (v.readyState >= 2) los();
                else v.addEventListener('loadeddata', los, { once: true });
            } else {
                v.pause();
            }
        });
    }, [sichtbar, seite]);

    const beiBildlauf = () => {
        const el = spur.current;
        if (!el) return;
        setSeite(Math.round(el.scrollLeft / el.clientWidth));
    };

    return (
        <Box
            ref={wurzel}
            minHeight="calc(100svh - 88px)"
            position="relative"
            bg="gray.900"
            display="flex"
            flexDirection="column"
        >
            {/* Nur die Medien wischen. Der Beschreibungstext steht fest
                darunter: wer liest, soll nicht erst zurueckwischen
                muessen, um zu sehen, worum es geht. */}
            {/* Feste Hoehe statt Prozent. Ein Prozentwert greift hier ins
                Leere, weil der Rahmen nur eine Mindesthoehe hat und damit
                keine feste Bezugshoehe: die Flaeche wurde so hoch wie ihr
                Inhalt, und das Bild klebte oben mit Schwarz darunter. */}
            <Box position="relative" height="46svh" minHeight="260px" flexShrink={0} bg="black">
                <Box
                    ref={spur}
                    onScroll={beiBildlauf}
                    display="flex"
                    height="100%"
                    overflowX="auto"
                    overflowY="hidden"
                    sx={{
                        scrollSnapType: 'x mandatory',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': { display: 'none' },
                        overscrollBehaviorX: 'contain',
                    }}
                >
                    {[null as MediaItem | null, ...medien].map((m, i) => {
                        const vorschau = m ? m.thumb : projekt.imageUrl;
                        const istVideo = m ? m.type === 'video' : !!projekt.videoUrl;
                        return (
                            <Seite key={m ? m.src : 'hero'} bg="black">
                                {/* Weichgezeichnete Kopie statt schwarzer
                                    Balken: die Aufnahmen sind breit, der
                                    Schirm ist hochkant. */}
                                <Box
                                    position="absolute"
                                    top={0}
                                    right={0}
                                    bottom={0}
                                    left={0}
                                    backgroundImage={'url(' + vorschau + ')'}
                                    backgroundSize="cover"
                                    backgroundPosition="center"
                                    filter="blur(26px) brightness(0.4)"
                                    transform="scale(1.15)"
                                />
                                {istVideo ? (
                                    <Box
                                        as="video"
                                        data-seite={i}
                                        src={m ? m.src : projekt.videoUrl}
                                        muted
                                        loop
                                        playsInline
                                        preload="metadata"
                                        poster={vorschau}
                                        position="relative"
                                        width="100%"
                                        height="100%"
                                        objectFit="contain"
                                    />
                                ) : (
                                    <Box
                                        as="img"
                                        src={m ? m.src : projekt.imageUrl}
                                        alt={projekt.title}
                                        loading={i === 0 ? undefined : 'lazy'}
                                        position="relative"
                                        width="100%"
                                        height="100%"
                                        objectFit="contain"
                                    />
                                )}
                            </Seite>
                        );
                    })}
                </Box>

                {/* Zaehler immer oben rechts im Medienbereich */}
                {medien.length > 0 && (
                    <Box
                        position="absolute"
                        top="10px"
                        right="10px"
                        px={2.5}
                        py={1}
                        borderRadius="full"
                        bg="blackAlpha.700"
                        backdropFilter="blur(6px)"
                        fontSize="xs"
                        fontWeight="medium"
                        color="white"
                        pointerEvents="none"
                    >
                        {seite + 1} / {medien.length + 1}
                    </Box>
                )}

                <SwipeHint aktiv={erstes && sichtbar && seite === 0 && medien.length > 0} />
            </Box>

            <Box
                px={5}
                pt={4}
                pb={6}
                flex="1"
                display="flex"
                flexDirection="column"
                justifyContent="center"
            >
                <HStack spacing={3} mb={2} align="center">
                    <Box as={projekt.icon} boxSize="1.1em" color="#3C5AF0" />
                    <Box fontSize="2xl" fontWeight="bold" color="white" lineHeight="1.2">
                        {projekt.title}
                    </Box>
                </HStack>
                <Box fontSize="sm" color="gray.300" lineHeight="1.6">
                    {projekt.description}
                </Box>
                <Wrap spacing={2} mt={3}>
                    {projekt.tags.map(tag => (
                        <WrapItem key={tag}>
                            <Tag size="sm" bg="gray.700" color="gray.100" borderRadius="full">
                                {tag}
                            </Tag>
                        </WrapItem>
                    ))}
                </Wrap>
                {projekt.links && projekt.links.length > 0 && (
                    <Wrap spacing={2} mt={3}>
                        {projekt.links.map(l => (
                            <WrapItem key={l.href}>
                                <Link
                                    href={l.href}
                                    isExternal
                                    px={3}
                                    py={1}
                                    fontSize="sm"
                                    borderRadius="full"
                                    borderWidth="1px"
                                    borderColor="gray.500"
                                    color="gray.200"
                                    _hover={{ textDecoration: 'none', bg: 'gray.600' }}
                                >
                                    {l.label}
                                </Link>
                            </WrapItem>
                        ))}
                    </Wrap>
                )}
            </Box>
        </Box>
    );
}

export default function ProjectReel({
    projects,
    galleries,
}: {
    projects: ReelProject[];
    galleries: Record<string, MediaItem[]>;
}) {
    return (
        // Kein eigener Bildlaufbereich. Die Seiten haengen im Fluss der
        // Seite, gerastert wird ueber `scroll-snap-type` am html-Element,
        // das nur auf schmalen Schirmen gesetzt ist. Ein verschachtelter
        // Bildlauf richtet sich nie am Fenster aus: man sieht dann immer
        // ein halbes Projekt und darueber den Rest der Filterleiste.
        <Box display={{ base: 'block', md: 'none' }} mt={6} mx={-5}>
            {projects.map((p, i) => (
                <Projekt
                    key={p.title}
                    projekt={p}
                    medien={galleries[p.title] ?? []}
                    erstes={i === 0}
                />
            ))}
        </Box>
    );
}
