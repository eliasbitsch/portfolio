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
        el.querySelectorAll('video').forEach((v, i) => {
            if (sichtbar && i === seite) {
                v.play().catch(() => undefined);
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
            /* svh und nicht dvh. dvh misst das Fenster so, wie es gerade
               ist, und beim Scrollen faehrt am Handy die Adressleiste ein
               und aus. Die Seitenhoehe aendert sich dann mitten in der
               Bewegung, und mit ihr wandern die Rasterpunkte. Genau das
               fuehlt sich an, als wuerde es nicht sauber einrasten. svh
               misst das kleinste Fenster und bleibt konstant. */
            height="calc(100svh - 88px)"
            scrollSnapAlign="start"
            scrollSnapStop="always"
            position="relative"
            bg="gray.900"
        >
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
                {/* Erste Seite: das Projekt selbst */}
                <Seite display="flex" flexDirection="column">
                    <Box position="relative" height="52%" flexShrink={0} bg="black" overflow="hidden">
                        {/* Auch hier weicher Eigenhintergrund statt Beschnitt.
                            Bildschirmaufnahmen sind breit, und `cover` haette
                            bei ihnen die Beschriftung am Rand abgeschnitten. */}
                        <Box
                            position="absolute"
                            top={0}
                            right={0}
                            bottom={0}
                            left={0}
                            backgroundImage={`url(${projekt.imageUrl})`}
                            backgroundSize="cover"
                            backgroundPosition="center"
                            filter="blur(26px) brightness(0.4)"
                            transform="scale(1.15)"
                        />
                        {projekt.videoUrl ? (
                            <Box
                                as="video"
                                src={projekt.videoUrl}
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                poster={projekt.imageUrl}
                                position="relative"
                                width="100%"
                                height="100%"
                                objectFit="contain"
                            />
                        ) : (
                            <Box
                                as="img"
                                src={projekt.imageUrl}
                                alt={projekt.title}
                                position="relative"
                                width="100%"
                                height="100%"
                                objectFit="contain"
                            />
                        )}
                    </Box>

                    <Box
                        px={5}
                        pt={4}
                        // Platz fuer die Seitenanzeige, sonst liegt der
                        // letzte Verweis darunter.
                        pb="56px"
                        overflowY="auto"
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
                        {/* Auf vier Zeilen begrenzt. Eine Seite ist eine
                            Seite: sobald der Text laenger wird, muesste man
                            innerhalb der Seite scrollen, und dann ist das
                            Blaettern kaputt. Der ganze Text steht auf dem
                            Desktop. */}
                        <Box fontSize="sm" color="gray.300" lineHeight="1.6" noOfLines={4}>
                            {projekt.description}
                        </Box>
                        <Wrap spacing={2} mt={3}>
                            {projekt.tags.slice(0, 4).map(tag => (
                                <WrapItem key={tag}>
                                    <Tag size="sm" bg="gray.700" color="gray.100" borderRadius="full">
                                        {tag}
                                    </Tag>
                                </WrapItem>
                            ))}
                        </Wrap>
                        {projekt.links && projekt.links.length > 0 && (
                            <Wrap spacing={2} mt={3}>
                                {projekt.links.slice(0, 4).map(l => (
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
                </Seite>

                {/* Weitere Seiten: die Medien des Projekts, formatfuellend */}
                {medien.map(m => (
                    <Seite key={m.src} bg="black">
                        {/* Der Bildschirm ist hochkant, die Aufnahmen sind es
                            meist nicht. Statt schwarzer Balken liegt hinter
                            dem Bild eine weichgezeichnete, formatfuellende
                            Kopie davon. Nichts wird beschnitten, und die
                            Seite wirkt trotzdem gefuellt. */}
                        <Box
                            position="absolute"
                            top={0}
                            right={0}
                            bottom={0}
                            left={0}
                            backgroundImage={`url(${m.thumb})`}
                            backgroundSize="cover"
                            backgroundPosition="center"
                            filter="blur(28px) brightness(0.45)"
                            transform="scale(1.15)"
                        />
                        {m.type === 'video' ? (
                            <Box
                                as="video"
                                src={m.src}
                                muted
                                loop
                                playsInline
                                preload="none"
                                poster={m.thumb}
                                position="relative"
                                width="100%"
                                height="100%"
                                objectFit="contain"
                            />
                        ) : (
                            <Box
                                as="img"
                                src={m.src}
                                alt={projekt.title}
                                loading="lazy"
                                position="relative"
                                width="100%"
                                height="100%"
                                objectFit="contain"
                            />
                        )}
                    </Seite>
                ))}
            </Box>

            <SwipeHint aktiv={erstes && sichtbar && seite === 0 && medien.length > 0} />

            {/* Seitenanzeige. Sagt zugleich, dass es waagrecht weitergeht. */}
            {medien.length > 0 && (
                <HStack
                    position="absolute"
                    bottom="18px"
                    left="50%"
                    transform="translateX(-50%)"
                    spacing={1.5}
                    px={3}
                    py={2}
                    borderRadius="full"
                    bg="blackAlpha.600"
                    backdropFilter="blur(6px)"
                    pointerEvents="none"
                >
                    {/* Ab neun Seiten werden die Punkte zu klein zum
                        Erkennen. Dann sagt eine Zahl mehr. */}
                    {medien.length + 1 <= 8 ? (
                        Array.from({ length: medien.length + 1 }).map((_, i) => (
                            <Box
                                key={i}
                                width={i === seite ? '18px' : '6px'}
                                height="6px"
                                borderRadius="full"
                                bg={i === seite ? '#3C5AF0' : 'whiteAlpha.600'}
                                transition="width 0.25s cubic-bezier(0.16,1,0.3,1), background-color 0.25s"
                            />
                        ))
                    ) : (
                        <Box fontSize="xs" color="whiteAlpha.900" fontWeight="medium">
                            {seite + 1} / {medien.length + 1}
                        </Box>
                    )}
                </HStack>
            )}
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
