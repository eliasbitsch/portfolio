'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Box, HStack, IconButton, Portal } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

/*
  Bildleiste an der Projektkarte, Klick oeffnet gross.

  Bewusst kein Karussell, das von allein weiterspringt. Wer eine
  Projektbeschreibung liest, will nicht, dass sich daneben etwas bewegt.
  Die Leiste steht still, bis jemand sie anfasst.

  Die grossen Fassungen und die Videos haengen an `preload="none"` und
  werden erst geladen, wenn die Lightbox offen ist. Sonst laegen bei
  zwoelf Projekten hundert Megabyte auf der Startseite.
*/

export type MediaItem = { src: string; thumb: string; type: 'image' | 'video' };

const MotionBox = motion(Box);

export default function Gallery({ items, title }: { items: MediaItem[]; title: string }) {
    const [open, setOpen] = useState<number | null>(null);

    const zeigen = useCallback(
        (richtung: number) => {
            setOpen(i => (i === null ? null : (i + richtung + items.length) % items.length));
        },
        [items.length],
    );

    useEffect(() => {
        if (open === null) return;
        const taste = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(null);
            if (e.key === 'ArrowRight') zeigen(1);
            if (e.key === 'ArrowLeft') zeigen(-1);
        };
        window.addEventListener('keydown', taste);
        // Hintergrund festhalten, sonst scrollt die Seite unter der
        // Lightbox weg und man landet nach dem Schliessen woanders.
        const vorher = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', taste);
            document.body.style.overflow = vorher;
        };
    }, [open, zeigen]);

    if (!items || items.length === 0) return null;
    const aktuell = open === null ? null : items[open];

    return (
        <>
            <HStack
                mt={4}
                spacing={2}
                overflowX="auto"
                pb={2}
                sx={{
                    scrollbarWidth: 'thin',
                    '&::-webkit-scrollbar': { height: '6px' },
                    '&::-webkit-scrollbar-thumb': { background: '#4A5568', borderRadius: '3px' },
                }}
            >
                {items.map((m, i) => (
                    <Box
                        key={m.src}
                        as="button"
                        onClick={() => setOpen(i)}
                        aria-label={`${title}, Bild ${i + 1} von ${items.length} vergroessern`}
                        flexShrink={0}
                        position="relative"
                        width="86px"
                        height="64px"
                        borderRadius="md"
                        overflow="hidden"
                        border="1px solid"
                        borderColor="whiteAlpha.300"
                        transition="transform 0.18s cubic-bezier(0.16,1,0.3,1), border-color 0.18s"
                        _hover={{ transform: 'translateY(-2px)', borderColor: '#3C5AF0' }}
                    >
                        <Box
                            as="img"
                            src={m.thumb}
                            alt=""
                            loading="lazy"
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            display="block"
                        />
                        {m.type === 'video' && (
                            <Box
                                position="absolute"
                                top={0}
                                right={0}
                                bottom={0}
                                left={0}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                bg="blackAlpha.400"
                                color="white"
                                fontSize="lg"
                            >
                                ▶
                            </Box>
                        )}
                    </Box>
                ))}
            </HStack>

            {/* Die Lightbox muss aus der Karte heraus. Die Karte traegt ein
                transform, fuer Hover und fuer die Layout-Animation beim
                Filtern, und innerhalb eines transformierten Vorfahren bezieht
                sich `position: fixed` auf diesen Vorfahren statt auf das
                Fenster. Ohne Portal landet das Bild irgendwo weit unten. */}
            <Portal>
            <AnimatePresence>
                {aktuell && (
                    <MotionBox
                        position="fixed"
                        top={0}
                        right={0}
                        bottom={0}
                        left={0}
                        width="100vw"
                        height="100vh"
                        zIndex={2000}
                        bg="blackAlpha.800"
                        backdropFilter="blur(6px)"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        p={{ base: 3, md: 10 }}
                        onClick={() => setOpen(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                    >
                        <MotionBox
                            onClick={e => e.stopPropagation()}
                            maxWidth="min(1400px, 100%)"
                            maxHeight="100%"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            initial={{ scale: 0.96, y: 8 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.98, y: 4 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {aktuell.type === 'video' ? (
                                <Box
                                    as="video"
                                    key={aktuell.src}
                                    src={aktuell.src}
                                    controls
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    preload="none"
                                    maxHeight={{ base: '70vh', md: '80vh' }}
                                    maxWidth="100%"
                                    borderRadius="lg"
                                />
                            ) : (
                                <Box
                                    as="img"
                                    key={aktuell.src}
                                    src={aktuell.src}
                                    alt={`${title}`}
                                    maxHeight={{ base: '70vh', md: '80vh' }}
                                    maxWidth="100%"
                                    objectFit="contain"
                                    borderRadius="lg"
                                />
                            )}

                            <HStack mt={4} spacing={4} color="whiteAlpha.900">
                                <IconButton
                                    aria-label="Vorheriges"
                                    icon={<span>←</span>}
                                    onClick={() => zeigen(-1)}
                                    variant="ghost"
                                    color="white"
                                    _hover={{ bg: 'whiteAlpha.200' }}
                                />
                                <Box fontSize="sm" minWidth="70px" textAlign="center">
                                    {(open ?? 0) + 1} / {items.length}
                                </Box>
                                <IconButton
                                    aria-label="Naechstes"
                                    icon={<span>→</span>}
                                    onClick={() => zeigen(1)}
                                    variant="ghost"
                                    color="white"
                                    _hover={{ bg: 'whiteAlpha.200' }}
                                />
                            </HStack>
                        </MotionBox>

                        <IconButton
                            aria-label="Schliessen"
                            icon={<span>✕</span>}
                            onClick={() => setOpen(null)}
                            position="absolute"
                            top={4}
                            right={4}
                            variant="ghost"
                            color="white"
                            fontSize="xl"
                            _hover={{ bg: 'whiteAlpha.200' }}
                        />
                    </MotionBox>
                )}
            </AnimatePresence>
            </Portal>
        </>
    );
}
